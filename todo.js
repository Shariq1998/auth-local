var page1 = document.getElementById('box1');

var page3 = document.getElementById('dashboard');

var logOut = document.getElementById('log-out')


const myButton = document.getElementById('myButton');
const myInput = document.getElementById('myInput');
var ul = document.getElementById('myUl'); 


    logOut.addEventListener('click', function(){
        page3.style.display = 'none';
        page1.style.display = 'block';
        localStorage.setItem("loginUser", null);
    })



// Get references to the elements




// Add a click event listener to the 'Add' button
myButton.addEventListener('click', addButton());


function removeButton(event) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            const boxToRemove = event.target.parentNode; // Get the parent div (box) of the clicked button
            ul.removeChild(boxToRemove); 
          swal("Poof! Your task has been deleted!", {
            icon: "success",
            
          });

    
        } 

      });
    // Remove the box from the list
}

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearList);

function clearList() {
   
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this list!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
                var logInUser = JSON.parse(localStorage.getItem("loginUser"));

      if (logInUser && logInUser.id) {
        var userTodoKey = `userTodo_${logInUser.id}`;
        localStorage.removeItem(userTodoKey);
      }
                
            }
          swal("Poof! Your list has been cleared!", {
            icon: "success",
            
          });

    
        } 

      });
}
function displayTasks() {
  var logInUser = JSON.parse(localStorage.getItem("loginUser"));

  if (logInUser && logInUser.id) {
    var userTodoKey = `userTodo_${logInUser.id}`;
    var userTodo = JSON.parse(localStorage.getItem(userTodoKey)) || [];

    // Clear the current task list in the UI
    ul.innerHTML = '';

    userTodo.forEach(function (taskText) {
      // Create new elements for each task
      const myDiv = document.createElement('div');
      myDiv.className = 'myDiv';

      const myLi = document.createElement('li');
      myLi.className = 'list';
      myLi.textContent = taskText;

      const cancel = document.createElement('button');
      cancel.className = 'myCancel';
      cancel.innerHTML = 'X';

      // Add the task elements to the DOM
      myDiv.appendChild(myLi);
      myDiv.appendChild(cancel);
      ul.appendChild(myDiv);

      // Add a click event listener to remove the task
      cancel.addEventListener("click", function () {
        // Find the index of the task to remove
        var index = userTodo.indexOf(taskText);

        // Remove the task from the user's to-do list
        if (index !== -1) {
          userTodo.splice(index, 1);
          localStorage.setItem(userTodoKey, JSON.stringify(userTodo));
          // Remove the task element from the DOM
          ul.removeChild(myDiv);
        }
      });
    });
  } else {
    // Handle the case where there's no logged-in user
    ul.innerHTML = ''; // Clear the UI
  }
}

// Call this function initially to display the user's tasks
displayTasks();

function addButton() {
  var myInput = document.getElementById('myInput').value.trim(); // Get the input value and remove leading/trailing spaces

  if (myInput === '') {
    // Exit early if the input is empty
    return;
  }

  var logInUser = JSON.parse(localStorage.getItem("loginUser"));
  console.log(logInUser);

  var userTodoKey = `userTodo_${logInUser.id}`;
  var userTodo = JSON.parse(localStorage.getItem(userTodoKey)) || [];
  userTodo.push(myInput); // Push the task text directly, no need for an object

  localStorage.setItem(userTodoKey, JSON.stringify(userTodo));

  // Clear the input field
  document.getElementById('myInput').value = '';

  // Call the displayTasks function to update the UI
  displayTasks();
}












  