const stageTitles=[
"How We Met",
"Our First Conversation",
"The Little Moments",
"The Ups and Downs",
"Why I Feel This",
"The Day I Knew",
"Your Smile",
"The Future I See",
"My Promise",
"Will You Be Mine Forever?"
];

if(document.getElementById("stages")){
  const container=document.getElementById("stages");

  for(let i=0;i<10;i++){
    container.innerHTML+=`
      <h3>${stageTitles[i]}</h3>
      <textarea id="content${i+1}" placeholder="Write your feelings..."></textarea>
      <input id="song${i+1}" placeholder="Song URL for this page"><br>
    `;
  }
}

function createStory(){
  const story={
    stages:[]
  };

  for(let i=1;i<=10;i++){
    story.stages.push({
      content:document.getElementById(`content${i}`).value,
      song:document.getElementById(`song${i}`).value
    });
  }

  const encoded=btoa(JSON.stringify(story));
  window.location=`story.html?data=${encoded}&stage=1`;
}

if(window.location.pathname.includes("story.html")){
  const params=new URLSearchParams(window.location.search);
  const encoded=params.get("data");
  let stage=parseInt(params.get("stage"));
  const story=JSON.parse(atob(encoded));

  loadStage();

  function typeWriter(text, element){
    let i=0;
    element.innerHTML="";
    const interval=setInterval(()=>{
      if(i<text.length){
        element.innerHTML+=text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    },40);
  }

  function loadStage(){
    document.body.classList.remove("fade-out");

    document.getElementById("title").innerText=stageTitles[stage-1];

    const contentEl=document.getElementById("content");
    typeWriter(story.stages[stage-1].content, contentEl);

    document.getElementById("music").src=story.stages[stage-1].song;

    applyAnimation(stage);

    if(stage!==10)
      document.getElementById("acceptBtn").style.display="none";
  }

  window.nextStage=function(){
    if(stage<10){
      document.body.classList.add("fade-out");
      setTimeout(()=>{
        window.location=`story.html?data=${encoded}&stage=${stage+1}`;
      },1000);
    }
  }

  window.acceptProposal=function(){
    alert("Forever Begins ❤️");
  }
}
