
async function getData(){
    try {
        let req = await fetch("http://127.0.0.1:5000/menu");
        let data = await req.json();
        console.log(data)
        showdata(data)
    } catch (error) {
        console.log(error)
    }
}

getData()



// document.addEventListener("DOMContentLoaded", function showdata(menuData) {
//     // Menu data
//     // var menuData = {
        
//     //         "menu": [
//     //             {
//     //                 "dish": "Fasoos-Wraps and Rolls",
//     //                 "id": "64b0512e4cc42f49636c8226",
//     //                 "image": "https://b.zmtcdn.com/data/pictures/chains/2/18349892/81cab239d11c646e76cc35b01b25c180_o2_featured_v2.jpg",
//     //                 "price": 385
//     //             },
//     //             {
//     //                 "dish": "Slay Coffee",
//     //                 "id": "64b0539302bd11d5ad829623",
//     //                 "image": "https://b.zmtcdn.com/data/dish_photos/579/a5be439e731c63a9cb6a914aebc21579.jpg",
//     //                 "price": 285
//     //             },
//     //             {
//     //                 "dish": "Wrap kathi role",
//     //                 "id": "64b053be02bd11d5ad829624",
//     //                 "image": "https://b.zmtcdn.com/data/dish_photos/2ea/d46cc106b54cd7f7e93d862195d212ea.jpg",
//     //                 "price": 267
//     //             },
//     //             {
//     //                 "dish": "Shwamara Kings",
//     //                 "id": "64b0540a02bd11d5ad829625",
//     //                 "image": "https://b.zmtcdn.com/data/dish_photos/b4a/36e9b779d9701b6d7cd7f9be699a7b4a.jpg",
//     //                 "price": 328
//     //             },
//     //             {
//     //                 "dish": "Chai",
//     //                 "id": "64b0543302bd11d5ad829626",
//     //                 "image": "https://b.zmtcdn.com/data/pictures/chains/2/306142/6750c2fe1f25a444991eee4d7afd5dd9_o2_featured_v2.jpg",
//     //                 "price": 150
//     //             },
//     //             {
//     //                 "dish": "Sandwiches",
//     //                 "id": "64b0548c02bd11d5ad829627",
//     //                 "image": "https://b.zmtcdn.com/data/dish_photos/901/802b82218c9aef28be50dcd6d5213901.png",
//     //                 "price": 256
//     //             },
//     //             {
//     //                 "dish": "The Veggie Grillz",
//     //                 "id": "64b055c102bd11d5ad829628",
//     //                 "image": "https://b.zmtcdn.com/data/dish_photos/8ba/24adf28356b748bf5ab8ae1c89e5a8ba.jpg",
//     //                 "price": 250
//     //             },
//     //             {
//     //                 "dish": "Magic morsels",
//     //                 "id": "64b055e802bd11d5ad829629",
//     //                 "image": "https://b.zmtcdn.com/data/pictures/0/20654220/33158cb2d2fcc5738925681b1e8b1733_o2_featured_v2.jpg",
//     //                 "price": 350
//     //             },
//     //             {
//     //                 "dish": "Special Rool",
//     //                 "id": "64b0564e02bd11d5ad82962a",
//     //                 "image": "https://b.zmtcdn.com/data/dish_photos/d71/5c5930a3af69d84e526b1d62a76ecd71.jpg",
//     //                 "price": 450
//     //             },
//     //             {
//     //                 "dish": "Special Rool",
//     //                 "id": "64b0566802bd11d5ad82962b",
//     //                 "image": "https://b.zmtcdn.com/data/dish_photos/d71/5c5930a3af69d84e526b1d62a76ecd71.jpg",
//     //                 "price": 450
//     //             },
//     //             {
//     //                 "dish": "Paani puri",
//     //                 "id": "64b0570602bd11d5ad82962c",
//     //                 "image": "https://b.zmtcdn.com/data/pictures/4/20519274/7098b0ae6c1332d8503e90b32d18b0db_o2_featured_v2.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
//     //                 "price": 450
//     //             }
//     //         ]
//     //     }

//  //.. Add more menu items here
let signup = document.querySelector(".signup-btn");
let login = document.querySelector(".login-btn");
let name = localStorage.getItem("name");
console.log(name);
let showname = document.querySelector(".auth-buttons");
if(name){
  login.style.display="none";
  signup.style.display="none";
  let nome = document.createElement("button");
  nome.innerText=name;
  let order=document.createElement("button");
  order.addEventListener("click",()=>{
    window.location="./orders.html"
  })
  order.innerText="Your Orders"

  

  showname.appendChild(nome);
  showname.appendChild(order)


  
}

  function showdata(menuData){
    var dishList = document.querySelector(".dish-list");
  
    // Loop through the menu items and create dish cards
    menuData.menu.forEach(function(item) {
      // Create dish card element
      var dishCard = document.createElement("div");
      dishCard.classList.add("dish-card");
  
      // Create dish image
      var dishImage = document.createElement("img");
      dishImage.src = item.image;
      dishImage.alt = item.dish;
      dishCard.appendChild(dishImage);
  
      // Create dish name
      var dishName = document.createElement("h3");
      dishName.textContent = item.dish;
      dishCard.appendChild(dishName);
  
      // Create dish price
      var dishPrice = document.createElement("p");
      dishPrice.textContent = "Price: $" + item.price;
      dishCard.appendChild(dishPrice);

      
      // Create dish price
      var orderbtn = document.createElement("button");
      orderbtn.innerText="Order Now";
      orderbtn.setAttribute("class","dta-btn");
      orderbtn.addEventListener("click",function(){
        createOrder(item)
      })
      dishCard.appendChild(orderbtn);
  
      // Add dish card to the dish list container
      dishList.appendChild(dishCard);
    });
  }


  let dishes=[];
  function createOrder(item){
    //console.log(item)
  if(name){
    dishes.push(+(item.id));
    alert("Dish has been added to your order list")
  }else{
    alert("Please login first")
  }
   

    //console.log(dishes)
  }

  let order = document.querySelector(".cta-btn");

  order.addEventListener("click",create)


 async function create(){
   if(!dishes){
      swal.fire("please add something to the list")
   }else if(!name){
    swal.fire("Please login first")
   }else{

    let obj={
        customer_name:name,
        dishes:dishes
    }

    try {
        console.log(obj)
        let req = await fetch("http://127.0.0.1:5000/order",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(req.ok){
            let data = await req.json();
            swal.fire(data.message);
        }
    } catch (error) {
        console.log(error)
    }
   }
  }






  