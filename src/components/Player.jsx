// Player.jsx
import Ecctrl from 'ecctrl';
import CharacterModel from './CharacterModel';
import { myPlayer } from 'playroomkit';
import { useState, useEffect } from 'react';
import { AnimationLocalPlayer } from './AnimationLocalPlayer';
import { animationSet } from '../hooks/useRPMAnimations';
import { spawnCoins, checkCoinCollection } from '../utils/coinUtils';
import * as THREE from 'three';

const getRandomPos = () => {
  const x = 10;
  const y = 0;
  const z = 10;
  return new THREE.Vector3(x, y, z);
};

export const Player = ({ scene }) => {
  const [initialPos] = useState(getRandomPos());
  const [player] = useState(() => {
    const p = myPlayer();
    p.position = p.position || initialPos; // Set initial position if not set
    p.coinCount = p.coinCount || 0; // Initialize coin count if not set
    return p;
  });

  useEffect(() => {
    const coins = spawnCoins(10, player.position);

    const handleCollectCoins = () => {
      checkCoinCollection(player, coins);
    };

    const interval = setInterval(handleCollectCoins, 100); // Check every 100ms

    return () => clearInterval(interval); // Clear interval on unmount
  }, [player.position]);

  return (
    <Ecctrl debug={false} animated camInitDis={-10} followLight position={initialPos}>
      <AnimationLocalPlayer animationSet={animationSet} player={player}>
        <CharacterModel characterUrl={player.state.character.avatarUrl} sharePos player={player} />
      </AnimationLocalPlayer>
    </Ecctrl>
  );
};
