# 📑 Executive Report: Project CoLive SG
**Date:** April 4, 2026  
**Status:** Solidified Concept (Ready for Backend Development)  
**Objective:** To bridge the gap between high-intent tenants and co-living providers through a friction-less, commute-optimized discovery engine.

---

## 1. The Market Opportunity
In the high-density, high-cost landscape of Singapore, the primary pain point for tenants is not just "finding a room," but **optimizing the commute.** Existing platforms focus on postal codes and districts; **CoLive SG** focuses on **lifestyle efficiency**. 

By prioritizing transit times (MRT/Bus) and removing the barrier of user authentication, we maximize top-of-funnel traffic and convert "browsers" into "qualified leads" through data-driven matching.

---

## 2. Product Vision & Core Features
CoLive SG is a **public-facing, mobile-responsive web application** designed as a "Zero-Friction" lead generation engine.

### 📍 Commute-Centric Discovery
* **Transit-First Search:** Users input their daily destination (work/school). The system ranks properties by real-world public transport travel time, not straight-line distance.
* **Integrated Fare Heuristic:** Automatically calculates estimated monthly transit costs using LTA-aligned distance-based logic.
* **Dynamic Heatmap:** A visual overlay representing property demand and availability density across the island.

### 🤖 AI Concierge & Lead Gen
* **Public AI Chatbot:** An LLM-powered assistant pre-seeded with property-specific FAQs (house rules, utility inclusions, amenities).
* **The "Concierge" Handoff:** High-intent queries (e.g., "Can I view today?") trigger an immediate call-to-action for WhatsApp or direct admin contact.
* **Anonymous Interest Flow:** A high-conversion form capturing essential tenant data (Pass Type, Industry, Work Location) without requiring account creation.

---

## 3. Technical Architecture (MVP1)
The stack is chosen for speed, scalability, and precise spatial handling.

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React + TypeScript + Tailwind | High-performance, mobile-first PWA. |
| **Backend** | Supabase Edge Functions (Deno) | Serverless logic for API orchestration and AI grounding. |
| **Database** | PostgreSQL + PostGIS | Authoritative storage for spatial data and lead records. |
| **Map Engine** | Google Maps JS API | Industry-standard map rendering and Heatmap layers. |
| **Routing** | Google Routes & OneMap API | Multi-modal transit calculations and MRT station proximity. |

---

## 4. Database & Logic Strategy
The backend is designed to be "Thin & Fast," utilizing **PostGIS** to perform initial spatial filtering before hitting external APIs to minimize latency and costs.

* **Logic Pipeline:** 1. **Spatial Query (Supabase):** Filters properties within a 10km radius of the user's destination.
    2. **Transit Matrix (Google):** Calculates exact travel times for the subset.
    3. **Metadata Enrichment (OneMap):** Attaches the nearest MRT station name and exit details.
* **Fare Calculation Heuristic:**
  $$F \approx \begin{cases} 1.09 & \text{if } d \leq 3.2 \text{ km} \\ 1.09 + 0.10 \times \lceil d - 3.2 \rceil & \text{if } d > 3.2 \text{ km} \end{cases}$$
* **Security:** Row-Level Security (RLS) ensures that property data is public, but lead submissions are strictly private and accessible only by administrators.

---

## 5. Strategic Roadmap

### Phase 1: MVP1 (Core Utility)
* Deploy Supabase schema and PostGIS spatial functions.
* Integrate Google Maps transit routing logic.
* Launch public search, property detail cards, and the interest form.
* Implement the AI Chatbot with basic property grounding.

### Phase 2: MVP2 (The "Rainy Day" Advantage)
* **Shelter-Aware Routing:** Integrate OneMap BFA API to identify 100% sheltered paths from properties to MRT stations.
* **Weather UI:** A "Rainy Mode" toggle that highlights properties with covered commutes.
* **Advanced Analytics:** Tracking "Commute vs. Price" trends to provide deeper insights to property managers.

---

## 6. Key Success Metrics
1. **Lead Conversion Rate:** % of visitors who submit an interest form.
2. **Search Relevance:** Average transit time of selected properties (aiming for < 30 mins).
3. **AI Engagement:** % of users who interact with the chatbot before submitting a form.

---

> **Summary Statement:** CoLive SG moves beyond the traditional real estate directory. By combining authoritative Singapore transit data with a minimalist, no-auth UX, we create a tool that respects the user's time and the landlord's need for qualified, high-intent leads.