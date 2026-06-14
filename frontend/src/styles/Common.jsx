// src/styles/Common.js
// Theme: Soft Pastel Neutral

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#F8F7F4] min-h-screen";
export const pageWrapper = "max-w-7xl mx-auto px-6 py-16";
export const section = "mb-20";

// ─── Navigation ───────────────────────────────────────
export const navbar =
  "bg-[#FDFDFC]/90 backdrop-blur border-b border-[#E8E6E1] sticky top-0 z-50 shadow-sm";

export const navContainer =
  "max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-between";

export const navBrand =
  "text-2xl font-bold text-[#5F5B57] tracking-wide";

export const navLinks = "flex flex-wrap items-center gap-6";

export const navLink =
  "text-sm font-medium text-[#7A7670] hover:text-[#5F5B57] transition";

export const navLinkActive =
  "text-sm font-semibold text-[#A3B18A] border-b-2 border-[#A3B18A]";

// ─── Cards ────────────────────────────────────────────
export const card =
  "bg-white rounded-2xl border border-[#ECEAE5] p-6 shadow-sm hover:shadow-lg transition";

export const campaignCard =
  "bg-white rounded-2xl overflow-hidden border border-[#ECEAE5] hover:shadow-lg transition";

export const articleCard =
  "bg-white rounded-2xl border border-[#ECEAE5] p-6 shadow-sm";

export const articleTitle =
  "text-lg font-semibold text-[#4F4B47]";

export const articleExcerpt =
  "text-sm text-[#7C7772] leading-relaxed";

export const articleMeta =
  "text-xs uppercase tracking-widest text-[#B0AAA4]";

export const emptyState =
  "border-2 border-dashed border-[#D8D4CE] rounded-xl p-10 text-center text-[#8A847F]";

export const statusActive =
  "inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold";

export const statusPending =
  "inline-flex px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold";

export const statusRejected =
  "inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold";

// ─── Typography ───────────────────────────────────────
export const pageTitle =
  "text-5xl font-bold text-[#4F4B47]";

export const heading =
  "text-3xl font-semibold text-[#4F4B47]";

export const heading2 =
  "text-2xl font-semibold text-[#4F4B47]";

export const subHeading =
  "text-xl font-medium text-[#67635F]";

export const body =
  "text-[#6E6964] leading-relaxed";

export const bodySmall =
  "text-sm text-[#8A847F]";

export const muted =
  "text-sm text-[#9B9691]";

export const link =
  "text-[#A3B18A] hover:text-[#7E8E69] font-medium transition";

// ─── Buttons ──────────────────────────────────────────
export const btnPrimary =
  "bg-[#A3B18A] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#8F9D77] transition shadow-sm";

export const btnSecondary =
  "border border-[#A3B18A] text-[#A3B18A] bg-white px-7 py-3 rounded-xl font-semibold hover:bg-[#F3F6EF] transition";

export const btnOnDark =
  "bg-white text-[#4F4B47] px-7 py-3 rounded-xl font-semibold";

export const btnOutlineOnDark =
  "border border-white text-white px-7 py-3 rounded-xl hover:bg-white hover:text-[#4F4B47] transition";

export const btnTertiary =
  "bg-[#E8E3D8] text-[#5F5B57] px-6 py-2 rounded-lg hover:bg-[#DCD5C7] transition";

export const btnGhost =
  "text-[#A3B18A] hover:text-[#8F9D77]";

export const btnDanger =
  "bg-[#E88C8C] text-white px-6 py-2 rounded-lg hover:bg-[#D87272] transition";

// ─── Forms ────────────────────────────────────────────
export const formCard =
  "bg-white rounded-3xl shadow-md p-10 border border-[#ECEAE5] max-w-2xl mx-auto";

export const formTitle =
  "text-3xl font-bold text-[#4F4B47] text-center mb-2";

export const label =
  "block text-sm font-medium text-[#6E6964] mb-2";

export const input =
  "w-full bg-[#FAF9F7] border border-[#E5E3DE] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A3B18A]/30 focus:border-[#A3B18A]";

export const textarea =
  "w-full bg-[#FAF9F7] border border-[#E5E3DE] rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#A3B18A]/30";

export const formGroup = "mb-6";

export const divider =
  "border-t border-[#ECEAE5] my-6";

export const error =
  "text-sm text-red-500 mt-1";

export const success =
  "text-sm text-green-600 mt-1";

export const submit =
  "w-full bg-[#A3B18A] text-white py-3 rounded-xl font-semibold hover:bg-[#8F9D77] transition";

export const loading =
  "text-center text-[#8A847F] animate-pulse";

// ─── Product Grid ─────────────────────────────────────
export const campaignGrid =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

export const campaignImage =
  "w-full h-56 object-cover bg-[#F4F2EE] rounded-t-2xl";

export const campaignMeta =
  "text-xs uppercase tracking-wide text-[#A7A19A]";

export const campaignAmount =
  "text-2xl font-bold text-[#A3B18A]";

export const progressBar =
  "bg-[#E5E3DE] h-2 rounded-full overflow-hidden";

export const progressFill =
  "bg-[#A3B18A] h-full transition-all";
