var page1 = document.getElementById('box1');

var page2 = document.getElementById('box2');
var page3 = document.getElementById('dashboard');


var button2= document.getElementById('sign-in');

var heading = document.getElementById('heading');
var allInputs = document.querySelectorAll('input');

var ul = document.getElementById('myUl'); 




function handleFormSubmit(e){
    e.preventDefault()

    
    
    var username = document.getElementById('username2').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password2').value;

        
    
    
    // form validation
    if (username === '' || email === '' || password === '' ){
        swal("", "Please fill the empty fields!", "error");
        
    return false

    }

    
    var status = validateForm(username, email, password)
     


        if(status){

  var existingUsers = JSON.parse(localStorage.getItem("authUsers")) || [];
  existingUsers.push({
    id: existingUsers.length + 1,
    username,
    email,
    password,
  });
  localStorage.setItem("authUsers", JSON.stringify(existingUsers));
  localStorage.setItem(
    "loginUser",
    JSON.stringify(existingUsers[existingUsers.length - 1])
  );

  ul.innerHTML = '';
  
}
}






function validateForm(username, email, password){
    if (username.length < 3) {
        swal("", "Username must be atleast 4 characters long!", "error");
        allInputs.forEach(singleInput => singleInput.value = '');
        return false

}
    
    else if (username.length > 20) {
        swal("", "Username cannot exceed 20 characters long!", "error");
        allInputs.forEach(singleInput => singleInput.value = '');
        return false


}
if (password.length < 6) {
    swal("", "Password must be alteast 6 characters long!", "error");
    allInputs.forEach(singleInput => singleInput.value = '');
    return false
} 

var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

 if (!email.match(emailPattern)) {
    swal("", "Invalid email format!", "warning");
    allInputs.forEach(singleInput => singleInput.value = '');

  return false;
    
 }
 var status2 = checkExisting()
          if(status2){
            swal("","Username or email already exists. Please choose a different one.","error");
            allInputs.forEach(singleInput => singleInput.value = '');
          }

          else{

 allInputs.forEach(singleInput => singleInput.value = '');
 page3.style.display = 'block'
 page2.style.display = 'none'
 heading.innerHTML = username;
 swal("", "Successfully signed up!", "success");
        return true
          }
          
           
}

function checkExisting(){
  var username = document.getElementById('username2').value;
  var email = document.getElementById('email').value;

  var users2
  if(localStorage.getItem("authUsers")){
       users2 = JSON.parse(localStorage.getItem("authUsers"))
  }
  else{
      users2 = []
  }
  const userExists = users2.some(user => user.username === username);
            const emailExists = users2.some(user => user.email === email);
           
            if (userExists || emailExists) {
                
                return true

            } 
            else{
              return false
            }
           
}






button2.addEventListener('click' , function(){
    page1.style.display = 'block';
    page2.style.display = 'none'
    });

   















  