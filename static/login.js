let loginform = document.querySelector("#login-form");

loginform.addEventListener("submit",logIn);
async function logIn(e){
  e.preventDefault()
  let allinput = document.querySelectorAll("#login-form input");
  let obj={};

  for(let i=0;i<allinput.length;i++){
    obj[allinput[i].id] = allinput[i].value
  };
 console.log(obj)

  try {
    let req = await fetch("http://127.0.0.1:5000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
   
    if(req.ok){
        
       localStorage.setItem("name",obj["username"])
        swal.fire("Logged in successfully")
        
        window.location="./home.html"
    }else{
        
        swal.fire("wrong password")
    }
} catch (error) {
    console.log(error)
    swal.fire("something went wrong",error)
}

}