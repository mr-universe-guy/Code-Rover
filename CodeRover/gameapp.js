console.log("hello world test");

function makeBlockElement(type, arg){
    const element = document.createElement("div");
}

//prog block tools
let ghost = null;
let tool = null;
let curBlockId = 0;
const dragTools = interact(".tool");
const progDropZone = interact(".program_area");
const toolArea = document.getElementById("tool_area");
const progArea = document.getElementById("program_area");
const position = {x:0, y:0}
const gameContainer = document.getElementById("game_container");

const tools = [
    {type:"movement", name:"right"},
    {type:"movement", name:"left"}
];

function getNewProgBlockId(){
    curBlockId += 1;
    return curBlockId;
}
//create tools
for(let t of tools){
    console.log(t.type+":"+t.name);
    const el = document.createElement("div");
    //keep style identical to prog blocks
    el.className = 'prog_block tool '+t.type;
    el.id = 'tool-'+t.type+'-'+t.name;
    el.innerHTML = t.name;
    toolArea.appendChild(el);
}

//spawn new prog blocks from available tools
dragTools.draggable({
    listeners: {
    start (event) {
      //console.log(event.type, event.target);
        //clone target and begin dragging clone
        tool = event.target;
        ghost = event.target.cloneNode(true);
        ghost.classList.add("prog_ghost");
        gameContainer.appendChild(ghost);
        const rect = event.target.getBoundingClientRect();
        position.x = event.clientX0;
        position.y = event.clientY0;
    },
    move (event) {
      position.x += event.dx;
      position.y += event.dy;

      ghost.style.transform =
        `translate(${position.x}px, ${position.y}px)`;
    },end(event){
        ghost.remove();
    }
  }
});

function createBlockFromTool(){
    const newProgBlock = tool.cloneNode(true);
    const toolParams = tool.id.split('-');
    newProgBlock.id = "progblock-"+toolParams[1]+"-"+toolParams[2];
    newProgBlock.classList.remove("tool");
    return newProgBlock;
}

progDropZone.dropzone({
    accept: '.tool',
    ondrop: function(event){
        console.log("drop recieved :"+event);
        if(event.relatedTarget.classList.contains("tool")){
            console.log("a tool is being dropped");
            const newProgBlock = createBlockFromTool();
            event.target.appendChild(newProgBlock);
            tool = null;
        } else{
            
        }
    },
});

const appContainer = document.getElementById("render_area");
const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: appContainer
});

appContainer.appendChild(app.view);
app.resize();