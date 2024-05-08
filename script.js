let scene = document.querySelector('a-scene');
let mySphere = document.createElement('a-sphere');
function start() {
  scene = $('a-scene')[0];
  console.log("Starting Scene");
  addSphere();
}
AFRAME.registerComponent("start-game", {
  init: start
})
function addSphere() {
  scene.appendChild(mySphere);
  console.log(`appended: ${mySphere}`)
}
