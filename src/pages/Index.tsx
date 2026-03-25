import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const speakerNotes: string[] = [
  /* 0 — Титульный */
  `Добрый день! Тема моего выступления — «Буферные системы крови». Это один из ключевых разделов патологической физиологии, потому что поддержание постоянства pH крови — это буквально вопрос жизни и смерти.

Сегодня мы разберём: что такое буфер и зачем он нужен, какие четыре буферные системы работают в крови, как развиваются ацидоз и алкалоз, какие симптомы они вызывают и как организм с ними борется. Начнём.`,

  /* 1 — Что такое буферная система */
  `Итак, буферная система — это смесь слабой кислоты и её соли, которая препятствует резким изменениям pH.

В клетках постоянно образуются кислые продукты обмена: углекислый газ, молочная кислота, кетоновые тела. Если бы не буферы — pH крови упал бы до критических значений за считанные минуты.

Норма pH крови — строго 7,35 до 7,45. Это очень узкий коридор. Отклонение даже на 0,4 единицы несовместимо с жизнью.

Важно понимать иерархию: буферы реагируют первыми — за секунды. Затем подключаются лёгкие — через минуты. И наконец, почки обеспечивают полную компенсацию — за часы и дни. Буферы — это скорая помощь, но не окончательное лечение.

Работу буферов описывает уравнение Гендерсона–Хассельбаха: pH равен pKa плюс логарифм отношения основания к кислоте. Это уравнение — основа всей диагностики нарушений КОС.`,

  /* 2 — Бикарбонатная */
  `Бикарбонатная система — самая мощная. На её долю приходится 65% всей буферной ёмкости крови. Она работает в плазме.

Состоит из двух компонентов: угольная кислота H₂CO₃ — это кислотный компонент, и гидрокарбонат-ион HCO₃⁻ — основной компонент. Норма HCO₃⁻ в плазме — от 22 до 26 ммоль на литр.

Ключевой фермент — карбоангидраза. Она ускоряет реакцию: CO₂ плюс вода даёт угольную кислоту, которая затем диссоциирует на H⁺ и HCO₃⁻.

Главное достоинство этой системы — она регулируется сразу двумя органами. Лёгкие управляют уровнем CO₂: при ацидозе учащают дыхание и выдыхают лишний CO₂. Почки управляют HCO₃⁻: при ацидозе усиливают его реабсорбцию.

При подстановке нормальных значений в уравнение Гендерсона–Хассельбаха получаем: pH = 6,1 плюс логарифм 24 делить на 1,2 — это равно 7,4. Именно так и поддерживается норма.`,

  /* 3 — Гемоглобиновая */
  `Гемоглобиновая буферная система занимает второе место — 23% буферной ёмкости. Она работает внутри эритроцитов.

Система представлена двумя формами: оксигемоглобин HHb — более сильная кислота, и дезоксигемоглобин Hb⁻ — более сильное основание. Именно разница в кислотно-основных свойствах делает эту систему такой мощной.

Принцип работы: в тканях клетки выделяют CO₂, он входит в эритроцит, карбоангидраза превращает его в угольную кислоту, та распадается на H⁺ и HCO₃⁻. Протоны H⁺ поглощает дезоксигемоглобин — он выступает как основание. HCO₃⁻ выходит в плазму.

В лёгких всё наоборот: гемоглобин насыщается кислородом, становится более кислым HHb и выталкивает протоны, которые соединяются с HCO₃⁻, образуя CO₂ — и мы его выдыхаем.

Важная деталь: pKa гемоглобина около 7,4 — это идеально совпадает с нормальным pH крови. Поэтому система работает максимально эффективно именно в физиологических условиях. Это называется эффект Бора.`,

  /* 4 — Белковая и фосфатная */
  `Белковая система обеспечивает около 7% буферной ёмкости. Главный белок — альбумин плазмы, его концентрация около 40 граммов на литр.

Белки — амфотерные молекулы. Они содержат как карбоксильные группы COOH — доноры протонов, так и аминогруппы NH₂ — акцепторы протонов. Особую роль играет гистидин с имидазольным кольцом, pKa которого около 6–7, то есть работает именно в физиологическом диапазоне pH.

Фосфатная система даёт всего 5% в плазме крови, но она очень важна в двух местах: внутри клеток, где много органических фосфатов, и в моче, где фосфаты — главный буфер.

Состоит из дигидрофосфата H₂PO₄⁻ — кислота, и гидрофосфата HPO₄²⁻ — основание. pKa этой системы — 6,8, что идеально для внутриклеточной среды.

Посмотрите на сводную таблицу. Обратите внимание: у каждой системы своя локализация и свои механизмы регуляции. Бикарбонатная выгодна тем, что её легко измерить в клинике — именно поэтому по ней судят о состоянии КОС у пациента.`,

  /* 5 — pH шкала */
  `Давайте разберём pH-шкалу. Нейтральная реакция — это pH 7,0. Кровь в норме слегка щелочная: 7,35–7,45.

Диапазон, совместимый с жизнью — от 6,8 до 7,8. За пределами этого диапазона наступает смерть.

Если pH ниже 7,35 — это ацидоз, сдвиг в кислую сторону. Если выше 7,45 — алкалоз, сдвиг в щелочную. Казалось бы, разница небольшая, но последствия катастрофические.

Почему такое небольшое отклонение так опасно? Во-первых, ферменты имеют строгий pH-оптимум — при сдвиге они теряют активность и метаболизм останавливается. Во-вторых, изменяются свойства мембран и возбудимость клеток. В-третьих, перераспределяются электролиты — особенно калий и кальций, что ведёт к аритмиям и судорогам.

Для оценки КОС в клинике мы измеряем: pH артериальной крови, pCO₂ — парциальное давление CO₂, HCO₃⁻ — концентрацию бикарбоната, и BE — дефицит оснований. Эти четыре показателя дают полную картину состояния кислотно-основного равновесия.`,

  /* 6 — Ацидоз */
  `Ацидоз — это снижение pH крови ниже 7,35. Различают два принципиально разных вида.

Дыхательный ацидоз. Причина — недостаточное выведение CO₂ лёгкими. CO₂ накапливается, образуется избыток угольной кислоты, pH падает. Типичные причины: ХОБЛ, тяжёлая бронхиальная астма, пневмония, угнетение дыхательного центра наркотиками или барбитуратами. Лабораторно: pCO₂ выше 45, pH ниже 7,35. Компенсируют почки — они усиливают реабсорбцию HCO₃⁻ и экскрецию H⁺.

Метаболический ацидоз. Причина — накопление нелетучих кислот или потеря бикарбоната. Самые частые причины: диабетический кетоацидоз — когда кетоновые тела, молочнокислый ацидоз при шоке и гипоксии, хроническая почечная недостаточность, диарея с потерей HCO₃⁻. Лабораторно: HCO₃⁻ ниже 22, BE ниже минус двух. Компенсируют лёгкие — развивается характерное глубокое шумное дыхание Куссмауля, которое выводит CO₂.

Клинически ацидоз проявляется: слабостью, нарушением сознания вплоть до комы, тахикардией переходящей в брадикардию, гипотонией. При диабетическом кетоацидозе — запах ацетона изо рта.`,

  /* 7 — Алкалоз */
  `Алкалоз — это повышение pH крови выше 7,45. Тоже бывает двух видов.

Дыхательный алкалоз. Причина — избыточное выведение CO₂. Это происходит при гипервентиляции: паника, болевой синдром, истерия. Также при горной болезни — это компенсаторная гипервентиляция из-за гипоксии. Лабораторно: pCO₂ ниже 35. Компенсация — почки снижают реабсорбцию HCO₃⁻.

Метаболический алкалоз. Причина — накопление оснований или потеря кислот. Классические причины: неукротимая рвота — теряется соляная кислота, бесконтрольный приём соды или антацидов, петлевые и тиазидные диуретики, первичный гиперальдостеронизм. Лабораторно: HCO₃⁻ выше 26. Компенсация — лёгкие снижают вентиляцию, задерживая CO₂.

Клиника алкалоза во многом противоположна ацидозу: повышается нервно-мышечная возбудимость, развивается тетания — симптом Труссо, симптом Хвостека. Это происходит потому, что при алкалозе снижается уровень ионизированного кальция. Пациент жалуется на онемение, покалывание, карпопедальный спазм — судороги кисти и стопы.`,

  /* 8 — Клинические проявления */
  `Теперь систематизируем клинические проявления по органам и системам.

Центральная нервная система: ацидоз угнетает — спутанность, ступор, кома. Алкалоз возбуждает — тревога, головокружение, судороги.

Сердечно-сосудистая система: при ацидозе снижается сократимость миокарда, нарастает тахикардия, затем брадикардия, угроза аритмии и кардиогенного шока. При алкалозе — спазм коронарных артерий, аритмии на фоне гипокалиемии.

Дыхание: при ацидозе — компенсаторная гипервентиляция, дыхание Куссмауля. При алкалозе — гиповентиляция как компенсация, вплоть до апноэ.

Нейромышечная система: ацидоз снижает возбудимость, вызывает слабость и параличи. Алкалоз повышает возбудимость — тетания, спазмы.

Почки и электролиты: ацидоз вызывает гиперкалиемию — калий выходит из клеток в обмен на H⁺. Алкалоз — гипокалиемию. Это важно помнить при ведении пациентов!

Костная система: при хроническом ацидозе из костей вымывается кальций, развивается остеопороз. При алкалозе — снижается уровень ионизированного кальция.`,

  /* 9 — Компенсация и лечение */
  `Рассмотрим, как организм компенсирует нарушения КОС.

Три уровня защиты. Первый — буферные системы: работают немедленно, но только химически связывают H⁺, не устраняя причину. Второй — лёгкие: через 15–30 минут, регулируют pCO₂ изменением частоты и глубины дыхания. Третий — почки: полная компенсация за часы и дни, единственная система, способная полностью нормализовать pH.

Запомните правило: дыхательные нарушения компенсируют почки. Метаболические нарушения компенсируют лёгкие.

Лечение ацидоза. При дыхательном — устранить причину обструкции, при необходимости ИВЛ и кислородотерапия. При метаболическом — инфузия бикарбоната натрия NaHCO₃ при pH ниже 7,1. Доза рассчитывается по формуле: BE умножить на массу тела в кг умножить на 0,3. Плюс обязательно лечение основной причины.

Лечение алкалоза. При дыхательном — дышать в мешок, снизить параметры ИВЛ. При метаболическом — восполнение хлора и калия, ацетазоламид, устранение причины. Ацетазоламид блокирует карбоангидразу в почках и усиливает выведение бикарбоната.`,

  /* 10 — Итоги */
  `В заключение — главное, что нужно запомнить.

Четыре буферные системы крови: бикарбонатная — 65%, главная, регулируется лёгкими и почками. Гемоглобиновая — 23%, в эритроцитах, связана с транспортом кислорода. Белковая — 7%, амфотерные свойства альбумина. Фосфатная — 5%, важна в клетках и моче.

pH крови в норме — 7,35–7,45. Ниже — ацидоз, выше — алкалоз. За пределами 6,8–7,8 — несовместимо с жизнью.

Главное правило компенсации: дыхательные нарушения компенсируют почки, метаболические — лёгкие. Буферы — всегда первые.

Уравнение Гендерсона–Хассельбаха лежит в основе всей диагностики: pH = pKa + логарифм отношения основания к кислоте. Для бикарбонатной системы — pH = 6,1 + lg HCO₃⁻ делить на 0,03 умноженное на pCO₂.

Спасибо за внимание! Готов ответить на вопросы.`,
];

const slides = [
  { id: 0, title: "Буферные системы крови", subtitle: "Патологическая физиология" },
  { id: 1, title: "Что такое буферная система?" },
  { id: 2, title: "Бикарбонатная система" },
  { id: 3, title: "Гемоглобиновая система" },
  { id: 4, title: "Белковая и фосфатная системы" },
  { id: 5, title: "Шкала pH крови" },
  { id: 6, title: "Ацидоз" },
  { id: 7, title: "Алкалоз" },
  { id: 8, title: "Клинические проявления" },
  { id: 9, title: "Компенсация и лечение" },
  { id: 10, title: "Итоги и запомни!" },
];

const TOTAL = slides.length;

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [notesOpen, setNotesOpen] = useState(false);

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
    <div className="min-h-screen bg-[#f0f4fa] flex flex-col font-golos select-none">
      <header className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
            <Icon name="BookOpen" size={15} className="text-white" />
          </div>
          <span className="font-montserrat font-bold text-blue-900 text-sm hidden sm:block">Буферные системы крови</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto max-w-2xl">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={s.title}
              className={`text-xs px-2.5 py-1 rounded transition-all whitespace-nowrap font-semibold
                ${current === i
                  ? "bg-blue-700 text-white"
                  : "text-blue-500 hover:bg-blue-50"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium shrink-0">{current + 1} / {TOTAL}</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-4 overflow-auto">
        <div key={animKey} className={`w-full max-w-5xl ${animClass}`}>
          {current === 0 && <Slide0 />}
          {current === 1 && <Slide1 />}
          {current === 2 && <Slide2 />}
          {current === 3 && <Slide3 />}
          {current === 4 && <Slide4 />}
          {current === 5 && <Slide5 />}
          {current === 6 && <Slide6 />}
          {current === 7 && <Slide7 />}
          {current === 8 && <Slide8 />}
          {current === 9 && <Slide9 />}
          {current === 10 && <Slide10 />}
        </div>

        {/* Speaker notes */}
        <div className="w-full max-w-5xl mt-4">
          <button
            onClick={() => setNotesOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl text-left"
          >
            <div className="flex items-center gap-2.5">
              <Icon name="Mic" size={16} className="text-amber-400" />
              <span className="text-sm font-semibold text-white font-montserrat">Текст выступления</span>
              <span className="text-xs text-slate-400 hidden sm:block">— читай вслух по слайду</span>
            </div>
            <Icon name={notesOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-slate-400" />
          </button>

          {notesOpen && (
            <div className="mt-1 bg-slate-900 rounded-xl p-5 border border-slate-700 animate-fade-up">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400 font-montserrat uppercase tracking-wide">Слайд {current + 1} · {slides[current].title}</span>
              </div>
              <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {speakerNotes[current]}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between sticky bottom-0 z-50">
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

/* ─── Shared header ─── */
function SlideHeader({ icon, number, title, sub }: { icon: string; number: string; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-4 mb-2 animate-fade-up">
      <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center shrink-0 shadow-md">
        <Icon name={icon} size={22} className="text-white" />
      </div>
      <div>
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest font-montserrat">Слайд {number}</p>
        <h2 className="font-montserrat font-black text-blue-900 text-xl sm:text-2xl leading-tight">{title}</h2>
        {sub && <p className="text-slate-500 text-sm mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ─── Info box ─── */
function InfoBox({ color, icon, title, children }: { color: string; icon: string; title: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    green: "bg-emerald-50 border-emerald-200 text-emerald-800",
    red: "bg-red-50 border-red-200 text-red-800",
    violet: "bg-violet-50 border-violet-200 text-violet-800",
    rose: "bg-rose-50 border-rose-200 text-rose-800",
    cyan: "bg-cyan-50 border-cyan-200 text-cyan-800",
  };
  const iconColors: Record<string, string> = {
    blue: "text-blue-600",
    amber: "text-amber-600",
    green: "text-emerald-600",
    red: "text-red-600",
    violet: "text-violet-600",
    rose: "text-rose-600",
    cyan: "text-cyan-600",
  };
  return (
    <div className={`${colors[color]} border rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon name={icon} size={16} className={iconColors[color]} />
        <span className="font-bold text-sm font-montserrat">{title}</span>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ─── Formula block ─── */
function Formula({ eq, label }: { eq: string; label?: string }) {
  return (
    <div className="bg-slate-900 rounded-xl px-5 py-3 font-mono text-center">
      <p className="text-cyan-300 text-base sm:text-lg font-bold tracking-wide">{eq}</p>
      {label && <p className="text-slate-400 text-xs mt-1">{label}</p>}
    </div>
  );
}

/* ─── SLIDE 0 — Титульный ─── */
function Slide0() {
  return (
    <div className="min-h-[72vh] bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 rounded-2xl overflow-hidden relative flex flex-col">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-5 text-[280px] leading-none pointer-events-none select-none">🧬</div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-12 z-10">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <Icon name="GraduationCap" size={12} /> Патологическая физиология
            </span>
          </div>
          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 animate-fade-up delay-100">
            Буферные<br />системы<br /><span className="text-cyan-300">крови</span>
          </h1>
          <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-lg leading-relaxed animate-fade-up delay-200">
            Механизмы поддержания кислотно-основного равновесия, pH крови в норме и патологии — ацидоз, алкалоз и их компенсация.
          </p>
          <div className="flex flex-wrap gap-2 animate-fade-up delay-300">
            {["4 буферные системы", "pH: норма и патология", "Ацидоз", "Алкалоз", "Компенсация", "Клиника"].map((t) => (
              <span key={t} className="bg-white/10 hover:bg-white/20 transition-colors text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:w-72 flex flex-col gap-3 justify-center px-8 lg:px-0 lg:pr-10 pb-8 lg:pb-0 z-10 animate-fade-up delay-300">
          {[
            { num: "4", label: "буферные системы", icon: "Layers" },
            { num: "7.35–7.45", label: "норма pH крови", icon: "Activity" },
            { num: "3", label: "механизма компенсации", icon: "RefreshCw" },
            { num: "11", label: "слайдов с разбором", icon: "BookOpen" },
          ].map(({ num, label, icon }) => (
            <div key={label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
              <Icon name={icon} size={18} className="text-cyan-300 shrink-0" />
              <div>
                <p className="font-montserrat font-black text-white text-lg leading-none">{num}</p>
                <p className="text-blue-200 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-950/50 px-8 sm:px-14 py-3 flex items-center justify-between z-10">
        <span className="text-blue-300 text-xs flex items-center gap-1.5"><Icon name="Building2" size={12} /> Медицинский колледж</span>
        <span className="text-blue-300 text-xs flex items-center gap-1.5"><Icon name="ChevronRight" size={12} /> Нажми → для начала</span>
      </div>
    </div>
  );
}

/* ─── SLIDE 1 — Что такое буферная система ─── */
function Slide1() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="FlaskConical" number="01" title="Что такое буферная система?" sub="Основы кислотно-основного равновесия" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 animate-fade-up">
          <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow">
            <Icon name="BookOpen" size={20} className="text-white" />
          </div>
          <h3 className="font-montserrat font-bold text-blue-900 text-lg mb-3">Определение</h3>
          <p className="text-slate-600 leading-relaxed text-sm mb-4">
            <strong className="text-blue-800">Буферная система</strong> — это смесь слабой кислоты и её соли (сопряжённое основание), которая противодействует значительным изменениям pH при добавлении кислот или щелочей.
          </p>
          <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-800">
            <strong>Уравнение Гендерсона–Хассельбаха:</strong>
            <div className="mt-2 font-mono text-center text-blue-900 font-bold text-base">
              pH = pKa + lg [A⁻] / [HA]
            </div>
            <p className="text-xs text-blue-600 mt-1 text-center">где [A⁻] — основание, [HA] — кислота</p>
          </div>
        </div>

        <div className="bg-blue-700 rounded-2xl p-6 shadow-sm animate-fade-up delay-100">
          <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <Icon name="Target" size={20} className="text-white" />
          </div>
          <h3 className="font-montserrat font-bold text-white text-lg mb-3">Зачем нужны буферы?</h3>
          <p className="text-blue-100 leading-relaxed text-sm mb-4">
            В процессе метаболизма клетки постоянно производят кислые продукты: молочную кислоту, CO₂, кетоновые тела. Без буферов pH крови смертельно сместился бы за минуты.
          </p>
          <div className="space-y-2">
            {[
              "Норма pH крови: 7.35 – 7.45",
              "Совместимо с жизнью: 6.8 – 7.8",
              "Отклонение на 0.4 единицы — критично",
            ].map((s) => (
              <div key={s} className="flex items-center gap-2 text-blue-100 text-sm">
                <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up delay-200">
        {[
          { icon: "Zap", title: "Быстрота действия", desc: "Буферы — первая, мгновенная линия защиты pH. Реагируют за секунды.", bg: "bg-amber-50", border: "border-amber-200", iconBg: "bg-amber-500", text: "text-amber-900" },
          { icon: "RefreshCw", title: "Обратимость", desc: "Все реакции буферных систем обратимы — это позволяет работать в обе стороны.", bg: "bg-green-50", border: "border-green-200", iconBg: "bg-green-600", text: "text-green-900" },
          { icon: "Shield", title: "Ёмкость буфера", desc: "Чем выше концентрация компонентов — тем мощнее защита. Измеряется в ммоль/л.", bg: "bg-blue-50", border: "border-blue-200", iconBg: "bg-blue-600", text: "text-blue-900" },
        ].map(({ icon, title, desc, bg, border, iconBg, text }) => (
          <div key={title} className={`${bg} rounded-xl p-4 border ${border} card-hover animate-fade-up`}>
            <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center mb-3 shadow`}>
              <Icon name={icon} size={16} className="text-white" />
            </div>
            <h4 className={`font-montserrat font-bold ${text} text-sm mb-1.5`}>{title}</h4>
            <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 animate-fade-up delay-300">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 font-montserrat">Три системы регуляции pH — от быстрой к медленной:</p>
        <div className="flex flex-col sm:flex-row gap-2">
          {[
            { label: "1. Буферные системы", time: "Секунды", color: "bg-blue-600" },
            { label: "2. Лёгкие (CO₂)", time: "Минуты", color: "bg-cyan-600" },
            { label: "3. Почки (HCO₃⁻, H⁺)", time: "Часы–дни", color: "bg-slate-500" },
          ].map(({ label, time, color }) => (
            <div key={label} className="flex-1 flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2">
              <div className={`w-2 h-8 ${color} rounded-full shrink-0`} />
              <div>
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-500">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 2 — Бикарбонатная система ─── */
function Slide2() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="Droplets" number="02" title="Бикарбонатная буферная система" sub="Самая мощная — 65% буферной ёмкости крови" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-blue-100 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow">
              <Icon name="Droplets" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-blue-900">Состав системы</h3>
              <p className="text-xs text-slate-500">Работает в плазме крови</p>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <Formula eq="CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻" label="Карбоангидраза катализирует первую реакцию" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
              <p className="text-xs text-slate-500 mb-1 font-semibold">Кислотный компонент</p>
              <p className="font-mono font-bold text-blue-800">H₂CO₃</p>
              <p className="text-xs text-slate-600 mt-1">Угольная кислота (слабая)</p>
              <p className="text-xs text-blue-600 mt-0.5">≈ растворённый CO₂ × 0.03</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-3 border border-cyan-100">
              <p className="text-xs text-slate-500 mb-1 font-semibold">Основной компонент</p>
              <p className="font-mono font-bold text-cyan-800">HCO₃⁻</p>
              <p className="text-xs text-slate-600 mt-1">Гидрокарбонат-ион</p>
              <p className="text-xs text-cyan-600 mt-0.5">Норма: 22–26 ммоль/л</p>
            </div>
          </div>

          <div className="mt-4 bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-500 mb-2 font-montserrat uppercase tracking-wide">Уравнение Гендерсона–Хассельбаха:</p>
            <p className="font-mono text-center text-slate-800 font-bold text-sm">pH = 6.1 + lg [HCO₃⁻] / (0.03 × pCO₂)</p>
            <p className="text-xs text-slate-500 mt-1 text-center">при норме: pH = 6.1 + lg (24 / 1.2) = 6.1 + 1.3 = 7.4</p>
          </div>
        </div>

        <div className="space-y-3 animate-fade-up delay-100">
          <div className="bg-blue-700 rounded-2xl p-5 text-white">
            <Icon name="Star" size={18} className="text-cyan-300 mb-2" />
            <h4 className="font-montserrat font-bold mb-2">Почему главная?</h4>
            <ul className="text-sm text-blue-100 space-y-1.5">
              {[
                "65% всей буферной ёмкости",
                "Регулируется двумя органами",
                "CO₂ выводят лёгкие",
                "HCO₃⁻ регулируют почки",
                "Легко измерить в клинике",
              ].map((s) => (
                <li key={s} className="flex items-start gap-1.5">
                  <Icon name="Check" size={12} className="text-cyan-300 mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-3 font-montserrat">Нормальные значения</p>
            <div className="space-y-2">
              {[
                { name: "pH", value: "7.35–7.45", color: "bg-green-500" },
                { name: "pCO₂", value: "35–45 мм рт.ст.", color: "bg-blue-500" },
                { name: "HCO₃⁻", value: "22–26 ммоль/л", color: "bg-cyan-500" },
                { name: "BE", value: "–2 до +2 ммоль/л", color: "bg-violet-500" },
              ].map(({ name, value, color }) => (
                <div key={name} className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${color} rounded-full shrink-0`} />
                  <span className="text-xs font-mono font-bold text-slate-700 w-16">{name}</span>
                  <span className="text-xs text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up delay-200">
        <InfoBox color="amber" icon="Lightbulb" title="Как работает при избытке кислоты">
          Если H⁺ ↑ → HCO₃⁻ связывает протон → образуется H₂CO₃ → лёгкие усиливают вентиляцию → CO₂ выводится → pH восстанавливается
        </InfoBox>
        <InfoBox color="cyan" icon="Lightbulb" title="Как работает при избытке щёлочи">
          Если OH⁻ ↑ → H₂CO₃ отдаёт протон → OH⁻ нейтрализуется → почки задерживают H⁺, выводят HCO₃⁻ → pH восстанавливается
        </InfoBox>
      </div>
    </div>
  );
}

/* ─── SLIDE 3 — Гемоглобиновая система ─── */
function Slide3() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="Heart" number="03" title="Гемоглобиновая буферная система" sub="Самая ёмкая — 23% буферной ёмкости. Работает в эритроцитах" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 animate-fade-up">
          <h3 className="font-montserrat font-bold text-rose-900 mb-4 flex items-center gap-2">
            <Icon name="Heart" size={18} className="text-rose-600" /> Состав и строение
          </h3>
          <Formula eq="HHb ⇌ H⁺ + Hb⁻" label="В эритроцитах (RBC)" />
          <div className="mt-4 space-y-3">
            <div className="bg-rose-50 rounded-xl p-3 border border-rose-100">
              <p className="font-mono font-bold text-rose-800 text-sm">HHb (оксигемоглобин)</p>
              <p className="text-xs text-slate-600 mt-1">Более сильная кислота. В артериальной крови. При насыщении O₂ гемоглобин отдаёт протоны → слабо буферирует.</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="font-mono font-bold text-green-400 text-sm">Hb⁻ (дезоксигемоглобин)</p>
              <p className="text-xs text-slate-300 mt-1">Более сильное основание. В венозной крови. Поглощает CO₂ и H⁺ из тканей — отличный буфер!</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 animate-fade-up delay-100">
          <div className="bg-rose-700 rounded-2xl p-5 text-white">
            <h4 className="font-montserrat font-bold mb-3">Роль в транспорте CO₂</h4>
            <div className="space-y-3">
              {[
                { arrow: "→", label: "В тканях:", text: "CO₂ входит в эритроцит, карбоангидраза → H₂CO₃ → H⁺ + HCO₃⁻. Hb⁻ поглощает H⁺" },
                { arrow: "→", label: "В лёгких:", text: "HbO₂ образуется → кислота HHb выталкивает H⁺ → HCO₃⁻ + H⁺ → CO₂ + H₂O → выдох" },
              ].map(({ arrow, label, text }) => (
                <div key={label} className="bg-white/10 rounded-xl p-3">
                  <p className="font-bold text-rose-200 text-xs mb-1">{arrow} {label}</p>
                  <p className="text-rose-100 text-xs leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100">
            <p className="text-xs font-bold text-rose-400 uppercase tracking-wide mb-3 font-montserrat">Ключевые факты</p>
            <div className="space-y-2">
              {[
                "pKa гемоглобина ≈ 7.4 — идеально для pH крови",
                "75% CO₂ транспортируется как HCO₃⁻",
                "Дезоксигемоглобин в 70 раз слабее как кислота",
                "Эффект Бора: CO₂ снижает сродство Hb к O₂",
              ].map((s) => (
                <div key={s} className="flex items-start gap-2 text-xs text-slate-600">
                  <Icon name="CheckCircle" size={13} className="text-rose-500 mt-0.5 shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 animate-fade-up delay-200">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 font-montserrat">Гемоглобиновый буфер — цикл в эритроцитах</p>
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-center">
          {[
            { label: "ТКАНИ", sub: "CO₂ + H₂O", color: "bg-orange-100 border-orange-300 text-orange-800" },
            { label: "→", sub: "", color: "" },
            { label: "ЭРИТРОЦИТ", sub: "H⁺ + HCO₃⁻", color: "bg-rose-100 border-rose-300 text-rose-800" },
            { label: "→", sub: "", color: "" },
            { label: "ЛЁГКИЕ", sub: "CO₂ выдох", color: "bg-blue-100 border-blue-300 text-blue-800" },
            { label: "→", sub: "", color: "" },
            { label: "ПЛАЗМА", sub: "HCO₃⁻ → лёгкие", color: "bg-cyan-100 border-cyan-300 text-cyan-800" },
          ].map(({ label, sub, color }, i) =>
            !color ? (
              <Icon key={i} name="ChevronRight" size={20} className="text-slate-400 hidden sm:block" />
            ) : (
              <div key={i} className={`flex-1 border-2 ${color} rounded-xl p-3 text-center`}>
                <p className="font-bold text-sm font-montserrat">{label}</p>
                <p className="text-xs mt-0.5 opacity-80">{sub}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 4 — Белковая и фосфатная системы ─── */
function Slide4() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="Dna" number="04" title="Белковая и фосфатная системы" sub="Вспомогательные, но важные буферы" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Белковая */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow">
              <Icon name="Dna" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-emerald-900">Белковая система</h3>
              <span className="text-xs text-emerald-600 font-semibold">7% буферной ёмкости</span>
            </div>
          </div>

          <Formula eq="Белок-NH₃⁺ ⇌ Белок-NH₂ + H⁺" label="Амфотерные свойства белков" />

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>Белки — <strong className="text-emerald-800">амфотерные</strong> молекулы: они могут и отдавать, и принимать протоны.</p>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 mt-3">
              <p className="font-semibold text-emerald-800 text-sm mb-2">Ключевые группы:</p>
              <div className="space-y-1">
                {[
                  { g: "–COOH", role: "Донор протонов (кислота)" },
                  { g: "–NH₂", role: "Акцептор протонов (основание)" },
                  { g: "–His", role: "Имидазол гистидина (pKa ≈ 6.0–7.0)" },
                ].map(({ g, role }) => (
                  <div key={g} className="flex items-center gap-2">
                    <code className="text-xs bg-white px-2 py-0.5 rounded border border-emerald-200 font-mono text-emerald-700 shrink-0">{g}</code>
                    <span className="text-xs text-slate-600">{role}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 mt-2">
              <p className="text-xs text-slate-500">Главный белок: <strong className="text-slate-700">альбумин плазмы</strong> (40 г/л) + внутриклеточные белки мышц</p>
            </div>
          </div>
        </div>

        {/* Фосфатная */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-violet-100 animate-fade-up delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow">
              <Icon name="Atom" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-violet-900">Фосфатная система</h3>
              <span className="text-xs text-violet-600 font-semibold">5% в крови, главная в моче</span>
            </div>
          </div>

          <Formula eq="H₂PO₄⁻ ⇌ H⁺ + HPO₄²⁻" label="pKa = 6.8 — идеально для внутриклеточной среды" />

          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="font-mono font-bold text-violet-800 text-sm">H₂PO₄⁻</p>
                <p className="text-xs text-slate-600 mt-1">Кислый фосфат<br />«кислота» системы</p>
              </div>
              <div className="bg-violet-100 rounded-xl p-3 border border-violet-200">
                <p className="font-mono font-bold text-violet-900 text-sm">HPO₄²⁻</p>
                <p className="text-xs text-slate-600 mt-1">Щелочной фосфат<br />«основание» системы</p>
              </div>
            </div>

            <div className="space-y-1.5">
              {[
                { label: "В крови", value: "Небольшая роль (мало фосфатов)", icon: "Minus" },
                { label: "В клетках", value: "Важна! Много органических фосфатов", icon: "Plus" },
                { label: "В моче", value: "Главная буферная система мочи", icon: "Star" },
                { label: "pKa", value: "6.8 — ближе к внутрикл. pH", icon: "Target" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-2 text-xs bg-slate-50 rounded-lg px-2 py-1.5">
                  <Icon name={icon} size={12} className="text-violet-500 shrink-0" />
                  <span className="font-semibold text-slate-600 w-20">{label}:</span>
                  <span className="text-slate-500">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 animate-fade-up delay-200">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 font-montserrat">Сводная таблица буферных систем крови</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 font-semibold border-b border-slate-100">
                <th className="text-left pb-2 font-montserrat">Система</th>
                <th className="text-center pb-2 font-montserrat">Доля</th>
                <th className="text-center pb-2 font-montserrat">Локализация</th>
                <th className="text-center pb-2 font-montserrat">pKa</th>
                <th className="text-left pb-2 font-montserrat">Регуляция</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: "Бикарбонатная", pct: "65%", loc: "Плазма", pka: "6.1", reg: "Лёгкие + почки", color: "text-blue-600" },
                { name: "Гемоглобиновая", pct: "23%", loc: "Эритроциты", pka: "7.4", reg: "Связывание O₂/CO₂", color: "text-rose-600" },
                { name: "Белковая", pct: "7%", loc: "Плазма + клетки", pka: "вар.", reg: "Синтез белков", color: "text-emerald-600" },
                { name: "Фосфатная", pct: "5%", loc: "Клетки + моча", pka: "6.8", reg: "Почечная экскреция", color: "text-violet-600" },
              ].map(({ name, pct, loc, pka, reg, color }) => (
                <tr key={name} className="hover:bg-slate-50 transition-colors">
                  <td className={`py-2 font-semibold ${color}`}>{name}</td>
                  <td className="py-2 text-center font-bold text-slate-700">{pct}</td>
                  <td className="py-2 text-center text-slate-500 text-xs">{loc}</td>
                  <td className="py-2 text-center font-mono text-slate-600">{pka}</td>
                  <td className="py-2 text-slate-500 text-xs">{reg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 5 — pH шкала ─── */
function Slide5() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="Activity" number="05" title="Шкала pH крови" sub="Кислотно-основное состояние в норме и патологии" />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 animate-fade-up">
        <h3 className="font-montserrat font-bold text-slate-800 mb-1 text-center text-lg">pH-шкала</h3>
        <p className="text-center text-slate-500 text-sm mb-6">Диапазон, совместимый с жизнью: <strong>6.8 – 7.8</strong></p>

        <div className="relative mb-12">
          <div className="h-12 rounded-2xl ph-gradient shadow-inner" />
          <div
            className="absolute top-0 h-12 border-4 border-white rounded-xl shadow-lg"
            style={{ left: "44%", width: "9%", boxShadow: "0 0 0 3px #16a34a, 0 4px 16px rgba(22,163,74,0.3)" }}
          />
          <div className="absolute -top-10 flex justify-center" style={{ left: "42%", width: "13%" }}>
            <span className="bg-green-600 text-white text-xs px-2.5 py-1 rounded-lg font-bold whitespace-nowrap shadow-md">
              НОРМА 7.35–7.45
            </span>
          </div>
          <div className="flex justify-between mt-3 px-0.5">
            {["1","2","3","4","5","6","6.8","7.35","N","7.45","7.8","8","9","10","11","12","14"].map((v, i) => (
              <span key={i} className={`text-xs font-mono leading-none
                ${v === "N" ? "text-green-600 font-black text-sm" : ["6.8","7.35","7.45","7.8"].includes(v) ? "font-bold text-slate-700" : "text-slate-300"}`}>{v === "N" ? "↑" : v}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { label: "Смерть", sub: "pH < 6.8", desc: "Несовместимо с жизнью", bg: "bg-red-900", text: "text-white" },
            { label: "Ацидоз", sub: "pH 6.8–7.35", desc: "Сдвиг в кислую сторону", bg: "bg-orange-500", text: "text-white" },
            { label: "НОРМА", sub: "pH 7.35–7.45", desc: "Физиологический диапазон", bg: "bg-green-600", text: "text-white" },
            { label: "Алкалоз", sub: "pH 7.45–7.8", desc: "Сдвиг в щелочную сторону", bg: "bg-blue-600", text: "text-white" },
            { label: "Смерть", sub: "pH > 7.8", desc: "Несовместимо с жизнью", bg: "bg-purple-900", text: "text-white" },
          ].map((z) => (
            <div key={z.sub} className={`${z.bg} rounded-xl p-3 text-center`}>
              <div className={`${z.text} font-bold font-montserrat`}>{z.label}</div>
              <div className={`${z.text} text-xs font-mono mt-0.5 opacity-90`}>{z.sub}</div>
              <div className={`${z.text} text-xs mt-1 opacity-70 leading-tight`}>{z.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up delay-200">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
          <h4 className="font-montserrat font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icon name="Beaker" size={16} className="text-blue-600" /> Показатели КОС в норме
          </h4>
          <div className="space-y-2">
            {[
              { name: "pH артер. крови", val: "7.35–7.45", note: "Строгий диапазон!", mark: "green" },
              { name: "pH венозной крови", val: "7.32–7.42", note: "Чуть кислее", mark: "blue" },
              { name: "pCO₂ арт.", val: "35–45 мм рт.ст.", note: "Дыхательный показатель", mark: "cyan" },
              { name: "HCO₃⁻", val: "22–26 ммоль/л", note: "Метаболический показатель", mark: "violet" },
              { name: "BE (дефицит осн.)", val: "–2 до +2 ммоль/л", note: "Отклонение от нормы", mark: "slate" },
              { name: "SatO₂", val: "95–99%", note: "Насыщение гемоглобина", mark: "rose" },
            ].map(({ name, val, note, mark }) => (
              <div key={name} className="flex items-center gap-2 py-1 border-b border-slate-50 last:border-0">
                <div className={`w-2 h-2 bg-${mark}-500 rounded-full shrink-0`} />
                <span className="text-xs text-slate-600 flex-1">{name}</span>
                <span className="text-xs font-mono font-bold text-slate-800">{val}</span>
                <span className="text-xs text-slate-400 hidden sm:block">{note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
          <h4 className="font-montserrat font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icon name="TrendingDown" size={16} className="text-red-500" /> Смещение pH — почему опасно
          </h4>
          <div className="space-y-3">
            {[
              { icon: "Zap", color: "text-amber-600 bg-amber-50", title: "Ферменты", desc: "Изменение pH нарушает конформацию и активность ферментов — метаболизм останавливается" },
              { icon: "Heart", color: "text-rose-600 bg-rose-50", title: "Сердце", desc: "При ацидозе снижается сократимость миокарда, риск аритмий. Алкалоз → спазм коронаров" },
              { icon: "Brain", color: "text-violet-600 bg-violet-50", title: "ЦНС", desc: "Алкалоз → возбуждение, судороги. Ацидоз → угнетение, кома, остановка дыхания" },
              { icon: "Activity", color: "text-blue-600 bg-blue-50", title: "Электролиты", desc: "K⁺, Ca²⁺, Na⁺ перераспределяются при изменении pH → нарушение возбудимости" },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center shrink-0`}>
                  <Icon name={icon} size={14} className={color.split(" ")[0]} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">{title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 6 — Ацидоз ─── */
function Slide6() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="TrendingDown" number="06" title="Ацидоз" sub="pH крови < 7.35 — сдвиг в кислую сторону" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-orange-600 rounded-2xl p-6 text-white animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon name="Wind" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-lg">Дыхательный ацидоз</h3>
              <p className="text-orange-200 text-xs">pCO₂ {'>'} 45 мм рт.ст.</p>
            </div>
          </div>
          <p className="text-orange-100 text-sm mb-4 leading-relaxed">
            Недостаточное выведение CO₂ лёгкими → накопление H₂CO₃ → избыток H⁺ → pH ↓
          </p>
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-orange-200 uppercase tracking-wide mb-2">Причины:</p>
            {["ХОБЛ, бронхиальная астма (тяжёлая)", "Пневмония, пневмоторакс", "Угнетение дыхательного центра (наркотики, барбитураты)", "Нервно-мышечные заболевания (ботулизм, полиомиелит)", "Гиповентиляция при наркозе"].map((s) => (
              <div key={s} className="flex items-start gap-2 text-sm text-orange-100">
                <Icon name="Minus" size={12} className="text-orange-300 mt-0.5 shrink-0" />
                {s}
              </div>
            ))}
          </div>
          <div className="mt-4 bg-white/10 rounded-xl p-3">
            <p className="text-xs text-orange-200 font-bold mb-1">Компенсация:</p>
            <p className="text-sm text-white">Почки ↑ HCO₃⁻ реабсорбцию + ↑ экскрецию H⁺</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 animate-fade-up delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow">
              <Icon name="FlaskConical" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-orange-900 text-lg">Метаболический ацидоз</h3>
              <p className="text-orange-500 text-xs">HCO₃⁻ {'<'} 22 ммоль/л</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            Накопление нелетучих кислот или потеря HCO₃⁻ → pH ↓
          </p>
          <div className="space-y-1.5 mb-4">
            <p className="text-xs font-bold text-orange-400 uppercase tracking-wide mb-2 font-montserrat">Причины:</p>
            {[
              "Диабетический кетоацидоз (кетоновые тела)",
              "Молочнокислый ацидоз (шок, гипоксия)",
              "Хроническая почечная недостаточность",
              "Диарея (потеря HCO₃⁻)",
              "Отравление метанолом, салицилатами",
            ].map((s) => (
              <div key={s} className="flex items-start gap-2 text-sm text-slate-600">
                <Icon name="Minus" size={12} className="text-orange-500 mt-0.5 shrink-0" />
                {s}
              </div>
            ))}
          </div>
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
            <p className="text-xs text-orange-600 font-bold mb-1">Компенсация:</p>
            <p className="text-sm text-orange-800">Лёгкие ↑ вентиляцию → pCO₂ ↓ (дыхание Куссмауля)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 animate-fade-up delay-200">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 font-montserrat">Лабораторная диагностика ацидоза</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: "pH", dys: "↓ < 7.35", resp: "pCO₂ ↑", met: "HCO₃⁻ ↓", label: "pH", color: "bg-orange-600" },
          ].map(() => null)}
          {[
            { label: "Дыхательный ацидоз", vals: [{ k: "pH", v: "↓ < 7.35" }, { k: "pCO₂", v: "↑ > 45" }, { k: "HCO₃⁻", v: "↑ (компенс.)" }, { k: "BE", v: "норм/+" }], color: "border-orange-500" },
            { label: "Метаболический ацидоз", vals: [{ k: "pH", v: "↓ < 7.35" }, { k: "pCO₂", v: "↓ (компенс.)" }, { k: "HCO₃⁻", v: "↓ < 22" }, { k: "BE", v: "< –2" }], color: "border-red-500" },
          ].map(({ label, vals, color }) => (
            <div key={label} className={`flex-1 border-2 ${color} rounded-xl p-4`}>
              <p className="font-bold text-slate-800 text-sm font-montserrat mb-3">{label}</p>
              <div className="space-y-2">
                {vals.map(({ k, v }) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-slate-500 font-mono text-xs">{k}</span>
                    <span className="font-bold text-slate-800 text-xs">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2 font-montserrat">Клинические симптомы:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {["Слабость, усталость", "Тахикардия → брадикардия", "Гипотония, шок", "Спутанность сознания", "Кома (тяжёлый ацидоз)", "Дыхание Куссмауля"].map((s) => (
                <p key={s} className="text-xs text-amber-800 flex items-center gap-1"><Icon name="Dot" size={12} className="text-amber-500" />{s}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 7 — Алкалоз ─── */
function Slide7() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="TrendingUp" number="07" title="Алкалоз" sub="pH крови > 7.45 — сдвиг в щелочную сторону" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-600 rounded-2xl p-6 text-white animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon name="Wind" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-lg">Дыхательный алкалоз</h3>
              <p className="text-blue-200 text-xs">pCO₂ &lt; 35 мм рт.ст.</p>
            </div>
          </div>
          <p className="text-blue-100 text-sm mb-4 leading-relaxed">
            Избыточное выведение CO₂ лёгкими → снижение H₂CO₃ → pH ↑
          </p>
          <div className="space-y-1.5 mb-4">
            <p className="text-xs font-bold text-blue-200 uppercase tracking-wide mb-2">Причины:</p>
            {["Гипервентиляция (паника, боль, истерия)", "Горная болезнь (компенсаторная)", "Печёночная недостаточность", "ИВЛ в режиме гипервентиляции", "Сепсис (стимуляция дыхания)"].map((s) => (
              <div key={s} className="flex items-start gap-2 text-sm text-blue-100">
                <Icon name="Minus" size={12} className="text-blue-300 mt-0.5 shrink-0" />
                {s}
              </div>
            ))}
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-blue-200 font-bold mb-1">Компенсация:</p>
            <p className="text-sm text-white">Почки ↓ реабсорбцию HCO₃⁻ → выводят основания</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 animate-fade-up delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow">
              <Icon name="FlaskConical" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-blue-900 text-lg">Метаболический алкалоз</h3>
              <p className="text-blue-500 text-xs">HCO₃⁻ {'>'} 26 ммоль/л</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            Накопление оснований или потеря кислот → HCO₃⁻ ↑ → pH ↑
          </p>
          <div className="space-y-1.5 mb-4">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2 font-montserrat">Причины:</p>
            {[
              "Рвота (потеря HCl)",
              "Приём антацидов, соды в избытке",
              "Гиперальдостеронизм",
              "Тиазидные, петлевые диуретики",
              "Массивное переливание крови",
            ].map((s) => (
              <div key={s} className="flex items-start gap-2 text-sm text-slate-600">
                <Icon name="Minus" size={12} className="text-blue-500 mt-0.5 shrink-0" />
                {s}
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="text-xs text-blue-600 font-bold mb-1">Компенсация:</p>
            <p className="text-sm text-blue-800">Лёгкие ↓ вентиляцию → задержка CO₂ → pCO₂ ↑</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100 animate-fade-up delay-200">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 font-montserrat">Лабораторная диагностика алкалоза</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Дыхательный алкалоз", vals: [{ k: "pH", v: "↑ > 7.45" }, { k: "pCO₂", v: "↓ < 35" }, { k: "HCO₃⁻", v: "↓ (компенс.)" }, { k: "BE", v: "норм/–" }], color: "border-blue-500" },
            { label: "Метаболический алкалоз", vals: [{ k: "pH", v: "↑ > 7.45" }, { k: "pCO₂", v: "↑ (компенс.)" }, { k: "HCO₃⁻", v: "↑ > 26" }, { k: "BE", v: "> +2" }], color: "border-cyan-500" },
          ].map(({ label, vals, color }) => (
            <div key={label} className={`flex-1 border-2 ${color} rounded-xl p-4`}>
              <p className="font-bold text-slate-800 text-sm font-montserrat mb-3">{label}</p>
              <div className="space-y-2">
                {vals.map(({ k, v }) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-slate-500 font-mono text-xs">{k}</span>
                    <span className="font-bold text-slate-800 text-xs">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2 font-montserrat">Клинические симптомы алкалоза:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {["Головокружение, обмороки", "Тетания, судороги", "Онемение конечностей", "Парестезии (покалывание)", "Мышечная слабость", "Гипокальциемия"].map((s) => (
                <p key={s} className="text-xs text-blue-800 flex items-center gap-1"><Icon name="Dot" size={12} className="text-blue-500" />{s}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 8 — Клинические проявления ─── */
function Slide8() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="Stethoscope" number="08" title="Клинические проявления нарушений КОС" sub="Симптомы по системам органов" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-up">
        {[
          {
            sys: "ЦНС", icon: "Brain", aciBg: "bg-red-50", alkBg: "bg-blue-50",
            aci: ["Угнетение сознания", "Спутанность, ступор", "Кома (pH < 7.0)", "Снижение рефлексов"],
            alk: ["Возбуждение, тревога", "Головокружение", "Судороги (тетания)", "Обмороки"],
            aciColor: "text-red-700", alkColor: "text-blue-700",
          },
          {
            sys: "Сердечно-сосудистая", icon: "Heart", aciBg: "bg-orange-50", alkBg: "bg-cyan-50",
            aci: ["↓ сократимость миокарда", "Тахикардия → брадикардия", "Аритмии", "Гипотония, шок"],
            alk: ["Тахикардия", "Спазм коронаров", "Аритмии (гипокалиемия)", "↓ АД"],
            aciColor: "text-orange-700", alkColor: "text-cyan-700",
          },
          {
            sys: "Дыхание", icon: "Wind", aciBg: "bg-amber-50", alkBg: "bg-indigo-50",
            aci: ["Дыхание Куссмауля", "Гипервентиляция", "Одышка", "Запах ацетона (ДКА)"],
            alk: ["Гиповентиляция", "Поверхностное дыхание", "Апноэ (компенсация)", "Цианоз"],
            aciColor: "text-amber-700", alkColor: "text-indigo-700",
          },
          {
            sys: "Нейромышечная", icon: "Zap", aciBg: "bg-red-50", alkBg: "bg-violet-50",
            aci: ["Мышечная слабость", "↓ возбудимость", "Гиперкалиемия", "Параличи"],
            alk: ["↑ нервно-мышечная возбудимость", "Тетания (Труссо, Хвостека)", "Гипокалиемия", "Карпопедальный спазм"],
            aciColor: "text-red-700", alkColor: "text-violet-700",
          },
          {
            sys: "Почки и электролиты", icon: "Droplets", aciBg: "bg-rose-50", alkBg: "bg-teal-50",
            aci: ["↑ экскреция H⁺", "↑ реабсорбция HCO₃⁻", "Ацидурия (кислая моча)", "Гиперкалиемия"],
            alk: ["↑ экскреция HCO₃⁻", "Алкалурия (щелочная моча)", "Гипокалиемия", "Гипохлоремия"],
            aciColor: "text-rose-700", alkColor: "text-teal-700",
          },
          {
            sys: "Костная система", icon: "Bone", aciBg: "bg-orange-50", alkBg: "bg-sky-50",
            aci: ["Вымывание Ca²⁺ из костей", "Остеопороз (хр. ацидоз)", "Болезненность костей", "↑ Ca²⁺ в крови"],
            alk: ["↓ ионизир. Ca²⁺", "Гипокальциемия", "Ломкость костей", "Мышечные спазмы"],
            aciColor: "text-orange-700", alkColor: "text-sky-700",
          },
        ].map(({ sys, icon, aciBg, alkBg, aci, alk, aciColor, alkColor }, i) => (
          <div
            key={sys}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover animate-fade-up"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
              <Icon name={icon} size={15} className="text-slate-300" />
              <p className="font-montserrat font-bold text-white text-sm">{sys}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <div className={`${aciBg} p-3`}>
                <p className={`text-xs font-bold ${aciColor} mb-2 font-montserrat uppercase tracking-wide`}>Ацидоз</p>
                <ul className="space-y-1">
                  {aci.map((s) => <li key={s} className={`text-xs ${aciColor} opacity-90 leading-tight`}>• {s}</li>)}
                </ul>
              </div>
              <div className={`${alkBg} p-3`}>
                <p className={`text-xs font-bold ${alkColor} mb-2 font-montserrat uppercase tracking-wide`}>Алкалоз</p>
                <ul className="space-y-1">
                  {alk.map((s) => <li key={s} className={`text-xs ${alkColor} opacity-90 leading-tight`}>• {s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 9 — Компенсация и лечение ─── */
function Slide9() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="HeartPulse" number="09" title="Компенсация и лечение нарушений КОС" sub="Физиологические механизмы и терапевтические подходы" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up">
        {[
          {
            icon: "Zap", title: "Буферные системы", time: "Секунды", bg: "bg-blue-700", desc: "Первая, мгновенная линия защиты. Химически связывают H⁺ или OH⁻. Не выводят продукты — только маскируют нарушение.",
            steps: ["HCO₃⁻ + H⁺ → H₂CO₃", "Hb⁻ + H⁺ → HHb", "Белок-NH₂ + H⁺ → Белок-NH₃⁺"],
          },
          {
            icon: "Wind", title: "Лёгкие (дыхание)", time: "Минуты", bg: "bg-cyan-600", desc: "Регулируют pCO₂. Гипервентиляция снижает CO₂ → уменьшает ацидоз. Гиповентиляция — наоборот.",
            steps: ["↑ ЧДД → ↓ pCO₂ → при ацидозе", "↓ ЧДД → ↑ pCO₂ → при алкалозе", "Эффект — через 15–30 минут"],
          },
          {
            icon: "Droplets", title: "Почки (медленно)", time: "Часы–дни", bg: "bg-emerald-600", desc: "Полная компенсация. Регулируют HCO₃⁻ и H⁺ экскрецию. Единственная система, способная полностью устранить нарушение.",
            steps: ["↑ реабсорбция HCO₃⁻ при ацидозе", "↑ экскреция H⁺ + NH₄⁺", "↑ экскреция HCO₃⁻ при алкалозе"],
          },
        ].map(({ icon, title, time, bg, desc, steps }) => (
          <div key={title} className={`${bg} rounded-2xl p-5 text-white`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold">{title}</h4>
                <span className="text-xs text-white/70">{time}</span>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-3">{desc}</p>
            <div className="space-y-1.5">
              {steps.map((s) => (
                <div key={s} className="flex items-start gap-2 text-sm text-white/90">
                  <Icon name="ChevronRight" size={12} className="text-white/50 mt-0.5 shrink-0" />
                  <code className="text-xs">{s}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up delay-200">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h4 className="font-montserrat font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icon name="Pill" size={16} className="text-blue-600" /> Лечение ацидоза
          </h4>
          <div className="space-y-3">
            {[
              { label: "Дыхательный", desc: "Устранить причину обструкции, бронходилататоры, ИВЛ при необходимости, O₂-терапия" },
              { label: "Метаболический", desc: "Инфузия NaHCO₃ (бикарбоната натрия) при pH < 7.1, лечение основной патологии (инсулин при ДКА), регидратация" },
              { label: "Формула NaHCO₃", desc: "Доза (ммоль) = BE × масса тела × 0.3. Вводят медленно! Контроль КОС каждые 2 часа." },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                <p className="font-bold text-orange-800 text-sm mb-1">{label}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h4 className="font-montserrat font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icon name="Pill" size={16} className="text-blue-600" /> Лечение алкалоза
          </h4>
          <div className="space-y-3">
            {[
              { label: "Дыхательный", desc: "Дышать в мешок (↑ CO₂), лечить основную причину, при ИВЛ — снизить минутный объём" },
              { label: "Метаболический", desc: "Возмещение Cl⁻ (NaCl), KCl при гипокалиемии, ингибиторы карбоангидразы (ацетазоламид), лечение причины" },
              { label: "Контроль", desc: "Ацетазоламид блокирует реабсорбцию HCO₃⁻ в почках → выводит основания. pH крови контроль каждые 4–6 часов." },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <p className="font-bold text-blue-800 text-sm mb-1">{label}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 10 — Итоги ─── */
function Slide10() {
  return (
    <div className="space-y-4">
      <SlideHeader icon="GraduationCap" number="10" title="Итоги: что нужно знать на экзамене" sub="Главное — коротко и по делу" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
        {[
          {
            num: "01", title: "4 буферные системы", color: "bg-blue-700", items: [
              "Бикарбонатная — 65%, плазма, лёгкие+почки",
              "Гемоглобиновая — 23%, эритроциты",
              "Белковая — 7%, амфотерные свойства",
              "Фосфатная — 5%, клетки и моча",
            ]
          },
          {
            num: "02", title: "pH крови", color: "bg-emerald-700", items: [
              "Норма: 7.35–7.45",
              "Ацидоз: pH < 7.35",
              "Алкалоз: pH > 7.45",
              "Несовместимо с жизнью: < 6.8 или > 7.8",
            ]
          },
          {
            num: "03", title: "Виды ацидоза", color: "bg-orange-600", items: [
              "Дыхательный: pCO₂ ↑ (ХОБЛ, угнетение ДЦ)",
              "Метаболический: HCO₃⁻ ↓ (ДКА, ПН, диарея)",
              "Компенсация: почки (дых.) / лёгкие (мет.)",
              "Лечение: NaHCO₃ при pH < 7.1 + причина",
            ]
          },
          {
            num: "04", title: "Виды алкалоза", color: "bg-violet-700", items: [
              "Дыхательный: pCO₂ ↓ (гипервентиляция)",
              "Метаболический: HCO₃⁻ ↑ (рвота, диуретики)",
              "Компенсация: почки (дых.) / лёгкие (мет.)",
              "Симптомы: тетания, судороги, гипокальциемия",
            ]
          },
        ].map(({ num, title, color, items }) => (
          <div key={num} className={`${color} rounded-2xl p-5 text-white`}>
            <p className="font-montserrat font-black text-3xl text-white/20 leading-none mb-1">{num}</p>
            <h4 className="font-montserrat font-bold text-lg mb-3">{title}</h4>
            <ul className="space-y-2">
              {items.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-white/90">
                  <Icon name="Check" size={13} className="text-white/60 mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-5 animate-fade-up delay-200">
        <p className="font-montserrat font-bold text-white text-sm mb-4 flex items-center gap-2">
          <Icon name="Lightbulb" size={16} className="text-yellow-400" /> Уравнение — которое нужно знать всегда:
        </p>
        <div className="text-center font-mono text-cyan-300 text-xl font-bold mb-2">
          pH = pKa + lg [A⁻] / [HA]
        </div>
        <div className="text-center font-mono text-cyan-200 text-base mb-4">
          pH = 6.1 + lg [HCO₃⁻] / (0.03 × pCO₂)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {[
            { q: "pH норма", a: "7.35–7.45" },
            { q: "pCO₂ норма", a: "35–45 мм рт.ст." },
            { q: "HCO₃⁻ норма", a: "22–26 ммоль/л" },
            { q: "BE норма", a: "–2 до +2" },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white/10 rounded-xl p-2.5 text-center">
              <p className="text-slate-400 text-xs">{q}</p>
              <p className="font-mono font-bold text-white text-sm mt-0.5">{a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-5 text-white animate-fade-up delay-300">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Icon name="Star" size={22} className="text-yellow-300" />
          </div>
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-2">Запомни главное правило:</h4>
            <p className="text-blue-100 leading-relaxed">
              При <strong className="text-white">дыхательных нарушениях</strong> — компенсируют <strong className="text-cyan-300">почки</strong> (медленно). При <strong className="text-white">метаболических нарушениях</strong> — компенсируют <strong className="text-cyan-300">лёгкие</strong> (быстро). Буферы — первыми, всегда.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}