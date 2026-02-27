const params=new URLSearchParams(window.location.search);
const data=JSON.parse(decodeURIComponent(atob(params.get("data"))));

const container=document.getElementById("pages");
const progress=document.getElementById("progress");
const mainMusic=document.getElementById("mainMusic");
const finalMusic=document.getElementById("finalMusic");

let current=0;
let total=11;

function build(){
  for(let i=0;i<total;i++){
    const page=document.createElement("div");
    page.className="page";

    if(data.images[i]){
      page.style.backgroundImage=`url('${data.images[i]}')`;
    }

    const content=document.createElement("div");
    content.className="content";

    if(i===0){
      content.innerHTML=`Welcome ${data.receiver} 🌿`;
    }
    else if(i===10){
      content.innerHTML=`
        Will you be mine? 💚<br>
        <button id="yesBtn">Yes</button>
        <button id="noBtn">No</button>
      `;
    }
    else{
      content.innerHTML=`${data.message}`;
    }

    page.appendChild(content);
    container.appendChild(page);
  }
}
build();

let startX=0;
document.addEventListener("touchstart",e=>startX=e.touches[0].clientX);
document.addEventListener("touchend",e=>{
  if(startX-e.changedTouches[0].clientX>50) next();
  if(e.changedTouches[0].clientX-startX>50) prev();
});

function next(){ if(current<total-1){current++;update();}}
function prev(){ if(current>0){current--;update();}}

function update(){
  container.style.transform=`translateX(-${current*100}%)`;
  progress.style.width=`${((current+1)/total)*100}%`;

  if(current===10){
    mainMusic.pause();
    finalMusic.play();
  }
}

document.body.addEventListener("click",()=>{
  mainMusic.play();
},{once:true});

document.addEventListener("click",function(e){

  if(e.target.id==="noBtn"){
    e.target.style.position="absolute";
    e.target.style.left=Math.random()*300+"px";
    e.target.style.top=Math.random()*300+"px";
  }

  if(e.target.id==="yesBtn"){
    e.target.style.transform="scale(1.5)";
    launchConfetti();
    setTimeout(triggerFinal,1500);
  }
});

function triggerFinal(){
  document.body.innerHTML=`
    <div style="text-align:center;padding:80px;">
      <h1>You chose us 🌿✨</h1>
      <p>${data.message}</p>
      <button onclick="generateCertificate()">Download Certificate</button>
      <br><br>
      <a href="mailto:${data.email}?subject=I Said YES 💚&body=I choose us forever 🌿">
        Send My Answer 💌
      </a>
    </div>
  `;
}

function launchConfetti(){
  const canvas=document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const ctx=canvas.getContext("2d");
  let pieces=[];
  for(let i=0;i<120;i++){
    pieces.push({x:Math.random()*canvas.width,y:0,size:5+Math.random()*5});
  }
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      ctx.fillStyle="green";
      ctx.fillRect(p.x,p.y,p.size,p.size);
      p.y+=5;
    });
    requestAnimationFrame(animate);
  }
  animate();
}
