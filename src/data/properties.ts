export interface TransitStep {
  mode: "MRT" | "Bus" | "Walk";
  instruction: string;
  duration: string;
  line?: string;
}

export interface RoomType {
  name: string;
  price: number;
  available: boolean;
}

export interface Amenity {
  name: string;
  type: "grocery" | "food" | "mall" | "other";
  distance: string;
  time: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  mrt: string;
  images: string[];
  demandLabel: "High" | "Medium" | "Low";
  demandScore: number;
  description: string;
  roomTypes: RoomType[];
  totalTravelTime: string;
  estimatedFare: number;
  transitSteps: TransitStep[];
  amenities: Amenity[];
  lat: number;
  lng: number;
}

export const PROPERTIES: Property[] = [
  {
    id: "1",
    name: "Colive River Valley",
    address: "486 River Valley Road, Singapore 248370",
    mrt: "Great World MRT",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    demandLabel: "High",
    demandScore: 9,
    description: "Premium co-living in the heart of Orchard, steps from world-class shopping and dining.",
    roomTypes: [
      { name: "Single Room", price: 1800, available: true },
      { name: "Deluxe Room", price: 2400, available: true },
      { name: "Studio", price: 3200, available: false },
    ],
    totalTravelTime: "12 min",
    estimatedFare: 1.5,
    transitSteps: [
      { mode: "Walk", instruction: "Walk to Orchard MRT", duration: "3 min" },
      { mode: "MRT", instruction: "Take North-South Line to City Hall", duration: "9 min", line: "NS Line" },
    ],
    amenities: [
      { name: "Cold Storage", type: "grocery", distance: "150m", time: "2 min walk" },
      { name: "ION Orchard Food Hall", type: "food", distance: "200m", time: "3 min walk" },
      { name: "ION Orchard", type: "mall", distance: "200m", time: "3 min walk" },
    ],
    lat: 1.3048,
    lng: 103.8318,
  },
  {
    id: "2",
    name: "Colive Sunshine Terrace",
    address: "22C Sunshine Terrace, Singapore 535698",
    mrt: "Serangoon MRT",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    ],
    demandLabel: "High",
    demandScore: 8,
    description: "Charming co-living in Singapore's trendiest heritage neighbourhood, surrounded by cafes and art.",
    roomTypes: [
      { name: "Single Room", price: 1600, available: true },
      { name: "Deluxe Room", price: 2100, available: true },
    ],
    totalTravelTime: "18 min",
    estimatedFare: 1.8,
    transitSteps: [
      { mode: "Walk", instruction: "Walk to Seranggon MRT", duration: "7 min" },
      { mode: "MRT", instruction: "Take North-East Line to Outram Park", duration: "20 min", line: "NELine" },
    ],
    amenities: [
      { name: "Tiong Bahru Market", type: "food", distance: "300m", time: "4 min walk" },
      { name: "FairPrice Finest", type: "grocery", distance: "400m", time: "5 min walk" },
    ],
    lat: 1.2864,
    lng: 103.8268,
  },
  {
    id: "3",
    name: "Colive Novena Heights",
    address: "88 Novena Terrace, Singapore 307998",
    mrt: "Novena MRT",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    ],
    demandLabel: "Medium",
    demandScore: 7,
    description: "Modern co-living near Novena medical hub and United Square, ideal for healthcare professionals.",
    roomTypes: [
      { name: "Single Room", price: 1500, available: true },
      { name: "Deluxe Room", price: 2000, available: false },
      { name: "Studio", price: 2800, available: true },
    ],
    totalTravelTime: "15 min",
    estimatedFare: 1.6,
    transitSteps: [
      { mode: "Walk", instruction: "Walk to Novena MRT", duration: "4 min" },
      { mode: "MRT", instruction: "Take North-South Line to City Hall", duration: "11 min", line: "NS Line" },
    ],
    amenities: [
      { name: "United Square", type: "mall", distance: "250m", time: "3 min walk" },
      { name: "Cold Storage United Square", type: "grocery", distance: "250m", time: "3 min walk" },
      { name: "Novena Food Court", type: "food", distance: "100m", time: "1 min walk" },
    ],
    lat: 1.3204,
    lng: 103.8438,
  },
];
