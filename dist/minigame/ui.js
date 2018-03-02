import "lib/weapp-adapter"
import "lib/xhrAdapter"
import * as THREE from "lib/three"
import FileLoader from "lib/loaders/FileLoader"
import ImageLoader from "lib/loaders/ImageLoader"
import * as MTLLoader from "lib/loaders/MTLLoader"
import * as OBJLoader from "lib/loaders/OBJLoader"
import TouchListener from "lib/touchListener"
THREE.FileLoader = FileLoader;
THREE.ImageLoader = ImageLoader;

export default class UI {
  constructor(canvas) {
    this.render3d(canvas);
  }
  render3d(canvas) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(innerWidth, innerHeight);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.y = 10;
    camera.add(pointLight);
    scene.add(camera);

    // load a texture, set wrap mode to repeat
    var texture = new THREE.CanvasTexture(this.get2dImage(), THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);

    camera.position.z = 8;

    var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ transparent: true, map: texture, side: THREE.FrontSide });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.z = 5;
    scene.add(plane);



    var Cocacola = null;//global model
    var isAutoRotation = true;
    var timer = null;
    var touches = new TouchListener(renderer.domElement);
    var touchStart = { x: 0, y: 0 };
    var touchRotation = { x: 0, y: 0, z: 0 };

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('models/');
    mtlLoader.load('Cocacola.mtl', function (materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('models/');
      objLoader.load('Cocacola.obj', function (obj) {
        Cocacola = obj;
        scene.add(obj);
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

    canvas.addEventListener("touchstart", (evt) => {
      var p = evt.changedTouches[0];
      touchStart.x = p.clientX;
      touchStart.y = p.clientY;
      if (Cocacola) {
        touchRotation.x = Cocacola.rotation.x;
        touchRotation.y = Cocacola.rotation.y;
        touchRotation.z = Cocacola.rotation.z;
      }
    });

    canvas.addEventListener("touchend", (evt) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () { isAutoRotation = true; }, 2000);
    });
  }
  render2d(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "color:red;";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.onload = (evt) => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = this.get2dImage();
  }
  get2dImage() {
    var canvas = wx.createCanvas();
    canvas.width = 512;
    canvas.height = 512;
    var ctx = canvas.getContext("2d");
    ctx.font = "32px arial";
    ctx.save();
    ctx.fillStyle = "rgba(255,255,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillText("hello", 0, 32);
    ctx.restore();
    //return canvas.toDataURL();
    return canvas;
  }
}