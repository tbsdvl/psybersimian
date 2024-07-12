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

export const Hero = ({ isLoaded, setIsLoaded }: { isLoaded: boolean, setIsLoaded: Function }) => {
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
        segments: 50,
        updatable: true,
      },
      scene
    ) as AnimatedMesh;
  };

  const randomizeMaterialColor = (mat: PBRMaterial): void => {
    mat.reflectionColor = getRandomColor();
    mat.metallicReflectanceColor = getRandomColor();
    mat.emissiveColor = getRandomColor();
  }

  const setMeshPBRMaterial = (scene: Scene, mesh: Mesh): void => {
    var mat = new PBRMaterial("mat1", scene);
    mat.bumpTexture = new Texture(normalmap, scene);
    mat.alpha = 1;
    mat.metallic = 0.3;
    mat.roughness = 0;
    mat.subSurface.isTranslucencyEnabled = true;
    randomizeMaterialColor(mat);
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
          randomizeMaterialColor(currentSphere.material as PBRMaterial);
        } else if (yPosition <= minYPosition && currentSphere.isMovingToBottom) {
          currentSphere.isMovingToBottom = false;
          currentSphere.isMovingToTop = true;
          currentSphere.position.y += coordinateDifference;
          currentSphere.position.z += coordinateDifference;
          currentSphere.position.x += coordinateDifference;
          randomizeMaterialColor(currentSphere.material as PBRMaterial);
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
        if (currentSphere.isScalingUp && currentSphere.scaling.y >= 1) {
          currentSphere.isScalingUp = false;
          currentSphere.isScalingDown = true;
          currentSphere.scaling.y -= getRandomNumber(0.005);
          currentSphere.scaling.x -= getRandomNumber(0.005);
          currentSphere.scaling.z -= getRandomNumber(0.005);
        } else if (currentSphere.isScalingDown && currentSphere.scaling.y < 1) {
          currentSphere.isScalingUp = true;
          currentSphere.isScalingDown = false;
          currentSphere.scaling.y += getRandomNumber(0.005);
          currentSphere.scaling.x += getRandomNumber(0.005);
          currentSphere.scaling.z += getRandomNumber(0.005);
        } else if (currentSphere.isScalingUp) {
            currentSphere.scaling.y += getRandomNumber(0.005);
            currentSphere.scaling.x += getRandomNumber(0.005);
            currentSphere.scaling.z += getRandomNumber(0.005);
        } else if (currentSphere.isScalingDown) {
            currentSphere.scaling.y -= getRandomNumber(0.005);
            currentSphere.scaling.x -= getRandomNumber(0.005);
            currentSphere.scaling.z -= getRandomNumber(0.005);
        }
      }
    }
  };

  const onSceneReady = (scene: Scene): void => {
    scene.clearColor = Color4.FromHexString("#000c20");

    const camera = new FreeCamera("camera1", new Vector3(9, 0, 5), scene);
    camera.setTarget(new Vector3(2, 10, 5));

    // disable camera controls
    camera.inputs.addMouse();
    if (camera.inputs._mouseInput) {
        camera.inputs._mouseInput.buttons = [2];
    }

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    setupHemisphericLight(scene);
    const pl = getPointLight(scene);

    const spheres: Array<AnimatedMesh> = [];
    const maxNumOfMeshes = 100;
    const maxYPositionCoordinate = 12;
    const maxYScaleCoordinate = 1;
    for (let i = 0; i < maxNumOfMeshes; i++) {
      const sphere: AnimatedMesh = getSphere(scene, spheres);
      spheres.unshift(sphere);
      setMeshPBRMaterial(scene, sphere);
      positionMesh(sphere, maxYPositionCoordinate);

      if (Math.random() * maxNumOfMeshes >= 50) {
          sphere.isMovingToBottom = true;
          sphere.isScalingUp = true;
      } else {
        sphere.isMovingToTop = true;
      }

        sphere.scaling.y = Math.random() * maxYScaleCoordinate;
        if (sphere.scaling.y < maxYScaleCoordinate) {
            sphere.isScalingUp = true;
        } else if (sphere.scaling.y >= maxYScaleCoordinate) {
            sphere.isScalingDown = true;
        }
    }

    const minYPosition: number = 0;
    const coordinateDifference: number = 0.009;
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

  const onRender = async (scene: Scene) => {
    scene;
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  return (
    <>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
        className="opacity-60"
      />
    </>
  );
};
