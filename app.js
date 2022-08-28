import { Vector3, Color} from 'three';
import { CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';
import { IfcViewerAPI, NavigationModes} from 'web-ifc-viewer';
import * as THREE from 'three'



let socket;
let clients = {};
let pointers = {};

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({
    container,
    backgroundColor: new Color(0xffffff),
    
    
});
viewer.grid.setGrid();
viewer.axes.setAxes();
viewer.context.ifcCamera.cameraControls.setPosition(12, 1.5, 10);


async function loadIfc(url) {
    await viewer.IFC.setWasmPath("./");
    const model = await viewer.IFC.loadIfcUrl(url);
    viewer.shadowDropper.renderShadow(model.modelID);
    viewer.context.getIfcCamera().setNavigationMode(NavigationModes.FirstPerson);
}






loadIfc('./static/05.ifc');



function connectToSocket() {
    const initials = document.getElementById("initials-name").value;
    console.log(initials)

    if (initials) {
        const connectButton = document.getElementById("socket-Connect-Button");
        connectButton.innerHTML = "Connected!";
        connectButton.disabled = true;

        socket = io();
        console.log(initials + ":Connecting to socket");
        socket.emit('username', initials);

        socket.on('camera_move', function (data) {
            if (!clients.hasOwnProperty(data.id)) {
                const labelDiv = document.createElement('div');
                labelDiv.className = 'label';
                labelDiv.textContent = data.initials;
                labelDiv.style.marginTop = '-1em';
                pointers[data.id] = new CSS2DObject(labelDiv);
                pointers[data.id].position.set(data.x, data.y, data.z);
                viewer.context.scene.add(pointers[data.id]);
                pointers[data.id].layers.set(0);
            }

            pointers[data.id].position.set(data.x, data.y, data.z);

            clients[data.id] = data;
        });


        viewer.context.ifcCamera.cameraControls.addEventListener('update', e => {
            const mousePos = {
                "initials": initials,
                "id": "",
                "x": viewer.context.getCamera().position.x,
                "y": viewer.context.getCamera().position.y,
                "z": viewer.context.getCamera().position.z
            }
            socket.emit('camera_move', mousePos);
        })

        
    }
}

window.ondblclick = () => {
    viewer.IFC.selector.pickIfcItem(true);
    console.log("dblclick from pickIfc")
}

window.onclick = (e) => {
    if(e.code === 'KeyG'){
        viewer.IFC.selector.pickIfcItem(true);
        console.log("click from pickIfc") 
    }
}
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();


viewer.dimensions.active = true;
viewer.dimensions.previewActive = true;
window.ondblclick= (e) => {
    viewer.dimensions.create();
}
window.onkeydown= (e) => {
    if(e.code === 'Delete'){
        viewer.dimensions.delete();
    }
}

viewer.clipper.active = true;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const onKeyDown = (e) => {
  switch (e.code) {
    case "KeyW":
      moveForward = true;
      console.log(moveForward)
      break;
    case "KeyS":
      moveBackward = true;
      break;
    case "KeyA":
      moveLeft = true;
      break;
    case "KeyD":
      moveRight = true;
      break;
  }
};

const onKeyUp = (e) => {
  switch (e.code) {
    case "KeyW":
      moveForward = false;
      console.log(moveForward)
      break;
    case "KeyS":
      moveBackward = false;
      break;
    case "KeyA":
      moveLeft = false;
      break;
    case "KeyD":
      moveRight = false;
      break;
    case "KeyQ":
        viewer.context.ifcCamera.cameraControls.truck(0, -3.6, true);
      break;
    case "KeyE":
        viewer.context.ifcCamera.cameraControls.truck(0, 3.6, true);
      break;
  }   
};


document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);




window.onkeydown = (event) => {
    if (event.code === 'KeyP') {
        viewer.clipper.createPlane();
    } else if (event.code === 'KeyO') {
        viewer.clipper.deletePlane();
    }
    // event code for 'esc' key
    else if (event.code === 'Escape') {
        viewer.clipper.deletePlane();
        viewer.dimensions.delete();
        viewer.IFC.selector.unHighlightIfcItems();
    }
}

window.addEventListener("contextmenu" , async () => {
    const result = await viewer.IFC.selector.highlightIfcItem();
    if (!result) return;
    const { modelID, id } = result;
    const props = await viewer.IFC.getProperties(modelID, id, true, false);
    createPropertiesMenu(props);
});



// window.onauxclick = 

const propsGUI = document.getElementById("ifc-property-menu-root");

function createPropertiesMenu(properties) {
    console.log(properties);

    removeAllChildren(propsGUI);

    const psets = properties.psets;
    const mats = properties.mats;
    const type = properties.type;

    delete properties.psets;
    delete properties.mats;
    delete properties.type;


    for (let key in properties) {
        createPropertyEntry(key, properties[key]);
    }

}

function createPropertyEntry(key, value) {
    const propContainer = document.createElement("div");
    propContainer.classList.add("ifc-property-item");

    if(value === null || value === undefined) value = "undefined";
    else if(value.value) value = value.value;

    const keyElement = document.createElement("div");
    keyElement.textContent = key;
    propContainer.appendChild(keyElement);

    const valueElement = document.createElement("div");
    valueElement.classList.add("ifc-property-value");
    valueElement.textContent = value;
    propContainer.appendChild(valueElement);

    propsGUI.appendChild(propContainer);
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}



window.connectToSocket = connectToSocket;


let prevTime = performance.now();
function animate() {
    requestAnimationFrame(animate);
    const time = performance.now();
  
    
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    
    const delta = (time - prevTime) / 1000;

    
    velocity.z -= velocity.z * 0.5 * delta;
    velocity.x -= velocity.x * 0.5 * delta;

    if (moveForward || moveBackward) {
      velocity.z -= direction.z * 10 * delta;
    }

    if (moveRight || moveLeft) {
      velocity.x -= direction.x * 10 * delta;
    }
  
  
    viewer.context.getIfcCamera().cameraControls.forward(-velocity.z * delta);
    prevTime = time;

}
  
animate();
