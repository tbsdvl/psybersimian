import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, StandardMaterial, Color3, PointLight } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';

export const Hero = () => {
    let ribbon: Mesh;

    const onSceneReady = (scene: Scene) => {
        // This creates and positions a free camera (non-mesh)
        const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        const canvas = scene.getEngine().getRenderingCanvas();

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        var pl = new PointLight("pl", new Vector3(0, 0, 0), scene);
        pl.diffuse = new Color3(1, 1, 1);
        pl.specular = new Color3(1, 0, 0);
        pl.intensity = 0.95;
        var mat = new StandardMaterial("mat1", scene);
        mat.alpha = 1.0;
        mat.diffuseColor = new Color3(0.5, 0.5, 1.0);
        mat.backFaceCulling = false;

        // path function
        var pathFunction = function(k: number): Array<Vector3> {
            var path = [];
            for (var i = 0; i < 60; i++) {
            var x =  i - 30;
            var y = 0;
            var z = k;
            path.push(new Vector3(x, y, z));
            }
            return path;
        };

        // update path function
        var updatePath = function(path: Array<Vector3>, k: number) {
            for (var i = 0; i < path.length; i++) {
            var x = path[i].x;
            var z = path[i].z;
            var y = 20 * Math.sin(i/ 10) * Math.sin(k + z / 40);
            path[i].x = x;
            path[i].y = y;
            path[i].z = z;
            }
        };

        // ribbon creation
        var sideO = Mesh.BACKSIDE;
        var pathArray: Array<Array<Vector3>> = [];
        for(var i = -20; i < 20; i++) {
            pathArray.push(pathFunction(i * 2));
        }
        var mesh = Mesh.CreateRibbon("ribbon", pathArray, false, false, 0, scene, true, sideO);
        mesh.material = mat;


        // morphing
        var k = 0;
        scene.registerBeforeRender(function() {
            // update pathArray
            for(var p = 0; p < pathArray.length; p++) {
                updatePath(pathArray[p], k);
            }
            // ribbon update
            mesh = Mesh.CreateRibbon('', pathArray, false, false, 0, undefined, false, 0, mesh);
            k += 0.05;
            pl.position = camera.position;
        });
    };

    /**
     * Will run on every frame render.  We are spinning the box on y-axis.
     */
    const onRender = (scene: Scene) => {
        if (ribbon !== undefined) {
            // const deltaTimeInMillis = scene.getEngine().getDeltaTime();
            // const rpm = 10;
            // // ribbon.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        }
    };

    return (
        <>
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </>
    );
}