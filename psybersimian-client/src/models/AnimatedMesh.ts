import { Mesh } from "@babylonjs/core";

export class AnimatedMesh extends Mesh {
  public isMovingToTop: boolean;
  public isMovingToBottom: boolean;
  public isScalingUp: boolean;
  public isScalingDown: boolean;

  /**
   * Instantiates a new animated mesh.
   */
  constructor(name: string) {
    super(name);
    this.isMovingToTop = false;
    this.isMovingToBottom = false;
    this.isScalingUp = false;
    this.isScalingDown = false;
  }
}
