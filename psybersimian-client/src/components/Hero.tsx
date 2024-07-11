import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, StandardMaterial, Color3, PointLight } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';

export const Hero = () => {
    const onSceneReady = (scene: Scene) => {
        // This creates and positions a free camera (non-mesh)
        const camera = new FreeCamera("camera1", new Vector3(0, 5, 0), scene);

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

        // create a new mesh queue
        const spheres: Array<Mesh> = [];

        const getSphere = (scene: Scene, spheres: Array<Mesh>): Mesh => {
            return MeshBuilder.CreateSphere(
                `sphere-${spheres.length}`,
                {
                    segments: 50
                },
                scene
            );
        }

        const getSpherePromise = (scene: Scene, spheres: Array<Mesh>): Promise<Mesh> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const sphere = getSphere(scene, spheres);
                    spheres.unshift(sphere);
                    if (sphere) {
                        resolve(sphere);
                    } else {
                        reject();
                    }
                }, 1000);
            });
        }

        const positionSpherePromise = (scene: Scene, spheres: Array<Mesh>): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    setInterval(async () => {
                        const newSphere: Mesh = await getSpherePromise(scene, spheres);
                        newSphere.material = mat;
                        newSphere.position.x = Math.random() * 10;
                        newSphere.position.y = Math.random() * 10;
                        newSphere.position.z = Math.random() * 10;
                        resolve();
                    }, 5000);
                } catch (ex) {
                    reject();
                }
            })
        }

        scene.registerBeforeRender(async function() {
            if (spheres.length < 10) {
                    await positionSpherePromise(scene, spheres);
            } else {
                const lastSphere: Mesh | undefined = spheres.pop();
                if (lastSphere) {
                    scene.removeMesh(lastSphere);
                }
            }

            pl.position = camera.position;
        });
    };

    const onRender = async (scene: Scene) => {
    };

    return (
        <>
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </>
    );
}