import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, StandardMaterial, Color3, PointLight } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';

class MovingSphere extends Mesh {
    public going: boolean;
    public down: boolean;
    public scaleUp: boolean;
    public scaleDown: boolean;

    /**
     *
     */
    constructor(name: string) {
        super(name);
        this.going = false;
        this.down = false;
        this.scaleUp = false;
        this.scaleDown = false;
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

        // create a new mesh queue
        const spheres: Array<MovingSphere> = [];

        const getSphere = (scene: Scene, spheres: Array<MovingSphere>): MovingSphere => {
            return MeshBuilder.CreateSphere(
                `sphere-${spheres.length}`,
                {
                    segments: 50,
                    updatable: true
                },
                scene
            ) as MovingSphere;
        }

        const positionSphere = (sphere: Mesh): void => {
            var mat = new StandardMaterial("mat1", scene);
            mat.alpha = 0.75;
            mat.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
            mat.specularColor = new Color3(Math.random(), Math.random(), Math.random());
            mat.emissiveColor = new Color3(Math.random(), Math.random(), Math.random());
            mat.backFaceCulling = false;
            sphere.material = mat;
            sphere.position.x = Math.random() * 3;
            sphere.position.y = Math.random() * 3;
            sphere.position.z = Math.random() * 3;
        }

        // add spheres to the array
        for (let i = 0; i < 10; i++) {
            const sphere = getSphere(scene, spheres);
            spheres.unshift(sphere);
            positionSphere(sphere);

            if (sphere.position.y >= 3) {
                sphere.down = true;
            } else {
                sphere.going = true;
            }

            sphere.scaling.y = Math.random() * 2;
        }

        const deltaTimeInMillis = scene.getEngine().getDeltaTime();
        const rpm = 10;

        scene.registerBeforeRender(async function() {
            // randomize the position of each sphere
            if (spheres.length === 10) {
                for (let i = 0; i < spheres.length; i++) {
                    const yPosition = spheres[i].position.y;
                    if (yPosition >= 3 && spheres[i].going) {
                        spheres[i].going = false;
                        spheres[i].down = true;
                        spheres[i].position.y -= 0.005;
                        spheres[i].position.z -= 0.005;
                        spheres[i].position.x -= 0.005;
                    } else if (yPosition <= 0 && spheres[i].down) {
                        spheres[i].down = false;
                        spheres[i].going = true;
                        spheres[i].position.y += 0.005;
                        spheres[i].position.z += 0.005;
                        spheres[i].position.x += 0.005;
                    } else if (yPosition < 3 && yPosition > 0 && spheres[i].going) {
                        spheres[i].position.y += 0.005;
                        spheres[i].position.z += 0.005;
                        spheres[i].position.x += 0.005;
                    } else if (yPosition < 3 && yPosition > 0 && spheres[i].down) {
                        spheres[i].position.y -= 0.005;
                        spheres[i].position.z -= 0.005;
                        spheres[i].position.x -= 0.005;
                    }
                    spheres[i].rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
                    spheres[i].rotation.x += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
                    spheres[i].rotation.z += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
                    if (spheres[i].scaling.y >= 2 && spheres[i].scaleUp) {
                        spheres[i].scaleUp = false;
                        spheres[i].scaleDown = true;
                        spheres[i].scaling.y -= Math.random() * 0.01;
                        spheres[i].scaling.x -= Math.random() * 0.01;
                    } else if (spheres[i].scaling.y <= 0.5 && spheres[i].scaleDown) {
                        spheres[i].scaleUp = true;
                        spheres[i].scaleDown = false;
                        spheres[i].scaling.y += Math.random() * 0.01;
                        spheres[i].scaling.x += Math.random() * 0.01;
                    } else if (spheres[i].scaling.y <= 2 && spheres[i].scaling.y > 0.5 && spheres[i].scaleUp) {
                        spheres[i].scaling.y += Math.random() * 0.01;
                        spheres[i].scaling.x += Math.random() * 0.01;
                    } else if (spheres[i].scaling.y <= 2 && spheres[i].scaling.y > 0.5 && spheres[i].scaleDown) {
                        spheres[i].scaling.y -= Math.random() * 0.01;
                        spheres[i].scaling.x -= Math.random() * 0.01;
                    }
                    // spheres[i] = MeshBuilder.CreateSphere('', {diameterX: 1, diameterY: 0.5, diameterZ: 0.5, updatable: true}) as MovingSphere;
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