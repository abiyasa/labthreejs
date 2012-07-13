/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global $, THREE, console, window, document, requestAnimationFrame */

$(function () {
    'use strict';
    var scene, camera, renderer;
    var light;
    var model;
    var $container;

    var VIEWPORT_WIDTH = 500;
    var VIEWPORT_HEIGHT = 300;

    // init everything
    function init() {
        // create scene
        scene = new THREE.Scene();

        // setup camera
        camera = new THREE.PerspectiveCamera(75, VIEWPORT_WIDTH / VIEWPORT_HEIGHT, 1, 10000);
        camera.position.z = 600;
        scene.add(camera);

        // create lights
        light = new THREE.PointLight(0xFFFFFF);
        light.position.x = 0;
        light.position.y = 100;
        light.position.z = 300;
        scene.add(light);

        // prepare renderer
        var useCanvas = true;
        if (useCanvas) {
            renderer = new THREE.CanvasRenderer();
        } else {
            renderer = new THREE.WebGLRenderer();
        }
        renderer.setSize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

        // show renderer
        $container = $('#viewport');
        $container.append(renderer.domElement);

        initModels();
    }

    // load and init models
    function initModels() {
        // create plane shadow
        var geometry = new THREE.PlaneGeometry(300, 300, 3, 3);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/shadow.png'),
            overdraw: true
        });
        var shadowPlane = new THREE.Mesh(geometry, material);
        shadowPlane.position.y = -250;
        scene.add(shadowPlane);

        // load sphere
        geometry = new THREE.SphereGeometry(200, 16, 16);
        material = new THREE.MeshLambertMaterial({
            color: 0x009ee1,
            emissive: 0x009ee1,
            ambient: 0x009ee1,
            wireframe: false
        });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
    }

    // animate the model
    function updateModel() {
        if (model) {
            model.rotation.y += 0.02;
        }
    }

    // render model and scene
    function render() {
        updateModel();
        renderer.render(scene, camera);
    }

    function animate() {
        window.requestAnimationFrame(animate);
        render();
    }

    init();
    animate();
});