module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#800020',  
        'primary-dark': '#600018',
        'primary-light': '#A00028',
        
        accent: '#B08D57',         
        'accent-hover': '#9A7C4C',   

        'text-main': '#1F2937',     
        'text-secondary': '#6B7280', 
        'text-on-primary': '#FFFBF7',
        'text-on-accent': '#FFFFFF', 
                                      
        'text-light': '#F9FAFB',   

        'bg-content': '#FFFFFF',    
        'bg-page': '#FDFBF9',    
        'bg-dark': '#111827',   

        'border-light': '#EAE0D5', 
        'border-medium': '#D1D5DB',
        
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}