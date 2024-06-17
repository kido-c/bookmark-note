/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: '#F2F2F2',
        sub: '#E8EDF1',
        blue: '#CAE2F0',
      },
      borderColor: {
        main: '#E8EDF1',
      },
      textColor: {
        main: '#6667AB',
        blue: '#005593',
      },
      boxShadow: {
        bookmark: '0 1px 1px #091e4240, 0 1px 2px #091e4221',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
      borderColor: ['hover'], // hover 변형을 활성화
    },
  },
  plugins: [],
}
