import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  { id: 0, title: "Буферные системы крови", subtitle: "Патологическая физиология" },
  { id: 1, title: "Что такое буферная система?" },
  { id: 2, title: "4 типа буферных систем крови" },
  { id: 3, title: "Связь pH и буферных систем" },
  { id: 4, title: "Ацидоз" },
  { id: 5, title: "Алкалоз" },
  { id: 6, title: "Клинические проявления нарушений" },
  { id: 7, title: "Заключение и выводы" },
];

const TOTAL = slides.length;

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const goTo = (idx: number) => {
    if (idx === current) return;
    setDirection(idx > current ? "right" : "left");
    setAnimKey((k) => k + 1);
    setCurrent(idx);
  };
  const next = () => { if (current < TOTAL - 1) goTo(current + 1); };
  const prev = () => { if (current > 0) goTo(current - 1); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setDirection("right"); setAnimKey((k) => k + 1); setCurrent((c) => Math.min(c + 1, TOTAL - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setDirection("left"); setAnimKey((k) => k + 1); setCurrent((c) => Math.max(c - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const animClass = direction === "right" ? "animate-slide-right" : "animate-slide-left";

  return (
    <div className="min-h-screen bg-[#f0f5fb] flex flex-col font-golos select-none">
      {/* Header nav */}
      <header className="bg-white border-b border-blue-100 px-4 py-2 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">+</span>
          </div>
          <span className="font-montserrat font-bold text-blue-900 text-sm hidden sm:block">Буферные системы крови</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto max-w-xl">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`text-xs px-2.5 py-1 rounded transition-all whitespace-nowrap font-medium
                ${current === i
                  ? "bg-blue-700 text-white"
                  : "text-blue-600 hover:bg-blue-50"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-xs text-blue-400 font-medium shrink-0">{current + 1} / {TOTAL}</span>
      </header>

      {/* Slide area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
        <div key={animKey} className={`w-full max-w-5xl ${animClass}`}>
          {current === 0 && <Slide0 />}
          {current === 1 && <Slide1 />}
          {current === 2 && <Slide2 />}
          {current === 3 && <Slide3 />}
          {current === 4 && <Slide4 />}
          {current === 5 && <Slide5 />}
          {current === 6 && <Slide6 />}
          {current === 7 && <Slide7 />}
        </div>
      </main>

      {/* Footer nav */}
      <footer className="bg-white border-t border-blue-100 px-6 py-3 flex items-center justify-between sticky bottom-0 z-50">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-700 font-medium text-sm
            disabled:opacity-30 hover:bg-blue-50 transition-colors"
        >
          <Icon name="ChevronLeft" size={18} /> Назад
        </button>
        <div className="flex gap-1.5 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all
                ${current === i ? "w-6 h-2.5 bg-blue-700" : "w-2.5 h-2.5 bg-blue-200 hover:bg-blue-400"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-700 font-medium text-sm
            disabled:opacity-30 hover:bg-blue-50 transition-colors"
        >
          Вперёд <Icon name="ChevronRight" size={18} />
        </button>
      </footer>
    </div>
  );
}

/* ─── SLIDE 0 — Титульный ─── */
function Slide0() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 rounded-2xl overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 text-[200px] select-none pointer-events-none">🩸</div>

      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 py-10 z-10">
        <div className="animate-fade-up">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Патологическая физиология
          </span>
        </div>
        <h1 className="font-montserrat text-3xl sm:text-5xl font-black text-white leading-tight mb-4 animate-fade-up delay-100">
          Буферные системы<br />крови
        </h1>
        <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl animate-fade-up delay-200">
          Механизмы поддержания кислотно-основного состояния организма, pH крови, ацидоз и алкалоз
        </p>
        <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
          {["4 буферные системы", "pH крови", "Ацидоз", "Алкалоз", "Клиника нарушений"].map((t) => (
            <span key={t} className="bg-white/15 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-blue-900/40 px-8 sm:px-12 py-4 flex items-center justify-between z-10">
        <span className="text-blue-200 text-sm">Медицинский колледж</span>
        <div className="flex items-center gap-2 text-blue-200 text-sm">
          <Icon name="BookOpen" size={14} />
          <span>Раздел: Патофизиология крови</span>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 1 — Определение ─── */
function Slide1() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="FlaskConical" number="01" title="Что такое буферная система?" color="blue" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 animate-fade-up">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Icon name="BookOpen" size={24} className="text-blue-700" />
          </div>
          <h3 className="font-montserrat font-bold text-blue-900 text-lg mb-3">Определение</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            <strong className="text-blue-800">Буферная система</strong> — это смесь слабой кислоты и её соли
            (или слабого основания и его соли), которая препятствует значительным изменениям pH при добавлении кислот или щелочей в раствор.
          </p>
        </div>

        <div className="bg-blue-700 rounded-2xl p-6 shadow-sm animate-fade-up delay-100">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <Icon name="Target" size={24} className="text-white" />
          </div>
          <h3 className="font-montserrat font-bold text-white text-lg mb-3">Главная цель</h3>
          <p className="text-blue-100 leading-relaxed text-sm">
            Поддерживать <strong className="text-white">pH крови в норме — 7.35–7.45</strong>, несмотря на постоянное образование
            кислых и щелочных продуктов обмена веществ в клетках организма.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up delay-200">
        {[
          { icon: "Zap", title: "Мгновенное действие", desc: "Буферы реагируют немедленно — это первая линия защиты pH", bg: "bg-amber-50", border: "border-amber-100", iconColor: "text-amber-600", iconBg: "bg-amber-100" },
          { icon: "RefreshCw", title: "Обратимость", desc: "Химические реакции в буферных системах обратимы", bg: "bg-green-50", border: "border-green-100", iconColor: "text-green-600", iconBg: "bg-green-100" },
          { icon: "Shield", title: "Ёмкость буфера", desc: "Чем больше концентрация буфера — тем лучше защита pH", bg: "bg-blue-50", border: "border-blue-100", iconColor: "text-blue-600", iconBg: "bg-blue-100" },
        ].map(({ icon, title, desc, bg, border, iconColor, iconBg }) => (
          <div key={title} className={`${bg} rounded-xl p-4 border ${border} shadow-sm card-hover`}>
            <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon name={icon} size={18} className={iconColor} />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">{title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-blue-100 animate-fade-up delay-300 flex items-start gap-3">
        <Icon name="Lightbulb" size={20} className="text-cyan-600 mt-0.5 shrink-0" />
        <p className="text-slate-600 text-sm">
          <span className="font-semibold text-cyan-800">Важно помнить: </span>
          Буферные системы — не единственный механизм регуляции pH. Они работают совместно с лёгкими (выводят CO₂) и почками (выводят кислоты/основания). Но буферы — самые <strong>быстрые!</strong>
        </p>
      </div>
    </div>
  );
}

/* ─── SLIDE 2 — 4 типа буферных систем ─── */
function Slide2() {
  const buffers = [
    {
      num: "01", name: "Бикарбонатная", formula: "H₂CO₃ / HCO₃⁻", percent: 65,
      iconBg: "bg-blue-600", cardBorder: "border-blue-100", barBg: "bg-blue-500",
      badgeBg: "bg-blue-50", badgeText: "text-blue-700", formulaBg: "bg-blue-50", formulaText: "text-blue-700",
      detailBg: "bg-blue-50", detailText: "text-blue-800", percentText: "text-blue-600", icon: "Droplets",
      desc: "Самая мощная буферная система крови. Работает в плазме. Регулируется лёгкими (CO₂) и почками (HCO₃⁻).",
      detail: "H₂CO₃ ⇌ H⁺ + HCO₃⁻", norm: "HCO₃⁻ = 22–26 ммоль/л",
    },
    {
      num: "02", name: "Гемоглобиновая", formula: "HHb / Hb⁻", percent: 23,
      iconBg: "bg-rose-600", cardBorder: "border-rose-100", barBg: "bg-rose-500",
      badgeBg: "bg-rose-50", badgeText: "text-rose-700", formulaBg: "bg-rose-50", formulaText: "text-rose-700",
      detailBg: "bg-rose-50", detailText: "text-rose-800", percentText: "text-rose-600", icon: "Heart",
      desc: "Самая ёмкая буферная система эритроцитов. Дезоксигемоглобин — более сильное основание, чем оксигемоглобин.",
      detail: "HHb ⇌ H⁺ + Hb⁻", norm: "В эритроцитах крови",
    },
    {
      num: "03", name: "Белковая", formula: "Белок–H / Белок⁻", percent: 7,
      iconBg: "bg-emerald-600", cardBorder: "border-emerald-100", barBg: "bg-emerald-500",
      badgeBg: "bg-emerald-50", badgeText: "text-emerald-700", formulaBg: "bg-emerald-50", formulaText: "text-emerald-700",
      detailBg: "bg-emerald-50", detailText: "text-emerald-800", percentText: "text-emerald-600", icon: "Dna",
      desc: "Белки плазмы (альбумины) имеют амфотерные свойства: могут отдавать и принимать протоны.",
      detail: "Белок-NH₃⁺ ⇌ Белок-NH₂ + H⁺", norm: "Особенно активен альбумин",
    },
    {
      num: "04", name: "Фосфатная", formula: "H₂PO₄⁻ / HPO₄²⁻", percent: 5,
      iconBg: "bg-violet-600", cardBorder: "border-violet-100", barBg: "bg-violet-500",
      badgeBg: "bg-violet-50", badgeText: "text-violet-700", formulaBg: "bg-violet-50", formulaText: "text-violet-700",
      detailBg: "bg-violet-50", detailText: "text-violet-800", percentText: "text-violet-600", icon: "Atom",
      desc: "Работает преимущественно в клетках и моче. Важна для почечной регуляции pH.",
      detail: "H₂PO₄⁻ ⇌ H⁺ + HPO₄²⁻", norm: "pH оптимум: 6.8–7.4",
    },
  ];

  return (
    <div className="space-y-4">
      <SlideHeader icon="Layers" number="02" title="4 типа буферных систем крови" color="blue" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buffers.map((b, i) => (
          <div
            key={b.num}
            className={`bg-white rounded-2xl p-5 shadow-sm border ${b.cardBorder} card-hover animate-fade-up`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${b.iconBg} rounded-xl flex items-center justify-center shrink-0 shadow-md`}>
                <Icon name={b.icon} size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${b.percentText} font-montserrat`}>{b.num}</span>
                  <h3 className="font-montserrat font-bold text-slate-800">{b.name}</h3>
                </div>
                <code className={`text-xs ${b.formulaBg} ${b.formulaText} px-2 py-0.5 rounded font-mono`}>{b.formula}</code>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mt-3 mb-3">{b.desc}</p>
            <div className={`${b.detailBg} rounded-lg p-3 mb-3`}>
              <p className="text-xs text-slate-500 mb-1">Уравнение реакции:</p>
              <code className={`text-sm font-mono ${b.detailText} font-semibold`}>{b.detail}</code>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Доля в буферной ёмкости крови</span>
                <span className={`font-bold ${b.percentText}`}>{b.percent}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${b.barBg} rounded-full`} style={{ width: `${b.percent}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1">{b.norm}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 3 — pH и буферные системы ─── */
function Slide3() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="Activity" number="03" title="Связь pH и буферных систем" color="blue" />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 animate-fade-up">
        <h3 className="font-montserrat font-bold text-slate-800 mb-1 text-center">Шкала pH крови</h3>
        <p className="text-center text-slate-500 text-sm mb-5">Диапазон, совместимый с жизнью: 6.8 – 7.8</p>

        <div className="relative mb-10">
          <div className="h-10 rounded-xl ph-gradient shadow-inner" />
          <div
            className="absolute top-0 h-10 border-2 border-white rounded"
            style={{ left: "43%", width: "8%", boxShadow: "0 0 0 3px #16a34a" }}
          />
          <div className="absolute -top-8 flex justify-center" style={{ left: "41%", width: "12%" }}>
            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md font-bold whitespace-nowrap">НОРМА 7.35–7.45</span>
          </div>
          {/* pH labels below bar */}
          <div className="flex justify-between mt-2 px-0.5">
            {["1","","","","","6","6.8","","7.35","7.45","","7.8","8","","","","14"].map((v, i) => (
              <span key={i} className={`text-xs ${["6.8","7.35","7.45","7.8"].includes(v) ? "font-bold text-slate-700" : "text-slate-400"}`}>{v}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2">
          {[
            { label: "Смерть", range: "< 6.8", bg: "bg-red-800" },
            { label: "Ацидоз", range: "6.8–7.35", bg: "bg-orange-600" },
            { label: "НОРМА", range: "7.35–7.45", bg: "bg-green-600" },
            { label: "Алкалоз", range: "7.45–7.8", bg: "bg-blue-600" },
            { label: "Смерть", range: "> 7.8", bg: "bg-purple-800" },
          ].map((z) => (
            <div key={z.label + z.range} className={`${z.bg} rounded-xl p-3 text-center`}>
              <div className="text-white font-bold text-sm">{z.label}</div>
              <div className="text-white/80 text-xs mt-0.5">{z.range}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up delay-200">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Icon name="TrendingDown" size={16} className="text-white" />
            </div>
            <h4 className="font-montserrat font-bold text-slate-800 text-sm">При избытке кислот (↑H⁺)</h4>
          </div>
          <div className="space-y-2">
            {[
              "Буферы немедленно связывают избыток H⁺",
              "Лёгкие усиливают вентиляцию → выводят CO₂",
              "Почки усиливают выделение H⁺ с мочой",
              "pH снижается → развивается ацидоз",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-white" />
            </div>
            <h4 className="font-montserrat font-bold text-slate-800 text-sm">При избытке щелочи (↓H⁺)</h4>
          </div>
          <div className="space-y-2">
            {[
              "Буферы отдают H⁺, нейтрализуя основание",
              "Лёгкие замедляют дыхание → накапливают CO₂",
              "Почки усиливают выделение HCO₃⁻ с мочой",
              "pH растёт → развивается алкалоз",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-700 rounded-xl p-4 flex items-center gap-4 animate-fade-up delay-300">
        <div className="text-3xl shrink-0">⚖️</div>
        <div>
          <p className="text-white font-semibold text-sm mb-1">Уравнение Гендерсона–Хассельбаха</p>
          <code className="text-cyan-200 font-mono text-base sm:text-lg block">pH = 6.1 + log([HCO₃⁻] / (0.03 × pCO₂))</code>
          <p className="text-blue-200 text-xs mt-1">Показывает зависимость pH от соотношения бикарбоната и угольной кислоты</p>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 4 — Ацидоз ─── */
function Slide4() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="TrendingDown" number="04" title="Ацидоз — снижение pH крови" color="blue" />

      <div className="bg-red-700 rounded-2xl p-5 flex items-center gap-4 animate-fade-up">
        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center shrink-0 text-3xl">⬇️</div>
        <div>
          <p className="text-white font-montserrat font-bold text-xl">pH &lt; 7.35</p>
          <p className="text-red-100 text-sm">Избыток кислот или дефицит оснований в крови</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up delay-100">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <Icon name="Wind" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-slate-800">Дыхательный ацидоз</h3>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">Респираторный</span>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 mb-3">
            <p className="text-xs text-slate-500 mb-1 font-semibold">Механизм:</p>
            <p className="text-sm text-slate-700">↑CO₂ в крови → ↑H₂CO₃ → <span className="text-red-600 font-bold">↓pH</span></p>
          </div>
          <div className="space-y-1.5 mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Причины:</p>
            {["Пневмония, бронхиальная астма, ХОБЛ", "Угнетение дыхательного центра (наркоз, травмы ЦНС)", "Обструкция дыхательных путей", "Нейромышечные заболевания (миастения)"].map((c) => (
              <div key={c} className="flex items-start gap-2 text-sm text-slate-600">
                <Icon name="Minus" size={14} className="text-orange-500 mt-1 shrink-0" />
                {c}
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 font-semibold mb-1">Компенсация:</p>
            <p className="text-sm text-slate-600">Почки ↑ реабсорбцию HCO₃⁻ и выделение H⁺ → нормализация pH</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Icon name="FlaskConical" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-slate-800">Метаболический ацидоз</h3>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">Нереспираторный</span>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 mb-3">
            <p className="text-xs text-slate-500 mb-1 font-semibold">Механизм:</p>
            <p className="text-sm text-slate-700">↑ нелетучих кислот или потеря HCO₃⁻ → <span className="text-red-600 font-bold">↓pH</span></p>
          </div>
          <div className="space-y-1.5 mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Причины:</p>
            {["Сахарный диабет (кетоацидоз: ↑ кетоновые тела)", "Почечная недостаточность (↓выведение H⁺)", "Тяжёлая диарея (потеря HCO₃⁻)", "Шок, гипоксия тканей (↑ молочная кислота)"].map((c) => (
              <div key={c} className="flex items-start gap-2 text-sm text-slate-600">
                <Icon name="Minus" size={14} className="text-red-500 mt-1 shrink-0" />
                {c}
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 font-semibold mb-1">Компенсация:</p>
            <p className="text-sm text-slate-600">Лёгкие ↑ вентиляцию → выводят CO₂ (дыхание Куссмауля)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 animate-fade-up delay-200">
        {[
          { label: "pH", value: "< 7.35", icon: "ArrowDown", bg: "bg-red-50", border: "border-red-200", iconColor: "text-red-600", valColor: "text-red-700" },
          { label: "HCO₃⁻ (метаб.)", value: "< 22 ммоль/л", icon: "ArrowDown", bg: "bg-orange-50", border: "border-orange-200", iconColor: "text-orange-600", valColor: "text-orange-700" },
          { label: "pCO₂ (дых.)", value: "> 45 мм рт.ст.", icon: "ArrowUp", bg: "bg-amber-50", border: "border-amber-200", iconColor: "text-amber-600", valColor: "text-amber-700" },
        ].map(({ label, value, icon, bg, border, iconColor, valColor }) => (
          <div key={label} className={`${bg} border ${border} rounded-xl p-3 text-center`}>
            <Icon name={icon} size={20} className={`${iconColor} mx-auto mb-1`} />
            <p className="text-xs text-slate-500">{label}</p>
            <p className={`font-bold ${valColor} text-sm`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 5 — Алкалоз ─── */
function Slide5() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="TrendingUp" number="05" title="Алкалоз — повышение pH крови" color="blue" />

      <div className="bg-blue-600 rounded-2xl p-5 flex items-center gap-4 animate-fade-up">
        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center shrink-0 text-3xl">⬆️</div>
        <div>
          <p className="text-white font-montserrat font-bold text-xl">pH &gt; 7.45</p>
          <p className="text-blue-100 text-sm">Дефицит кислот или избыток оснований в крови</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up delay-100">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Icon name="Wind" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-slate-800">Дыхательный алкалоз</h3>
              <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded font-medium">Респираторный</span>
            </div>
          </div>
          <div className="bg-sky-50 rounded-lg p-3 mb-3">
            <p className="text-xs text-slate-500 mb-1 font-semibold">Механизм:</p>
            <p className="text-sm text-slate-700">↑ вентиляция → ↓CO₂ → ↓H₂CO₃ → <span className="text-blue-600 font-bold">↑pH</span></p>
          </div>
          <div className="space-y-1.5 mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Причины:</p>
            {["Истерия, психоэмоциональное возбуждение", "Высокогорье (гипоксия → гипервентиляция)", "Искусственная вентиляция лёгких (ИВЛ)", "Энцефалит, опухоли мозга"].map((c) => (
              <div key={c} className="flex items-start gap-2 text-sm text-slate-600">
                <Icon name="Minus" size={14} className="text-sky-500 mt-1 shrink-0" />
                {c}
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 font-semibold mb-1">Компенсация:</p>
            <p className="text-sm text-slate-600">Почки ↓ реабсорбцию HCO₃⁻ и выделение H⁺ → нормализация pH</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Icon name="FlaskConical" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-slate-800">Метаболический алкалоз</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Нереспираторный</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <p className="text-xs text-slate-500 mb-1 font-semibold">Механизм:</p>
            <p className="text-sm text-slate-700">↑ HCO₃⁻ или потеря H⁺ → <span className="text-blue-600 font-bold">↑pH</span></p>
          </div>
          <div className="space-y-1.5 mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Причины:</p>
            {["Рвота (потеря HCl желудочного сока)", "Приём избытка щелочных препаратов (соды)", "Гиперальдостеронизм (↑ выведение H⁺ почками)", "Диуретики (потеря K⁺ и H⁺)"].map((c) => (
              <div key={c} className="flex items-start gap-2 text-sm text-slate-600">
                <Icon name="Minus" size={14} className="text-blue-500 mt-1 shrink-0" />
                {c}
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 font-semibold mb-1">Компенсация:</p>
            <p className="text-sm text-slate-600">Лёгкие ↓ вентиляцию → накапливают CO₂ → снижают pH</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 animate-fade-up delay-200">
        {[
          { label: "pH", value: "> 7.45", icon: "ArrowUp", bg: "bg-blue-50", border: "border-blue-200", iconColor: "text-blue-600", valColor: "text-blue-700" },
          { label: "HCO₃⁻ (метаб.)", value: "> 26 ммоль/л", icon: "ArrowUp", bg: "bg-sky-50", border: "border-sky-200", iconColor: "text-sky-600", valColor: "text-sky-700" },
          { label: "pCO₂ (дых.)", value: "< 35 мм рт.ст.", icon: "ArrowDown", bg: "bg-cyan-50", border: "border-cyan-200", iconColor: "text-cyan-600", valColor: "text-cyan-700" },
        ].map(({ label, value, icon, bg, border, iconColor, valColor }) => (
          <div key={label} className={`${bg} border ${border} rounded-xl p-3 text-center`}>
            <Icon name={icon} size={20} className={`${iconColor} mx-auto mb-1`} />
            <p className="text-xs text-slate-500">{label}</p>
            <p className={`font-bold ${valColor} text-sm`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 6 — Клинические проявления ─── */
function Slide6() {
  const acidSymptoms = [
    { sys: "🧠 ЦНС", signs: ["Угнетение сознания → кома", "Головная боль, сонливость", "Дезориентация"] },
    { sys: "💓 ССС", signs: ["Аритмии, снижение АД", "Уменьшение сердечного выброса", "Расширение периферических сосудов"] },
    { sys: "🫁 Дыхание", signs: ["Дыхание Куссмауля (глубокое, шумное)", "Запах ацетона при кетоацидозе"] },
    { sys: "🦴 Прочее", signs: ["Тошнота, рвота", "Остеопороз при хроническом ацидозе", "Мышечная слабость"] },
  ];
  const alkSymptoms = [
    { sys: "🧠 ЦНС", signs: ["Возбуждение, раздражительность", "Тревога, парестезии рук и ног", "Судороги (тетания)"] },
    { sys: "💓 ССС", signs: ["Тахикардия, аритмии", "Снижение АД при выраженном алкалозе", "Сужение сосудов мозга"] },
    { sys: "🫁 Дыхание", signs: ["Поверхностное редкое дыхание", "Компенсаторная гиповентиляция"] },
    { sys: "💪 Прочее", signs: ["Тремор, мышечные спазмы", "Симптом Хвостека (+)", "Гипокалиемия (слабость мышц)"] },
  ];

  return (
    <div className="space-y-4">
      <SlideHeader icon="Stethoscope" number="06" title="Клинические проявления нарушений" color="blue" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="animate-fade-up">
          <div className="bg-red-600 rounded-t-2xl px-5 py-3 flex items-center gap-3">
            <Icon name="TrendingDown" size={18} className="text-white" />
            <h3 className="font-montserrat font-bold text-white text-sm">Ацидоз (pH &lt; 7.35)</h3>
          </div>
          <div className="bg-white rounded-b-2xl border border-red-100 shadow-sm p-4 space-y-2">
            {acidSymptoms.map((s) => (
              <div key={s.sys} className="bg-red-50 rounded-xl p-3">
                <p className="font-semibold text-slate-700 text-sm mb-1.5">{s.sys}</p>
                <ul className="space-y-1">
                  {s.signs.map((sg) => (
                    <li key={sg} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-red-400 mt-0.5 shrink-0">▸</span> {sg}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up delay-100">
          <div className="bg-blue-600 rounded-t-2xl px-5 py-3 flex items-center gap-3">
            <Icon name="TrendingUp" size={18} className="text-white" />
            <h3 className="font-montserrat font-bold text-white text-sm">Алкалоз (pH &gt; 7.45)</h3>
          </div>
          <div className="bg-white rounded-b-2xl border border-blue-100 shadow-sm p-4 space-y-2">
            {alkSymptoms.map((s) => (
              <div key={s.sys} className="bg-blue-50 rounded-xl p-3">
                <p className="font-semibold text-slate-700 text-sm mb-1.5">{s.sys}</p>
                <ul className="space-y-1">
                  {s.signs.map((sg) => (
                    <li key={sg} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-blue-400 mt-0.5 shrink-0">▸</span> {sg}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 animate-fade-up delay-200">
        <Icon name="AlertTriangle" size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800 text-sm">Опасные значения pH:</p>
          <p className="text-amber-700 text-sm">
            pH &lt; 7.0 или pH &gt; 7.7 — критические состояния, требующие немедленной интенсивной терапии!
            Смерть наступает при pH &lt; 6.8 или pH &gt; 7.8.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 7 — Заключение ─── */
function Slide7() {
  const conclusions = [
    { icon: "Shield", text: "Буферные системы — первый и самый быстрый механизм защиты pH крови (норма 7.35–7.45)", iconBg: "bg-blue-600" },
    { icon: "Layers", text: "4 системы: бикарбонатная (65%), гемоглобиновая (23%), белковая (7%), фосфатная (5%)", iconBg: "bg-violet-600" },
    { icon: "Activity", text: "pH связан с буферами через уравнение Гендерсона–Хассельбаха: зависит от HCO₃⁻ и pCO₂", iconBg: "bg-cyan-600" },
    { icon: "TrendingDown", text: "Ацидоз (pH < 7.35): угнетение ЦНС, аритмии, дыхание Куссмауля — дыхательный и метаболический", iconBg: "bg-red-600" },
    { icon: "TrendingUp", text: "Алкалоз (pH > 7.45): возбуждение, тетания, тахикардия — дыхательный и метаболический", iconBg: "bg-sky-600" },
    { icon: "RefreshCw", text: "Компенсация: лёгкие (быстро — минуты) и почки (медленно — часы/дни) восстанавливают pH", iconBg: "bg-green-600" },
  ];

  return (
    <div className="space-y-4">
      <SlideHeader icon="CheckCircle" number="07" title="Заключение и выводы" color="blue" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up">
        {conclusions.map(({ icon, text, iconBg }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 shadow-sm border border-blue-50 flex items-start gap-3 card-hover"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center shrink-0`}>
              <Icon name={icon} size={16} className="text-white" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-2xl p-6 animate-fade-up delay-300">
        <div className="flex items-start gap-4">
          <div className="text-4xl shrink-0">🩺</div>
          <div>
            <h3 className="font-montserrat font-bold text-white text-lg mb-2">Клиническое значение</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-3">
              Знание буферных систем критически важно для медицинской практики. Нарушения КОС встречаются при сахарном диабете,
              почечной недостаточности, заболеваниях лёгких, отравлениях и шоке. Своевременная диагностика позволяет спасти жизнь пациента.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Диагностика ацидоза/алкалоза", "Анализ КЩС крови", "Интенсивная терапия", "Коррекция нарушений"].map((t) => (
                <span key={t} className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-lg border border-white/30">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up delay-400">
        {[
          { val: "7.35–7.45", label: "Норма pH крови" },
          { val: "4", label: "Буферных системы" },
          { val: "65%", label: "Бикарбонатная" },
          { val: "6.8–7.8", label: "Совместимо с жизнью" },
        ].map(({ val, label }) => (
          <div key={label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-blue-100">
            <p className="font-montserrat font-black text-blue-700 text-xl">{val}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Shared header component ─── */
function SlideHeader({ icon, number, title, color }: { icon: string; number: string; title: string; color: string }) {
  return (
    <div className="flex items-center gap-4 mb-1 animate-fade-up">
      <div className={`w-12 h-12 bg-${color}-700 rounded-xl flex items-center justify-center shadow-md shrink-0`}>
        <Icon name={icon} size={22} className="text-white" />
      </div>
      <div>
        <span className={`text-xs font-bold text-${color}-500 font-montserrat tracking-widest`}>СЛАЙД {number}</span>
        <h2 className="font-montserrat font-black text-slate-800 text-xl leading-tight">{title}</h2>
      </div>
    </div>
  );
}