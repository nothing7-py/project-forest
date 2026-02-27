const slider = document.getElementById("slider");
const music = document.getElementById("music");

let current = 0;
const total = 11;

document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once:true });

document.addEventListener("click", (e) => {

  if(e.target.id === "yes"){
    alert("You chose us 🌿💚");
  }

  if(e.target.id === "no"){
    e.target.style.position="absolute";
    e.target.style.left=Math.random()*300+"px";
    e.target.style.top=Math.random()*300+"px";
  }

});

document.addEventListener("keydown", (e)=>{
  if(e.key === "ArrowRight"){
    if(current < total-1){
      current++;
      slider.style.transform = `translateX(-${current*100}%)`;
    }
  }
});
