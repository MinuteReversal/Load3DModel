import "lib/weapp-adapter"
import "lib/xhrAdapter"
import * as THREE from "lib/three"

export default class Box {
  constructor(canvas) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(innerWidth, innerHeight);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

  }
}