

function openFeature() {
  let allElem = document.querySelectorAll(".elem");
  let btn = document.querySelectorAll("button");
  let el = document.querySelectorAll(".fullelem");

  allElem.forEach(function (elem) {
    let eid = el[[elem.id]];
    elem.addEventListener("click", function () {
      eid.style.display = "block";
    });
  });

  btn.forEach(function (e) {
    e.addEventListener("click", function () {
      el[e.id].style.display = "none";
    });
  });
}

openFeature();

function ToDoList(){
  
var currrenttasks = [];

if(localStorage.getItem("currenttasks")){
    console.log("task is full");
   currrenttasks=JSON.parse(localStorage.getItem("currenttasks"))
   
}else{
    console.log("task is empty");
}

function renderTask(){
    let allTasks=document.querySelector(".todo-container .allTask");
localStorage.setItem("currenttasks",JSON.stringify(currrenttasks) );

let sum='';
currrenttasks.forEach(function (elem,id) {
   sum+=`<div class="task">
              <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
                

             <div class="btns"> <button id=${id} class="mark">Mark as Completed</button>
              <button class="delete">Delete</button></div>
            </div>`

            allTasks.innerHTML=sum;
})

var markCompletedbtn=document.querySelectorAll(" .btns .mark");
markCompletedbtn.forEach(function(btn){
btn.addEventListener("click", function(){

currrenttasks.splice(btn.id,1);
console.log(currrenttasks);
renderTask();


})
})  

}

renderTask();



let form = document.querySelector(".addTask form");
let formInput = document.querySelector(".addTask form #task-input");
let taskDetailInput = document.querySelector(".addTask form textarea");
let checkbox = document.querySelector(".addTask form .mark-imp #check ");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  currrenttasks.push({task:formInput.value,details:taskDetailInput.value,imp:checkbox.checked});
  renderTask();
   localStorage.setItem("currenttasks",JSON.stringify(currrenttasks) );
  checkbox.checked='';
  formInput.value='';
  taskDetailInput.value='';


 
});
}

ToDoList();

function dailyPlanner(){
  var dayPlanData=JSON.parse(localStorage.getItem('dayPlandata'))||{};
console.log(dayPlanData);
var dayPlanner=document.querySelector(".day-planner");

var hours=Array.from({length:18},function(_,idx){
return `${6+idx}:00-${7+idx}:00`;
})


var wholeSumDay='';

hours.forEach(function(hour,id){
  var savedData=dayPlanData[id]||'';
  wholeSumDay=wholeSumDay+` <div class="day-planner-time">
            <p>${hour}</p>
            <input id=${id} type="text" placeholder="..." value=${savedData}>
          </div>`

          dayPlanner.innerHTML=wholeSumDay;
});

var daysInput=document.querySelectorAll(".day-planner .day-planner-time input");
daysInput.forEach(function(day){
 day.addEventListener("input",function(){
  dayPlanData[day.id]=day.value;
  localStorage.setItem("dayPlandata",JSON.stringify(dayPlanData));
  
 })
})
}

dailyPlanner();