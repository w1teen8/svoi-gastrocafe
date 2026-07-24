import SectionHeading from "./ui/SectionHeading";
import ServicesMarquee from "./ui/ServicesMarquee";
import RevealText from "./ui/RevealText";

const pillars = [
  {
    n: "01",
    title: "Локальні продукти",
    text: "Ми співпрацюємо з фермерськими господарствами Київщини — овочі, зелень і молочні продукти потрапляють на кухню протягом доби.",
  },
  {
    n: "02",
    title: "Свіжість щодня",
    text: "Меню формується навколо сезонності: те, що росте зараз, з'являється у стравах — без заморозки і зайвих кілометрів.",
  },
  {
    n: "03",
    title: "Пристрасть до кухні",
    text: "Наша команда шеф-кухарів переосмислює українську гастрономію через призму сучасної європейської подачі.",
  },
  {
    n: "04",
    title: "Щира гостинність",
    text: "«СВОЇ» — це не просто назва. Кожен гість для нас — частина спільноти, якій завжди раді.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="Про нас"
            title={
              <>
                Сучасна українська
                <br />
                гастрономія з душею
              </>
            }
          />
          <div className="flex flex-col justify-end gap-6">
            <RevealText as="p" className="font-sans text-lg leading-relaxed text-secondary sm:text-xl">
              «СВОЇ» — це простір, де страви готують з повагою до продукту, а
              гостей зустрічають як рідних. Ми віримо, що справжня розкіш —
              це увага до деталей, тиша між стравами та смак, який
              запам'ятовується.
            </RevealText>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.n} className="flex flex-col gap-4 border-t border-border-soft pt-6">
              <span className="font-display text-sm text-gold">{p.n}</span>
              <h3 className="font-display text-2xl text-primary">{p.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-secondary">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 lg:mt-28">
        <ServicesMarquee />
      </div>
    </section>
  );
}
