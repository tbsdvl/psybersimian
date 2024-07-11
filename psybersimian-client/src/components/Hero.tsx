import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, StandardMaterial, Color3, PointLight } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';

class MovingSphere extends Mesh {
    public going: boolean;
    public down: boolean;

    /**
     *
     */
    constructor(name: string) {
        super(name);
        this.going = false;
        this.down = false;
    }
}

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
        const spheres: Array<MovingSphere> = [];

        const getSphere = (scene: Scene, spheres: Array<MovingSphere>): MovingSphere => {
            return MeshBuilder.CreateSphere(
                `sphere-${spheres.length}`,
                {
                    segments: 50
                },
                scene
            ) as MovingSphere;
        }

        const positionSphere = (sphere: Mesh): void => {
            sphere.material = mat;
            sphere.position.x = Math.random() * 3;
            sphere.position.y = Math.random() * 3;
            sphere.position.z = Math.random() * 3;
        }

        // add spheres to the array
        for (let i = 0; i < 50; i++) {
            const sphere = getSphere(scene, spheres);
            spheres.unshift(sphere);
            positionSphere(sphere);

            if (sphere.position.y >= 3) {
                sphere.down = true;
            } else {
                sphere.going = true;
            }
        }

        scene.registerBeforeRender(async function() {
            // randomize the position of each sphere
            if (spheres.length === 50) {
                for (let i = 0; i < spheres.length; i++) {
                    const yPosition = spheres[i].position.y;
                    if (yPosition >= 3 && spheres[i].going) {
                        spheres[i].going = false;
                        spheres[i].down = true;
                        spheres[i].position.y -= 0.01;
                        spheres[i].position.z -= 0.05;
                        spheres[i].position.x -= 0.05;
                    } else if (yPosition <= 0 && spheres[i].down) {
                        spheres[i].down = false;
                        spheres[i].going = true;
                        spheres[i].position.y += 0.01;
                        spheres[i].position.z += 0.05;
                        spheres[i].position.x += 0.05;
                    } else if (yPosition < 3 && yPosition > 0 && spheres[i].going) {
                        spheres[i].position.y += 0.01;
                        spheres[i].position.z += 0.05;
                        spheres[i].position.x += 0.05;
                    } else if (yPosition < 3 && yPosition > 0 && spheres[i].down) {
                        spheres[i].position.y -= 0.01;
                        spheres[i].position.z -= 0.05;
                        spheres[i].position.x -= 0.05;
                    }
                }
            }

            pl.position = camera.position;
        });
    };

    const onRender = async (scene: Scene) => {};

    return (
        <>
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </>
    );
}