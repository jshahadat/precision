import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Download } from "lucide-react";
import {
  priceData,
  roomTypes,
  budgetLevels,
  type RoomType,
  type BudgetLevel,
} from "@/lib/priceData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatBDT = (n: number) =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(
    Math.round(n),
  );

const CalculatorSection = () => {
  const [sqft, setSqft] = useState<number>(150);
  const [roomType, setRoomType] = useState<RoomType>("Living Room");
  const [budget, setBudget] = useState<BudgetLevel>("Premium");

  const rows = useMemo(() => {
    const materials = priceData[roomType][budget] ?? [];
    return materials.map((m) => {
      const quantity = +(m.qtyPerSqft * sqft).toFixed(2);
      const total = quantity * m.pricePerUnit;
      return { ...m, quantity, total };
    });
  }, [sqft, roomType, budget]);

  const grandTotal = rows.reduce((s, r) => s + r.total, 0);

  return (
    <section id="calculator" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            Estimate Your Project
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Interior <span className="text-gold-gradient">Cost Calculator</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Get an instant material-level cost estimate. Enter your room size,
            choose a room type and a budget tier — we&apos;ll do the math.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[340px_1fr] gap-8">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded p-6 h-fit"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold">
                Project Inputs
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <Label
                  htmlFor="sqft"
                  className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Room Size (sqft)
                </Label>
                <Input
                  id="sqft"
                  type="number"
                  min={10}
                  max={10000}
                  value={sqft}
                  onChange={(e) =>
                    setSqft(Math.max(0, Number(e.target.value) || 0))
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                  Room Type
                </Label>
                <Select
                  value={roomType}
                  onValueChange={(v) => setRoomType(v as RoomType)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                  Budget Level
                </Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {budgetLevels.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`font-body text-xs font-semibold py-2.5 rounded border transition-all ${
                        budget === b
                          ? "bg-gold-gradient text-primary-foreground border-transparent"
                          : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                  Estimated Total
                </p>
                <p className="font-heading text-3xl font-bold text-gold-gradient mt-1">
                  ৳ {formatBDT(grandTotal)}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Indicative pricing — final quote provided after consultation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Output Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  {roomType}{" "}
                  <span className="text-muted-foreground font-normal">
                    — {budget}
                  </span>
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  Bill of materials for {sqft || 0} sqft
                </p>
              </div>
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-body font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Download className="w-4 h-4" /> Request Detailed Quote
              </a>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs uppercase tracking-wider">
                      Material
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">
                      Brand
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-right">
                      Qty
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-right">
                      Unit Price
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-right">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.name} className="border-border">
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.brand}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {r.quantity}{" "}
                        <span className="text-muted-foreground text-xs">
                          {r.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        ৳ {formatBDT(r.pricePerUnit)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-semibold">
                        ৳ {formatBDT(r.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-border bg-background/50 hover:bg-background/50">
                    <TableCell
                      colSpan={4}
                      className="font-heading font-semibold uppercase text-xs tracking-wider"
                    >
                      Grand Total
                    </TableCell>
                    <TableCell className="text-right font-heading font-bold text-primary tabular-nums">
                      ৳ {formatBDT(grandTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
