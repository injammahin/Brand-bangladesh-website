import animate from 'tailwindcss-animate';
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        brand: {
          red: '#D71920', orange: '#F38020', yellow: '#FBC111', deep: '#0E5B5C',
          black: '#141414', pink: '#EE1B5B', green: '#A4CB3A',
          gold: '#B8894A', gold2: '#C9A062', goldsoft: '#EFE2C9',
          teal: '#3E8A7C', teal2: '#4C9D8E', tealsoft: '#E7F2EF',
          ink: '#15201F', ink2: '#3B4644', muted: '#66706E', line: '#E8E1D4',
          cream: '#FBF8F2', paper: '#F5EFE4', night: '#0F1A18',
        },
      },
      fontFamily: {
        mag: ['var(--f-mag)'],
        serif: ['var(--f-serif)'],
        sans: ['var(--f-body)'],
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      boxShadow: { brand: '0 30px 60px -32px rgba(14, 91, 92, .38)' },
      transitionTimingFunction: { brand: 'cubic-bezier(.22,.8,.2,1)' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
      },
    },
  },
  plugins: [animate],
};
