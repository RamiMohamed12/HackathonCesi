document.addEventListener("DOMContentLoaded",function () { 

    const loginButton = document.querySelector("button"); 

    loginButton.addEventListener("click",function () { 
        const email = document.getElementById("email").value; 


        if(!email) {
            alert("Please enter a valid email address."); 
            return; 
        } 



        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)){ 
            alert("Please enter a valid email address."); 
            return; 
        } 
        alert("Email is valid!"); 

    });
});