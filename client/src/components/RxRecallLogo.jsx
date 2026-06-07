function RxRecallLogo({ size = 160 }) {
  return (
    <div className="rx-logo-container">
      <svg viewBox="0 0 500 500" width={size} height={size}>
        <rect width="500" height="500" rx="108" fill="#0FB8A9" />
        <g>
          <path
            d="M 331.50,108.84 A 163,163 0 1,1 168.50,108.84"
            stroke="#FFFFFF"
            strokeWidth="26"
            fill="none"
            strokeLinecap="round"
          />
          <polygon
            points="30,0 -12,18 -12,-18"
            transform="translate(168.50,108.84) rotate(-30.00)"
            fill="#162E5F"
          />
        </g>
        <text
          x="250"
          y="318"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="188"
          fill="#FFFFFF"
        >
          Rx
        </text>
      </svg>

      <div className="rx-logo-text">
        <div className="rx-title">
          Rx<span>Recall</span>
        </div>
      </div>
    </div>
  );
}

export default RxRecallLogo;
