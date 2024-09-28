import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDMode = ({ nodes, connections, activeCategory }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    nodes.forEach(node => {
      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: node.color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(node.x - 50, node.y - 50, 0);
      scene.add(sphere);
    });

    connections.forEach(conn => {
      const material = new THREE.LineBasicMaterial({ color: conn.color });
      const points = [];
      points.push(new THREE.Vector3(conn.start.x - 50, conn.start.y - 50, 0));
      points.push(new THREE.Vector3(conn.end.x - 50, conn.end.y - 50, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    });

    camera.position.z = 100;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [nodes, connections, activeCategory]);

  return <div ref={mountRef} />;
};

export default ThreeDMode;