export function createUI(config, onChange){

const panel=document.createElement("div");

panel.style.position="fixed";
panel.style.top="20px";
panel.style.right="20px";
panel.style.background="#fff";
panel.style.padding="15px";
panel.style.borderRadius="10px";
panel.style.boxShadow="0 0 15px rgba(0,0,0,.15)";
panel.style.zIndex="999";

panel.innerHTML=`

<label>Width</label><br>
<input id="w" type="range" min="1.5" max="4" step="0.1" value="${config.width}"><br><br>

<label>Height</label><br>
<input id="h" type="range" min="2" max="5" step="0.1" value="${config.height}"><br><br>

<label>Depth</label><br>
<input id="d" type="range" min="0.4" max="1.2" step="0.05" value="${config.depth}"><br><br>

<label>Color</label><br>
<input id="c" type="color" value="${config.bodyColor}">

`;

document.body.appendChild(panel);

["w","h","d","c"].forEach(id=>{

document.getElementById(id).addEventListener("input",()=>{

config.width=parseFloat(w.value);
config.height=parseFloat(h.value);
config.depth=parseFloat(d.value);
config.bodyColor=c.value;

onChange(config);

});

});

}