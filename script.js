const card = document.getElementById("card");
const btn = document.getElementById("salamiBtn");
const money = document.getElementById("money");
const music = document.getElementById("eidMusic");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

// Name System
function startCard(){
    const name = document.getElementById("username").value;
    if(name === "") return alert("Enter a name");

    document.getElementById("greetingText").innerText = 
        "Eid Mubarak, " + name + " 🌙";

    document.getElementById("nameBox").style.display = "none";
    card.style.display = "block";
}

// Flip
card.addEventListener("click", function(e){
    if(e.target.tagName !== "BUTTON"){
        card.classList.toggle("open");
    }
});

// Salami
btn.addEventListener("click", function(){
    const amounts=[100,200,300,500,1000];
    const randomAmount=amounts[Math.floor(Math.random()*amounts.length)];
    money.innerHTML="৳ "+randomAmount;
    music.play();
    startConfetti();
});

// Share
function shareCard(){
    if(navigator.share){
        navigator.share({
            title:"Eid Salami Card",
            text:"I received an Eid Salami 🎉",
            url:window.location.href
        });
    }else{
        alert("Sharing not supported in this browser");
    }
}

// Confetti
function startConfetti(){
    for(let i=0;i<150;i++){
        confetti.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height-canvas.height,
            r:Math.random()*6+2,
            d:Math.random()*5+2,
            color:"hsl("+Math.random()*360+",100%,50%)"
        });
    }
    animateConfetti();
}

function animateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach((c,i)=>{
        ctx.beginPath();
        ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
        ctx.fillStyle=c.color;
        ctx.fill();
        c.y+=c.d;
        if(c.y>canvas.height){
            confetti.splice(i,1);
        }
    });
    requestAnimationFrame(animateConfetti);
}