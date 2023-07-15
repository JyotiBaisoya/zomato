// let name = localStorage.getItem("name");

// let orders;
// let menu;
// async function getOrder(){
//   try {
//     let res = await fetch("http://127.0.0.1:5000/order");
//     let ordor = await res.json()
//     orders=ordor.order
//     console.log(orders);
//     populateTableForCustomer(name);
//   } catch (error) {
//     console.log(error)
//   }
// }


//  async function getMenu(){
//     try {
//         let res = await fetch("http://127.0.0.1:5000/menu");
//         let menus =await res.json();
//         menu = menus.menu;
//         console.log(menu)
//         getOrder()
//     } catch (error) {
//         console.log(error)
//     }
//  }
//  getMenu()


 
//   // Select the table body element
//   const tableBody = document.getElementById('ordersTableBody');

//   // Function to find the menu item based on dish ID
//   const findMenuItem = (dishId) => {
//     return menu.find(item => item.id === dishId);
//   };

//   // Function to generate the table rows for a specific customer
//   const populateTableForCustomer = (customerName) => {
//     // Clear existing table rows
//     tableBody.innerHTML = '';

//     // Filter orders based on the customer name
//     const customerOrders = orders.filter(order => order.customer_name === customerName)

//     // Generate table rows for each order
//      customerOrders.forEach(order => {
//       // Create a new row element
//       const row = document.createElement('tr');

//       // Create cells for order ID, dishes, status, and price
//       const orderIdCell = document.createElement('td');
//       const dishesCell = document.createElement('td');
//       const statusCell = document.createElement('td');
//       const priceCell = document.createElement('td');

//       // Set the text content for each cell
//       orderIdCell.textContent = order.id;

//       // Retrieve the menu items for the order's dishes
//       const menuItems = order.dishes.map(dishId => findMenuItem(dishId));

//       // Create a list of dish names
//       const dishNames = menuItems.map(item => item.dish).join(', ');
//       dishesCell.textContent = dishNames;

//       statusCell.textContent = order.status;

//       // Calculate the total price based on the menu items' prices
//       const totalPrice = menuItems.reduce((total, item) => total + item.price, 0);
//       priceCell.textContent = totalPrice;

//       // Append cells to the row
//       row.appendChild(orderIdCell);
//       row.appendChild(dishesCell);
//       row.appendChild(statusCell);
//       row.appendChild(priceCell);

//       // Append the row to the table body
//       tableBody.appendChild(row);
//     });
//   };

//   // Call the function to populate the table for a specific customer

let name = localStorage.getItem("name");

let orders;
let menu;

async function getOrder() {
  try {
    let res = await fetch("http://127.0.0.1:5000/order");
    let orderData = await res.json();
    orders = orderData.order;
    populateTableForCustomer(name); // Call the function after fetching the data
  } catch (error) {
    console.log(error);
  }
}

async function getMenu() {
  try {
    let res = await fetch("http://127.0.0.1:5000/menu");
    let menuData = await res.json();
    menu = menuData.menu;
    getOrder(); // Call the getOrder function after fetching the menu data
  } catch (error) {
    console.log(error);
  }
}

getMenu();

// Select the table body element
const tableBody = document.getElementById('ordersTableBody');

// Function to find the menu item based on dish ID
const findMenuItem = (dishId) => {
  return menu.find(item => item.id == dishId) || {};
};

// Function to generate the table rows for a specific customer
const populateTableForCustomer = (customerName) => {
  // Clear existing table rows
  tableBody.innerHTML = '';

  // Filter orders based on the customer name
  const customerOrders = orders.filter(order => order.customer_name === customerName);

  // Generate table rows for each order
  customerOrders.forEach(order => {
    // Create a new row element
    const row = document.createElement('tr');

    // Create cells for order ID, dishes, status, and price
    const orderIdCell = document.createElement('td');
    const dishesCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const priceCell = document.createElement('td');

    // Set the text content for each cell
    orderIdCell.textContent = order.id;

    // Retrieve the menu items for the order's dishes
    const menuItems = order.dishes.map(dishId => findMenuItem(dishId));

    // Create a list of dish names
    const dishNames = menuItems.map(item => item.dish).join(', ');
    dishesCell.textContent = dishNames;

    statusCell.textContent = order.status;

    // Calculate the total price based on the menu items' prices
    const totalPrice = menuItems.reduce((total, item) => total + item.price, 0);
    priceCell.textContent = totalPrice;

    // Append cells to the row
    row.appendChild(orderIdCell);
    row.appendChild(dishesCell);
    row.appendChild(statusCell);
    row.appendChild(priceCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
};

  
 


