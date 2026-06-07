function RxSpinner({ variant = "teal", size = 100 }) {
  const isLight = variant === "light";

  return (
    <div className={`rx-spinner-container ${isLight ? "light" : "teal"}`}>
      <svg viewBox="0 0 500 500" width={size} height={size}>
        {isLight ? (
          <>
            <rect width="500" height="500" rx="108" fill="#FFFFFF" />
            <rect
              width="500"
              height="500"
              rx="108"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="10"
            />
          </>
        ) : (
          <rect width="500" height="500" rx="108" fill="#0FB8A9" />
        )}

        <g className="rx-spin">
          <path
            d="M 331.50,108.84 A 163,163 0 1,1 168.50,108.84"
            stroke={isLight ? "#0FB8A9" : "#FFFFFF"}
            strokeWidth="26"
            fill="none"
            strokeLinecap="round"
          />
          <polygon
            points="30,0 -12,18 -12,-18"
            transform="translate(168.50,108.84) rotate(-30.00)"
            fill={isLight ? "#0D1117" : "#162E5F"}
          />
        </g>

        <text
          x="250"
          y="318"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="188"
          fill={isLight ? "#0FB8A9" : "#FFFFFF"}
        >
          Rx
        </text>
      </svg>
    </div>
  );
}

export default RxSpinner;
