# Digital Chefs - Unsplash gallery

## Requirements
- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

## Steps to Run Locally

1. Clone or unzip the project folder to your local machine.
2. Open a terminal in the project directory.
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a .env file: Copy the provided .env.example file and rename it to .env. 
   Then, replace your_unsplash_access_key_here with your actual Unsplash Access Key.
   (Ensure there are no quotes nor spaces)
   ```bash
   cp .env.example .env
   ```
5. Clear vite
   ```bash
   rm -rf node_modules/.vite
   ```
6. Run the application locally:
   ```bash
   npm run dev
   ```
7. Visit `http://localhost:5173` in your browser to see the app in action.

If issues with Vite (`504 (Outdated Optimize Dep)`), run:
   ```bash
   rm -rf node_modules/.vite
npm run dev