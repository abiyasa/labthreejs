/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global $, THREE, console, window, requestAnimationFrame */

$(function () {
    'use strict';
    var camera, scene, renderer, geometry, material, mesh;

    function init() {
        var viewportWidth = 200;
        var viewportHeight = 200;

        scene = new THREE.Scene();

        // setup camera
        camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 1, 10000);
        camera.position.z = 1000;
        scene.add(camera);

        // create cube geometry
        geometry = new THREE.CubeGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

        // create mesh
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

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