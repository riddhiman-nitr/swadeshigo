const t = n => `rgb(var(--${n}) / <alpha-value>)`;
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { bg: t('bg'), surface: t('surface'), surface2: t('surface2'), line: t('line'), ink: t('ink'), muted: t('muted'), brand: t('brand'), brand2: t('brand2'), accent: t('accent'), bad: t('bad'), info: t('info'), hero: t('hero') },
    fontFamily: { display: ['"Bricolage Grotesque"', 'Georgia', 'serif'], sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'] },
    keyframes: {
      fadeUp: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
      pulseRing: { '0%': { transform: 'scale(.6)', opacity: .8 }, '100%': { transform: 'scale(2.6)', opacity: 0 } },
      marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      growY: { from: { transform: 'scaleY(0)' }, to: { transform: 'scaleY(1)' } },
      draw: { from: { strokeDashoffset: 1 }, to: { strokeDashoffset: 0 } },
      floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } }
    },
    animation: { fadeUp: 'fadeUp .5s cubic-bezier(.2,.7,.2,1) both', marquee: 'marquee 48s linear infinite', floaty: 'floaty 6s ease-in-out infinite' }
  } },
  plugins: []
};
