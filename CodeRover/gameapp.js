console.log("hello world test");

//prog block tools
let ghost = null;
let ghostMode = 0; //0:noghost, 1:follow cursor, 2:sticky
let tool = null;
let curBlockId = 0;
const dragTools = interact(".tool");
const progBlocks = interact(".prog_block");
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
            ghostMode = 1;
            ghost.classList.add("prog_ghost", "absolute");
            gameContainer.appendChild(ghost);
            const rect = event.target.getBoundingClientRect();
            position.x = event.clientX0;
            position.y = event.clientY0;
        },
        move (event) {
            if(event.dragEnter){
                //console.log("entered drop zone");
                ghost.classList.remove("absolute");
                ghost.style.transform = "inherit";
                //event.dragEnter.appendChild(ghost);
                ghostMode = 2;
            } else if(event.dragLeave){
                //console.log("left drop zone");
                gameContainer.appendChild(ghost);
                ghost.classList.add("absolute");
                ghostMode = 1;
            }
            if(ghostMode == 1){
                position.x += event.dx;
                position.y += event.dy;
                ghost.style.transform =
                `translate(${position.x}px, ${position.y}px)`;
            } else if(ghostMode == 2){
                
            }
        },
        end (event){
            if(ghostMode == 1){
                ghost.remove();
                ghostMode = 0;
            }
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

function dropProgBlock(event){
    if(event.relatedTarget.classList.contains("tool")){
        console.log("a tool is being dropped");
        ghost.after(createBlockFromTool());
        tool = null;
    } else{
        
    }
    ghost.remove();
    ghostMode = 0;
}

progDropZone.dropzone({
    accept: '.tool',
    ondrop: function(event){
        dropProgBlock(event);
    },
    ondragenter: function(event){
        event.target.append(ghost);
    },
    ondragleave: function(event){
        //console.log("drop zone left by drag")
    },
});

progBlocks.dropzone({
    accept: '.tool',
    ondragenter: function(event){
        event.target.before(ghost);
    },
    ondrop: function(event){
        dropProgBlock(event);
    },
});

const appContainer = document.getElementById("render_area");
const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: appContainer
});

appContainer.appendChild(app.view);
app.resize();