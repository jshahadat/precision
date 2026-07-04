// Material price data per square foot.
// NOTE: This will later be replaced with a Google Sheets fetch.
// Structure: priceData[roomType][budgetLevel] = Material[]

export type BudgetLevel = "Economy" | "Premium" | "Luxury";
export type RoomType =
  | "Living Room"
  | "Bedroom"
  | "Kitchen"
  | "Bathroom"
  | "Dining Room"
  | "Office";

export interface Material {
  name: string;
  brand: string;
  /** Quantity per square foot of room area */
  qtyPerSqft: number;
  unit: string;
  /** Price per unit in BDT (Bangladeshi Taka) */
  pricePerUnit: number;
}

type PriceData = Record<RoomType, Record<BudgetLevel, Material[]>>;

export const priceData: PriceData = {
  "Living Room": {
    Economy: [
      {
        name: "Floor Tiles",
        brand: "RAK Ceramics",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 75,
      },
      {
        name: "Wall Paint",
        brand: "Berger",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 18,
      },
      {
        name: "False Ceiling",
        brand: "Gypsum Bangla",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 95,
      },
      {
        name: "Lighting",
        brand: "Philips",
        qtyPerSqft: 0.05,
        unit: "pcs",
        pricePerUnit: 850,
      },
      {
        name: "Sofa Set (3+1+1)",
        brand: "Hatil",
        qtyPerSqft: 0.008,
        unit: "set",
        pricePerUnit: 45000,
      },
    ],
    Premium: [
      {
        name: "Vitrified Tiles",
        brand: "Kajaria",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 145,
      },
      {
        name: "Texture Paint",
        brand: "Asian Paints",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 42,
      },
      {
        name: "Designer Ceiling",
        brand: "Saint-Gobain",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 185,
      },
      {
        name: "LED Lighting",
        brand: "Philips Hue",
        qtyPerSqft: 0.06,
        unit: "pcs",
        pricePerUnit: 2200,
      },
      {
        name: "Premium Sofa",
        brand: "Otobi",
        qtyPerSqft: 0.008,
        unit: "set",
        pricePerUnit: 95000,
      },
      {
        name: "Wall Panelling",
        brand: "Greenply",
        qtyPerSqft: 0.4,
        unit: "sqft",
        pricePerUnit: 220,
      },
    ],
    Luxury: [
      {
        name: "Italian Marble",
        brand: "Bhandari Marble",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 480,
      },
      {
        name: "Designer Wallpaper",
        brand: "Marshalls",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 180,
      },
      {
        name: "POP + Cove Ceiling",
        brand: "Armstrong",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 380,
      },
      {
        name: "Smart Lighting",
        brand: "Lutron",
        qtyPerSqft: 0.07,
        unit: "pcs",
        pricePerUnit: 6500,
      },
      {
        name: "Designer Sofa",
        brand: "Natuzzi",
        qtyPerSqft: 0.008,
        unit: "set",
        pricePerUnit: 285000,
      },
      {
        name: "Veneer Panelling",
        brand: "Century Ply",
        qtyPerSqft: 0.4,
        unit: "sqft",
        pricePerUnit: 650,
      },
      {
        name: "Chandelier",
        brand: "Schonbek",
        qtyPerSqft: 0.004,
        unit: "pcs",
        pricePerUnit: 75000,
      },
    ],
  },
  Bedroom: {
    Economy: [
      {
        name: "Floor Tiles",
        brand: "RAK Ceramics",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 75,
      },
      {
        name: "Wall Paint",
        brand: "Berger",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 18,
      },
      {
        name: "Wardrobe (Laminate)",
        brand: "Akij Board",
        qtyPerSqft: 0.3,
        unit: "sqft",
        pricePerUnit: 850,
      },
      {
        name: "Bed Set",
        brand: "Hatil",
        qtyPerSqft: 0.006,
        unit: "set",
        pricePerUnit: 35000,
      },
    ],
    Premium: [
      {
        name: "Wooden Flooring",
        brand: "Pergo",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 195,
      },
      {
        name: "Texture Paint",
        brand: "Asian Paints",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 42,
      },
      {
        name: "Wardrobe (Veneer)",
        brand: "Greenply",
        qtyPerSqft: 0.3,
        unit: "sqft",
        pricePerUnit: 1650,
      },
      {
        name: "Designer Bed",
        brand: "Otobi",
        qtyPerSqft: 0.006,
        unit: "set",
        pricePerUnit: 85000,
      },
      {
        name: "False Ceiling",
        brand: "Saint-Gobain",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 185,
      },
    ],
    Luxury: [
      {
        name: "Engineered Hardwood",
        brand: "Mikasa",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 520,
      },
      {
        name: "Designer Wallpaper",
        brand: "Marshalls",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 180,
      },
      {
        name: "Walk-in Wardrobe",
        brand: "Hettich",
        qtyPerSqft: 0.4,
        unit: "sqft",
        pricePerUnit: 3800,
      },
      {
        name: "King Bed Suite",
        brand: "Poliform",
        qtyPerSqft: 0.006,
        unit: "set",
        pricePerUnit: 320000,
      },
      {
        name: "Designer Ceiling",
        brand: "Armstrong",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 380,
      },
      {
        name: "Smart Lighting",
        brand: "Lutron",
        qtyPerSqft: 0.06,
        unit: "pcs",
        pricePerUnit: 6500,
      },
    ],
  },
  Kitchen: {
    Economy: [
      {
        name: "Anti-skid Tiles",
        brand: "RAK Ceramics",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 95,
      },
      {
        name: "Modular Cabinet",
        brand: "Akij Board",
        qtyPerSqft: 0.6,
        unit: "sqft",
        pricePerUnit: 950,
      },
      {
        name: "Granite Countertop",
        brand: "Local",
        qtyPerSqft: 0.25,
        unit: "sqft",
        pricePerUnit: 380,
      },
      {
        name: "Backsplash Tiles",
        brand: "RAK Ceramics",
        qtyPerSqft: 0.5,
        unit: "sqft",
        pricePerUnit: 120,
      },
    ],
    Premium: [
      {
        name: "Vitrified Tiles",
        brand: "Kajaria",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 165,
      },
      {
        name: "Modular Kitchen",
        brand: "Hettich",
        qtyPerSqft: 0.6,
        unit: "sqft",
        pricePerUnit: 2400,
      },
      {
        name: "Quartz Countertop",
        brand: "Caesarstone",
        qtyPerSqft: 0.25,
        unit: "sqft",
        pricePerUnit: 1200,
      },
      {
        name: "Designer Backsplash",
        brand: "Kajaria",
        qtyPerSqft: 0.5,
        unit: "sqft",
        pricePerUnit: 280,
      },
      {
        name: "Chimney + Hob",
        brand: "Faber",
        qtyPerSqft: 0.01,
        unit: "set",
        pricePerUnit: 65000,
      },
    ],
    Luxury: [
      {
        name: "Italian Marble",
        brand: "Bhandari Marble",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 480,
      },
      {
        name: "Luxury Modular Kitchen",
        brand: "Häcker",
        qtyPerSqft: 0.6,
        unit: "sqft",
        pricePerUnit: 6500,
      },
      {
        name: "Marble Countertop",
        brand: "Calacatta",
        qtyPerSqft: 0.25,
        unit: "sqft",
        pricePerUnit: 3500,
      },
      {
        name: "Mosaic Backsplash",
        brand: "Bisazza",
        qtyPerSqft: 0.5,
        unit: "sqft",
        pricePerUnit: 850,
      },
      {
        name: "Built-in Appliances",
        brand: "Miele",
        qtyPerSqft: 0.01,
        unit: "set",
        pricePerUnit: 450000,
      },
    ],
  },
  Bathroom: {
    Economy: [
      {
        name: "Floor Tiles",
        brand: "RAK Ceramics",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 95,
      },
      {
        name: "Wall Tiles",
        brand: "RAK Ceramics",
        qtyPerSqft: 2.8,
        unit: "sqft",
        pricePerUnit: 85,
      },
      {
        name: "Sanitary Ware",
        brand: "Star",
        qtyPerSqft: 0.05,
        unit: "set",
        pricePerUnit: 12000,
      },
      {
        name: "Fittings",
        brand: "Sharif",
        qtyPerSqft: 0.08,
        unit: "pcs",
        pricePerUnit: 1800,
      },
    ],
    Premium: [
      {
        name: "Designer Tiles",
        brand: "Kajaria",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 220,
      },
      {
        name: "Wall Cladding",
        brand: "Kajaria",
        qtyPerSqft: 2.8,
        unit: "sqft",
        pricePerUnit: 195,
      },
      {
        name: "Sanitary Ware",
        brand: "Kohler",
        qtyPerSqft: 0.05,
        unit: "set",
        pricePerUnit: 45000,
      },
      {
        name: "CP Fittings",
        brand: "Grohe",
        qtyPerSqft: 0.08,
        unit: "pcs",
        pricePerUnit: 6500,
      },
      {
        name: "Vanity Unit",
        brand: "Hettich",
        qtyPerSqft: 0.15,
        unit: "sqft",
        pricePerUnit: 2200,
      },
    ],
    Luxury: [
      {
        name: "Marble Flooring",
        brand: "Bhandari Marble",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 580,
      },
      {
        name: "Marble Cladding",
        brand: "Calacatta",
        qtyPerSqft: 2.8,
        unit: "sqft",
        pricePerUnit: 520,
      },
      {
        name: "Luxury Sanitary",
        brand: "Toto",
        qtyPerSqft: 0.05,
        unit: "set",
        pricePerUnit: 185000,
      },
      {
        name: "Premium Fittings",
        brand: "Hansgrohe",
        qtyPerSqft: 0.08,
        unit: "pcs",
        pricePerUnit: 18500,
      },
      {
        name: "Designer Vanity",
        brand: "Antonio Lupi",
        qtyPerSqft: 0.15,
        unit: "sqft",
        pricePerUnit: 8500,
      },
      {
        name: "Steam Shower",
        brand: "Kohler",
        qtyPerSqft: 0.02,
        unit: "set",
        pricePerUnit: 285000,
      },
    ],
  },
  "Dining Room": {
    Economy: [
      {
        name: "Floor Tiles",
        brand: "RAK Ceramics",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 75,
      },
      {
        name: "Wall Paint",
        brand: "Berger",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 18,
      },
      {
        name: "Dining Set (6-seater)",
        brand: "Hatil",
        qtyPerSqft: 0.008,
        unit: "set",
        pricePerUnit: 38000,
      },
      {
        name: "Lighting",
        brand: "Philips",
        qtyPerSqft: 0.05,
        unit: "pcs",
        pricePerUnit: 850,
      },
    ],
    Premium: [
      {
        name: "Vitrified Tiles",
        brand: "Kajaria",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 145,
      },
      {
        name: "Texture Paint",
        brand: "Asian Paints",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 42,
      },
      {
        name: "Designer Dining Set",
        brand: "Otobi",
        qtyPerSqft: 0.008,
        unit: "set",
        pricePerUnit: 85000,
      },
      {
        name: "Pendant Lights",
        brand: "Philips Hue",
        qtyPerSqft: 0.04,
        unit: "pcs",
        pricePerUnit: 3500,
      },
      {
        name: "Crockery Unit",
        brand: "Greenply",
        qtyPerSqft: 0.2,
        unit: "sqft",
        pricePerUnit: 1850,
      },
    ],
    Luxury: [
      {
        name: "Italian Marble",
        brand: "Bhandari Marble",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 480,
      },
      {
        name: "Designer Wallpaper",
        brand: "Marshalls",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 180,
      },
      {
        name: "Designer Dining Suite",
        brand: "Cassina",
        qtyPerSqft: 0.008,
        unit: "set",
        pricePerUnit: 350000,
      },
      {
        name: "Crystal Chandelier",
        brand: "Baccarat",
        qtyPerSqft: 0.004,
        unit: "pcs",
        pricePerUnit: 185000,
      },
      {
        name: "Veneer Wall",
        brand: "Century Ply",
        qtyPerSqft: 0.4,
        unit: "sqft",
        pricePerUnit: 650,
      },
    ],
  },
  Office: {
    Economy: [
      {
        name: "Vinyl Flooring",
        brand: "Armstrong",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 65,
      },
      {
        name: "Wall Paint",
        brand: "Berger",
        qtyPerSqft: 2.5,
        unit: "sqft",
        pricePerUnit: 18,
      },
      {
        name: "Workstation",
        brand: "Otobi",
        qtyPerSqft: 0.02,
        unit: "pcs",
        pricePerUnit: 12000,
      },
      {
        name: "Office Chair",
        brand: "Otobi",
        qtyPerSqft: 0.025,
        unit: "pcs",
        pricePerUnit: 6500,
      },
    ],
    Premium: [
      {
        name: "Carpet Tiles",
        brand: "Interface",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 165,
      },
      {
        name: "Glass Partitions",
        brand: "Saint-Gobain",
        qtyPerSqft: 0.4,
        unit: "sqft",
        pricePerUnit: 850,
      },
      {
        name: "Executive Desk",
        brand: "Featherlite",
        qtyPerSqft: 0.015,
        unit: "pcs",
        pricePerUnit: 45000,
      },
      {
        name: "Ergonomic Chair",
        brand: "Herman Miller",
        qtyPerSqft: 0.025,
        unit: "pcs",
        pricePerUnit: 28000,
      },
      {
        name: "Acoustic Ceiling",
        brand: "Armstrong",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 220,
      },
    ],
    Luxury: [
      {
        name: "Italian Marble",
        brand: "Bhandari Marble",
        qtyPerSqft: 1,
        unit: "sqft",
        pricePerUnit: 480,
      },
      {
        name: "Wood Veneer Walls",
        brand: "Century Ply",
        qtyPerSqft: 1.5,
        unit: "sqft",
        pricePerUnit: 850,
      },
      {
        name: "Executive Suite",
        brand: "Poltrona Frau",
        qtyPerSqft: 0.015,
        unit: "pcs",
        pricePerUnit: 285000,
      },
      {
        name: "Aeron Chair",
        brand: "Herman Miller",
        qtyPerSqft: 0.025,
        unit: "pcs",
        pricePerUnit: 145000,
      },
      {
        name: "Smart Conference Setup",
        brand: "Crestron",
        qtyPerSqft: 0.005,
        unit: "set",
        pricePerUnit: 450000,
      },
      {
        name: "Designer Lighting",
        brand: "Flos",
        qtyPerSqft: 0.05,
        unit: "pcs",
        pricePerUnit: 18500,
      },
    ],
  },
};

export const roomTypes = Object.keys(priceData) as RoomType[];
export const budgetLevels: BudgetLevel[] = ["Economy", "Premium", "Luxury"];
