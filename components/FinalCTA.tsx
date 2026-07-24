import RevealText from "./ui/RevealText";
import MagneticButton from "./ui/MagneticButton";

const lines = ["Кожен стіл", "має", "свою", "історію."];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-32 sm:py-40">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-olive/10 blur-3xl animate-float-slower" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 text-center sm:px-8">
        <div>
          {lines.map((line, i) => (
            <RevealText
              key={line}
              as="h2"
              delay={0.1 * i}
              className="font-display text-5xl leading-[1.05] text-bg sm:text-6xl md:text-7xl"
            >
              {line}
            </RevealText>
          ))}
        </div>
        <MagneticButton href="#reservation" className="!bg-gold !text-primary">
          Забронювати столик
        </MagneticButton>
      </div>
    </section>
  );
}
