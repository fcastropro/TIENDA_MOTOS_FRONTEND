/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'antonio': 'Antonio, sans-serif',
      'jost': 'Jost, sans-serif',
      'Fontawesome': 'FontAwesome, sans-serif',
      'unicons': 'unicons',
    },
    container: {
      center: true,
      padding: '0.938rem',
    },
    extend: {
      screens: {
        'sm': {
          'max': "767px"
        },
        'md': "768px",
        'only-md': {
          'min': '768px',
          'max': "991px"
        },
        'lg': "992px",
        'only-lg': {
          'min': '992px',
          'max': "1199px"
        },
        'xl': "1200px",
        'only-xl': {
          'min': '1200px',
          'max': "1320px"
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({
      addComponents
    }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          width: '100%',
          padding: '0 15px',
          '@screen sm': {
            maxWidth: '767px',
          },
          '@screen md': {
            maxWidth: '991px',
          },
          '@screen lg': {
            maxWidth: '1199px',
          },
          '@screen xl': {
            maxWidth: '1320px',
          },
        }
      })
    }
  ],
}