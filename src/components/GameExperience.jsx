import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { myPlayer } from 'playroomkit';
import { spawnCoins, checkCoinCollection } from '../utils/coinUtils';
import * as THREE from 'three';

const GameExperience = ({ scene }) => {
  const [coins, setCoins] = useState([]);
  const player = myPlayer();

  if (!player.coinCount) {
    player.coinCount = 0;
  }

  useEffect(() => {
    // Spawn coins in front of the player's position
    const playerPosition = new THREE.Vector3(0, 10, 0);
    const spawnedCoins = spawnCoins(10, playerPosition); // Spawn 5 coins for testing
    console.log("coins spawned");
    setCoins(spawnedCoins);

    return () => {
      setCoins([]); // Clear coins on unmount
    };
  }, [player.position]);

  useFrame(() => {
    const updatedCoins = checkCoinCollection(player, coins);
    setCoins(updatedCoins.filter((coin) => !coin.collected)); // Keep only uncollected coins
  });

  return (
    <>
      {coins.map((coin, index) => (
        <primitive key={index} object={coin.mesh} /> // Render each coin mesh
      ))}
    </>
  );
};

export default GameExperience;
