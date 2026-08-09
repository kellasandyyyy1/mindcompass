import React from "react";
import { motion } from "motion/react";

interface MindCompassLogoProps {
  className?: string;
  size?: number | string;
  isAnimated?: boolean;
}

export default function MindCompassLogo({
  className = "",
  size = "100%",
  isAnimated = true,
}: MindCompassLogoProps) {
  // Let's model 10 key organic scribble loops that form the complex head scribble.
  // Each path has custom timing and direction for maximum natural variation.
  const scribbleLoops = [
    // Center cluster horizontal ellipse
    {
      id: "scribble-1",
      d: "M 250 150 C 190 140, 180 200, 240 210 C 300 220, 310 160, 250 150 Z",
      duration: 3.5,
      delay: 0.1,
      rotateDir: 1,
      scaleRange: [0.98, 1.02, 0.99, 1.01, 0.98],
    },
    // Left side loop sloping up
    {
      id: "scribble-2",
      d: "M 230 140 C 160 100, 150 170, 200 190 C 250 210, 270 150, 230 140 Z",
      duration: 4.2,
      delay: 0.5,
      rotateDir: -1,
      scaleRange: [1.02, 0.97, 1.01, 0.99, 1.02],
    },
    // Right side loop sloping up
    {
      id: "scribble-3",
      d: "M 270 140 C 340 100, 350 170, 300 190 C 250 210, 230 150, 270 140 Z",
      duration: 3.8,
      delay: 0.3,
      rotateDir: 1,
      scaleRange: [0.99, 1.03, 0.98, 1.01, 0.99],
    },
    // Top-focused large loop
    {
      id: "scribble-4",
      d: "M 250 120 C 230 50, 320 60, 300 120 C 280 180, 200 170, 250 120 Z",
      duration: 4.6,
      delay: 0.8,
      rotateDir: -1,
      scaleRange: [0.97, 1.01, 0.96, 1.02, 0.97],
    },
    // Broad bottom-back loop
    {
      id: "scribble-5",
      d: "M 250 180 C 180 190, 170 240, 250 240 C 330 240, 320 190, 250 180 Z",
      duration: 5.0,
      delay: 1.2,
      rotateDir: 1,
      scaleRange: [1.01, 0.99, 1.03, 0.97, 1.01],
    },
    // Top-left loop
    {
      id: "scribble-6",
      d: "M 220 120 C 170 70, 240 40, 260 110 C 280 180, 190 140, 220 120 Z",
      duration: 3.9,
      delay: 0.2,
      rotateDir: 1,
      scaleRange: [1.03, 0.98, 1.02, 0.97, 1.03],
    },
    // Loose hanging loop representing the loose string at the bottom-left
    {
      id: "scribble-loose",
      d: "M 240 220 C 200 230, 160 235, 175 220 C 190 205, 230 210, 240 220",
      duration: 2.8,
      delay: 0.0,
      rotateDir: -0.5,
      scaleRange: [1.01, 0.99, 1.01, 1.00, 1.01],
    },
    // Big diagonal center line loop
    {
      id: "scribble-7",
      d: "M 210 160 C 210 100, 310 110, 290 180 C 270 250, 190 190, 210 160 Z",
      duration: 4.4,
      delay: 0.7,
      rotateDir: -1,
      scaleRange: [0.98, 1.02, 0.97, 1.01, 0.98],
    },
    // Deep center cluster
    {
      id: "scribble-8",
      d: "M 250 160 C 220 120, 280 120, 270 170 C 260 220, 210 180, 250 160 Z",
      duration: 3.2,
      delay: 0.6,
      rotateDir: 1,
      scaleRange: [1.00, 1.02, 0.99, 1.01, 1.00],
    },
    // High vertical loop
    {
      id: "scribble-9",
      d: "M 255 100 C 210 40, 280 40, 275 100 C 270 160, 230 140, 255 100 Z",
      duration: 4.8,
      delay: 0.4,
      rotateDir: -1,
      scaleRange: [0.99, 1.01, 0.98, 1.02, 0.99],
    },
    // Wide horizontal layer loop
    {
      id: "scribble-10",
      d: "M 250 140 C 150 110, 350 110, 250 140 Z",
      duration: 5.5,
      delay: 1.0,
      rotateDir: 0.8,
      scaleRange: [1.02, 0.98, 1.01, 0.99, 1.02],
    }
  ];

  // Colors mapping directly to the provided premium image artwork.
  // These are a drawing, not a theme — identical in light and dark, like a
  // photo. The literals live in tokens.css §6 so no hex appears outside it.
  const colors = {
    tealBg: "var(--logo-teal-bg)",              // Textured clean teal
    yellowAura: "var(--logo-yellow-aura)",      // Rich mustard yellow circle background
    blazerGreen: "var(--logo-blazer-green)",    // Sage/minty green blazer
    strapDark: "var(--logo-strap-dark)",        // Dark hunter green/black shoulder straps
    strapGold: "var(--logo-strap-gold)",        // Gold adjuster/buckle highlights
    necklessTeal: "var(--logo-necklace-teal)",  // Second inner necklace
    necklessGold: "var(--logo-necklace-gold)",  // Primary golden chain
    skinPeach: "var(--logo-skin-peach)",        // Premium soft skin tone
    skinNails: "var(--logo-skin-nails)",        // Warm coral nails
    turtleneck: "var(--logo-turtleneck)",       // Linen off-white for top and shirt cuffs
    pantsBrown: "var(--logo-pants-brown)",      // Warm earth brown waistband/skirt bottom
    beltDark: "var(--logo-belt-dark)",          // Very dark moss belt edge
    scribbleBlack: "var(--logo-scribble-black)" // Deep forest black for scribble loops
  };

  return (
    <div 
      className={`relative inline-block overflow-hidden transition-shadow duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        id="mind-compass-artistic-logo"
        viewBox="0 0 500 500"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Step 2: Glowing Mustard Yellow Focus Circle in the background */}
        <motion.circle
          cx="250"
          cy="250"
          r="190"
          fill={colors.yellowAura}
          animate={
            isAnimated
              ? {
                  scale: [1, 1.015, 1, 0.985, 1],
                  opacity: [0.98, 1, 0.98, 0.97, 0.98],
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Step 3: Lower Body, Clothes, and Sleeves */}
        <g id="figure-clothing-layer">
          {/* Earth brown trousers/skirt showing at the very bottom layout */}
          <path
            d="M 170 415 L 330 415 L 340 500 L 160 500 Z"
            fill={colors.pantsBrown}
          />
          
          {/* Dark waistband edge */}
          <path
            d="M 180 415 L 320 415 L 325 435 L 175 435 Z"
            fill={colors.beltDark}
          />

          {/* Linen off-white inner chest shirt layer */}
          <path
            d="M 210 235 L 290 235 L 310 420 L 190 420 Z"
            fill={colors.turtleneck}
          />

          {/* Double Necklaces hanging on the chest shirt */}
          {/* Thin Teal chain */}
          <path
            d="M 226 235 Q 250 262 274 235"
            fill="none"
            stroke={colors.necklessTeal}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Golden necklace chain */}
          <path
            d="M 220 235 Q 250 295 280 235"
            fill="none"
            stroke={colors.necklessGold}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Central golden coin medallion */}
          <circle
            cx="250"
            cy="295"
            r="8"
            fill={colors.necklessGold}
            stroke="var(--logo-buckle-stroke)"
            strokeWidth="1"
          />

          {/* Left sleeve and Left side of Sage Green Blazer */}
          <path
            d="M 215 235 C 160 235, 135 260, 130 330 L 132 430 L 210 430 Z"
            fill={colors.blazerGreen}
          />

          {/* Right sleeve and Right side of Sage Green Blazer */}
          <path
            d="M 285 235 C 340 235, 365 260, 370 330 L 368 430 L 290 430 Z"
            fill={colors.blazerGreen}
          />

          {/* Symmetrical Hunter Green Shoulder/Backpack Straps with buckle adjusters */}
          {/* Left Strap */}
          <path
            d="M 165 242 L 165 315 L 180 430"
            fill="none"
            stroke={colors.strapDark}
            strokeWidth="14"
            strokeLinecap="square"
          />
          {/* Left golden buckle */}
          <rect
            x="159"
            y="300"
            width="12"
            height="14"
            rx="2"
            fill="none"
            stroke={colors.strapGold}
            strokeWidth="3.5"
          />

          {/* Right Strap */}
          <path
            d="M 335 242 L 335 315 L 320 430"
            fill="none"
            stroke={colors.strapDark}
            strokeWidth="14"
            strokeLinecap="square"
          />
          {/* Right golden buckle */}
          <rect
            x="329"
            y="300"
            width="12"
            height="14"
            rx="2"
            fill="none"
            stroke={colors.strapGold}
            strokeWidth="3.5"
          />

          {/* White Turtleneck Collar around neck */}
          <rect
            x="214"
            y="207"
            width="72"
            height="32"
            rx="4"
            fill={colors.turtleneck}
            stroke="var(--logo-ring-stroke)"
            strokeWidth="1.5"
          />
        </g>

        {/* Step 4: Crossed Arms, Fingers, and Details with exact aesthetic layers */}
        <g id="figure-crossed-hands">
          {/* Right forearm skin base crossing behind or in front */}
          <path
            d="M 195 390 Q 250 405 310 390 L 305 415 Q 250 430 190 415 Z"
            fill={colors.skinPeach}
          />
          {/* Gold bracelet/wearable on right wrist near the center layout */}
          <path
            d="M 290 393 L 295 412"
            fill="none"
            stroke={colors.strapGold}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Left arm sleeve cuff and skin elements folded over */}
          {/* White Linen cuffs sliding out */}
          <path
            d="M 175 393 L 182 396 L 178 418 L 171 414 Z"
            fill={colors.turtleneck}
          />
          <path
            d="M 325 393 L 318 396 L 322 418 L 329 414 Z"
            fill={colors.turtleneck}
          />

          {/* Left Hand resting on the Right shoulder strap region */}
          {/* Skin hand base */}
          <path
            d="M 305 390 Q 325 385 345 330 C 352 310, 362 315, 360 325 C 355 345, 335 395, 310 405 Z"
            fill={colors.skinPeach}
          />
          {/* Fingers with painted nails */}
          {/* Index Finger */}
          <path
            d="M 325 365 Q 340 338 358 322"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="358" cy="322" r="2.5" fill={colors.skinNails} />

          {/* Middle Finger */}
          <path
            d="M 315 372 Q 330 330 354 310"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="354" cy="310" r="2.5" fill={colors.skinNails} />
          {/* Golden ring on middle finger */}
          <ellipse
            cx="336"
            cy="342"
            rx="4"
            ry="2.5"
            fill="none"
            stroke={colors.strapGold}
            strokeWidth="2"
          />

          {/* Ring Finger */}
          <path
            d="M 308 376 Q 315 325 346 295"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="346" cy="295" r="2" fill={colors.skinNails} />

          {/* Pinky Finger */}
          <path
            d="M 303 382 Q 303 335 328 312"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="328" cy="312" r="1.5" fill={colors.skinNails} />


          {/* Right Hand resting on the Left shoulder strap region */}
          {/* Skin hand base */}
          <path
            d="M 195 390 Q 175 385 155 330 C 148 310, 138 315, 140 325 C 145 345, 165 395, 190 405 Z"
            fill={colors.skinPeach}
          />
          {/* Fingers with painted nails (mirror structure) */}
          {/* Index Finger */}
          <path
            d="M 175 365 Q 160 338 142 322"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="142" cy="322" r="2.5" fill={colors.skinNails} />

          {/* Middle Finger */}
          <path
            d="M 185 372 Q 170 330 146 310"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="146" cy="310" r="2.5" fill={colors.skinNails} />
          {/* Golden ring on middle finger */}
          <ellipse
            cx="164"
            cy="342"
            rx="4"
            ry="2.5"
            fill="none"
            stroke={colors.strapGold}
            strokeWidth="2"
          />

          {/* Ring Finger */}
          <path
            d="M 192 376 Q 185 325 154 295"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="154" cy="295" r="2" fill={colors.skinNails} />

          {/* Pinky Finger */}
          <path
            d="M 197 382 Q 197 335 172 312"
            fill="none"
            stroke={colors.skinPeach}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="172" cy="312" r="1.5" fill={colors.skinNails} />
        </g>

        {/* Step 5: The Head - Animated, Overlapping Scribbled Thought-Yarn Tangles */}
        <g id="figure-mind-scribble-head" className="cursor-pointer">
          {isAnimated ? (
            scribbleLoops.map((loop) => (
              <motion.path
                key={loop.id}
                d={loop.d}
                fill="none"
                stroke={colors.scribbleBlack}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  rotate: [0, (loop.rotateDir * 6), (loop.rotateDir * -5), 0],
                  scaleX: loop.scaleRange,
                  scaleY: [...loop.scaleRange].reverse(),
                  x: [0, (loop.rotateDir * 3), (loop.rotateDir * -2), 0],
                  y: [0, (loop.rotateDir * -3), (loop.rotateDir * 2), 0],
                }}
                whileHover={{
                  strokeWidth: 6,
                  stroke: "var(--logo-outline)",
                  transition: { duration: 0.2 }
                }}
                transition={{
                  duration: loop.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: loop.delay,
                }}
                style={{
                  transformOrigin: "250px 150px"
                }}
              />
            ))
          ) : (
            scribbleLoops.map((loop) => (
              <path
                key={loop.id}
                d={loop.d}
                fill="none"
                stroke={colors.scribbleBlack}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))
          )}
          
          {/* Small accent chaotic scribbles crossing the center of the head mask */}
          <motion.circle
            cx="250"
            cy="150"
            r="3"
            fill={colors.scribbleBlack}
            animate={isAnimated ? { scale: [1, 1.4, 0.9, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>
      </svg>
    </div>
  );
}
