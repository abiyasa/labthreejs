/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global $, THREE, console, window, document, requestAnimationFrame */

$(function () {
    'use strict';
    var camera, scene, renderer, light;
    var earthMesh, shadowPlane;
    var pivotX, pivotY, cameraTargetPos;

    function init() {
        var viewportWidth = 500;
        var viewportHeight = 300;

        scene = new THREE.Scene();

        // setup camera
        camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 1, 10000);
        camera.position.z = 600;
        scene.add(camera);

        // create earth
        var geometry = new THREE.SphereGeometry(200, 16, 16);
        geometry.computeVertexNormals();
        //var material = new THREE.MeshLambertMaterial({
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/land_ocean_ice_cloud_2048.jpg'),
            doubleSided: false,
            color: 0xffffff
        });
        earthMesh = new THREE.Mesh(geometry, material);
        scene.add(earthMesh);

        // create plane shadow
        geometry = new THREE.PlaneGeometry(300, 300, 3, 3);
        material = new THREE.MeshBasicMaterial({
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
        var $container = $('#viewport');
        $container.append(renderer.domElement);

        // handle mouse
        var offset = $container.offset();
        pivotX = offset.left + (viewportWidth * 0.5);
        pivotY = offset.top + (viewportHeight * 0.5);
        cameraTargetPos = new THREE.Vector3(1, 0, 0);
        $container.mousemove(onMouseMove);
    }

    // change camera target when moving
    function onMouseMove(event) {
        cameraTargetPos.x = pivotX - event.pageX;
        cameraTargetPos.y = event.pageY - pivotY;
    }

    function render() {
        // update camera based on position
        camera.lookAt(cameraTargetPos);

        // rotate mesh
        earthMesh.rotation.y += 0.02;

        renderer.render(scene, camera);
    }

    function animate() {
        window.requestAnimationFrame(animate);
        render();
    }

    init();
    animate();
});