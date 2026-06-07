function RxRecallLogoLight({ size = 160 }) {
  return (
    <div className="rx-logo-light-container">
      <svg viewBox="0 0 500 500" width={size} height={size}>
        <rect width="500" height="500" rx="108" fill="#FFFFFF" />
        <rect
          width="500"
          height="500"
          rx="108"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="10"
        />
        <g>
          <path
            d="M 331.50,108.84 A 163,163 0 1,1 168.50,108.84"
            stroke="#0FB8A9"
            strokeWidth="26"
            fill="none"
            strokeLinecap="round"
          />
          <polygon
            points="30,0 -12,18 -12,-18"
            transform="translate(168.50,108.84) rotate(-30.00)"
            fill="#0D1117"
          />
        </g>
        <text
          x="250"
          y="318"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="188"
          fill="#0FB8A9"
        >
          Rx
        </text>
      </svg>

      <div className="rx-logo-light-text">
        <div className="rx-light-title">
          Rx<span>Recall</span>
        </div>
        <span className="rx-light-subtitle">Crisp</span>
      </div>
    </div>
  );
}

export default RxRecallLogoLight;
