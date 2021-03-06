//this handles the animation for the login page
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

import { FresnelShader } from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/shaders/FresnelShader.js';

let container;

let camera, scene, renderer;

const spheres = [];

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {

//   container = document.getElementById("container")

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
  camera.position.z = 3200;

  //

  const path = "./assets/";
  const format = '.jpg';
  const urls = [
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
  ];

  const textureCube = new THREE.CubeTextureLoader().load( urls );

  scene = new THREE.Scene();
  scene.background = textureCube;

  //

  const geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );

  const shader = FresnelShader;
  const uniforms = THREE.UniformsUtils.clone( shader.uniforms );

  uniforms[ "tCube" ].value = textureCube;

  const material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  } );

  for ( let i = 0; i < 500; i ++ ) {

    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = Math.random() * 10000 - 5000;
    mesh.position.y = Math.random() * 10000 - 5000;
    mesh.position.z = Math.random() * 10000 - 5000;

    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

    scene.add( mesh );

    spheres.push( mesh );

  }

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.prepend( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) * 10;
  mouseY = ( event.clientY - windowHalfY ) * 10;

}

//

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  const timer = 0.0001 * Date.now();

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;

  camera.lookAt( scene.position );

  for ( let i = 0, il = spheres.length; i < il; i ++ ) {

    const sphere = spheres[ i ];

    sphere.position.x = 5000 * Math.cos( timer + i );
    sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

  }

  renderer.render( scene, camera );

}