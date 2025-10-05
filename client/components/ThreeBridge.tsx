import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Bridge() {
  const mouse = useRef({ x: 0, y: 0 });
  const mesh = useRef<THREE.Mesh>(null!);
  const points = useMemo(() => {
    const pts = [] as THREE.Vector3[];
    const len = 8;
    for (let i = 0; i <= len; i++) {
      const t = i / len;
      const x = (t - 0.5) * 12;
      const y =
        Math.sin(t * Math.PI * 2) * 1.2 + THREE.MathUtils.randFloat(-0.2, 0.2);
      const z = Math.cos(t * Math.PI) * 2.5;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((state) => {
    const mx = (state.mouse.x || 0) * 0.2;
    const my = (state.mouse.y || 0) * 0.2;
    if (mesh.current) {
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        mx,
        0.05,
      );
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        -my,
        0.05,
      );
    }
  });

  return (
    <group>
            <mesh ref={mesh} position={[0,0,0]}>
        {/* Tube representing the bridge */}
        {/* @ts-ignore */}
        <tubeGeometry args={[curve, 200, 0.12, 16, false]} />
        <meshStandardMaterial color={new THREE.Color("#4f7cff")} emissive={new THREE.Color("#2a4fff")} emissiveIntensity={0.4} metalness={0.1} roughness={0.35} />
      </mesh>
      {/* Glowing points along the path */}
      <group>
        {points.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#9db4ff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function ThreeBridge() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={0.6} />
        <Bridge />
      </Canvas>
    </div>
  );
}
