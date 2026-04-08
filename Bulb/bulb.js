let a =document.querySelector("h1");
a.addEventListener("click", function(){
    a.innerHTML="Changed html using javascript When I click";
    a.style.backgroundColor = "black";
    a.style.color ="yellow";
    a.style.padding = "30px";
})
    var home = document.querySelector(".home");
    var bulb = document.querySelector(".bulb");
    var btn = document.querySelector(".button");
    var counterMachine =document.querySelector(".counterMachine");

    var flag =0;
    btn.addEventListener("click", function(){
    if (flag==0) {
        bulb.style.backgroundColor = "yellow";
        bulb.style.col
        flag++;
    } else {
        bulb.style.backgroundColor = "transparent";
        flag--;
    }
})
let count = document.querySelector(".counter");
let increase = document.querySelector(".increase");
let decrease = document.querySelector(".decrease");
let reset = document.querySelector(".reset");
  var x=0;
  increase.addEventListener("click", function(){
       ++x;
        count.innerHTML=x;

  })
  decrease.addEventListener("click", function(){
    --x;
    count.innerHTML=x;
  })
  reset.addEventListener("click", function(){
    x=0;
    count.innerHTML=x;
  })
  var dark = document.querySelector(".dark");
  var circle = document.querySelector(".circle");
  circle.addEventListener("click", function(){
    
  })