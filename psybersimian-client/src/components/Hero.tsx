import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, StandardMaterial, Color3, PointLight } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';

export const Hero = () => {
    let ribbon: Mesh;

    const onSceneReady = (scene: Scene) => {
        // This creates and positions a free camera (non-mesh)
        const camera = new FreeCamera("camera1", new Vector3(0, 3, 0), scene);

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

        const updateSegments = (segements: number) => {
            return Math.round(Math.random() * segements);
        }

        // sphere creation
        var mesh = MeshBuilder.CreateSphere('sphere', {
            segments: 5
        }, scene);
        mesh.material = mat;


        // morphing
        var k = 5;
        scene.registerBeforeRender(function() {
            // sphere update
            mesh = MeshBuilder.CreateSphere('sphere', {
                segments: updateSegments(k)
            });

            if (k >= 5) {
                k -= 0.5;
            } else if (k < 50 && k > 0){
                k -= 0.5;
            } else if (k <= 0) {
                k = 5;
            }

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