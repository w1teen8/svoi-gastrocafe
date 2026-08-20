import Image from "next/image";
import {
  Leaf,
  ChefHat,
  Heart,
  MapPin,
  Award,
} from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { withBasePath } from "@/lib/asset-path";

const features = [
  { icon: Leaf, label: "Сезонні продукти" },
  { icon: ChefHat, label: "Авторські страви" },
  { icon: Heart, label: "Затишна атмосфера" },
  { icon: MapPin, label: "Центр Боярки" },
  { icon: Award, label: "Порада від шефа" },
];

export default function About() {
  return (
    <section id="about">
      <div className="relative overflow-hidden">
        <Image
          src={withBasePath("/images/about-flowers.jpg")}
          alt="Сервірований стіл з букетом квітів у залі «СВОЇ»"
          width={1600}
          height={900}
          className="h-[85vh] min-h-[600px] w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--overlay-side)" }} />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
            <div className="max-w-md">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-terracotta">
                Про нас
              </span>
              <p className="mt-4 font-display text-2xl leading-snug text-cream sm:text-[28px]">
                Гастрокафе про щирість, близьких людей і улюблені смаки.
              </p>
              <div className="mt-7">
                <MagneticButton href="#menu">Дізнатись більше</MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cream py-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 px-5 sm:grid-cols-5 sm:px-10">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className={
                  "flex flex-col items-center gap-3 px-4 py-6 text-center sm:py-0 " +
                  (i > 0 ? "border-t border-hairline sm:border-t-0 sm:border-l" : "")
                }
              >
                <Icon size={28} strokeWidth={1.5} className="text-terracotta-deep" />
                <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Image
        src={withBasePath("/images/about-interior.jpg")}
        alt="Інтер'єр залу «СВОЇ»"
        width={1920}
        height={800}
        className="h-[280px] w-full object-cover sm:h-[380px]"
      />
    </section>
  );
}
