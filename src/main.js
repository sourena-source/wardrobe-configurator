
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";
import { createCabinet } from "./objects/Cabinet";
import { createUI } from "./ui";
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3f3f3);

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// دوربین
camera.position.set(0, 1.5, 7);
camera.lookAt(0, 1, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.dampingFactor = 0.08;

controls.enablePan = true;

controls.enableZoom = true;

controls.maxDistance = 15;

controls.minDistance = 3;

controls.target.set(0,1,0);

// نور محیط
const ambient = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambient);

// نور اصلی
const light = new THREE.DirectionalLight(0xffffff, 2);

light.position.set(5, 8, 5);

light.castShadow = true;

scene.add(light);

// کف اتاق
const floor = new THREE.Mesh(

    new THREE.PlaneGeometry(30,30),

    new THREE.MeshStandardMaterial({
        color:0xe5e5e5
    })

);

floor.rotation.x = -Math.PI/2;

floor.position.y = -1.5;

floor.receiveShadow = true;

scene.add(floor);

// متریال چوب
const material = new THREE.MeshStandardMaterial({

    color:"#ce6e00",
    roughness:0.7,
    metalness:0
});
const config = {

    width:2.4,

    height:3.8,

    depth:0.8,

    bodyColor:"#d6a36d",

    shelfCount:5,

    drawerCount:4

};
// ساخت کمد
let cabinet = createCabinet(config);
scene.add(cabinet);

createUI(config,(newConfig)=>{

    scene.remove(cabinet);

    cabinet=createCabinet(newConfig);

    scene.add(cabinet);

});
// ------------------------
// Mouse Raycaster
// ------------------------

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

window.addEventListener("click", onClick);

function onClick(event){

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse,camera);

    const intersects = raycaster.intersectObjects(scene.children,true);

    if(intersects.length===0) return;

    let obj = intersects[0].object;

    while(obj){

        if(obj.name==="leftDoor" || obj.name==="rightDoor"){

            obj.userData.open=!obj.userData.open;

            break;

        }

        obj=obj.parent;

    }

}

// Resize

window.addEventListener("resize",()=>{

    camera.aspect = window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});

// Animation

function animate(){

    requestAnimationFrame(animate);

    controls.update();

    cabinet.userData.doors.children.forEach((door)=>{

        if(door.userData.animate){

            door.userData.animate();

        }

    });

    cabinet.userData.drawers.children.forEach((drawer)=>{

        if(drawer.userData.animate){

            drawer.userData.animate();

        }

    });

    renderer.render(scene,camera);

}

animate();

// این کد اجرا نمی‌شود

// cd wardrobe-pro
//cd
// npm run dev
//
//git commit -m "Update cabinet color and size"
//git commit -m "Update"
//git push