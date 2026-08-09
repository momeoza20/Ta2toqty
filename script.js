const SECRET_CODE = "Tota"; // Change this to any private code you want.

const screens = [...document.querySelectorAll(".screen")];
const bar = document.getElementById("bar");
const noBtn = document.getElementById("noBtn");
const toast = document.getElementById("toast");
const audio = document.getElementById("audio");
const record = document.getElementById("record");

function unlock(){
  const code = document.getElementById("code").value.trim();
  if(code === SECRET_CODE){
    document.getElementById("lock").style.display="none";
    sessionStorage.setItem("totaUnlocked","1");
  } else {
    document.getElementById("err").textContent="That code isn't right 💗";
  }
}
document.getElementById("enter").addEventListener("click",unlock);
document.getElementById("code").addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
if(sessionStorage.getItem("totaUnlocked")==="1") document.getElementById("lock").style.display="none";

function go(n){
  screens.forEach(s=>s.classList.remove("active"));
  const target=document.getElementById("s"+n);
  target.classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
  bar.style.width=((n/(screens.length-1))*100)+"%";
  if(n===1) celebration();
  if(n===3) showToast("This one is for us 🎵");
} 

function celebration(){
  const layer=document.createElement("div");
  layer.className="celebrate";
  for(let i=0;i<55;i++){
    const x=document.createElement("span");
    x.textContent=["❤","♡","✦","💗"][i%4];
    x.style.left=(50+(Math.random()*70-35))+"%";
    x.style.top=(52+(Math.random()*10-5))+"%";
    x.style.setProperty("--dx",(Math.random()*420-210)+"px");
    x.style.setProperty("--dy",(Math.random()*620+220)+"px");
    x.style.setProperty("--rot",(Math.random()*720-360)+"deg");
    x.style.animationDelay=(Math.random()*.25)+"s";
    layer.appendChild(x);
  }
  document.body.appendChild(layer);
  setTimeout(()=>layer.remove(),2200);
}
function showToast(t){
  toast.textContent=t; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1800);
}

// The NO button escapes the cursor/finger like the reference video.
function escapeNo(){
  const parent = noBtn.parentElement.getBoundingClientRect();
  const maxX = Math.max(10, parent.width - noBtn.offsetWidth - 10);
  const maxY = 140;
  noBtn.style.position="relative";
  noBtn.style.left=(Math.random()*maxX - maxX/2)+"px";
  noBtn.style.top=(Math.random()*maxY - maxY/2)+"px";
  noBtn.style.transform=`rotate(${(Math.random()*12-6).toFixed(1)}deg)`;
  showToast("Nope 😭 try YES!");
}
noBtn.addEventListener("mouseenter",escapeNo);
noBtn.addEventListener("touchstart",e=>{e.preventDefault();escapeNo()},{passive:false});
noBtn.addEventListener("click",e=>{e.preventDefault();escapeNo()});

function toggleSong(){
  if(audio.paused) audio.play(); else audio.pause();
}
audio.addEventListener("play",()=>record.classList.add("playing"));
audio.addEventListener("pause",()=>record.classList.remove("playing"));
audio.addEventListener("ended",()=>record.classList.remove("playing"));

function gift(n){
  const msgs={
    1:"A lifetime of hugs 🫂",
    2:"More memories with you 📸",
    3:"My heart — always yours ❤️"
  };
  document.getElementById("g"+n).textContent=msgs[n];
}
