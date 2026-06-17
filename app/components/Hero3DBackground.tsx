"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#090909");
    scene.fog = new THREE.FogExp2("#090909", 0.016);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 16, 36);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight("#13151c", 0.9);
    scene.add(ambientLight);

    // Sunlight from top right at dusk (gold/orange)
    const sunLight = new THREE.DirectionalLight("#e5d5c0", 3.5);
    sunLight.position.set(20, 30, 15);
    scene.add(sunLight);

    // Soft sky fill light (blue-grey)
    const skyLight = new THREE.DirectionalLight("#2a354d", 1.8);
    skyLight.position.set(-20, 10, -10);
    scene.add(skyLight);

    // Soft ground/city glow point light
    const cityGlowLight = new THREE.PointLight("#c5a880", 5.0, 50);
    cityGlowLight.position.set(0, 2, 10);
    scene.add(cityGlowLight);

    // --- Materials ---
    // Dark concrete/steel facade frames
    const facadeMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b, // zinc-900
      roughness: 0.75,
      metalness: 0.25,
    });

    // Elegant warm wood accent panels
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x937c62, // warm tan-brown
      roughness: 0.6,
      metalness: 0.1,
    });

    // Double-sided dark structural core
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x090909,
      roughness: 0.9,
    });

    // Glowing warm gold window material (simulating lit rooms)
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff0d0,
      emissive: 0xc5a880,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
    });

    // Dark glass window panel material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.75,
      roughness: 0.05,
      metalness: 0.9,
      transmission: 0.3,
      ior: 1.5,
    });

    // Green landscaping foliage
    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x223e2b, // deep forest green
      roughness: 0.9,
    });

    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d3126,
      roughness: 0.9,
    });

    // --- Building Construction Helper ---
    const complexGroup = new THREE.Group();
    scene.add(complexGroup);

    function buildModernApartment(
      x: number,
      z: number,
      width: number,
      depth: number,
      floors: number,
      floorHeight = 1.8,
      rotationY = 0
    ) {
      const buildingGroup = new THREE.Group();
      buildingGroup.position.set(x, 0, z);
      buildingGroup.rotation.y = rotationY;

      // 1. Central Core
      const coreGeo = new THREE.BoxGeometry(width * 0.96, floors * floorHeight, depth * 0.96);
      const core = new THREE.Mesh(coreGeo, coreMaterial);
      core.position.y = (floors * floorHeight) / 2;
      buildingGroup.add(core);

      // Construct floor by floor for grid slabs, window matrices, and wood slats
      for (let f = 0; f < floors; f++) {
        const floorY = f * floorHeight;

        // A. Horizontal Slab (floor separator)
        const slabGeo = new THREE.BoxGeometry(width + 0.15, 0.1, depth + 0.15);
        const slab = new THREE.Mesh(slabGeo, facadeMaterial);
        slab.position.set(0, floorY, 0);
        buildingGroup.add(slab);

        // B. Windows and Wood Accent Panels on front and side facades
        // Front & Back Facade (along X axis)
        const frontBackPositions = [depth / 2, -depth / 2];
        frontBackPositions.forEach((zPos, sideIdx) => {
          const isFront = sideIdx === 0;
          // Subdivide floor width into columns
          const cols = 4;
          const colWidth = width / cols;

          for (let c = 0; c < cols; c++) {
            const xPos = -width / 2 + colWidth * (c + 0.5);
            
            // Asymmetrically place wood accent panels vs glowing windows
            const rand = Math.sin(f * 7 + c * 13); // Pseudo-random based on floor/col
            
            if (rand > 0.4) {
              // Wood Panel Slat
              const woodGeo = new THREE.BoxGeometry(colWidth * 0.92, floorHeight * 0.9, 0.08);
              const woodPanel = new THREE.Mesh(woodGeo, woodMaterial);
              woodPanel.position.set(xPos, floorY + floorHeight / 2, zPos + (isFront ? 0.02 : -0.02));
              buildingGroup.add(woodPanel);
            } else {
              // Glass Window + Glow Core
              const winWidth = colWidth * 0.85;
              const winHeight = floorHeight * 0.8;

              // Glowing interior room (set back slightly)
              // Only light up some rooms dynamically
              const isRoomLit = Math.sin(f * 3 + c * 5) > -0.2;
              const glowGeo = new THREE.PlaneGeometry(winWidth, winHeight);
              const glowMesh = new THREE.Mesh(
                glowGeo,
                isRoomLit ? windowMaterial : coreMaterial
              );
              glowMesh.position.set(xPos, floorY + floorHeight / 2, zPos + (isFront ? -0.05 : 0.05));
              glowMesh.rotation.y = isFront ? 0 : Math.PI;
              buildingGroup.add(glowMesh);

              // Outer Glass Pane
              const glassGeo = new THREE.BoxGeometry(winWidth, winHeight, 0.02);
              const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
              glassMesh.position.set(xPos, floorY + floorHeight / 2, zPos + (isFront ? 0.01 : -0.01));
              buildingGroup.add(glassMesh);
            }

            // Fine vertical metal divider columns
            const pillarGeo = new THREE.BoxGeometry(0.08, floorHeight, 0.08);
            const pillar = new THREE.Mesh(pillarGeo, facadeMaterial);
            pillar.position.set(xPos - colWidth / 2, floorY + floorHeight / 2, zPos + (isFront ? 0.03 : -0.03));
            buildingGroup.add(pillar);
          }
        });

        // Left & Right Facades (along Z axis)
        const leftRightPositions = [width / 2, -width / 2];
        leftRightPositions.forEach((xPos, sideIdx) => {
          const isRight = sideIdx === 0;
          const cols = 4;
          const colWidth = depth / cols;

          for (let c = 0; c < cols; c++) {
            const zPos = -depth / 2 + colWidth * (c + 0.5);
            const rand = Math.cos(f * 9 + c * 17);

            if (rand > 0.45) {
              // Wood accent
              const woodGeo = new THREE.BoxGeometry(0.08, floorHeight * 0.9, colWidth * 0.92);
              const woodPanel = new THREE.Mesh(woodGeo, woodMaterial);
              woodPanel.position.set(xPos + (isRight ? 0.02 : -0.02), floorY + floorHeight / 2, zPos);
              buildingGroup.add(woodPanel);
            } else {
              // Window
              const winWidth = colWidth * 0.85;
              const winHeight = floorHeight * 0.8;
              const isRoomLit = Math.cos(f * 4 + c * 6) > -0.15;

              const glowGeo = new THREE.PlaneGeometry(winWidth, winHeight);
              const glowMesh = new THREE.Mesh(
                glowGeo,
                isRoomLit ? windowMaterial : coreMaterial
              );
              glowMesh.position.set(xPos + (isRight ? -0.05 : 0.05), floorY + floorHeight / 2, zPos);
              glowMesh.rotation.y = isRight ? Math.PI / 2 : -Math.PI / 2;
              buildingGroup.add(glowMesh);

              const glassGeo = new THREE.BoxGeometry(0.02, winHeight, winWidth);
              const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
              glassMesh.position.set(xPos + (isRight ? 0.01 : -0.01), floorY + floorHeight / 2, zPos);
              buildingGroup.add(glassMesh);
            }

            // Divider pillar
            const pillarGeo = new THREE.BoxGeometry(0.08, floorHeight, 0.08);
            const pillar = new THREE.Mesh(pillarGeo, facadeMaterial);
            pillar.position.set(xPos + (isRight ? 0.03 : -0.03), floorY + floorHeight / 2, zPos - colWidth / 2);
            buildingGroup.add(pillar);
          }
        });
      }

      // Add Top Roof Slab & Terraces
      const roofSlabGeo = new THREE.BoxGeometry(width + 0.2, 0.2, depth + 0.2);
      const roofSlab = new THREE.Mesh(roofSlabGeo, facadeMaterial);
      roofSlab.position.y = floors * floorHeight;
      buildingGroup.add(roofSlab);

      // Rooftop terrace landscaping
      const treesCount = 3;
      for (let t = 0; t < treesCount; t++) {
        const treeX = (Math.random() - 0.5) * (width * 0.7);
        const treeZ = (Math.random() - 0.5) * (depth * 0.7);
        
        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 4);
        const trunk = new THREE.Mesh(trunkGeo, trunkMaterial);
        trunk.position.set(treeX, floors * floorHeight + 0.2, treeZ);
        buildingGroup.add(trunk);

        // Leaves (Foliage sphere)
        const leafGeo = new THREE.SphereGeometry(0.35 + Math.random() * 0.15, 6, 6);
        const leaves = new THREE.Mesh(leafGeo, foliageMaterial);
        leaves.position.set(treeX, floors * floorHeight + 0.45, treeZ);
        buildingGroup.add(leaves);
      }

      return buildingGroup;
    }

    // Build the Crescent style luxury architectural towers group
    // 1. Central main residential block
    const mainBuilding = buildModernApartment(0, 0, 5.0, 5.0, 9, 1.9, 0);
    complexGroup.add(mainBuilding);

    // 2. Left tall tower
    const leftTower = buildModernApartment(-7.5, -4.5, 3.8, 3.8, 12, 1.8, Math.PI / 8);
    complexGroup.add(leftTower);

    // 3. Right wide pavilion block
    const rightPavilion = buildModernApartment(7.5, -3.5, 4.2, 4.2, 7, 2.0, -Math.PI / 12);
    complexGroup.add(rightPavilion);

    // Adjust entire group position
    complexGroup.position.y = -8;

    // --- Ground Landscaping / Garden at Base ---
    const groundGeo = new THREE.BoxGeometry(60, 0.5, 60);
    const ground = new THREE.Mesh(groundGeo, facadeMaterial);
    ground.position.y = -8.25;
    scene.add(ground);

    // Ground trees
    const groundTreesCount = 18;
    for (let i = 0; i < groundTreesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 12;
      const tx = Math.sin(angle) * radius;
      const tz = Math.cos(angle) * radius;

      const trunkGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 5);
      const trunk = new THREE.Mesh(trunkGeo, trunkMaterial);
      trunk.position.set(tx, -7.65, tz);
      scene.add(trunk);

      const leafGeo = new THREE.SphereGeometry(0.7 + Math.random() * 0.5, 8, 8);
      const leaves = new THREE.Mesh(leafGeo, foliageMaterial);
      leaves.position.set(tx, -6.65, tz);
      scene.add(leaves);
    }

    // --- Refined Floating Ambient Lights (Sparse particles) ---
    const particleCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleData: Array<{ speedY: number; angle: number; speedAngle: number }> = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 1] = Math.random() * 30 - 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      particleData.push({
        speedY: Math.random() * 0.01 + 0.002,
        angle: Math.random() * Math.PI * 2,
        speedAngle: Math.random() * 0.004 - 0.002,
      });
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Interaction & Event Handlers ---
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = event.clientX / window.innerWidth - 0.5;
      mouseRef.current.targetY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop (Cinematic Drone flight path + mouse parallax) ---
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.0025;

      // Smooth mouse coordinate interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 1. Spline-like continuous Drone flight path (camera position & lookAt)
      // Pan orbit angle over time
      const orbitAngle = time * 0.08 + Math.PI / 4;
      
      // Camera height rises and falls slowly like a hovering drone
      const droneY = 10 + Math.sin(time * 0.12) * 5;
      
      // Calculate basic orbiting coordinates
      const flightRadius = 26 + Math.cos(time * 0.05) * 4;
      const baseX = Math.sin(orbitAngle) * flightRadius;
      const baseZ = Math.cos(orbitAngle) * flightRadius;

      // Apply mouse parallax offsets onto camera coordinates
      camera.position.x = baseX + mouseRef.current.x * 10;
      camera.position.y = droneY - mouseRef.current.y * 6;
      camera.position.z = baseZ + mouseRef.current.x * 10;

      // Set target point that sways slowly to look like camera scanning panning shots
      const targetX = Math.sin(time * 0.15) * 1.5;
      const targetY = 1.0 + Math.cos(time * 0.2) * 1.5;
      const targetZ = Math.cos(time * 0.1) * 1.5;
      
      camera.lookAt(targetX, targetY, targetZ);

      // 2. Animate city glow point light position
      cityGlowLight.position.x = Math.sin(time * 0.5) * 10;
      cityGlowLight.position.z = Math.cos(time * 0.5) * 10;
      
      // 3. Slow, subtle rotation on building complex for dynamic reflections
      complexGroup.rotation.y = time * 0.02;

      // 4. Animate floating gold dust particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleData[i].speedY;
        particleData[i].angle += particleData[i].speedAngle;
        positions[i * 3] += Math.sin(particleData[i].angle) * 0.003;
        positions[i * 3 + 2] += Math.cos(particleData[i].angle) * 0.003;

        if (positions[i * 3 + 1] > 22) {
          positions[i * 3 + 1] = -8;
          positions[i * 3] = (Math.random() - 0.5) * 45;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 45;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // 5. Render frame
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none block z-0"
    />
  );
}
