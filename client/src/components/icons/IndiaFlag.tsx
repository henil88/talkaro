// IndiaFlagIcon
// React component that renders an SVG of the Indian national flag (3:2 ratio)
// Props:
//   size - number or string for the rendered height in pixels (default 24). Width is computed to keep 3:2 ratio.
//   title - accessible title (default "Indian flag")
//   className - additional CSS classes to apply to the <svg>
//   ...props - passed through to the root <svg>

export default function IndiaFlagIcon({
  size = 24,
  title = "Indian flag",
  className = "",
  ...props
}) {
  // The viewBox uses a 3:2 ratio: width 300, height 200. We compute width from requested height (size).
  const height = typeof size === "number" ? size : parseInt(size, 10) || 24;
  const width = Math.round((3 / 2) * height);

  // Chakra (navy wheel) parameters
  const cx = 150;
  const cy = 100;
  const chakraRadius = 30; // radius of the circle
//   const spokeInner = 0; // inner offset from center for spokes (0 = from center)
  const spokeOuter = chakraRadius - 2; // length of spoke will go to just inside the circle's stroke
  const spokeCount = 24;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 300 200"
      role="img"
      aria-label={title}
      className={className}
      {...props}
    >
      <title>{title}</title>

      {/* Top saffron band */}
      <rect x="0" y="0" width="300" height="66.6667" fill="#FF9933" />

      {/* Middle white band */}
      <rect x="0" y="66.6667" width="300" height="66.6667" fill="#FFFFFF" />

      {/* Bottom green band */}
      <rect x="0" y="133.3334" width="300" height="66.6666" fill="#138808" />

      {/* Ashoka Chakra - navy blue (approx #000080) */}
      {/* outer circle (stroke) */}
      <circle
        cx={cx}
        cy={cy}
        r={chakraRadius}
        fill="none"
        stroke="#000080"
        strokeWidth="6"
      />

      {/* inner small circle for hub */}
      <circle cx={cx} cy={cy} r="3" fill="#000080" />

      {/* spokes: generated dynamically (24 spokes, every 15 degrees) */}
      {Array.from({ length: spokeCount }).map((_, i) => {
        const angle = (360 / spokeCount) * i; // degrees
        // draw a spoke as a line from center outward
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - spokeOuter}
            stroke="#000080"
            strokeWidth={2}
            strokeLinecap="round"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}

      {/* Small decorative circle just inside the stroke to give wheel look */}
      <circle
        cx={cx}
        cy={cy}
        r={chakraRadius - 8}
        fill="none"
        stroke="#000080"
        strokeWidth="1"
      />
    </svg>
  );
}
