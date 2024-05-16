//let ball
let scene, x, y, z, px, py, pz, rigPos, cameraPos;
let player;
let chunks = [];
const terrainSize = 500;
const chunksSize = 11;
class pos {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}
function start() {
  chunks
  scene = document.querySelector('a-scene');
  //scene = $('a-scene')[0];
  ball = $('.ball');
  terrain = $('.terrain1');
  plane = $('.plane');
  console.log("Starting Scene");
  addBall();
  //addTerrain(5, 5);
  //addTerrain(500, 0);
  //---Generate the 2D array for chunks---
  for (let i = 0; i < chunksSize; i++) {
    chunks[i] = [];
    for (let j = 0; j < chunksSize; j++) {
        chunks[i][j] = false;
    }
  }
  //chunks[5][5] = true; // set middle to true
  console.log(chunks);
}
AFRAME.registerComponent("start-game", {
  init: start,
  tick: updateTerrain
})

function addBall(){
  console.log('Adding Ball')
  let newBall = ball.clone();
  newBall.attr('visible', true);
  newBall.attr('class', 'ball');
  newBall.attr('dynamic-body', 'mass: 10');
  $(scene).append(newBall);
}

function addTerrain(x, z){
  //console.log(`Adding Terrain at X:${x} Z:${z}`);
  x = (x - 5)*terrainSize;
  z = (z - 5)*terrainSize;
  newTerrain = terrain.clone();
  newTerrain.attr('visible', true);
  newTerrain.attr('position', `${x + (terrainSize/2)} 0 ${z + (terrainSize/2)}`);
  $(scene).append(newTerrain);
  //console.log('Added Terrain');
}
function addPlane(x, z) {
  console.log(`Adding Terrain at X:${x} Z:${z}`);
  newPlane = $('.plane').clone();
  newPlane.attr('position', `${x} 0 ${z}`);
  $(scene).append(newPlane);
  console.log('Added Plane');
}
function updateTerrain() {
  playerPos = getPlayerPos();
  const px = parseInt((playerPos.x) / terrainSize);
  const pz = parseInt((playerPos.z) / terrainSize);
  const rowSize = 11;
  const colSize = 11;
  const startX = -5;
  const startZ = -5;
  let arrX = px + 5;
  let arrZ = pz + 5;
  for (tx = -1; tx < 2; tx++) {
    for (tz = -1; tz < 2; tz++) {
      vArrX = arrX + tx;
      vArrZ = arrZ + tz;
      console.log(`vArrX: ${vArrX} vArrZ: ${vArrZ}`);
      if (vArrX < 0 || vArrZ < 0 || vArrX > chunksSize || vArrZ > chunksSize) break; // if the index is out of range, break the loop
      if (chunks[vArrX][vArrZ] == false) { // add the chunk, if it is false in the array
        addTerrain(vArrX, vArrZ);
        chunks[vArrX][vArrZ] = true;
        console.log(chunks);
      }
    }
  }
  
  
  
  console.log(`updateTerain: X: ${px} Z: ${pz}`);
  //addPlane((x*500), (z*500));
}

function getPlayerPos() {
  cameraPos = $('.camera').attr('position');
  rigPos = $('.rig').attr('position');
  //console.log(cameraPos);
  //console.log(rigPos);
  px = cameraPos.x;
  py = rigPos.y;
  pz = cameraPos.z;
  console.log(`getPlayerPos: X: ${px} Y: ${py} Z: ${pz}`);
  let playerPos = new pos(px, py, pz);
  return playerPos;
}
