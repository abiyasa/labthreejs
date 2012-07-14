# How to build the model

* The original model is the MQO ([Metasequoia](http://www.metaseq.net/english/index.html)). The model has 3 parts, each part has its own UV and material.
* I exported the model to OBJ with settings:
    * Grouping: ON
    * Normal Vector: ON
    * UV Mapping & Invert V: ON
    * Material Library: ON
    * Return code: UNIX
    * Axis: 3D Atelier (or VRML, or other axis as long as it's [right-handed system](http://msdn.microsoft.com/en-us/library/windows/desktop/bb204853))
* I splitted the OBJ into several OBJs by material, using the script split_obj which comes with Three.js (on folder `utils/exportes/obj`).
* Use the command line `python split_obj.py -i milch.obj -o milch_part`. The script generated the several OBJs.
* Convert each generated OBJ to JS using `python convert_obj_three.py -i milch_part_000.obj -o milch_part_000.js`

