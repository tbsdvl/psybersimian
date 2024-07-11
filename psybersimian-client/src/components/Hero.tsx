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
    return new Color3(Math.random(), Math.random(), Math.random());
  };

  const getRandomNumber = (max: number): number => {
    return Math.random() * max;
  };

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
  };

  const positionMesh = (mesh: Mesh, maxCoordinate: number): void => {
    mesh.position.x = getRandomNumber(maxCoordinate);
    mesh.position.y = getRandomNumber(maxCoordinate);
    mesh.position.z = getRandomNumber(maxCoordinate);
  };

  const getRotationSpeed = (scene: Scene): number => {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 10;
    return (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  };

  const setupHemisphericLight = (scene: Scene): void => {
    var light = new HemisphericLight("hemiLight", new Vector3(-1, 1, 0), scene);
    light.diffuse = new Color3(1, 0, 0);
    light.specular = new Color3(0, 1, 0);
    light.groundColor = new Color3(0, 1, 0);
    light.intensity = 0.7;
  };

  const getPointLight = (scene: Scene): PointLight => {
    var pl = new PointLight("pl", new Vector3(0, 0, 0), scene);
    pl.diffuse = new Color3(1, 1, 1);
    pl.specular = new Color3(1, 0, 0);
    pl.intensity = 0.95;
    return pl;
  };

  const animateSpheres = (
    spheres: Array<AnimatedMesh>,
    maxYPositionCoordinate: number,
    minYPosition: number,
    coordinateDifference: number,
    scene: Scene
  ) => {
    if (spheres.length > 0) {
      for (let i = 0; i < spheres.length; i++) {
        const currentSphere = spheres[i];
        const yPosition = currentSphere.position.y;
        if (yPosition >= maxYPositionCoordinate && currentSphere.isMovingToTop) {
          currentSphere.isMovingToTop = false;
          currentSphere.isMovingToBottom = true;
          currentSphere.position.y -= coordinateDifference;
          currentSphere.position.z -= coordinateDifference;
          currentSphere.position.x -= coordinateDifference;
        } else if (yPosition <= minYPosition && currentSphere.isMovingToBottom) {
          currentSphere.isMovingToBottom = false;
          currentSphere.isMovingToTop = true;
          currentSphere.position.y += coordinateDifference;
          currentSphere.position.z += coordinateDifference;
          currentSphere.position.x += coordinateDifference;
        } else if (yPosition < maxYPositionCoordinate && yPosition > minYPosition && currentSphere.isMovingToTop) {
          currentSphere.position.y += coordinateDifference;
          currentSphere.position.z += coordinateDifference;
          currentSphere.position.x += coordinateDifference;
        } else if (yPosition < maxYPositionCoordinate && yPosition > minYPosition && currentSphere.isMovingToBottom) {
          currentSphere.position.y -= coordinateDifference;
          currentSphere.position.z -= coordinateDifference;
          currentSphere.position.x -= coordinateDifference;
        }

        currentSphere.rotation.y += getRotationSpeed(scene);
        currentSphere.rotation.x += getRotationSpeed(scene);
        currentSphere.rotation.z += getRotationSpeed(scene);
        if (currentSphere.isScalingUp) {
          currentSphere.isScalingUp = false;
          currentSphere.isScalingDown = true;
          currentSphere.scaling.y -= getRandomNumber(0.01);
          currentSphere.scaling.x -= getRandomNumber(0.01);
        } else if (currentSphere.isScalingDown) {
          currentSphere.isScalingUp = true;
          currentSphere.isScalingDown = false;
          currentSphere.scaling.y += getRandomNumber(0.01);
          currentSphere.scaling.x += getRandomNumber(0.01);
        }
      }
    }
  };

  const onSceneReady = (scene: Scene): void => {
    scene.clearColor = new Color4(0, 0, 0);

    const camera = new FreeCamera("camera1", new Vector3(0, 5, 0), scene);
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    setupHemisphericLight(scene);
    const pl = getPointLight(scene);

    const spheres: Array<AnimatedMesh> = [];
    const maxNumOfMeshes = 30;
    const maxYPositionCoordinate = 5;
    const maxYScaleCoordinate = 2;
    for (let i = 0; i < maxNumOfMeshes; i++) {
      const sphere: AnimatedMesh = getSphere(scene, spheres);
      spheres.unshift(sphere);
      setMeshPBRMaterial(scene, sphere);
      positionMesh(sphere, maxYPositionCoordinate);

      if (sphere.position.y >= maxYPositionCoordinate) {
        sphere.isMovingToBottom = true;
      } else {
        sphere.isMovingToTop = true;
      }

      sphere.scaling.y = Math.random() * maxYScaleCoordinate;
    }

    const minYPosition: number = 0;
    const coordinateDifference: number = 0.005;
    scene.registerBeforeRender(async function () {
      // animate the randomized positions of each sphere
      animateSpheres(
        spheres,
        maxYPositionCoordinate,
        minYPosition,
        coordinateDifference,
        scene
      );
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
