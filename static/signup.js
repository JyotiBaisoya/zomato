let signupform = document.querySelector("#signup-form");


signupform.addEventListener("submit",signUp)

async function signUp(e){
    e.preventDefault()
 let allinput = document.querySelectorAll("#signup-form input")
 let obj={}
 for(let i=0;i<allinput.length;i++){
    obj[allinput[i].id]=allinput[i].value
 }
 console.log(obj)
 if(obj["confirm-password"]!=obj["password"]){
    swal.fire("Confirm password is not matching with password")
 }else{
    try {
        let req = await fetch("http://127.0.0.1:5000/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(req.ok){
            swal.fire("Signed up successfully")
            window.location="./login.html"
        }else{
            
            swal.fire("something went wrong")
        }
    } catch (error) {
        console.log(error)
        swal.fire("something went wrong",error)
    }
 }
}