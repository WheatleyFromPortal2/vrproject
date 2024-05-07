let scene = document.querySelector('a-scene');
function start() {
 scene = $('a-scene')[0];
 console.log("Starting Scene");
}
AFRAME.registerComponent("start-game", {
  init: start
})
