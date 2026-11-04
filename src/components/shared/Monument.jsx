/** The Smriti Soudho-inspired mark from the logo */
export function Monument({ className, animated = false, ...props }) {
  const parts = [
    ['#D71920', '14,112 48,56 36,112', 0.05],
    ['#F38020', '38,112 55,32 52,112', 0.15],
    ['#FBC111', '54,112 58,24 61,112', 0.25],
    ['#0E5B5C', '63,112 60,12 65,12 69,112', 0.35],
    ['#141414', '68,26 84,58 71,62', 0.55],
    ['#EE1B5B', '71,66 88,62 104,112 72,112', 0.45],
    ['#A4CB3A', '66,4 88,52 84,54 67,18', 0.7],
  ];
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false" {...props}>
      {parts.map(([fill, points, d]) => (
        <polygon key={points} fill={fill} points={points} className={animated ? 'lp' : undefined} style={animated ? { animationDelay: `${d}s` } : undefined} />
      ))}
    </svg>
  );
}
