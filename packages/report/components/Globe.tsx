import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D";

interface group {
  current: { rotation: { x: number; y: number; z: number } };
}

const ROTATION_SPEED = 0.0005;
const incrementSpeed = 0.001;
const maxSpeed = 0.01;

const ROTATE_GLOBE = true;

const Model = ({ latestKeypress, baseSpeed = 0.0002 }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const group: group = useRef();
  const [model, setModel] = useState<Object3D | null>(null);
  const [rotateAt, setRotateAt] = useState(baseSpeed);
  const [mixer] = useState(() => new THREE.AnimationMixer(null));

  useEffect(() => {
    if (!latestKeypress) return;
    setRotateAt((rotateAt) => Math.min(maxSpeed, rotateAt + incrementSpeed));
    setTimeout(() => {
      setRotateAt((rotateAt) => Math.max(baseSpeed, rotateAt - incrementSpeed));
    }, Math.random() * 3000);
  }, [latestKeypress]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("3d/scene.gltf", async (gltf) => {
      const nodes = await gltf.parser.getDependencies("node");
      const group = new THREE.Group();
      nodes.forEach((node) => group.add(node));
      // console.log(nodes);
      setModel(group);
    });
  }, []);

  useFrame((_, delta) => mixer.update(delta));
  useFrame(() => {
    if (typeof group.current != "undefined")
      return (group.current.rotation.y += ROTATE_GLOBE ? rotateAt : 0);
  });

  return (
    <>
      {model ? (
        <group ref={group} position={[0, -1, 2.6]} dispose={null}>
          <primitive ref={group} name="Object_0" object={model} />
        </group>
      ) : null}
    </>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[40, 10, 5]} intensity={0.2} />
      <directionalLight
        castShadow
        position={[10, 420, 100]}
        intensity={1.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
        shadow-camera-left={-30}
        shadow-camera-right={10}
        shadow-camera-top={40}
        shadow-camera-bottom={-10}
      />
      <spotLight intensity={0.5} position={[90, 100, 50]} castShadow />
    </>
  );
};

const Globe = ({ latestKeypress }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const SHOW_GLOBE = true; //!isMobile;
  return (
    <Flex style={{ minHeight: "600px", height: "80vh", width: "100%" }}>
      <Canvas
        style={{ height: "100%", opacity: SHOW_GLOBE ? 1 : 0 }}
        colorManagement
        camera={{ position: isMobile ? [0, 1.75, 5] : [-1.5, -0.25, 4] }}
      >
        <Lights />
        <Model latestKeypress={latestKeypress} baseSpeed={ROTATION_SPEED} />
      </Canvas>
    </Flex>
  );
};

export default Globe;
