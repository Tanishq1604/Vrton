// CoinSpawner.jsx
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

function Coin({ position }) {
  return (
    <RigidBody type="dynamic" position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    </RigidBody>
  );
}

export default function CoinSpawner({ spawnCount = 10, interval = 2000 }) {
  const { scene } = useThree();
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (coins.length < spawnCount) {
        setCoins(prev => [
          ...prev,
          <Coin key={prev.length} position={[Math.random() * 10 - 5, 5, Math.random() * 10 - 5]} />
        ]);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [coins, spawnCount, interval]);

  return <>{coins.map(coin => coin)}</>;
}
