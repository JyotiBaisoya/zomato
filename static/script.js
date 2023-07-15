// JavaScript code to interact with the Zesty Zomato backend API

// Fetch menu data from the backend API
document.addEventListener("DOMContentLoaded", () => {
    const menuItemsContainer = document.getElementById("menu-items");
    const addDishForm = document.getElementById("add-dish-form");
    const orderForm = document.getElementById("order-form");
    const orderStatusForm = document.getElementById("order-status-form");
    const ordersTable = document.getElementById("orders-table");
  
    // Fetch menu data
    fetch("http://127.0.0.1:5000/menu")
      .then((response) => response.json())
      .then((data) => {
        renderMenuItems(data.menu);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  
    // Fetch orders data
    fetch("http://127.0.0.1:5000/order")
      .then((response) => response.json())
      .then((data) => {
        renderOrders(data.order);
      })
      .catch((error) => {
        console.error("Error fetching orders data:", error);
      });
  
    // Render menu items
    function renderMenuItems(menu) {
      menuItemsContainer.innerHTML = "";
  
      menu.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
  
        const dishId = document.createElement("span");
        dishId.textContent = `ID: ${item.id}`;
  
        const dishName = document.createElement("span");
        dishName.textContent = `Name: ${item.name}`;
  
        const dishPrice = document.createElement("span");
        dishPrice.textContent = `Price: $${item.price}`;
  
        menuItem.appendChild(dishId);
        menuItem.appendChild(dishName);
        menuItem.appendChild(dishPrice);
  
        menuItemsContainer.appendChild(menuItem);
      });
    }
  
    // Render orders
    function renderOrders(orders) {
      ordersTable.innerHTML = "";
  
      const headerRow = document.createElement("tr");
      const headerOrderId = document.createElement("th");
      headerOrderId.textContent = "Order ID";
      const headerCustomerName = document.createElement("th");
      headerCustomerName.textContent = "Customer Name";
      const headerStatus = document.createElement("th");
      headerStatus.textContent = "Status";
      headerRow.appendChild(headerOrderId);
      headerRow.appendChild(headerCustomerName);
      headerRow.appendChild(headerStatus);
      ordersTable.appendChild(headerRow);
  
      orders.forEach((order) => {
        const orderRow = document.createElement("tr");
        const orderId = document.createElement("td");
        orderId.textContent = order.id;
        const customerName = document.createElement("td");
        customerName.textContent = order.customer_name;
        const status = document.createElement("td");
        status.textContent = order.status;
        orderRow.appendChild(orderId);
        orderRow.appendChild(customerName);
        orderRow.appendChild(status);
        ordersTable.appendChild(orderRow);
      });
    }
  
    // Add dish form submission
    addDishForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const dishNameInput = document.getElementById("dish-name");
      const dishPriceInput = document.getElementById("dish-price");
      const dishInageInput =  document.getElementById("dish-image");
  
      const dish = {
        name: dishNameInput.value,
        price: parseFloat(dishPriceInput.value),
        image:dishInageInput.value
      };
  
      fetch("http://127.0.0.1:5000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dish),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("Dish has been added successfully")
          // Refresh menu items
          fetch("http://127.0.0.1:5000/menu")
            .then((response) => response.json())
            .then((data) => {
              renderMenuItems(data.menu);
            });
        })
        .catch((error) => {
          console.error("Error adding dish:", error);
        });
  
      // Clear input fields
      dishNameInput.value = "";
      dishPriceInput.value = "";
    });
  
    // Order form submission
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const customerNameInput = document.getElementById("customer-name");
      const dishIdInput = document.getElementById("dish-id");
  
      const order = {
        customer_name: customerNameInput.value,
        dishes: [parseInt(dishIdInput.value)],
      };
  
      fetch("http://127.0.0.1:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Refresh orders
          fetch("/order")
            .then((response) => response.json())
            .then((data) => {
              renderOrders(data.order);
            });
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
  
      // Clear input fields
      customerNameInput.value = "";
      dishIdInput.value = "";
    });
  
    // Order status form submission
    orderStatusForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const orderIdInput = document.getElementById("order-id");
      const statusInput = document.getElementById("status");
  
      const order = {
        status: statusInput.value,
      };
  
      fetch(`http://127.0.0.1:5000/order/${orderIdInput.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Refresh orders
          fetch("/order")
            .then((response) => response.json())
            .then((data) => {
              renderOrders(data.order);
            });
        })
        .catch((error) => {
          console.error("Error updating order status:", error);
        });
  
      // Clear input fields
      orderIdInput.value = "";
      statusInput.value = "preparing";
    });
  });
  
