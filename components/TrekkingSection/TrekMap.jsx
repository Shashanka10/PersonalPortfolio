"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  "#22d3ee",
  "#f59e0b",
  "#a78bfa",
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

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 2 - 1;

      positions[i * 3 + 1] = Math.random() * 2 - 1;

      positions[i * 3 + 2] = Math.random();

      sizes[i] = Math.random() * 2.5 + 0.5;
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
              (1.0 +
                sin(uTime * 1.5) * 0.25);

            gl_Position =
              projectionMatrix *
              mvPosition;
          }
        `,

      fragmentShader: `
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
       Grid
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
       Glow
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
              sin(uTime * 0.8) *
              0.15;

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

    popupAnchor: [active ? 18 : 14, 0],
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
    <div
      className="
        trek-popup-content
        w-full
        max-w-[250px]
        sm:max-w-[260px]
      "
      onMouseEnter={() => {
        window.dispatchEvent(
          new CustomEvent("trek-popup-enter", {
            detail: trek.id,
          }),
        );
      }}
      onMouseLeave={() => {
        window.dispatchEvent(
          new CustomEvent("trek-popup-leave", {
            detail: trek.id,
          }),
        );
      }}
    >
      {/* Region */}
      <div
        className="
          flex
          items-center
          gap-1.5
          mb-1.5
          text-[9px]
          sm:text-[10px]
          font-mono
          uppercase
          tracking-[0.15em]
          sm:tracking-widest
        "
        style={{ color }}
      >
        <Mountain size={11} className="shrink-0" />

        <span className="truncate">{trek.region}</span>
      </div>

      {/* Title */}
      <h3
        className="
          text-white
          font-bold
          text-sm
          sm:text-base
          leading-tight
          break-words
        "
      >
        {trek.name}
      </h3>

      {/* Metadata */}
      <div
        className="
          flex
          flex-wrap
          gap-1.5
          mt-3
        "
      >
        {trek.altitude && (
          <span
            className="trek-popup-tag whitespace-nowrap"
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
          <span className="trek-popup-tag whitespace-nowrap">
            {trek.distanceKm} km
          </span>
        )}

        {trek.days && (
          <span className="trek-popup-tag whitespace-nowrap">
            {trek.days} days
          </span>
        )}
      </div>

      {/* Story */}
      {trek.story && (
        <p
          className="
            mt-3
            text-gray-400
            text-[11px]
            sm:text-xs
            leading-relaxed
            break-words
          "
        >
          {trek.story}
        </p>
      )}

      {/* View Trek */}
      <button
        type="button"
        onClick={() => onSelect(trek.id)}
        className="
          group
          mt-4
          w-full
          flex
          items-center
          justify-between
          gap-3
          cursor-pointer
          rounded-lg
          border
          px-3
          py-2
          min-h-[36px]
          text-gray-400
          text-[10px]
          font-mono
          uppercase
          tracking-wider
          transition-all
          duration-300
          touch-manipulation
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
          className="
            shrink-0
            transition-transform
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
          style={{ color }}
        />
      </button>
    </div>
  );
}

/* =========================================================
   HOVER POPUP MARKER
========================================================= */

function TrekMarker({ trek, color, active, onSelect }) {
  const markerRef = useRef(null);

  const closeTimeoutRef = useRef(null);

  const [popupOpen, setPopupOpen] = useState(false);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);

      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();

    closeTimeoutRef.current = setTimeout(() => {
      setPopupOpen(false);
    }, 180);
  };

  const handleMarkerEnter = () => {
    cancelClose();
    setPopupOpen(true);
  };

  const handleMarkerLeave = () => {
    scheduleClose();
  };

  useEffect(() => {
    return () => {
      cancelClose();
    };
  }, []);

  useEffect(() => {
    const handlePopupEnter = (event) => {
      if (event.detail !== trek.id) return;

      cancelClose();
    };

    const handlePopupLeave = (event) => {
      if (event.detail !== trek.id) return;

      scheduleClose();
    };

    window.addEventListener("trek-popup-enter", handlePopupEnter);

    window.addEventListener("trek-popup-leave", handlePopupLeave);

    return () => {
      window.removeEventListener("trek-popup-enter", handlePopupEnter);

      window.removeEventListener("trek-popup-leave", handlePopupLeave);
    };
  }, [trek.id]);

  /*
   * Keep popup open when Leaflet
   * itself considers it open.
   */
  useEffect(() => {
    const marker = markerRef.current;

    if (!marker) return;

    const handlePopupOpen = () => {
      cancelClose();
    };

    const handlePopupClose = () => {
      setPopupOpen(false);
    };

    marker.on("popupopen", handlePopupOpen);

    marker.on("popupclose", handlePopupClose);

    return () => {
      marker.off("popupopen", handlePopupOpen);

      marker.off("popupclose", handlePopupClose);
    };
  }, []);

  /*
   * Explicitly open/close the
   * Leaflet popup based on React state.
   */
  useEffect(() => {
    const marker = markerRef.current;

    if (!marker) return;

    if (popupOpen && !marker.isPopupOpen()) {
      marker.openPopup();
    }

    if (!popupOpen && marker.isPopupOpen()) {
      marker.closePopup();
    }
  }, [popupOpen]);

  return (
    <Marker
      ref={markerRef}
      position={trek.coords}
      icon={createTrekIcon(color, active)}
      eventHandlers={{
        mouseover: handleMarkerEnter,

        mouseout: handleMarkerLeave,
      }}
    >
      <Popup
        closeButton={false}
        offset={[140, 80]}
        autoPan={false}
        className="trek-hover-popup"
      >
        <TrekPopup trek={trek} color={color} onSelect={onSelect} />
      </Popup>
    </Marker>
  );
}

/* =========================================================
   MAIN MAP
========================================================= */

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
        border
        border-[#2e2e2e]
        bg-[#141414]
      "
    >
      {/* THREE.JS */}

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

        {treks.map((trek) => {
          const color = trekColorsMap[trek.id];

          const active = trek.id === activeId;

          return (
            <TrekMarker
              key={trek.id}
              trek={trek}
              color={color}
              active={active}
              onSelect={onSelectTrek}
            />
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

      {/* VIGNETTE */}

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
