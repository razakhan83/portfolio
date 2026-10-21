export default function HeroIllustration({
  className = "w-full h-auto max-w-md lg:max-w-lg mx-auto",
}: {
  className?: string;
}) {
  return (
    <div className="relative flex items-center justify-center select-none">
      <svg
        viewBox="0 0 520 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Decorative thin 1px outline circle overlapping lower-left per DESIGN.md */}
        <circle
          cx="170"
          cy="260"
          r="150"
          stroke="#008080"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.45"
          fill="none"
        />

        {/* Ambient subtle secondary circle */}
        <circle
          cx="380"
          cy="130"
          r="60"
          stroke="#DED9BE"
          strokeWidth="1"
          fill="none"
        />

        {/* Desk top */}
        <rect
          x="70"
          y="310"
          width="380"
          height="12"
          rx="6"
          fill="#004C4C"
        />
        {/* Desk chamfer / trim */}
        <rect
          x="80"
          y="322"
          width="360"
          height="4"
          fill="#5A6B62"
          opacity="0.3"
        />

        {/* Desk legs */}
        <rect x="110" y="326" width="8" height="94" rx="3" fill="#5A6B62" />
        <rect x="402" y="326" width="8" height="94" rx="3" fill="#5A6B62" />
        {/* Horizontal floor crossbar */}
        <rect x="110" y="390" width="300" height="4" rx="2" fill="#DED9BE" />

        {/* Developer Chair Backrest (behind developer) */}
        <rect
          x="225"
          y="180"
          width="70"
          height="100"
          rx="12"
          fill="#FFFEF7"
          stroke="#DED9BE"
          strokeWidth="2"
        />
        <rect x="256" y="280" width="8" height="40" fill="#5A6B62" />

        {/* Developer Character */}
        {/* Head & Hair */}
        <ellipse cx="260" cy="120" rx="26" ry="29" fill="#004C4C" />
        {/* Hair geometric sweep */}
        <path
          d="M234 115 C234 95, 250 86, 268 86 C282 86, 290 94, 290 106 C282 104, 272 108, 266 112 C258 117, 248 116, 234 115 Z"
          fill="#008080"
        />
        {/* Face profile/jaw (flat minimal silhouette) */}
        <path
          d="M238 120 C238 138, 248 152, 260 152 C272 152, 282 138, 282 120 Z"
          fill="#FFFEF7"
        />
        {/* Developer Glasses (minimal clean geometric frame) */}
        <rect
          x="244"
          y="114"
          width="13"
          height="9"
          rx="2"
          stroke="#004C4C"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="263"
          y="114"
          width="13"
          height="9"
          rx="2"
          stroke="#004C4C"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="257"
          y1="118"
          x2="263"
          y2="118"
          stroke="#004C4C"
          strokeWidth="1.5"
        />

        {/* Neck */}
        <rect x="253" y="148" width="14" height="16" fill="#FFFEF7" />

        {/* Torso / Shirt */}
        <path
          d="M220 178 C220 166, 236 160, 260 160 C284 160, 300 166, 300 178 L308 260 L212 260 Z"
          fill="#008080"
        />
        {/* Collar accent */}
        <path
          d="M250 162 L260 174 L270 162"
          stroke="#004C4C"
          strokeWidth="2"
          fill="none"
        />

        {/* Left and Right Arms reaching forward to keyboard */}
        <path
          d="M220 188 L195 240 L235 275 L250 270 L215 238 Z"
          fill="#004C4C"
        />
        <path
          d="M300 188 L325 240 L285 275 L270 270 L305 238 Z"
          fill="#004C4C"
        />

        {/* Hands on keyboard */}
        <ellipse cx="242" cy="275" rx="7" ry="5" fill="#FFFEF7" />
        <ellipse cx="278" cy="275" rx="7" ry="5" fill="#FFFEF7" />

        {/* Modern Laptop on Desk */}
        {/* Laptop Stand / Base */}
        <polygon
          points="215,310 305,310 295,290 225,290"
          fill="#5A6B62"
          opacity="0.25"
        />
        <rect
          x="210"
          y="288"
          width="100"
          height="5"
          rx="2"
          fill="#5A6B62"
        />
        {/* Laptop Keyboard base */}
        <polygon
          points="218,288 302,288 316,306 204,306"
          fill="#FFFEF7"
          stroke="#DED9BE"
          strokeWidth="1.5"
        />
        {/* Keyboard keys area */}
        <polygon
          points="224,290 296,290 308,300 212,300"
          fill="#004C4C"
          opacity="0.15"
        />
        {/* Trackpad */}
        <rect
          x="248"
          y="301"
          width="24"
          height="4"
          rx="1"
          fill="#DED9BE"
        />

        {/* Laptop Screen (tilted up) */}
        <polygon
          points="200,195 320,195 306,288 214,288"
          fill="#004C4C"
          rx="4"
        />
        {/* Inner screen display area */}
        <polygon
          points="206,201 314,201 302,282 218,282"
          fill="#FFFEF7"
        />
        {/* Code editor syntax lines on screen */}
        <line
          x1="222"
          y1="214"
          x2="250"
          y2="214"
          stroke="#008080"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="256"
          y1="214"
          x2="282"
          y2="214"
          stroke="#5A6B62"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="230"
          y1="224"
          x2="270"
          y2="224"
          stroke="#004C4C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="230"
          y1="234"
          x2="292"
          y2="234"
          stroke="#008080"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="240"
          y1="244"
          x2="265"
          y2="244"
          stroke="#5A6B62"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="240"
          y1="254"
          x2="285"
          y2="254"
          stroke="#004C4C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="222"
          y1="264"
          x2="242"
          y2="264"
          stroke="#008080"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Desk Accessories */}
        {/* Ceramic Coffee Mug */}
        <rect
          x="346"
          y="288"
          width="16"
          height="22"
          rx="3"
          fill="#008080"
        />
        {/* Mug handle */}
        <path
          d="M362 292 C368 292, 368 304, 362 304"
          stroke="#008080"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Small desk plant (succulent in pot) */}
        {/* Pot */}
        <polygon
          points="136,310 156,310 152,294 140,294"
          fill="#FFFEF7"
          stroke="#DED9BE"
          strokeWidth="1"
        />
        {/* Succulent leaves */}
        <path
          d="M146 294 C140 285, 148 274, 146 270 C150 276, 155 284, 146 294 Z"
          fill="#008080"
        />
        <path
          d="M142 292 C135 288, 134 278, 137 274 C140 280, 143 286, 142 292 Z"
          fill="#004C4C"
        />
        <path
          d="M150 292 C157 288, 158 278, 155 274 C152 280, 149 286, 150 292 Z"
          fill="#5A6B62"
        />
      </svg>
    </div>
  );
}
