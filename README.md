# Internship Project Portfolio

A sleek, modern, and responsive web application designed to showcase internship projects. Built with a premium Web3-inspired aesthetic, this app allows you to dynamically add, view, and remove projects with full file-system persistence.

## 🚀 Features

- **Responsive Grid Layout:** Automatically adapts from single-column mobile views to a beautifully structured 4-column desktop grid.
- **Glassmorphism Design:** Features a premium UI with glass cards, animated orbs, gradient floating buttons, and dynamic grid backgrounds.
- **Node.js Backend Persistence:** Connects to a lightweight Express.js server that physically writes your data to `projects.json`, ensuring no progress is ever lost on refresh.
- **Dynamic Technology Badges:** Search through a massive database of 800+ programming languages, frameworks, and blockchains. Badges auto-generate with official brand colors and vector icons (using Devicon & FontAwesome).
- **GitHub Integration:** Automatically fetches repository names and descriptions when you provide a GitHub ID.
- **Delete Mode:** Seamless UI toggle to permanently remove projects from the grid and the underlying JSON file.

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla JavaScript, CSS3 (Tailwind CSS, custom animations)
- **Backend:** Node.js, Express.js
- **Data Storage:** Local JSON File (`projects.json`)
- **Icons:** Lucide Icons, Devicon, FontAwesome

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CHIRAYU-365/INTERNSHIP.git
   cd INTERNSHIP/internship
   ```

2. **Install Backend Dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```
   *(This installs `express` and `cors` as defined in `package.json`)*

3. **Start the Server:**
   ```bash
   npm start
   ```

4. **Open the App:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🎮 Usage Guide

- **Adding a Project:** Click the global floating **`+`** button at the bottom of the screen. Enter the master password (`ankyl`), provide a GitHub repo or manual details, select your tech stack, and save!
- **Removing a Project:** Click the **`-`** button to enter *Delete Mode*. The project cards will shake to indicate they are editable. Click the trash icon on any project to permanently delete it.
- **Technologies:** You can select from over 800 technologies. The app will automatically render their precise logo and brand color at the bottom of the card.

## 📝 License

This project is open-source and available for educational and portfolio purposes.