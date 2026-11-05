/** The brand mark, traced from the official icon. Shared by the seasons section. */
export const MARK = {
  red: '2.9,120.0 49.8,52.2 23.3,120.0',
  orange: '29.4,120.0 60.0,28.6 53.2,120.0',
  yellow: '58.0,120.0 62.4,16.7 70.3,120.0',
  teal: '63.1,11.6 68.2,17.7 78.1,120.0 70.9,120.0',
  green: '69.6,0.0 92.0,54.8 85.1,52.3 72.2,26.9',
  blackTop: '72.5,27.2 84.6,52.3 74.7,48.8',
  black: '75.3,52.7 88.1,57.2 82.5,113.9 81.6,113.9',
  pink: '89.2,57.6 94.0,59.3 117.1,120.0 83.6,120.0',
};

export function Monument({ className, animated = false, ...props }) {
  const parts = [
    ['#D71920', MARK.red, 0.05],
    ['#F38020', MARK.orange, 0.15],
    ['#FBC111', MARK.yellow, 0.25],
    ['#0E5B5C', MARK.teal, 0.35],
    ['#141414', MARK.black, 0.45],
    ['#EE1B5B', MARK.pink, 0.5],
    ['#141414', MARK.blackTop, 0.6],
    ['#A4CB3A', MARK.green, 0.7],
  ];
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false" {...props}>
      {parts.map(([fill, points, d]) => (
        <polygon key={points} fill={fill} points={points} className={animated ? 'lp' : undefined} style={animated ? { animationDelay: `${d}s` } : undefined} />
      ))}
    </svg>
  );
}
