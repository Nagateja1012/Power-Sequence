export const getColor = (code: string): string => {
  const colorMap: { [key: string]: string } = {
    R: "#fa6666", // Light Red
    B: "#accaff", // Light Blue
    G: "#a9e77f", // Light Green
    W: "#ffffff", // White
  };
  return colorMap[code] || "#ffffff";
};

export function arePointsInLine(points: number[][]): boolean {
  points.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    if (!(dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0))) {
      return false;
    }
  }

  if (points.length >= 3) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    for (let i = 2; i < points.length; i++) {
      const [x3, y3] = points[i];
      if ((y2 - y1) * (x3 - x1) !== (y3 - y1) * (x2 - x1)) {
        return false;
      }
    }
  }

  return true;
}
