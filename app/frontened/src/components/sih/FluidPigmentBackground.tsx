import React, { useEffect, useRef, useState } from "react";

/**
 * FluidPigmentBackground
 * 
 * High-performance, viscous fluid-marbled pigment background.
 * Simulates heavy dark navy (#050B12 - #101C29) and muted copper / amber-brown (#241B15 - #46301D)
 * pigments slowly flowing and folding into each other using multi-layered GPU domain warping.
 * 
 * - Continuous, non-repetitive, meditative flow
 * - 3-layer depth (deep background, midground marbled veins, foreground subtle veil)
 * - Restrained brightness & zero neon / water artifacts
 * - Auto-pauses on document hidden / reduced motion
 * - Includes graceful CSS gradient fallback if WebGL is unavailable
 */

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;

// Deterministic fast hash
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// 2D Quintic Hermite Value Noise for seamless organic continuity
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Rotational matrix to eliminate directional grain in octaves
const mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.04 + vec2(0.19, 0.37);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // ========================================================
  // 1. ZOOM OUT: Pulled-back camera framing for expansive,
  //    multi-formation composition showing multiple interlocking streams
  // ========================================================
  vec2 pZoom = p * 2.35;

  // Slightly faster, visibly alive, meditative viscous pigment flow speed
  float t = u_time * (0.050 * u_speed);

  // ========================================================
  // DOMAIN WARPING: Heavy pigment folding & advection
  // ========================================================
  
  // Layer 1 warp: Broad deep currents across the canvas
  vec2 q = vec2(
    fbm(pZoom * 1.05 + vec2(0.0, t * 0.28)),
    fbm(pZoom * 1.05 + vec2(4.7, 2.1 - t * 0.24))
  );

  // Layer 2 warp: Swirling marbled veins and curling eddies
  vec2 r = vec2(
    fbm(pZoom * 1.35 + 2.5 * q + vec2(1.8, 7.1 + t * 0.32)),
    fbm(pZoom * 1.35 + 2.5 * q + vec2(7.9, 2.8 - t * 0.26))
  );

  // Layer 3: High-order pigment density folds
  float f = fbm(pZoom * 1.55 + 2.9 * r + vec2(t * 0.18, -t * 0.20));

  // Layer 4: Crossing atmospheric fold for volumetric depth
  float crossFold = fbm(pZoom * 0.85 - 1.5 * q + vec2(-t * 0.14, t * 0.16));

  // ========================================================
  // COLOR PALETTE: Visible Historical Pigments & Deep Navy
  // ========================================================

  // Deep Navy / Blue-Black (~50-60% composition)
  vec3 cNavyDark = vec3(0.0235, 0.0471, 0.0745); // #060C13 base blue-black
  vec3 cBaseNavy = vec3(0.0431, 0.0824, 0.1294); // #0B1521 deep navy
  vec3 cRichNavy = vec3(0.0706, 0.1255, 0.1882); // #122030 rich blue
  vec3 cMidNavy  = vec3(0.0941, 0.1569, 0.2235); // #182839 soft navy slate

  // Dark Brown / Muted Copper (~25-35% composition - clearly visible at normal distance)
  vec3 cBrownDark  = vec3(0.2039, 0.1333, 0.0863); // #342216 dark espresso / walnut ink
  vec3 cCopper     = vec3(0.3137, 0.2000, 0.1216); // #50331F rich dark copper
  vec3 cCopperWarm = vec3(0.4118, 0.2588, 0.1490); // #694226 warm historical copper

  // Warm Transitional Amber / Golden-Brown (~10-15% boundary mixing)
  vec3 cAmberTrans  = vec3(0.4824, 0.3098, 0.1686); // #7B4F2B dark amber-copper
  vec3 cGoldenBrown = vec3(0.5490, 0.3569, 0.1922); // #8C5B31 warm golden-brown fold

  // ========================================================
  // COMPOSITION & PIGMENT FIELD DISTRIBUTION
  // Harmonic domain-warped pigment flow ensuring balanced distribution
  // of blue and copper streams across the ENTIRE viewport (including center)
  // ========================================================

  // Sweeping diagonal pigment current organically warped by eddies (r) and density (f)
  float wave = sin(pZoom.x * 1.35 + pZoom.y * 1.10 + 2.6 * r.x + 2.4 * r.y + 0.55 * f);
  float P = 0.48 + 0.52 * wave;

  // Secondary cross-current modulation to create organic width and eddy variations
  P += 0.12 * (crossFold - 0.5) + 0.08 * (q.x - q.y);

  // 1. Blue Zone Formation: smooth gradient across dark navy tones
  float navyTone = smoothstep(0.18, 0.72, q.y * 0.6 + f * 0.4);
  vec3 navyCol = mix(cBaseNavy, cRichNavy, navyTone);
  navyCol = mix(cNavyDark, navyCol, smoothstep(0.12, 0.52, r.x));
  navyCol = mix(navyCol, cMidNavy, clamp((r.y - 0.25) * 0.45, 0.0, 1.0));

  // 2. Copper / Brown Zone Formation: clearly distinguishable warm historical pigment
  float copperTone = smoothstep(0.25, 0.75, r.x * 0.7 + f * 0.5);
  vec3 copperCol = mix(cBrownDark, cCopper, copperTone);
  copperCol = mix(copperCol, cCopperWarm, clamp(f * 0.85, 0.0, 1.0));

  // 3. Transitional Zone: warm golden-brown & amber where pigments meet and mix
  float transitionBand = 1.0 - abs(P - 0.48) / 0.16;
  transitionBand = clamp(transitionBand, 0.0, 1.0);
  transitionBand = smoothstep(0.0, 1.0, transitionBand);
  vec3 transCol = mix(cAmberTrans, cGoldenBrown, clamp(f * 0.9, 0.0, 1.0));

  // 4. Two-Pigment Flow Blend:
  //    P < 0.42 -> Deep Navy (~55%)
  //    P > 0.58 -> Dark Copper & Brown (~33%)
  //    0.42 - 0.58 -> Soft transitional mixing (~12%)
  float blendFactor = smoothstep(0.40, 0.60, P);
  vec3 col = mix(navyCol, copperCol, blendFactor);

  // Infuse the warm amber & golden-brown transitional tones into the boundaries
  col = mix(col, transCol, transitionBand * 0.48);

  // Marbled creases: soft dark blue-black relief folds
  float crease = smoothstep(0.45, 0.49, f) - smoothstep(0.49, 0.53, f);
  col = mix(col, cNavyDark * 0.8, crease * 0.14);

  // Subtle crossing volumetric veil for layered 3D depth
  float veil = smoothstep(0.36, 0.68, crossFold);
  col = mix(col, mix(cBrownDark * 0.9, cCopper * 0.85, crossFold), veil * 0.12);

  // Atmospheric radial vignette to preserve high contrast for typography
  vec2 pNorm = (uv - 0.5) * vec2(1.15, 0.88);
  float vig = clamp(1.0 - dot(pNorm, pNorm) * 0.38, 0.60, 1.0);
  col *= vig;

  // Micro pigment grit / anti-banding dither
  float dither = (hash(gl_FragCoord.xy + fract(u_time * 0.05)) - 0.5) * (1.5 / 255.0);
  col += dither;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export interface FluidPigmentBackgroundProps {
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FluidPigmentBackground({
  speed = 1.0,
  className = "",
  style = {},
}: FluidPigmentBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    // Initialize WebGL context
    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
        powerPreference: "low-power",
      }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setUseFallback(true);
      return;
    }

    // Compile shader helper
    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("[FluidPigmentBackground] Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

    if (!vertShader || !fragShader) {
      setUseFallback(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setUseFallback(true);
      return;
    }

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[FluidPigmentBackground] Program link error:", gl.getProgramInfoLog(program));
      setUseFallback(true);
      return;
    }

    gl.useProgram(program);

    // Quad geometry (two triangles covering full screen)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uSpeedLoc = gl.getUniformLocation(program, "u_speed");

    let animationFrameId: number;
    let isVisible = !document.hidden;

    // Resize canvas buffer
    const resize = () => {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      // Soft clamp DPR for smooth pigment diffusion and minimal battery load
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.round(displayWidth * dpr);
      const height = Math.round(displayHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Handle visibility changes to conserve battery when tab is backgrounded
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        lastRenderTime = performance.now();
        render();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Render loop
    let lastRenderTime = performance.now();
    let accumulatedTime = 0;

    const render = () => {
      if (!isVisible) return;

      const now = performance.now();
      const delta = (now - lastRenderTime) / 1000;
      lastRenderTime = now;

      // Cap delta to prevent time jumps on tab switch
      accumulatedTime += Math.min(delta, 0.1);

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, accumulatedTime);
      gl.uniform1f(uSpeedLoc, speed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Draw initial frame
    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, [speed]);

  return (
    <div
      className={`fluid-pigment-container ${className}`.trim()}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        ...style,
      }}
    >
      {!useFallback ? (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
          }}
        />
      ) : (
        /* Graceful CSS Multi-Layer Viscous Pigment Fallback */
        <div
          className="fluid-pigment-fallback"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(ellipse 55% 45% at 75% 35%, rgba(105, 66, 38, 0.45), transparent 70%),
              radial-gradient(ellipse 60% 50% at 25% 65%, rgba(123, 79, 43, 0.35), transparent 70%),
              radial-gradient(ellipse 50% 40% at 50% 50%, rgba(52, 34, 22, 0.5), transparent 60%),
              radial-gradient(ellipse 80% 70% at 85% 85%, rgba(18, 32, 48, 0.8), transparent 75%),
              linear-gradient(135deg, #060c13 0%, #0b1521 40%, #122030 70%, #060c13 100%)
            `,
          }}
        />
      )}
    </div>
  );
}
