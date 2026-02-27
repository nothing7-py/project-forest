const slider = document.getElementById("slider");
const music = document.getElementById("music");

let current = 0;
const total = 11;

const slider = document.getElementById("slider");
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");

/* Start music on first tap */
document.body.addEventListener("click", () => {
  if (music1.paused) {
    music1.play().catch(()=>{});
  }
}, { once: true });

function updateSlide(){
  slider.style.transform = `translateX(-${current * 100}vw)`;

  if(current === 9){ // confession slide
    music1.pause();
    music2.loop = true;
    music2.play().catch(()=>{});
  }

  if(current < 9){
    music2.pause();
    music1.play().catch(()=>{});
  }
}

/* Arrow keys */
document.addEventListener("keydown",(e)=>{
  if(e.key==="ArrowRight" && current < total-1){
    current++;
    updateSlide();
  }

  if(e.key==="ArrowLeft" && current > 0){
    current--;
    updateSlide();
  }
});
