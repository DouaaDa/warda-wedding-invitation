
import React from 'react';
import { Link } from 'react-router-dom';
import { FloralDivider } from './FloralDecorations';
import { FloralSideBorders } from './FloralCorners';
import { NoPhotosSymbol, NoChildrenSymbol } from './ProhibitionIcons';

const PALETTE = {
  ivoryBg: '#F8F3EC',
  gold: '#B89A69',
  plum: '#773D56',
  mauve: '#B77D91',
  textDark: '#3D1B28',
  textMuted: '#5A3A48',
};

export function GuestNotesContent({ isStandalone = false }) {
  return (
    <div className="relative w-full flex flex-col items-center">

      {/* MAIN TITLE */}
      <header className="w-full text-center mb-8">
        <p
          className="font-cormorant italic text-lg sm:text-xl mb-2"
          style={{ color: PALETTE.gold }}
        >
          Délicatesse &amp; sérénité
        </p>

        <h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3"
          style={{ color: PALETTE.plum }}
        >
          Quelques petites attentions
        </h2>

        <p
          className="font-arabic text-xl sm:text-2xl"
          style={{ color: PALETTE.mauve }}
          dir="rtl"
        >
          ملاحظة بكل محبة
        </p>
      </header>

      {/* GOLDEN FLORAL SVG DIVIDER */}
      <div className="w-full max-w-xs mx-auto mb-10">
        <FloralDivider opacity={0.85} />
      </div>

      <div className="w-full max-w-3xl mx-auto space-y-12 sm:space-y-14">

        {/* NOTE 1 — ADULTS ONLY */}
        <article className="w-full text-center">

          <div className="flex justify-center mb-5">
            <NoChildrenSymbol size={76} />
          </div>

          {/* French */}
          <div className="space-y-3">
            <h3
              className="font-serif text-xl sm:text-2xl font-medium"
              style={{ color: PALETTE.plum }}
            >
              Une célébration réservée aux adultes
            </h3>

            <p
              className="font-serif text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
              style={{ color: PALETTE.textDark, opacity: 0.95 }}
            >
              Afin de profiter pleinement de cette belle occasion dans une
              ambiance sereine et intime, nous souhaitons que cette
              célébration soit réservée exclusivement aux adultes.
            </p>

            <p
              className="font-cormorant italic text-base sm:text-lg"
              style={{ color: PALETTE.mauve }}
            >
              Nous vous remercions sincèrement pour votre compréhension.
            </p>
          </div>

          {/* Arabic */}
          <div className="mt-6 space-y-3" dir="rtl">
            <h4
              className="font-arabic text-xl sm:text-2xl font-bold"
              style={{ color: PALETTE.plum }}
            >
              احتفال مخصص للكبار فقط
            </h4>

            <p
              className="font-arabic text-base sm:text-lg leading-[2.1] max-w-2xl mx-auto"
              style={{ color: PALETTE.textDark, opacity: 0.95 }}
            >
              حرصًا منا على أن تمر هذه المناسبة في أجواء هادئة ومميزة،
              نرجو منكم التكرم باحترام رغبتنا في أن يكون هذا الاحتفال
              مخصصًا للكبار فقط.
            </p>

            <p
              className="font-arabic text-base sm:text-lg"
              style={{ color: PALETTE.mauve }}
            >
              شكرًا جزيلًا لتفهمكم وتقديركم.
            </p>
          </div>
        </article>

        {/* DECORATIVE SVG DIVIDER */}
        <div className="w-full max-w-xs mx-auto">
          <FloralDivider opacity={0.8} />
        </div>

        {/* NOTE 2 — NO PHOTOS */}
        <article className="w-full text-center">

          <div className="flex justify-center mb-5">
            <NoPhotosSymbol size={76} />
          </div>

          {/* French */}
          <div className="space-y-3">
            <h3
              className="font-serif text-xl sm:text-2xl font-medium"
              style={{ color: PALETTE.plum }}
            >
              Pas de photos
            </h3>

            <p
              className="font-serif text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
              style={{ color: PALETTE.textDark, opacity: 0.95 }}
            >
              Afin de préserver l&apos;intimité de ce moment précieux,
              nous vous prions de bien vouloir respecter notre souhait
              de ne pas prendre de photos durant la célébration.
            </p>

            <p
              className="font-cormorant italic text-base sm:text-lg"
              style={{ color: PALETTE.mauve }}
            >
              Nous vous remercions de tout cœur pour votre délicatesse
              et votre compréhension.
            </p>
          </div>

          {/* Arabic */}
          <div className="mt-6 space-y-3" dir="rtl">
            <h4
              className="font-arabic text-xl sm:text-2xl font-bold"
              style={{ color: PALETTE.plum }}
            >
              نرجو عدم التصوير
            </h4>

            <p
              className="font-arabic text-base sm:text-lg leading-[2.1] max-w-2xl mx-auto"
              style={{ color: PALETTE.textDark, opacity: 0.95 }}
            >
              رغبةً منا في الحفاظ على خصوصية هذه اللحظات الجميلة،
              نرجو منكم عدم التقاط الصور خلال الاحتفال.
            </p>

            <p
              className="font-arabic text-base sm:text-lg"
              style={{ color: PALETTE.mauve }}
            >
              نشكركم من القلب على تفهمكم واحترامكم لرغبتنا.
            </p>
          </div>
        </article>
      </div>

      {/* CLOSING DECORATION */}
      <div className="text-center pt-12 pb-4 space-y-3">
        <span
          className="block"
          style={{ color: PALETTE.gold, fontSize: '22px' }}
        >
          ❀
        </span>

        <p
          className="font-script text-2xl sm:text-3xl"
          style={{ color: PALETTE.plum }}
        >
          Yasser &amp; Warda
        </p>
      </div>

      {/* BACK LINK — STANDALONE PAGE ONLY */}
      {isStandalone && (
        <div className="pt-6 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.24em] px-6 py-3 rounded-full border transition-all duration-300 hover:shadow-md cursor-pointer"
            style={{
              borderColor: 'rgba(184, 154, 105, 0.45)',
              backgroundColor: 'rgba(255, 253, 249, 0.95)',
              color: PALETTE.plum,
            }}
          >
            <span>←</span>
            <span>Retour à l&apos;invitation principale</span>
          </Link>
        </div>
      )}
    </div>
  );
}

/* STANDALONE NOTES PAGE */
export default function GuestNotes() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-between overflow-x-hidden"
      style={{
        backgroundColor: PALETTE.ivoryBg,
        backgroundImage: `
          radial-gradient(ellipse 90% 60% at 50% 0%, rgba(245, 229, 228, 0.45) 0%, transparent 70%),
          radial-gradient(circle at 10% 90%, rgba(217, 166, 174, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 90% 90%, rgba(87, 38, 62, 0.12) 0%, transparent 50%)
        `,
      }}
    >
      {/* REALISTIC LATERAL FLORAL BORDERS */}
      <FloralSideBorders opacity={0.48} />

      <header className="relative z-20 w-full max-w-3xl mx-auto px-5 pt-7 pb-2 flex items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer"
          style={{
            borderColor: 'rgba(184, 154, 105, 0.35)',
            backgroundColor: 'rgba(255, 253, 249, 0.9)',
            color: PALETTE.plum,
          }}
        >
          <span
            className="text-sm transition-transform duration-300 group-hover:-translate-x-1"
            style={{ color: PALETTE.gold }}
          >
            ←
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] font-medium">
            Retour
          </span>
        </Link>

        <p
          className="font-sans text-[10px] uppercase tracking-[0.28em]"
          style={{ color: PALETTE.gold }}
        >
          Yasser &amp; Warda · 2027
        </p>
      </header>

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
        <GuestNotesContent isStandalone={true} />
      </main>

      <footer className="relative z-10 w-full py-4 text-center">
        <p
          className="font-sans text-[9px] uppercase tracking-[0.3em]"
          style={{ color: PALETTE.gold, opacity: 0.8 }}
        >
          Warda &amp; Yasser · 2027
        </p>
      </footer>
    </div>
  );
}
