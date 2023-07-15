
from flask import Flask, jsonify, request, render_template, session
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
app = Flask(__name__)
app.secret_key = 'sanvi'
cors = CORS(app)

app.config['MONGO_URI'] = "mongodb+srv://jyotibaisoya:baisoya@cluster0.0gxpf.mongodb.net/quickbitedb?retryWrites=true&w=majority"  # Replace with your MongoDB URI
mongo = PyMongo(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email=data.get("email")
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'user')
    if not username or not password:
        return jsonify({'message': 'Invalid credentials'}), 400

    users_collection = mongo.db.users
    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'Username already exists'}), 400

    new_user = {

        'username': username,
        "email":email,
        'password': password,
        'role': role
    }
    users_collection.insert_one(new_user)

    return jsonify({'message': 'User created successfully'})


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Invalid credentials'}), 400

    users_collection = mongo.db.users
    user = users_collection.find_one({'username': username})
    if user and user['password'] == password:
        session['username'] = username
        session['role'] = user['role']
        return jsonify({'message': 'Login successful', 'user': data})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/menu', methods=['GET'])
def get_menu():
    menu_collection = mongo.db.menu
    pipeline = [
        {
            '$project': {
                '_id': {'$toString': '$_id'},
                'id': {'$toString': '$id'},
                'dish': True,
                'price': True,
                'image': True,
                "availability":True
            }
        }
    ]
    menu_data = list(menu_collection.aggregate(pipeline))

    return jsonify({'menu': menu_data})


@app.route('/menu', methods=['POST'])
def add_dish():
    dish = request.json
    menu_collection = mongo.db.menu
    dish_id = menu_collection.count_documents({}) + 1
    dish['id'] = dish_id
    menu_collection.insert_one(dish)
    return jsonify({'message': 'Dish added successfully'})

@app.route('/menu/<int:dish_id>', methods=['PUT'])
def update_dish(dish_id):
    dish_updates = request.json
    menu_collection = mongo.db.menu
    menu_collection.update_one({'id': dish_id}, {'$set': dish_updates})
    return jsonify({'message': f'Dish with ID {dish_id} updated successfully'})

@app.route('/menu/<int:dish_id>', methods=['DELETE'])
def delete_dish(dish_id):
    menu_collection = mongo.db.menu
    menu_collection.delete_one({'id': dish_id})
    return jsonify({'message': f'Dish with ID {dish_id} deleted successfully'})



@app.route('/order', methods=['POST'])
def place_order():
    order_data = request.json
    menu_collection = mongo.db.menu
    order_collection = mongo.db.orders  # Update the collection name to 'orders'
    order_id = order_collection.count_documents({}) + 1

    for dish_id in order_data['dishes']:
        dish = menu_collection.find_one({'id': dish_id})
        if dish is None:
          return jsonify({'message': f'Dish with ID {dish_id} not found in the menu'})
        if dish["availabilty"] is False: 
            return jsonify({'message': f'Dish with ID {dish_id} is not available'})

    order = {
        'id': order_id,
        'customer_name': order_data['customer_name'],
        'dishes': order_data['dishes'],
        'status': 'received'
    }
    order_collection.insert_one(order)

    return jsonify({'message': f'Order placed successfully. Order ID: {order_id}'})



@app.route('/order', methods=['GET'])
def get_order():
    order_collection = mongo.db.orders
    pipeline = [
        {
            '$project': {
                '_id': False,
                'id': {'$toString': '$_id'},
                'customer_name': True,
                'dishes': True,
                'status': True
            }
        }
    ]
    order_data = list(order_collection.aggregate(pipeline))

    return jsonify({'order': order_data})


@app.route('/order/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order_data = request.json
    updated_status = order_data.get('status')

    if updated_status is None:
        return jsonify({'message': 'Status not provided'})

    order_collection = mongo.db.orders
    result = order_collection.update_one({'id': order_id}, {'$set': {'status': updated_status}})

    if result.modified_count:
        return jsonify({'message': 'Order updated successfully'})
    else:
        return jsonify({'message': f'Order with ID {order_id} not found'})



if __name__ == '__main__':
    app.run()
