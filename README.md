# Гастрокафе «СВОЇ»

Сучасний односторінковий сайт гастрокафе «СВОЇ» (м. Боярка) — Next.js, TypeScript, TailwindCSS, Framer Motion, GSAP, Lenis.

## Розробка

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Контент (CMS)

Весь текстовий контент керується через JSON-файли в `data/`:

- `menu.json` — меню та фірмові страви
- `gallery.json` — галерея
- `events.json` — події
- `reviews.json` — відгуки
- `faq.json` — питання
- `settings.json` — бренд, контакти, години роботи, SEO

## Збірка та деплой

Проєкт налаштовано на статичний експорт (`output: "export"`) і автоматично деплоїться на GitHub Pages через GitHub Actions (`.github/workflows/deploy.yml`) при пуші в `main`.

```bash
npm run build
```
