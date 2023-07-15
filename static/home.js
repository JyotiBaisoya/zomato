let signup = document.querySelector(".signup-btn");

signup.addEventListener("click",signUp)

function signUp(){
    window.location="./signup.html"
}


let login = document.querySelector(".login-btn");

login.addEventListener("click",logIn)

function logIn(){
    window.location="./login.html"
}

let name = localStorage.getItem("name");
console.log(name);
let showname = document.querySelector(".auth-buttons");
let order = document.querySelector(".cta-btn");

order.addEventListener("click",()=>{
    if(name){
        window.location="./menu.html"
    }else{
        swal.fire("Please Login first")
    }
})

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
    showname.appendChild(order);

 
    
}

