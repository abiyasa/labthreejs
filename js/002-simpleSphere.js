/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global $, THREE, console, window, requestAnimationFrame */

$(function () {
    'use strict';
    var camera, scene, renderer, geometry, material, mesh, light;

    function init() {
        var viewportWidth = 200;
        var viewportHeight = 200;

        scene = new THREE.Scene();

        // setup camera
        camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 1, 10000);
        camera.position.z = 600;
        scene.add(camera);

        // create sphere & material
        geometry = new THREE.SphereGeometry(200, 16, 16);
        material = new THREE.MeshLambertMaterial({
            color: 0x009ee1,
            emissive: 0x009ee1,
            ambient: 0x009ee1,
            wireframe: false
        });

        // create mesh
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // create lights
        light = new THREE.PointLight(0xFFFFFF);
        light.position.x = 0;
        light.position.y = 100;
        light.position.z = 300;
        scene.add(light);
        
        // prepare renderer
        //renderer = new THREE.CanvasRenderer();
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(viewportWidth, viewportHeight);

        // show renderer
        var $container = $('#viewport');
        $container.append(renderer.domElement);
    }

    function render() {
        // rotate mesh
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);
    }

    function animate() {
        window.requestAnimationFrame(animate);
        render();
    }

    init();
    animate();
});