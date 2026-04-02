import React from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah L.",
    role: "Software Engineer",
    property: "Colive Orchard Residences",
    rating: 5,
    text: "Living here has been an amazing experience. The community is vibrant, the facilities are top-notch, and the location is unbeatable. I've made lifelong friends here!",
    avatar: "SL",
  },
  {
    id: "2",
    name: "Marcus T.",
    role: "Product Manager",
    property: "Colive Tiong Bahru Loft",
    rating: 5,
    text: "Tiong Bahru is such a charming neighbourhood. The co-living space perfectly blends heritage vibes with modern comforts. Highly recommend for anyone new to Singapore.",
    avatar: "MT",
  },
  {
    id: "3",
    name: "Priya K.",
    role: "UX Designer",
    property: "Colive Novena Heights",
    rating: 4,
    text: "Great value for money and super convenient location near the medical hub. The management team is responsive and the common areas are always clean.",
    avatar: "PK",
  },
  {
    id: "4",
    name: "James W.",
    role: "Financial Analyst",
    property: "Colive Orchard Residences",
    rating: 5,
    text: "The best decision I made when relocating to Singapore. Everything is taken care of — utilities, cleaning, community events. I can focus on work and enjoy life.",
    avatar: "JW",
  },
];

const Testimonials: React.FC = () => {
  return (
    <div
      className="min-h-screen pb-24 px-5 pt-8"
      style={{ background: "#faf8ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#2d2540]"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          What Residents Say
        </h1>
        <p className="text-sm text-[#9e97b0] mt-1">
          Real stories from our co-living community
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="rounded-[15px] p-5"
            style={{ background: "#ffffff", boxShadow: "0 2px 12px rgba(45,37,64,0.06)" }}
          >
            <Quote size={20} className="text-[#E63946] mb-3 opacity-60" />
            <p className="text-sm text-[#2d2540]/80 leading-relaxed mb-4">{t.text}</p>

            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < t.rating ? "text-[#f97316] fill-[#f97316]" : "text-[#e8e4f0]"}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: "#E63946" }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2d2540]">{t.name}</p>
                <p className="text-xs text-[#9e97b0]">
                  {t.role} · {t.property}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
