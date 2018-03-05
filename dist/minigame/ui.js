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
    var me = this;
    var ctx = canvas.getContext("2d");
    var canvas3d = wx.createCanvas();
    canvas3d.width = innerWidth;
    canvas3d.height = innerHeight;
    me.init3d(canvas3d);

    var canvas2d = wx.createCanvas();
    canvas2d.width = innerWidth;
    canvas2d.height = innerHeight;
    me.init2d(canvas2d);


    var timer = null;
    me.touches = new TouchListener(canvas);
    me.touchStart = { x: 0, y: 0 };
    me.touchRotation = { x: 0, y: 0, z: 0 };
    me.isAutoRotation = true;

    var frame = function () {
      requestAnimationFrame(frame);
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      me.update3d();
      ctx.drawImage(canvas3d, 0, 0);
      me.update2d();
      ctx.drawImage(canvas2d, 0, 0);
    };
    frame();

    canvas.addEventListener("touchstart", (evt) => {
      var p = evt.changedTouches[0];
      me.touchStart.x = p.clientX;
      me.touchStart.y = p.clientY;
      if (me.Cocacola) {
        me.touchRotation.x = me.Cocacola.rotation.x;
        me.touchRotation.y = me.Cocacola.rotation.y;
        me.touchRotation.z = me.Cocacola.rotation.z;
      }
    });

    canvas.addEventListener("touchend", (evt) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () { me.isAutoRotation = true; }, 2000);
    });
  }
  init3d(canvas) {
    var me = this;
    var scene = me.scene = new THREE.Scene();
    var camera = me.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    var renderer = me.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(innerWidth, innerHeight);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.y = 10;
    camera.add(pointLight);
    scene.add(camera);

    camera.position.z = 8;

    me.Cocacola = null;//global model
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('models/');
    mtlLoader.load('Cocacola.mtl', function (materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('models/');
      objLoader.load('Cocacola.obj', function (obj) {
        me.Cocacola = obj;
        scene.add(obj);
      }, function (xhr) { }, function (xhr) { });
    });
  }
  update3d() {
    var me = this;
    if (me.touches.list.length) {
      me.isAutoRotation = false;
      var current = me.touches.list[0];
      me.Cocacola.rotation.x = me.touchRotation.x + (current.y - me.touchStart.y) * 0.03;
      me.Cocacola.rotation.y = me.touchRotation.y + (current.x - me.touchStart.x) * 0.03;
    }

    if (me.Cocacola && me.isAutoRotation) {
      me.Cocacola.rotation.x += 0.01;
      me.Cocacola.rotation.y += 0.01;
    }
    me.renderer.render(me.scene, me.camera);
  }
  init2d(canvas) {
    var me = this;
    me.ctx2d = canvas.getContext("2d");
  }
  update2d() {
    var me = this;
    var fontSize = 12;
    var ctx = me.ctx2d;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.font = "".concat(fontSize, "px arial");
    ctx.save();
    //ctx.fillStyle = "rgba(255,255,0,0.7)";
    ctx.fillStyle = "red";
    ctx.fillText("now:".concat(Date.now()), 0, fontSize);
    if (me.Cocacola) {
      ctx.fillText("rotation.x:".concat(me.Cocacola.rotation.x), 0, fontSize * 2);
      ctx.fillText("rotation.y:".concat(me.Cocacola.rotation.y), 0, fontSize * 3);
      ctx.fillText("rotation.z:".concat(me.Cocacola.rotation.z), 0, fontSize * 4);
    }
    ctx.restore();
  }
}