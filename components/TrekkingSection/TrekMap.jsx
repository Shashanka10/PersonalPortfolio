"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import * as THREE from "three";
import { Mountain, MapPin, RotateCcw, ArrowUpRight } from "lucide-react";

import "leaflet/dist/leaflet.css";

/* =========================================================
   COLORS
========================================================= */

const trekColors = [
  "#12c971",
  "#38bdf8",
  "#a78bfa",
  "#f59e0b",
  "#f43f5e",
  "#22d3ee",
];

const getTrekColor = (trek, index) =>
  trek.color || trekColors[index % trekColors.length];

/* =========================================================
   THREE.JS BACKGROUND
========================================================= */

function ThreeOverlay({ activeId }) {
  const mountRef = useRef(null);
  const activeRef = useRef(activeId);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) return;

    /* -----------------------------------------
       Scene
    ----------------------------------------- */

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    /* -----------------------------------------
       Particles
    ----------------------------------------- */

    const particleCount = 120;

    const positions = new Float32Array(particleCount * 3);

    const sizes = new Float32Array(particleCount);

    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 2 - 1;

      positions[i * 3 + 1] = Math.random() * 2 - 1;

      positions[i * 3 + 2] = Math.random();

      sizes[i] = Math.random() * 2.5 + 0.5;

      speeds[i] = Math.random() * 0.25 + 0.05;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,

      uniforms: {
        uTime: {
          value: 0,
        },
      },

      vertexShader: `
          attribute float aSize;

          uniform float uTime;

          void main() {

            vec3 pos = position;

            pos.y +=
              sin(
                uTime * 0.2 +
                position.x * 5.0
              ) * 0.015;

            vec4 mvPosition =
              modelViewMatrix *
              vec4(pos, 1.0);

            gl_PointSize =
              aSize *
              (1.0 + sin(uTime * 1.5) * 0.25);

            gl_Position =
              projectionMatrix *
              mvPosition;
          }
        `,

      fragmentShader: `
          uniform float uTime;

          void main() {

            float distanceFromCenter =
              distance(
                gl_PointCoord,
                vec2(0.5)
              );

            float alpha =
              1.0 -
              smoothstep(
                0.0,
                0.5,
                distanceFromCenter
              );

            gl_FragColor =
              vec4(
                0.07,
                0.78,
                0.44,
                alpha * 0.35
              );
          }
        `,
    });

    const particles = new THREE.Points(geometry, material);

    scene.add(particles);

    /* -----------------------------------------
       Subtle grid
    ----------------------------------------- */

    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x12c971,
      transparent: true,
      opacity: 0.035,
    });

    const gridGeometry = new THREE.BufferGeometry();

    const gridPositions = [];

    const divisions = 12;

    for (let i = 0; i <= divisions; i++) {
      const p = -1 + (2 / divisions) * i;

      gridPositions.push(p, -1, 0);

      gridPositions.push(p, 1, 0);

      gridPositions.push(-1, p, 0);

      gridPositions.push(1, p, 0);
    }

    gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(gridPositions, 3),
    );

    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);

    scene.add(grid);

    /* -----------------------------------------
       Central glow
    ----------------------------------------- */

    const glowGeometry = new THREE.PlaneGeometry(1.4, 1.4);

    const glowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,

      uniforms: {
        uTime: {
          value: 0,
        },
      },

      vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(
                position,
                1.0
              );
          }
        `,

      fragmentShader: `
          uniform float uTime;

          varying vec2 vUv;

          void main() {

            float d =
              distance(
                vUv,
                vec2(0.5)
              );

            float glow =
              1.0 -
              smoothstep(
                0.0,
                0.7,
                d
              );

            float pulse =
              0.8 +
              sin(uTime * 0.8) * 0.15;

            gl_FragColor =
              vec4(
                0.02,
                0.8,
                0.45,
                glow *
                0.035 *
                pulse
              );
          }
        `,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);

    glow.position.z = -0.1;

    scene.add(glow);

    /* -----------------------------------------
       Resize
    ----------------------------------------- */

    const resize = () => {
      if (!container) return;

      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", resize);

    /* -----------------------------------------
       Animation
    ----------------------------------------- */

    const clock = new THREE.Clock();

    let animationFrame;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      material.uniforms.uTime.value = time;

      glowMaterial.uniforms.uTime.value = time;

      particles.rotation.z = Math.sin(time * 0.05) * 0.02;

      grid.rotation.z = Math.sin(time * 0.04) * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    /* -----------------------------------------
       Cleanup
    ----------------------------------------- */

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);

      geometry.dispose();
      material.dispose();

      gridGeometry.dispose();
      gridMaterial.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="trek-three-layer" />;
}

/* =========================================================
   CUSTOM MARKER
========================================================= */

const createTrekIcon = (color, active = false) =>
  L.divIcon({
    className: "trek-marker-wrapper",

    html: `
      <div
        class="trek-marker ${active ? "trek-marker-active" : ""}"
        style="
          --marker-color: ${color};
          --marker-size: ${active ? "24px" : "17px"};
        "
      >
        <div class="trek-marker-ring"></div>
        <div class="trek-marker-core"></div>
      </div>
    `,

    iconSize: [active ? 24 : 17, active ? 24 : 17],

    iconAnchor: [active ? 12 : 8.5, active ? 12 : 8.5],

    popupAnchor: [0, active ? -14 : -10],
  });

/* =========================================================
   FLY TO
========================================================= */

function FlyTo({ coords, activeId }) {
  const map = useMap();

  useEffect(() => {
    if (!coords || !activeId) return;

    map.flyTo(coords, 10, {
      duration: 1.1,
      easeLinearity: 0.25,
    });
  }, [coords, activeId, map]);

  return null;
}

/* =========================================================
   RESET VIEW
========================================================= */

function ResetView() {
  const map = useMap();

  const handleReset = () => {
    map.flyTo([28.3949, 84.124], 7, {
      duration: 0.9,
    });
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className="
        absolute
        bottom-4
        right-4
        z-[1000]
        w-9
        h-9
        rounded-xl
        border
        border-[#333]
        bg-[#181818]/90
        backdrop-blur-md
        text-gray-400
        flex
        items-center
        justify-center
        hover:text-[#12c971]
        hover:border-[#12c971]/40
        hover:bg-[#202020]
        transition-all
        duration-300
      "
      aria-label="Reset map view"
    >
      <RotateCcw size={15} />
    </button>
  );
}

/* =========================================================
   POPUP
========================================================= */

function TrekPopup({ trek, color, onSelect }) {
  return (
    <div className="trek-popup-content">
      <div
        className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest mb-1.5"
        style={{
          color,
        }}
      >
        <Mountain size={11} />
        {trek.region}
      </div>

      <h3 className="text-white font-bold text-base leading-tight">
        {trek.name}
      </h3>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {trek.altitude && (
          <span
            className="trek-popup-tag"
            style={{
              borderColor: `${color}35`,
              color,
              background: `${color}0D`,
            }}
          >
            {trek.altitude}
          </span>
        )}

        {trek.distanceKm && (
          <span className="trek-popup-tag">{trek.distanceKm} km</span>
        )}

        {trek.days && <span className="trek-popup-tag">{trek.days} days</span>}
      </div>

      {trek.story && (
        <p className="text-gray-400 text-xs leading-relaxed mt-3">
          {trek.story}
        </p>
      )}

      <button
        type="button"
        onClick={() => onSelect(trek.id)}
        className="
          group
          mt-4
          w-full
          flex
          items-center
          cursor-pointer
          justify-between
          px-3
          py-2
          rounded-lg
          border
          text-gray-400
          text-[10px]
          font-mono
          uppercase
          tracking-wider
          transition-all
          duration-300
        "
        style={{
          borderColor: `${color}30`,
          background: `${color}0A`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = color;

          e.currentTarget.style.borderColor = `${color}70`;

          e.currentTarget.style.background = `${color}16`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#9ca3af";

          e.currentTarget.style.borderColor = `${color}30`;

          e.currentTarget.style.background = `${color}0A`;
        }}
      >
        <span>View trek</span>

        <ArrowUpRight
          size={13}
          style={{
            color,
          }}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />
      </button>
    </div>
  );
}

export default function TrekMap({ treks, activeId, onSelectTrek }) {
  const activeTrek = treks.find((trek) => trek.id === activeId);

  const trekColorsMap = useMemo(() => {
    const map = {};

    treks.forEach((trek, index) => {
      map[trek.id] = getTrekColor(trek, index);
    });

    return map;
  }, [treks]);

  return (
    <div
      className="
        relative
        h-[380px]
        sm:h-[440px]
        rounded-2xl
        overflow-hidden
        border
        border-[#2e2e2e]
        bg-[#141414]
      "
    >
      {/* THREE.JS VISUAL LAYER */}

      <ThreeOverlay activeId={activeId} />

      {/* LEAFLET */}

      <MapContainer
        center={[28.3949, 84.124]}
        zoom={7}
        minZoom={6}
        maxZoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl
        className="trek-map"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <ZoomControl position="bottomright" />

        {/* TREK MARKERS */}

        {treks.map((trek, index) => {
          const color = trekColorsMap[trek.id];

          const active = trek.id === activeId;

          return (
            <Marker
              key={trek.id}
              position={trek.coords}
              icon={createTrekIcon(color, active)}
            >
              <Popup closeButton={false} offset={[0, -4]}>
                <TrekPopup trek={trek} color={color} onSelect={onSelectTrek} />
              </Popup>
            </Marker>
          );
        })}

        {activeTrek && <FlyTo coords={activeTrek.coords} activeId={activeId} />}

        <ResetView />
      </MapContainer>

      {/* MAP HEADER */}

      <div
        className="
          absolute
          top-4
          left-4
          z-[1000]
          flex
          items-center
          gap-2
          px-3
          py-2
          rounded-full
          border
          border-[#333]
          bg-[#171717]/85
          backdrop-blur-md
        "
      >
        <MapPin size={13} className="text-[#12c971]" />

        <span
          className="
            text-gray-300
            text-[10px]
            font-mono
            uppercase
            tracking-[0.18em]
          "
        >
          My trekking map
        </span>
      </div>

      {/* LOCATION COUNT */}

      <div
        className="
          absolute
          top-4
          right-4
          z-[1000]
          hidden
          sm:flex
          items-center
          gap-2
          px-3
          py-2
          rounded-full
          border
          border-[#333]
          bg-[#171717]/85
          backdrop-blur-md
        "
      >
        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[#12c971]
            shadow-[0_0_8px_#12c971]
          "
        />

        <span
          className="
            text-gray-400
            text-[10px]
            font-mono
            uppercase
            tracking-wider
          "
        >
          {treks.length} locations
        </span>
      </div>

      {/* ACTIVE TREK */}

      {activeTrek && (
        <div
          className="
            absolute
            bottom-4
            left-4
            z-[1000]
            max-w-[240px]
            px-3
            py-2
            rounded-xl
            border
            border-[#333]
            bg-[#171717]/90
            backdrop-blur-md
          "
        >
          <p
            className="
              text-[9px]
              text-gray-500
              font-mono
              uppercase
              tracking-wider
            "
          >
            Selected trek
          </p>

          <p
            className="
              text-gray-100
              text-xs
              font-semibold
              mt-0.5
            "
          >
            {activeTrek.name}
          </p>
        </div>
      )}

      {/* EDGE VIGNETTE */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          z-[500]
        "
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(5,5,5,0.28) 100%)",
        }}
      />
    </div>
  );
}
