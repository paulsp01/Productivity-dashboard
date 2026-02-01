let allElem=document.querySelectorAll(".elem");
let btn=document.querySelectorAll("button");
 let el= document.querySelectorAll(".fullelem") ;

 
allElem.forEach(function(elem){
   
     let eid=el[[elem.id]];
    elem.addEventListener("click", function(){
     
     eid.style.display="block";

})


})

 btn.forEach(function(e){
    e.addEventListener("click", function(){
        el[e.id].style.display="none";
    })
 })