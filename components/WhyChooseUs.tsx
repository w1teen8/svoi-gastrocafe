"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  CalendarRange,
  Coffee,
  ChefHat,
  Heart,
  CalendarCheck,
  Award,
  Sparkles,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const features = [
  { icon: Leaf, title: "Локальні інгредієнти" },
  { icon: CalendarRange, title: "Сезонне меню" },
  { icon: Coffee, title: "Specialty Coffee" },
  { icon: ChefHat, title: "Авторська кухня" },
  { icon: Heart, title: "Затишна атмосфера" },
  { icon: CalendarCheck, title: "Онлайн-бронювання" },
  { icon: Award, title: "Професійні шеф-кухарі" },
  { icon: Sparkles, title: "Преміум сервіс" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-bg-secondary/50 py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="Чому обирають нас"
          title="Вісім причин довіритись «СВОЇ»"
          align="center"
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="glass flex flex-col items-center gap-3 rounded-lux px-4 py-5 text-center"
              >
                <Icon size={22} strokeWidth={1.4} className="text-gold" />
                <span className="font-sans text-sm leading-snug text-primary">
                  {f.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
