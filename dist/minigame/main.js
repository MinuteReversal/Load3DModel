import "lib/weapp-adapter"
import "lib/xhrAdapter"
import * as THREE from "lib/three"
import TouchListener from "lib/touchListener"
import * as MTLLoader from "lib/loaders/MTLLoader"
import * as OBJLoader from "lib/loaders/OBJLoader"


export default class Main {
  constructor(canvas) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(innerWidth, innerHeight);

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);

    camera.position.z = 8;


    var Cocacola = null;//global model
    var isAutoRotation = true;
    var touches = new TouchListener(canvas);
    var touchStart = { x: 0, y: 0 };
    var touchRotation = { x: 0, y: 0, z: 0 };

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('http://localhost:60335/load3DModel/src/models/');
    mtlLoader.load('Cocacola.mtl', function (materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('http://localhost:60335/load3DModel/src/models/');
      objLoader.load('Cocacola.obj', function (object) {
        Cocacola = object;
        scene.add(object);
      }, function (xhr) { }, function (xhr) { });
    });

    var animate = function () {
      requestAnimationFrame(animate);

      if (touches.list.length) {
        isAutoRotation = false;
        var current = touches.list[0];
        Cocacola.rotation.x = touchRotation.x + (current.y - touchStart.y) * 0.03;
        Cocacola.rotation.y = touchRotation.y + (current.x - touchStart.x) * 0.03;
      }

      if (Cocacola && isAutoRotation) {
        Cocacola.rotation.x += 0.01;
        Cocacola.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    canvas.addEventListener("touchstart", function (evt) {
      var p = evt.changedTouches[0];
      touchStart.x = p.clientX;
      touchStart.y = p.clientY;
      if (Cocacola) {
        touchRotation.x = Cocacola.rotation.x;
        touchRotation.y = Cocacola.rotation.y;
        touchRotation.z = Cocacola.rotation.z;
      }
    });
  }
}