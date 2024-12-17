let userValue = document.querySelector(".input")
let mainContainer = document.querySelector(".mainContainer")
let userName;
function Main(){
    let promise = fetch(`https://api.github.com/users/${userName}`);

    promise.then((response)=>{
        if(response.status !== 200){
            mainContainer.innerHTML="<h2>Saurabh<h2/>"
            throw new Error("No such user found");
        }
        return response.json();
    }).then((responseData)=>{

        mainContainer.innerHTML="";

        const innercontainer = document.createElement('div');
        innercontainer.classList.add("userContainer");
        mainContainer.appendChild(innercontainer);


       
    })
}

function onClick(){
    userName = userValue.value.trim();
   if(userName==""){
    alert("No UserName Found")
   }else{
    Main();
   }
}




const button = document.querySelector(".button");

button.addEventListener("click",onClick)