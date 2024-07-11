import { AnimatedMesh } from "../models/AnimatedMesh";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Mesh,
  Color3,
  PointLight,
  Texture,
  Color4,
  PBRMaterial,
} from "@babylonjs/core";
import SceneComponent from "babylonjs-hook";
import normalmap from "../assets/NormalMap.png";

export const Hero = () => {
    const getRandomColor = (): Color3 => {
        return new Color3(
            Math.random(),
            Math.random(),
            Math.random()
          );
    }

    const getRandomNumber = (max: number): number => {
        return Math.random() * max;
    }

    const getSphere = (
        scene: Scene,
        spheres: Array<AnimatedMesh>
      ): AnimatedMesh => {
        return MeshBuilder.CreateSphere(
          `sphere-${spheres.length}`,
          {
            segments: 128,
            updatable: true,
          },
          scene
        ) as AnimatedMesh;
    };

    const setMeshPBRMaterial = (scene: Scene, mesh: Mesh): void => {
        var mat = new PBRMaterial("mat1", scene);
        mat.bumpTexture = new Texture(normalmap, scene);
        mat.alpha = 1;
        mat.metallic = 0.3;
        mat.roughness = 0;
        mat.subSurface.isTranslucencyEnabled = true;
        mat.reflectionColor = getRandomColor();
        mat.metallicReflectanceColor = getRandomColor();
        mat.emissiveColor = getRandomColor();
        mat.backFaceCulling = false;
        mesh.material = mat;
    }

    const positionMesh = (mesh: Mesh): void => {
        mesh.position.x = getRandomNumber(3);
        mesh.position.y = getRandomNumber(3);
        mesh.position.z = getRandomNumber(3);
    };

    const getRotationSpeed = (scene: Scene): number => {
        const deltaTimeInMillis = scene.getEngine().getDeltaTime();
        const rpm = 10;

        return (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

  const onSceneReady = (scene: Scene): void => {
    scene.clearColor = new Color4(0, 0, 0);

    const camera = new FreeCamera("camera1", new Vector3(0, 5, 0), scene);
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    camera.attachControl(canvas, true);

    var light = new HemisphericLight("hemiLight", new Vector3(-1, 1, 0), scene);
    light.diffuse = new Color3(1, 0, 0);
    light.specular = new Color3(0, 1, 0);
    light.groundColor = new Color3(0, 1, 0);
    light.intensity = 0.7;

    var pl = new PointLight("pl", new Vector3(0, 0, 0), scene);
    pl.diffuse = new Color3(1, 1, 1);
    pl.specular = new Color3(1, 0, 0);
    pl.intensity = 0.95;

    const spheres: Array<AnimatedMesh> = [];
    const maxNumOfMeshes = 30;
    const maxYPosition = 5;
    const maxYScale = 2;
    for (let i = 0; i < maxNumOfMeshes; i++) {
      const sphere: AnimatedMesh = getSphere(scene, spheres);
      spheres.unshift(sphere);
      setMeshPBRMaterial(scene, sphere);
      positionMesh(sphere);

      if (sphere.position.y >= maxYPosition) {
        sphere.isMovingToBottom = true;
      } else {
        sphere.isMovingToTop = true;
      }

      sphere.scaling.y = Math.random() * maxYScale;
    }

    const coordinateDifference: number = 0.005;
    const minYPosition: number = 0;
    scene.registerBeforeRender(async function () {
      // randomize the position of each sphere
      if (spheres.length === 10) {
        for (let i = 0; i < spheres.length; i++) {
          const yPosition = spheres[i].position.y;
          if (yPosition >= maxYPosition && spheres[i].isMovingToTop) {
            spheres[i].isMovingToTop = false;
            spheres[i].isMovingToBottom = true;
            spheres[i].position.y -= coordinateDifference;
            spheres[i].position.z -= coordinateDifference;
            spheres[i].position.x -= coordinateDifference;
          } else if (yPosition <= minYPosition && spheres[i].isMovingToBottom) {
            spheres[i].isMovingToBottom = false;
            spheres[i].isMovingToTop = true;
            spheres[i].position.y += coordinateDifference;
            spheres[i].position.z += coordinateDifference;
            spheres[i].position.x += coordinateDifference;
          } else if (yPosition < maxYPosition && yPosition > minYPosition && spheres[i].isMovingToTop) {
            spheres[i].position.y += coordinateDifference;
            spheres[i].position.z += coordinateDifference;
            spheres[i].position.x += coordinateDifference;
          } else if (yPosition < maxYPosition && yPosition > minYPosition && spheres[i].isMovingToBottom) {
            spheres[i].position.y -= coordinateDifference;
            spheres[i].position.z -= coordinateDifference;
            spheres[i].position.x -= coordinateDifference;
          }

          spheres[i].rotation.y += getRotationSpeed(scene);
          spheres[i].rotation.x += getRotationSpeed(scene);
          spheres[i].rotation.z += getRotationSpeed(scene);
          if (spheres[i].isScalingUp) {
            spheres[i].isScalingUp = false;
            spheres[i].isScalingDown = true;
            spheres[i].scaling.y -= getRandomNumber(0.01);
            spheres[i].scaling.x -= getRandomNumber(0.01);
          } else if (spheres[i].isScalingDown) {
            spheres[i].isScalingUp = true;
            spheres[i].isScalingDown = false;
            spheres[i].scaling.y += getRandomNumber(0.01);
            spheres[i].scaling.x += getRandomNumber(0.01);
          }
        }
      }

      pl.position = camera.position;
    });
  };

  const onRender = async (scene: Scene) => {};

  return (
    <>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
      />
    </>
  );
};
