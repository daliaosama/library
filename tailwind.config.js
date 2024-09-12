/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    container:{
   
      display:'flex',
     
     },
    extend: {
      screens: {
        'sm': '344px',
        'md': '712px',  
        'lg': '1024px', 
        'xl': '1280px', 
      },
      gridTemplateColumns: {
        '4':'repeat(4,15rem)',
        '1':'repeat(1,14rem)'
      },
      colors:{
       hover:'rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}

