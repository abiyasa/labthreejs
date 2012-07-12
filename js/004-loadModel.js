/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global $, THREE, console, window, document, requestAnimationFrame */

$(function () {
    'use strict';
    var camera, scene, renderer, light;
    var model, shadowPlane;
    var $container;

    function init() {
        var viewportWidth = 500;
        var viewportHeight = 300;

        scene = new THREE.Scene();

        // setup camera
        camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 1, 10000);
        camera.position.z = 600;
        scene.add(camera);

        // create plane shadow
        var geometry = new THREE.PlaneGeometry(300, 300, 3, 3);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/shadow.png'),
            overdraw: true
        });
        shadowPlane = new THREE.Mesh(geometry, material);
        shadowPlane.position.y = -250;

        scene.add(shadowPlane);

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
        renderer.setSize(viewportWidth, viewportHeight);

        // show renderer
        $container = $('#viewport');
        $container.append(renderer.domElement);
    }

    // load model async
    function loadModel() {
        // TODO show loader animation
        var loader = new THREE.JSONLoader();
        loader.load({
            model: 'assets/models/eagle.js',
            callback: function (g) {
                console.log('model loaded');
                createModel(g);

                // TODO remove loader animation
            }
        });
    }

    // create model from the loaded geometry
    function createModel(geometry) {
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/cardboard-512.jpg'),
            doubleSided: false,
            color: 0xffffff
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
    loadModel();
    animate();
});