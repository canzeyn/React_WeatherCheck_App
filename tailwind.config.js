/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      colors: {
        cream: '#FFF7D4',
        sunshineYellow: '#FFD95A',
        goldenBrown: '#C07F00',
        earthyBrown: '#4C3D3D',
        softSnow: '#F9F7F7',
        gentleSkyBlue: '#DBE2EF',
        deepOceanBlue: '#3F72AF',
        midnightNavy: '#112D4E'
      },
      screens: {
        'xs': '300px',
        'sm': '400px',
        '2sm': '500px',
        'md': '600px',
        '2md': '700px',
        'lg': '800px',
        '2lg': '900px',
        'xl': '1000px',
        '2xl': '1100px',
        'xxl': '1200px',
        '2xxl': '1300px',
        'xxxl': '1400px',
        '2xxxl': '1500px'

      },
      fontSize: {
        'xs': '16px',
        'sm': '18px',
        'md': '20px',
        'lg': '22px',
        'xl': '24px',
        'xl2':'26px',
        'xxl': '32px',
        'xxxl': '50px'
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'openSans': ['Open Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']

      },
      width: {
        'xs': '100px',
        'sm': '150px',
        '2sm': '170px',
        'md': '200px',
        'lg': '250px',
        '2lg': '270px',
        'xl': '300px',
        'xxl': '350px',
        'xxxl': '400px'
      },
      height: {
        'xs': '15px',
        'sm': '30px',
        'md': '40px',
        'lg': '50px',
        'xl': '60px',
        'xxl': '70px'
      },
      opacity: ['active']
    },
  },
  plugins: [require("daisyui")],
}
