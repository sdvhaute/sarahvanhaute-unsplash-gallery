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
4. Clear vite
   ```bash
   rm -rf node_modules/.vite
   ```
5. Run the application locally:
   ```bash
   npm run dev
   ```
6. Visit `http://localhost:5173` in your browser to see the app in action.

If issues with Vite (`504 (Outdated Optimize Dep)`), run:
   ```bash
   rm -rf node_modules/.vite
npm run dev