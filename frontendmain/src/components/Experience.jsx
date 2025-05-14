// Experience.jsx
import { Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";

export function Experience({ avatarModel }) {  // Removed the arrow function syntax
  const { autoRotate, autoRotateSpeed } = useControls({
    autoRotate: {
      value: false,
    },
    autoRotateSpeed: {
      value: 1,
      min: 0.1,
      max: 10,
    },
  });

  return (
    <>
      <OrbitControls
        makeDefault
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        minDistance={1.5}
        maxDistance={5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        enablePan={true}
        target={[0, 1.2, 0]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Environment preset="city" />
      <Avatar  model={avatarModel} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}/> 
   </>
  );
}