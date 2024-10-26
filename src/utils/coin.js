import * as THREE from 'three';

class Coin {
  constructor(position) {
    this.position = position; // Vector3 position
    this.collected = false; // Whether the coin has been collected
    this.mesh = this.createMesh(); // Create the coin mesh
  }

  // Create the coin mesh
  createMesh() {
    const geometry = new THREE.CircleGeometry(1, 32); // Adjust size as needed
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Coin color
    const coinMesh = new THREE.Mesh(geometry, material);
    coinMesh.position.copy(this.position);
    return coinMesh;
  }
}

export default Coin;
