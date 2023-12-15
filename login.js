var page1 = document.getElementById('box1');

var page2 = document.getElementById('box2');
var page3 = document.getElementById('dashboard');

var button1= document.getElementById('sign-up');

var heading = document.getElementById('heading');
var allInputs = document.querySelectorAll('input');









function handleFormSubmit1(e){
    e.preventDefault()
   
    
    var username1 = document.getElementById('username').value;
    var password1 = document.getElementById('password').value;
    
    var users2 = JSON.parse(localStorage.getItem("authUsers") || []);
    
         
    
    if(username1 == ''  || password1 == '' ){
         swal("", "Please fill the empty fields!", "error");
         return false
    }
         
    const matchedUsers = users2.filter((user) => user.username === username1);

    if (matchedUsers.length === 1) {
        // If a user with the provided username exists
        const user = matchedUsers[0];
        if (user.password === password1) {
          // Passwords match, login successful
          page1.style.display = 'none';
           page3.style.display = 'block';

           localStorage.setItem("loginUser", JSON.stringify(user));

         
          heading.innerHTML = username1;

          displayTasks()

 
  
         
        
          
        } else {
          // Passwords do not match
          swal("", "Password does not exist!", "error");
            allInputs.forEach(singleInput => singleInput.value = '');
        }
      } else if (matchedUsers.length === 0){
        // No user found with the provided username
        swal("", "Username does not exist!", "error");
      } 
       else{
       swal('','Multiple users with the same username!','error')
       }


    
   

    allInputs.forEach(singleInput => singleInput.value = '');
    
   


}

button1.addEventListener('click' , function(){
page1.style.display = 'none';
page2.style.display = 'block'
});



   
















  