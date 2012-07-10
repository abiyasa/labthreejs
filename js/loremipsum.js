/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global $, THREE, console, window, requestAnimationFrame */

$(function () {
    'use strict';
    
    var loremipsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    // generate lorem ipsum into the body
    var $container = $('#container');    
    $container.prepend(document.createTextNode(loremipsum));
    $container.prepend('<h1>Lorem Ipsum</h1>');
    $container.append(document.createTextNode(loremipsum));
});