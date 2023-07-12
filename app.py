
import json
from flask import Flask, jsonify, request


app = Flask(__name__)




order_file = 'orders.json'
menu_file = 'menu.json'

@app.route('/menu', methods=['GET'])
def get_menu():
    with open(menu_file, 'r') as file:
        menu_data = json.load(file)
    return jsonify({'menu': menu_data})

@app.route('/menu', methods=['POST'])
def add_dish():
    dish = request.json
    with open(menu_file, 'r+') as file:
        menu_data = json.load(file)
        dish_id = max(dish['id'] for dish in menu_data) + 1
        dish['id'] = dish_id
        menu_data.append(dish)
        file.seek(0)
        json.dump(menu_data, file, indent=4)
        file.truncate()
    return jsonify({'message': 'Dish added successfully'})

@app.route('/menu/<int:dish_id>', methods=['PUT'])
def update_dish(dish_id):
    dish_updates = request.json
    with open(menu_file, 'r+') as file:
        menu_data = json.load(file)
        for dish in menu_data:
            if dish['id'] == dish_id:
                dish.update(dish_updates)
                file.seek(0)
                json.dump(menu_data, file, indent=4)
                file.truncate()
                return jsonify({'message': f'Dish with ID {dish_id} updated successfully'})
    return jsonify({'message': f'Dish with ID {dish_id} not found'})


@app.route('/menu/<int:dish_id>', methods=['DELETE'])
def delete_dish(dish_id):
    with open(menu_file, 'r+') as file:
        menu_data = json.load(file)
        for dish in menu_data:
            if dish['id'] == dish_id:
                menu_data.remove(dish)
                file.seek(0)
                json.dump(menu_data, file, indent=4)
                file.truncate()
                return jsonify({'message': f'Dish with ID {dish_id} deleted successfully'})
    return jsonify({'message': f'Dish with ID {dish_id} not found'})




@app.route('/order', methods=['POST'])
def place_order():
    order_data = request.json
    menu_data = get_menu_data()
    order_id = generate_order_id()
    for dish_id in order_data['dishes']:
        dish = find_dish_by_id(dish_id, menu_data)
        if dish is None:
            return jsonify({'message': f'Dish with ID {dish_id} not found in the menu'})
        if not dish['available']:
            return jsonify({'message': f'Dish with ID {dish_id} is not available'})
    order = {
        'id': order_id,
        'customer_name': order_data['customer_name'],
        'dishes': order_data['dishes'],
        'status': 'received'
    }
    save_order(order)
    return jsonify({'message': f'Order placed successfully. Order ID: {order_id}'})

def get_menu_data():
    with open(menu_file, 'r') as file:
        menu_data = json.load(file)
    return menu_data

def generate_order_id():
    # Read the existing order IDs from the orders.json file
    existing_order_ids = []
    with open('orders.json', 'r') as file:
        for line in file:
            order = json.loads(line.strip())
            existing_order_ids.append(order['id'])
    
    
    max_order_id = max(existing_order_ids) if existing_order_ids else 0
    
    
    order_id = max_order_id + 1
    
    return order_id
    

def find_dish_by_id(dish_id, menu_data):
    for dish in menu_data:
        if dish['id'] == dish_id:
            return dish
    return None

def save_order(order):
    with open(order_file, 'a') as file:
        file.write(json.dumps(order) + '\n')



@app.route('/order', methods=['GET'])
def get_order():
    with open(order_file, 'r') as file:
        order_data = json.load(file)
    return jsonify({'order': order_data})


@app.route('/order/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order_data = request.json
    updated_status = order_data.get('status')

    if updated_status is None:
        return jsonify({'message': 'Status not provided'})

    updated_order = None

    with open(order_file, 'r+') as file:
        orders = [json.loads(line.strip()) for line in file]

        for order in orders:
            if order['id'] == order_id:
                order['status'] = updated_status
                updated_order = order
                break

        file.seek(0)
        file.truncate()

        for order in orders:
            file.write(json.dumps(order) + '\n')

    if updated_order:
        return jsonify({'message': 'Order updated successfully'})
    else:
        return jsonify({'message': f'Order with ID {order_id} not found'})



if __name__=='__main__':
    app.run()