/**
 * Squarified treemap layout.
 *
 * Lives here rather than inside the Skills component because it's pure geometry
 * with one hard invariant worth testing: the placed tiles must cover the whole
 * rectangle. Anything less and the map is quietly wasting space — which is very
 * hard to spot by eye and very easy to spot in a test.
 */
export type Rect = { x: number; y: number; w: number; h: number };
export type Placed = Rect & { index: number };
type Item = { value: number; index: number };

/** Worst aspect ratio in a row laid along a side of length `len`. */
function worstRatio(row: Item[], len: number) {
  if (!row.length) return Infinity;
  const s = row.reduce((a, b) => a + b.value, 0);
  const mx = Math.max(...row.map((x) => x.value));
  const mn = Math.min(...row.map((x) => x.value));
  return Math.max((len * len * mx) / (s * s), (s * s) / (len * len * mn));
}

export function squarify(items: Item[], rect: Rect): Placed[] {
  const result: Placed[] = [];
  const total = items.reduce((a, b) => a + b.value, 0);
  if (total <= 0 || !items.length) return result;

  // Scale weights into area units so a row's sum is directly an area.
  const area = rect.w * rect.h;
  const children = items.map((it) => ({ value: (it.value / total) * area, index: it.index }));
  const r = { ...rect };
  let row: Item[] = [];

  const place = (rw: Item[]) => {
    const s = rw.reduce((a, b) => a + b.value, 0);
    if (s <= 0) return;
    // The row is laid along the shorter side, which is also the side `len` that
    // worstRatio measured against — they must agree or tiles are mis-sized.
    if (r.w >= r.h) {
      const colw = s / r.h;
      let y = r.y;
      for (const it of rw) {
        const h = (it.value / s) * r.h;
        result.push({ index: it.index, x: r.x, y, w: colw, h });
        y += h;
      }
      r.x += colw;
      r.w -= colw;
    } else {
      const rowh = s / r.w;
      let x = r.x;
      for (const it of rw) {
        const wd = (it.value / s) * r.w;
        result.push({ index: it.index, x, y: r.y, w: wd, h: rowh });
        x += wd;
      }
      r.y += rowh;
      r.h -= rowh;
    }
  };

  while (children.length) {
    const c = children[0];
    const len = Math.min(r.w, r.h);
    if (!row.length || worstRatio([...row, c], len) <= worstRatio(row, len)) {
      row.push(c);
      children.shift();
    } else {
      place(row);
      row = [];
    }
  }
  if (row.length) place(row);
  return result;
}
