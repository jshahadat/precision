import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Plus, X, Lightbulb, Box } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import preview3D from "@/assets/3d-preview.jpg";

type Direction = "North" | "South" | "East" | "West";
type RoomType = "Bedroom" | "Office" | "Kitchen" | "Living";

const directions: Direction[] = ["North", "South", "East", "West"];
const roomTypes: RoomType[] = ["Bedroom", "Office", "Kitchen", "Living"];

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

interface Opening {
  id: string;
  wall: Direction;
  // position 0..1 along the wall, length in feet
  pos: number;
  len: number;
}

const opposite = (d: Direction): Direction =>
  (({ North: "South", South: "North", East: "West", West: "East" }) as const)[
    d
  ];

// Convert wall + pos + len → segment in room coords
const openingSegment = (op: Opening, W: number, H: number) => {
  const wallLen = op.wall === "North" || op.wall === "South" ? W : H;
  const start = Math.max(
    0,
    Math.min(wallLen - op.len, op.pos * wallLen - op.len / 2),
  );
  const end = start + op.len;
  switch (op.wall) {
    case "North":
      return { x1: start, y1: 0, x2: end, y2: 0 };
    case "South":
      return { x1: start, y1: H, x2: end, y2: H };
    case "West":
      return { x1: 0, y1: start, x2: 0, y2: end };
    case "East":
      return { x1: W, y1: start, x2: W, y2: end };
  }
};

// Returns whether a rect placed against `wall` overlaps the given opening on the same wall
const overlapsOpening = (
  wall: Direction,
  rect: { x: number; y: number; w: number; h: number },
  openings: Opening[],
  W: number,
  H: number,
): boolean => {
  return openings.some((op) => {
    if (op.wall !== wall) return false;
    const seg = openingSegment(op, W, H);
    if (wall === "North" || wall === "South") {
      return !(rect.x + rect.w < seg.x1 || rect.x > seg.x2);
    } else {
      return !(rect.y + rect.h < seg.y1 || rect.y > seg.y2);
    }
  });
};

// Pick an offset along a wall that avoids openings
const placeOnWall = (
  wall: Direction,
  longSide: number,
  shortSide: number,
  W: number,
  H: number,
  openings: Opening[],
  margin = 0.4,
): Rect | null => {
  const wallLen = wall === "North" || wall === "South" ? W : H;
  const candidates = [
    (wallLen - longSide) / 2,
    margin,
    wallLen - longSide - margin,
    wallLen * 0.25,
    wallLen * 0.6,
  ];
  for (const off of candidates) {
    if (off < 0 || off + longSide > wallLen) continue;
    let rect: { x: number; y: number; w: number; h: number };
    switch (wall) {
      case "North":
        rect = { x: off, y: margin, w: longSide, h: shortSide };
        break;
      case "South":
        rect = { x: off, y: H - shortSide - margin, w: longSide, h: shortSide };
        break;
      case "West":
        rect = { x: margin, y: off, w: shortSide, h: longSide };
        break;
      case "East":
        rect = { x: W - shortSide - margin, y: off, w: shortSide, h: longSide };
        break;
    }
    if (!overlapsOpening(wall, rect, openings, W, H))
      return { ...rect, label: "" };
  }
  return null;
};

interface LayoutResult {
  furniture: Rect[];
  insights: string[];
}

const computeLayout = (
  W: number,
  H: number,
  door: Direction,
  openings: Opening[],
  room: RoomType,
): LayoutResult => {
  const windowWalls = openings.map((o) => o.wall);
  const allWalls: Direction[] = ["North", "South", "East", "West"];
  const freeWalls = allWalls.filter((d) => d !== door);
  const insights: string[] = [];

  const pickWall = (
    preferOpposite: Direction,
    avoid: Direction[] = [],
  ): Direction => {
    const order: Direction[] = [
      opposite(preferOpposite),
      ...freeWalls.filter((d) => !windowWalls.includes(d)),
      ...freeWalls,
    ];
    const seen = new Set<Direction>();
    for (const d of order) {
      if (avoid.includes(d) || seen.has(d)) continue;
      seen.add(d);
      if (d !== door) return d;
    }
    return opposite(door);
  };

  const furniture: Rect[] = [];

  if (room === "Bedroom") {
    const bedWall = pickWall(door);
    const bedW = Math.min(W * 0.55, 6.5);
    const bedH = Math.min(H * 0.45, 6.8);
    const bed = placeOnWall(bedWall, bedW, bedH, W, H, openings);
    if (bed) furniture.push({ ...bed, label: "BED" });
    insights.push(
      `Bed placed on the ${bedWall.toLowerCase()} wall — opposite the door for a calm command position.`,
    );

    const tvWall = opposite(bedWall);
    const tv = placeOnWall(tvWall, Math.min(W * 0.5, 5), 0.5, W, H, openings);
    if (tv) furniture.push({ ...tv, label: "TV UNIT" });
    insights.push(
      "3 ft minimum clearance maintained between the bed footboard and the TV unit.",
    );

    const wardrobeWall = pickWall(bedWall, [bedWall, tvWall, door]);
    const wardrobe = placeOnWall(
      wardrobeWall,
      Math.min(H * 0.55, 6.5),
      0.7,
      W,
      H,
      openings,
    );
    if (wardrobe) furniture.push({ ...wardrobe, label: "WARDROBE" });
    insights.push(
      `Wardrobe routed to the ${wardrobeWall.toLowerCase()} wall, clear of windows for full-height storage.`,
    );
  } else if (room === "Office") {
    const windowWall = openings[0]?.wall ?? "North";
    const deskWall = pickWall(door, [windowWall]);
    const desk = placeOnWall(
      deskWall,
      Math.min(W * 0.55, 6),
      2.5,
      W,
      H,
      openings,
    );
    if (desk) furniture.push({ ...desk, label: "EXEC DESK" });
    insights.push(
      `Executive desk faces ${windowWall.toLowerCase()} — natural light enters from the side to avoid screen glare.`,
    );

    // Visitor chairs near desk
    const chairsWall = opposite(deskWall);
    const chairs = placeOnWall(
      chairsWall,
      Math.min(W * 0.4, 4),
      1.8,
      W,
      H,
      openings,
    );
    if (chairs) furniture.push({ ...chairs, label: "VISITOR CHAIRS" });
    insights.push(
      "Visitor chairs aligned across the desk on the principal axis — formal and symmetric.",
    );

    const cabinetWall = pickWall(deskWall, [deskWall, chairsWall, door]);
    const cabinet = placeOnWall(
      cabinetWall,
      Math.min(H * 0.4, 4.5),
      0.8,
      W,
      H,
      openings,
    );
    if (cabinet) furniture.push({ ...cabinet, label: "FILING CABINET" });
    insights.push(
      "Filing cabinet on the rear wall keeps the circulation path between door and desk unobstructed.",
    );
  } else if (room === "Kitchen") {
    // L-shape vs straight based on dimensions
    const isL = Math.min(W, H) >= 8 && Math.max(W, H) >= 10;
    const counterWall = pickWall(door);
    const c1 = placeOnWall(
      counterWall,
      Math.min(W * 0.85, W - 1),
      2,
      W,
      H,
      openings,
    );
    if (c1) furniture.push({ ...c1, label: "COUNTER" });
    if (isL) {
      const sideWall = pickWall(counterWall, [counterWall, door]);
      const c2 = placeOnWall(sideWall, Math.min(H * 0.6, 7), 2, W, H, openings);
      if (c2) furniture.push({ ...c2, label: "COOKTOP / SINK" });
      insights.push(
        "L-shaped layout selected — efficient work-triangle between sink, cooktop and fridge.",
      );
    } else {
      insights.push(
        "Straight-line galley layout selected — optimal for narrow footprints.",
      );
    }
    insights.push(
      "4 ft clearance preserved in front of the counter for two-cook circulation.",
    );
    insights.push(
      "Counters routed away from window line so wall-cabinets do not block daylight.",
    );
  } else {
    // Living
    const sofaWall = pickWall(door);
    const sofa = placeOnWall(sofaWall, Math.min(W * 0.6, 8), 3, W, H, openings);
    if (sofa) furniture.push({ ...sofa, label: "SOFA" });
    insights.push(
      `Sofa placed on the ${sofaWall.toLowerCase()} wall — anchors the seating arrangement.`,
    );

    const tvWall = opposite(sofaWall);
    const tv = placeOnWall(tvWall, Math.min(W * 0.5, 6), 0.5, W, H, openings);
    if (tv) furniture.push({ ...tv, label: "MEDIA UNIT" });
    insights.push(
      "Media unit faces the sofa with 8 ft viewing distance for comfort.",
    );

    const accentWall = pickWall(sofaWall, [sofaWall, tvWall, door]);
    const accent = placeOnWall(
      accentWall,
      Math.min(H * 0.4, 4),
      1.2,
      W,
      H,
      openings,
    );
    if (accent) furniture.push({ ...accent, label: "ACCENT CONSOLE" });
    insights.push(
      "Accent console keeps a free traffic path between entry door and seating.",
    );
  }

  return { furniture, insights: insights.slice(0, 3) };
};

const LayoutPlannerSection = () => {
  const [room, setRoom] = useState<RoomType>("Bedroom");
  const [length, setLength] = useState<number>(14);
  const [width, setWidth] = useState<number>(12);
  const [door, setDoor] = useState<Direction>("South");
  const [openings, setOpenings] = useState<Opening[]>([
    { id: "w1", wall: "East", pos: 0.5, len: 4 },
  ]);
  const [generated, setGenerated] = useState(false);

  const addWindow = () => {
    if (openings.length >= 3) return;
    const used = new Set(openings.map((o) => o.wall));
    const next = directions.find((d) => d !== door && !used.has(d)) ?? "North";
    setOpenings([
      ...openings,
      { id: `w${Date.now()}`, wall: next, pos: 0.5, len: 4 },
    ]);
  };

  const updateWindow = (id: string, patch: Partial<Opening>) =>
    setOpenings((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    );

  const removeWindow = (id: string) =>
    setOpenings((prev) => prev.filter((o) => o.id !== id));

  const { furniture, insights } = useMemo(
    () => computeLayout(length, width, door, openings, room),
    [length, width, door, openings, room],
  );

  // SVG sizing
  const PAD = 44;
  const MAX = 540;
  const scale = Math.min(MAX / length, MAX / width);
  const Wpx = length * scale;
  const Hpx = width * scale;
  const svgW = Wpx + PAD * 2;
  const svgH = Hpx + PAD * 2;
  const toPx = (v: number) => v * scale;

  const doorOpening: Opening = { id: "door", wall: door, pos: 0.5, len: 3 };
  const doorSeg = openingSegment(doorOpening, length, width);

  return (
    <section id="planner" className="py-24 bg-charcoal-light/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">
            AI Multi-Space Planner
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            Architectural Layouts{" "}
            <span className="text-gold-gradient">Engineered</span>
          </h2>
          <p className="font-body text-muted-foreground">
            Configure any space — bedroom, office, kitchen or living. Add up to
            three windows and a main door, and we&apos;ll generate a
            clearance-aware floor plan with engineering insights.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded p-6 space-y-5 h-fit"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Compass className="w-4 h-4 text-primary" />
              <span className="font-heading text-sm tracking-widest uppercase text-foreground">
                Smart Input Panel
              </span>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                Room Type
              </Label>
              <Select
                value={room}
                onValueChange={(v) => setRoom(v as RoomType)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r === "Office"
                        ? "Executive Office"
                        : r === "Living"
                          ? "Living Room"
                          : r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Length (ft)
                </Label>
                <Input
                  type="number"
                  min={6}
                  max={40}
                  value={length}
                  onChange={(e) =>
                    setLength(Math.max(6, Number(e.target.value) || 0))
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Width (ft)
                </Label>
                <Input
                  type="number"
                  min={6}
                  max={40}
                  value={width}
                  onChange={(e) =>
                    setWidth(Math.max(6, Number(e.target.value) || 0))
                  }
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                Main Door
              </Label>
              <Select
                value={door}
                onValueChange={(v) => setDoor(v as Direction)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {directions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Windows ({openings.length}/3)
                </Label>
                <button
                  type="button"
                  onClick={addWindow}
                  disabled={openings.length >= 3}
                  className="text-[11px] tracking-widest uppercase text-primary inline-flex items-center gap-1 disabled:opacity-40 hover:text-gold-light transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Window
                </button>
              </div>

              <div className="space-y-2">
                {openings.map((op, i) => (
                  <div
                    key={op.id}
                    className="border border-border/70 rounded p-2 grid grid-cols-[1fr_auto] gap-2 items-center"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={op.wall}
                        onValueChange={(v) =>
                          updateWindow(op.id, { wall: v as Direction })
                        }
                      >
                        <SelectTrigger className="h-9 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {directions.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        min={2}
                        max={10}
                        step={0.5}
                        value={op.len}
                        onChange={(e) =>
                          updateWindow(op.id, {
                            len: Math.max(2, Number(e.target.value) || 2),
                          })
                        }
                        className="h-9 text-xs"
                        placeholder="Width ft"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeWindow(op.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      aria-label={`Remove window ${i + 1}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {openings.length === 0 && (
                  <p className="text-[11px] text-muted-foreground/70 italic">
                    No windows — add up to 3 on different walls.
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setGenerated(true)}
              className="w-full bg-gold-gradient text-primary-foreground font-body text-sm font-semibold uppercase tracking-widest py-3 rounded inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              Generate Architectural Layout
            </button>
          </motion.div>

          {/* Schematic + outputs */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-charcoal border border-border rounded p-4 md:p-6 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 relative">
                <span>PSI / {room.toUpperCase()}-PLAN / 01</span>
                <span>
                  Scale 1:50 — {length}′ × {width}′
                </span>
              </div>

              <div className="relative flex items-center justify-center">
                {!generated ? (
                  <div className="aspect-[4/3] w-full flex flex-col items-center justify-center text-center px-8 border border-dashed border-border/60 rounded">
                    <Compass className="w-10 h-10 text-primary/60 mb-4" />
                    <p className="font-heading text-xl text-foreground mb-2">
                      Awaiting Configuration
                    </p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Set your room, dimensions and openings, then click{" "}
                      <span className="text-primary">
                        Generate Architectural Layout
                      </span>
                      .
                    </p>
                  </div>
                ) : (
                  <svg
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    className="w-full h-auto"
                    style={{ maxHeight: 620 }}
                  >
                    <defs>
                      <pattern
                        id="hatch"
                        patternUnits="userSpaceOnUse"
                        width="6"
                        height="6"
                        patternTransform="rotate(45)"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="6"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1"
                          opacity="0.4"
                        />
                      </pattern>
                    </defs>

                    {/* Compass */}
                    <g transform={`translate(${svgW - 50}, 52)`}>
                      <circle
                        r="22"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.8"
                        opacity="0.6"
                      />
                      <text
                        y="-26"
                        textAnchor="middle"
                        fontSize="10"
                        fill="hsl(var(--primary))"
                        fontFamily="monospace"
                      >
                        N
                      </text>
                      <text
                        y="34"
                        textAnchor="middle"
                        fontSize="10"
                        fill="hsl(var(--muted-foreground))"
                        fontFamily="monospace"
                      >
                        S
                      </text>
                      <text
                        x="30"
                        y="3"
                        textAnchor="middle"
                        fontSize="10"
                        fill="hsl(var(--muted-foreground))"
                        fontFamily="monospace"
                      >
                        E
                      </text>
                      <text
                        x="-30"
                        y="3"
                        textAnchor="middle"
                        fontSize="10"
                        fill="hsl(var(--muted-foreground))"
                        fontFamily="monospace"
                      >
                        W
                      </text>
                      <line
                        x1="0"
                        y1="-18"
                        x2="0"
                        y2="18"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                      <line
                        x1="-18"
                        y1="0"
                        x2="18"
                        y2="0"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                      <polygon
                        points="0,-18 -3,-12 3,-12"
                        fill="hsl(var(--primary))"
                      />
                    </g>

                    <g transform={`translate(${PAD}, ${PAD})`}>
                      {/* Walls */}
                      <rect
                        x={0}
                        y={0}
                        width={Wpx}
                        height={Hpx}
                        fill="hsl(var(--charcoal-light))"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2.5"
                      />

                      {/* Dimensions */}
                      <text
                        x={Wpx / 2}
                        y={-14}
                        textAnchor="middle"
                        fontSize="11"
                        fill="hsl(var(--muted-foreground))"
                        fontFamily="monospace"
                      >
                        {length}′-0″
                      </text>
                      <text
                        x={-14}
                        y={Hpx / 2}
                        textAnchor="middle"
                        fontSize="11"
                        fill="hsl(var(--muted-foreground))"
                        fontFamily="monospace"
                        transform={`rotate(-90, -14, ${Hpx / 2})`}
                      >
                        {width}′-0″
                      </text>

                      {/* Door — break the wall + swing arc */}
                      <line
                        x1={toPx(doorSeg.x1)}
                        y1={toPx(doorSeg.y1)}
                        x2={toPx(doorSeg.x2)}
                        y2={toPx(doorSeg.y2)}
                        stroke="hsl(var(--charcoal))"
                        strokeWidth="6"
                      />
                      {/* Door leaf */}
                      {(() => {
                        const cx = toPx(doorSeg.x1);
                        const cy = toPx(doorSeg.y1);
                        const len = toPx(doorOpening.len);
                        // Draw leaf perpendicular into the room
                        let leafX = cx,
                          leafY = cy,
                          arcEndX = cx,
                          arcEndY = cy;
                        if (door === "North") {
                          leafX = cx + len;
                          arcEndX = cx;
                          arcEndY = cy + len;
                        }
                        if (door === "South") {
                          leafX = cx + len;
                          arcEndX = cx;
                          arcEndY = cy - len;
                        }
                        if (door === "West") {
                          leafY = cy + len;
                          arcEndX = cx + len;
                          arcEndY = cy;
                        }
                        if (door === "East") {
                          leafY = cy + len;
                          arcEndX = cx - len;
                          arcEndY = cy;
                        }
                        return (
                          <>
                            <path
                              d={`M ${cx} ${cy} L ${arcEndX} ${arcEndY}`}
                              stroke="hsl(var(--primary))"
                              strokeWidth="1.2"
                              fill="none"
                            />
                            <path
                              d={`M ${leafX} ${leafY} A ${len} ${len} 0 0 1 ${arcEndX} ${arcEndY}`}
                              stroke="hsl(var(--primary))"
                              strokeWidth="0.8"
                              fill="none"
                              strokeDasharray="2 2"
                              opacity="0.7"
                            />
                          </>
                        );
                      })()}
                      <text
                        x={toPx((doorSeg.x1 + doorSeg.x2) / 2)}
                        y={toPx((doorSeg.y1 + doorSeg.y2) / 2)}
                        dx={door === "West" ? 18 : door === "East" ? -18 : 0}
                        dy={door === "North" ? 16 : door === "South" ? -8 : 4}
                        fontSize="9"
                        fill="hsl(var(--primary))"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        DOOR
                      </text>

                      {/* Windows — architectural double line */}
                      {openings.map((op) => {
                        const seg = openingSegment(op, length, width);
                        const isHoriz =
                          op.wall === "North" || op.wall === "South";
                        const offset = 3;
                        return (
                          <g key={op.id}>
                            <line
                              x1={toPx(seg.x1)}
                              y1={toPx(seg.y1)}
                              x2={toPx(seg.x2)}
                              y2={toPx(seg.y2)}
                              stroke="hsl(var(--charcoal))"
                              strokeWidth="6"
                            />
                            <line
                              x1={toPx(seg.x1) + (isHoriz ? 0 : -offset)}
                              y1={toPx(seg.y1) + (isHoriz ? -offset : 0)}
                              x2={toPx(seg.x2) + (isHoriz ? 0 : -offset)}
                              y2={toPx(seg.y2) + (isHoriz ? -offset : 0)}
                              stroke="hsl(var(--gold-light))"
                              strokeWidth="1"
                            />
                            <line
                              x1={toPx(seg.x1) + (isHoriz ? 0 : offset)}
                              y1={toPx(seg.y1) + (isHoriz ? offset : 0)}
                              x2={toPx(seg.x2) + (isHoriz ? 0 : offset)}
                              y2={toPx(seg.y2) + (isHoriz ? offset : 0)}
                              stroke="hsl(var(--gold-light))"
                              strokeWidth="1"
                            />
                            <line
                              x1={toPx(seg.x1)}
                              y1={toPx(seg.y1)}
                              x2={toPx(seg.x2)}
                              y2={toPx(seg.y2)}
                              stroke="hsl(var(--gold-light))"
                              strokeWidth="0.8"
                              opacity="0.8"
                            />
                            <text
                              x={toPx((seg.x1 + seg.x2) / 2)}
                              y={toPx((seg.y1 + seg.y2) / 2)}
                              dx={
                                op.wall === "West"
                                  ? 22
                                  : op.wall === "East"
                                    ? -22
                                    : 0
                              }
                              dy={
                                op.wall === "North"
                                  ? 18
                                  : op.wall === "South"
                                    ? -10
                                    : 4
                              }
                              fontSize="8"
                              fill="hsl(var(--gold-light))"
                              fontFamily="monospace"
                              textAnchor="middle"
                            >
                              WIN
                            </text>
                          </g>
                        );
                      })}

                      {/* Furniture */}
                      {furniture.map((f, i) => (
                        <motion.g
                          key={f.label + i}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                        >
                          <rect
                            x={toPx(f.x)}
                            y={toPx(f.y)}
                            width={toPx(f.w)}
                            height={toPx(f.h)}
                            fill="url(#hatch)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1.5"
                          />
                          <text
                            x={toPx(f.x + f.w / 2)}
                            y={toPx(f.y + f.h / 2)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fontFamily="monospace"
                            fill="hsl(var(--foreground))"
                            letterSpacing="1.5"
                          >
                            {f.label}
                          </text>
                        </motion.g>
                      ))}
                    </g>
                  </svg>
                )}
              </div>
            </motion.div>

            {generated && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* AI Insights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded p-6"
                >
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <span className="font-heading text-sm tracking-widest uppercase text-foreground">
                      AI Engineering Insights
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {insights.map((ins, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="text-primary font-mono shrink-0">
                          0{i + 1}
                        </span>
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 3D Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded overflow-hidden group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={preview3D}
                      alt={`3D perspective preview of ${room.toLowerCase()} layout`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-charcoal/80 backdrop-blur-sm border border-primary/40 px-2.5 py-1 rounded">
                      <Box className="w-3 h-3 text-primary" />
                      <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-mono">
                        3D Perspective
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-heading text-lg text-foreground leading-tight">
                        {room === "Office"
                          ? "Executive Office"
                          : room === "Living"
                            ? "Living Room"
                            : room}{" "}
                        — Perspective View
                      </p>
                      <p className="text-[11px] tracking-widest uppercase text-muted-foreground mt-1">
                        Render preview · Walkthrough on request
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayoutPlannerSection;
