function openFeature() {
  let allElem = document.querySelectorAll(".elem");
  let btn = document.querySelectorAll("button");
  let el = document.querySelectorAll(".fullelem");

  allElem.forEach(function (elem) {
  
    let eid = el[elem.id];
       
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



function weatherFunction(){
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

}
weatherApi();

 function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
      
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
}


weatherFunction();


function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--trie1', '#393E46')
            rootElement.style.setProperty('--trie2', '#948979')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--trie1', '#123458')
            rootElement.style.setProperty('--trie2', '#D4C9BE')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#FFFCB8;')
            rootElement.style.setProperty('--sec', '#9112BC')
            rootElement.style.setProperty('--trie1', '#AE75DA')
            rootElement.style.setProperty('--trie2', '#E9E294')
            flag = 0
        }

    })


}

changeTheme()

function updateDailyCircle(){

  let total = 0;

  goalPercents.forEach(p=>{
    total += p || 0;
  });

  let average = 0;

if(goalPercents.length > 0){
  average = total / goalPercents.length;
}

average = Math.floor(average);  // 🔥 এই লাইন add করো

  let circle = document.querySelector(".circle");
  let progressText = document.getElementById("progressText");

  circle.style.background =
    `conic-gradient(#00b894 ${average}%, #ddd ${average}%)`;

  progressText.innerHTML =
    "Daily Goals " + Math.floor(average) + "%";
}

var goalPercents = [];

function addGoal(){
  
  let currGoals=[];
  
  

  if(localStorage.getItem("currgoal")){
    console.log("goal is full");
   currGoals=JSON.parse(localStorage.getItem("currgoal"));
  }else{
    console.log("task is empty");
  }
  function attachTimers(){

  const allGoals = document.querySelectorAll(".gym");

  allGoals.forEach((goal, index) => {
  
    let timerText = goal.querySelector(".timer h2");
    let timerStart = goal.querySelector(".startT");
    let timerStop = goal.querySelector(".stopT");
    let done = goal.querySelector(".done");
    let progressBar = goal.querySelector(".outin");

    let second = 0;
    let interval = null;

    let targetMinutes = parseInt(currGoals[index].duration);
    let targetSeconds = targetMinutes * 60;

    function updateTime(){
      let mins = Math.floor(second / 60);
      let secs = second % 60;

      timerText.innerHTML =
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");
    }

    function updateProgress(){
      let percent = (second / targetSeconds) * 100;
     
      if(percent > 100){
        percent = 100;
      }
    
      goalPercents[index] = percent;
updateDailyCircle();
      progressBar.style.width = percent + "%";
      progressBar.innerHTML = Math.floor(percent) + "%";
    }

    timerStart.addEventListener("click", ()=>{

      if(interval != null) return;

      interval = setInterval(()=>{
        second++;
        updateTime();
        updateProgress();
      },10);

    });

    timerStop.addEventListener("click", ()=>{

      clearInterval(interval);

      let totalMin = Math.floor(second / 60);
      done.innerHTML = `✅ Done: ${totalMin} min`;

      interval = null;
      second = 0;
      updateTime();
    });

  });

}

  function renderGoal(){
    let list=document.querySelector(".bottom .list ");
    let currGoal=localStorage.setItem("currgoal", JSON.stringify(currGoals));
    console.log(list);
   
    let sum='';
    currGoals.forEach(function(item,id){
      sum+=`
      <div class=gym>
          <img src=${item.img}>
         <div class="timer">
           <h2>00:00</h2>
           <button class="startT">Start</button>
           <button class="stopT">Stop</button>
         </div>
         <div class="heading">
           <h1>${item.name}</h1>
          <div class="outer">
            <div class="outin">0%</div>
          </div>
         </div>
        
          <div class="time-info">
  <p class="plan">⏰ Plan: ${item.time}</p>
  <p class="done">✅ Done: 0 min</p>
</div>
          <label>
  <input type="checkbox" />
 <h3>${item.duration} min</h3>
</label>
</div>
`

 

    })
list.innerHTML=sum;
    attachTimers();

  }

renderGoal()
  let form=document.querySelector(".input .goal-form");
  let goalName=document.querySelector(".goal-form .goal-name");
  let goalTime=document.querySelector(".goal-form .goal-time");
  let goalDuration=document.querySelector(".goal-form .goal-duration");
  let goalImg=document.querySelector(".goal-form .goal-img");

  form.addEventListener("submit",function(e){
    e.preventDefault();
    currGoals.push({name:goalName.value,time:goalTime.value,duration:goalDuration.value,img:goalImg.value});
    renderGoal();
    goalName.value='';
    goalDuration.value="";
    goalTime.value="";
    goalImg.value="";
  })

}

addGoal();


function setCurrentDate(){

  let today = new Date();

  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let year = today.getFullYear();

  let formattedDate = `${day}-${month}-${year}`;

  document.getElementById("currentDate").innerText = formattedDate;
}

setCurrentDate();