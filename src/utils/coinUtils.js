// coinUtils.js
// coinUtils.js
import * as THREE from 'three';
import Coin from './coin';

export const spawnCoins = (numCoins, playerPosition) => {
  const coins = [];
  for (let i = 0; i < numCoins; i++) {
    // Spawn coins at a known distance in front of the player's position
    const x = playerPosition.x - i*1.5;
    const y = playerPosition.y;
    const z = playerPosition.z - i * 1.5; // Space coins slightly along the z-axis

    const coin = new Coin(new THREE.Vector3(x, y, z));
    coins.push(coin);
  }
  return coins;
};


// coinUtils.js
export const checkCoinCollection = (player, coins) => {
    const collectionRadius = 0.5; // Distance to collect a coin
    return coins.map((coin) => {
      if (!coin.collected && player.position.distanceTo(coin.position) < collectionRadius) {
        coin.collected = true;
        player.coinCount += 1;
        console.log('Coin collected! Total Coins:', player.coinCount);
        scene.remove(coin.mesh); // Remove coin mesh from the scene if available
      }
      return coin;
    });
  };
  
  
