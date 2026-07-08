# 🌌 CyberFolio // Internship Project Hub v2.0

A premium, state-of-the-art Web3 portfolio dashboard designed to showcase internship projects. Features custom mouse-interactive neon orbs, automated Github repository analytics, custom language-to-badge mapping, and dynamic MongoDB database synchronization.

---

## ✨ Features

- **Next-Gen Web3 Aesthetics:** Built on a sleek `slate-950` layout, animated cyber grid lines, moving gradient glowing orbs, and glassmorphic cards with micro-animations.
- **Dynamic Portfolio Metrics:** Auto-calculated system statistics displaying the total project counts.
- **Auto GitHub Analysis:** Simply input a GitHub Repository Path. The app queries the GitHub API to extract project details and auto-analyzes the language structure using the GitHub Languages API.
- **Smart Tech Badge Mapping:** Integrates with an 800+ technology database to auto-map repository metrics to branded color pills with custom icons (Devicon & FontAwesome).
- **Secure Modifying Commands:** Portfolio updates (creation/deletion) require signature credentials verification using master passkey authentication (`ankyl`).
- **One-Click Delete Mode:** Easily toggle Delete Mode in the navbar to permanently remove records from the cloud database.
- **Serverless Production Optimization:** Configured with robust MongoDB pooling mechanisms to prevent timeout or socket disconnect errors under Vercel Serverless runtimes.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Tailwind CSS (3.4), Custom keyframe animations, Lucide Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Deployment:** Vercel (using serverless configurations in `vercel.json`)

---

## ⚙️ Installation & Launch

### 1. Clone the project
```bash
git clone https://github.com/CHIRAYU-365/INTERNSHIP.git
cd INTERNSHIP/INTERNSHIP
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add MongoDB Connection Credentials
Create a `.env` file in the root directory (or use the provided template) and add your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cyberfolio?retryWrites=true&w=majority
```
*(Make sure to allow access from anywhere `0.0.0.0/0` in MongoDB Atlas Network Access so Vercel can connect)*

### 4. Boot up local environment
```bash
npm start
```
Go to `http://localhost:3000` to interact with your dashboard!

---

## 🎯 Production Deploy (Vercel)

1. Connect your repository to Vercel.
2. In the Vercel dashboard, go to your project **Settings -> Environment Variables**.
3. Add a new key-value pair:
   - **Key:** `MONGODB_URI`
   - **Value:** `<your-mongodb-atlas-connection-string>`
4. Deploy. The backend server and frontend will map automatically via `vercel.json`!