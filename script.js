// ====================
// Music
// ====================

const music = new Audio("music.mp3");
music.loop = true;
music.volume = 0.6;

// ====================
// Pages
// ====================

const welcome = document.getElementById("welcome");
const question = document.getElementById("question");
const booking = document.getElementById("booking");
const done = document.getElementById("done");

const noBtn = document.getElementById("noBtn");

// ====================
// Show Pages
// ====================

function show(page){

welcome.classList.remove("active");
question.classList.remove("active");
booking.classList.remove("active");
done.classList.remove("active");

page.classList.add("active");

}

// ====================
// Open Chat
// ====================

function openChat(){

music.play().catch(()=>{});

show(question);

}

// ====================
// YES
// ====================

function showBooking(){

show(booking);

}

// ====================
// NO Button
// ====================

let tries=0;

noBtn.addEventListener("mouseover",()=>{

tries++;

if(tries>=6){

Swal.fire({

icon:"info",

title:"😂 Nice Try",

text:"I think that's a YES ❤️",

confirmButtonColor:"#ff4d6d"

});

showBooking();

return;

}

let x=Math.random()*(window.innerWidth-120);

let y=Math.random()*(window.innerHeight-70);

noBtn.style.position="fixed";
noBtn.style.left=x+"px";
noBtn.style.top=y+"px";

});
// ====================
// Send To Telegram
// ====================

function sendDate(){

const date=document.getElementById("date").value;
const time=document.getElementById("time").value;
const place=document.getElementById("place").value;
const note=document.getElementById("note").value;

if(!date || !time){

Swal.fire({
icon:"warning",
title:"Oops ❤️",
text:"Please choose a date and time.",
confirmButtonColor:"#ff4d6d"
});

return;

}

fetch("https://api.telegram.org/bot8668821454:AAE7lkR9_J-Y9FoEQ4C6JqW-OK7Oh5Kppu8/sendMessage",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

chat_id:"7840562547",

text:
`💖 NEW DATE REQUEST 💖

📅 Date: ${date}

🕒 Time: ${time}

📍 Place: ${place}

💌 Note:
${note}`

})

})

.then(res=>res.json())

.then(data=>{

if(data.ok){

Swal.fire({

icon:"success",

title:"Yay ❤️",

text:"Date request sent!",

showConfirmButton:false,

timer:1800

});

show(done);

heartRain();

startCountdown(date,time);

}else{

Swal.fire({

icon:"error",

title:"Telegram Error",

text:data.description,

confirmButtonColor:"#ff4d6d"

});

}

})

.catch(()=>{

Swal.fire({

icon:"error",

title:"Connection Error",

text:"Couldn't send the request.",

confirmButtonColor:"#ff4d6d"

});

});

}

// ====================
// Hearts Animation
// ====================

function heartRain(){

const bg=document.querySelector(".background");

for(let i=0;i<50;i++){

setTimeout(()=>{

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML=["❤️","💕","💖","💗"][Math.floor(Math.random()*4)];

heart.style.left=Math.random()*100+"vw";

heart.style.animationDuration=(2+Math.random()*3)+"s";

heart.style.fontSize=(18+Math.random()*20)+"px";

bg.appendChild(heart);

setTimeout(()=>{

heart.remove();

},5000);

},i*120);

}

}

// ====================
// Countdown
// ====================

function startCountdown(date,time){

const target=new Date(date+"T"+time);

const box=document.getElementById("countdown");

setInterval(()=>{

const now=new Date();

const diff=target-now;

if(diff<=0){

box.innerHTML="❤️ Today Is The Date ❤️";

return;

}

const days=Math.floor(diff/(1000*60*60*24));
const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
const mins=Math.floor((diff%(1000*60*60))/(1000*60));

box.innerHTML=`⏳ ${days} Days<br>${hours} Hours ${mins} Minutes`;

},1000);

}