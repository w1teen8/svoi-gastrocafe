export default function MapPinIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 44 55" fill="none" aria-hidden="true">
      <path
        d="M22 0C9.85 0 0 9.85 0 22c0 16.5 22 33 22 33s22-16.5 22-33C44 9.85 34.15 0 22 0z"
        fill="var(--color-terracotta)"
      />
      <text
        x="22"
        y="26"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="11"
        letterSpacing="0.5"
        fill="var(--color-cream)"
      >
        СВОЇ
      </text>
    </svg>
  );
}
