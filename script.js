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

function motivationalQuote(){
  
 var motivationQuoteContent = document.querySelector('.moti2 h1')
    var motivationAuthor = document.querySelector('.moti3 h2')
    console.log(motivationQuoteContent);
    console.log(motivationAuthor);

   async function fetchQuote() {
        let response = await fetch("https://dummyjson.com/quotes/random");

        let data = await response.json();
       
        motivationQuoteContent.innerHTML = data.quote
        motivationAuthor.innerHTML = `-${data.author}`
    }

    fetchQuote()

}

motivationalQuote();


function pomodoroTimer(){
  var interval=null;
let timer=document.querySelector(".pomo-timer h1");
var btnStart=document.querySelector(".start");
var btnStop=document.querySelector(".stop");
var btnReset=document.querySelector(".reset");
let session=document.querySelector(".session");
 var isWorkSession = true
let totalsec=25*60;
function updateTime(){
  let mins=Math.floor(totalsec/60);
  let secs=totalsec%60;
  

  timer.innerHTML=`${String(mins).padStart('2','0')}:${String(secs).padEnd('2','0')}`
}


function startTimer(){
   clearInterval(interval)

        if (isWorkSession) {

            interval = setInterval(function () {
                if (totalsec > 0) {
                    totalsec--
                    updateTime()
                } else {
                    isWorkSession = false
                    clearInterval(interval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalsec = 5 * 60;
                }
            }, 1000)
        } else {


            interval = setInterval(function () {
                if (totalsec > 0) {
                    totalsec--
                    updateTime()
                } else {
                    isWorkSession = true
                    clearInterval(interval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalsec = 25 * 60
                }
            }, 1000)
        }

  btnStart.innerHTML="Start"
}

function stopTimer(){
  clearInterval(interval);
  btnStart.innerHTML="Resume"
}

function resetTimer(){
   totalsec=25*60;
  clearInterval(interval);
  updateTime();
 
}

btnStart.addEventListener("click",startTimer);
btnStop.addEventListener("click",stopTimer);
btnReset.addEventListener("click",resetTimer) 
}

pomodoroTimer();



let apiKey='fb7433b5be9e49b0a54162056260702';
var city='Kolkata'
 var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null
async function weatherApi(){
  let res=await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
 var data=await res.json();
   
  header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`
 console.log(data);
}
weatherApi();

 function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        console.log(date)
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

   
    setInterval(() => {
        timeDate()
    }, 1000);