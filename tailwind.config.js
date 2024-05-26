/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [],
    theme: {
        extend: {
            colors: {
                'gameboy-green': '#9bbc0f',
                'gameboy-dark-green': '#0f380f',
                'gameboy-light-green': '#8bac0f',
                'gameboy-gray': '#f8f8f8',
                'gameboy-black': '#202020',
            },
            fontFamily: {
                gameboy: ['"Press Start 2P"', 'cursive'],
            },
        },
    },
    plugins: [],
}

