// --- Database / State ---
const MASTER_PASSWORD = "ankyl";
let selectedTechnologies = [];

// --- 100+ Technologies List ---
const TECHNOLOGIES = [
    { name: 'Python', icon: 'devicon-python-plain' },
    { name: 'Django', icon: 'devicon-django-plain' },
    { name: 'Streamlit', icon: 'devicon-streamlit-plain' },
    { name: 'Ethereum', icon: 'fa-brands fa-ethereum' },
    { name: 'Solidity', icon: 'devicon-solidity-plain' },
    { name: 'Plotly', icon: 'devicon-plotly-plain' },
    { name: 'Pandas', icon: 'devicon-pandas-plain' },
    { name: 'JWT', icon: 'fa-solid fa-key' },
    { name: 'SQLite', icon: 'devicon-sqlite-plain' },
    { name: 'React', icon: 'devicon-react-original' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'HTML5', icon: 'devicon-html5-plain' },
    { name: 'CSS3', icon: 'devicon-css3-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain' },
    { name: 'Vue.js', icon: 'devicon-vuejs-plain' },
    { name: 'Angular', icon: 'devicon-angularjs-plain' },
    { name: 'Svelte', icon: 'devicon-svelte-plain' },
    { name: 'Next.js', icon: 'devicon-nextjs-original' },
    { name: 'Nuxt.js', icon: 'devicon-nuxtjs-plain' },
    { name: 'TailwindCSS', icon: 'devicon-tailwindcss-plain' },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain' },
    { name: 'Sass', icon: 'devicon-sass-original' },
    { name: 'Less', icon: 'devicon-less-plain-wordmark' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
    { name: 'MySQL', icon: 'devicon-mysql-plain' },
    { name: 'Redis', icon: 'devicon-redis-plain' },
    { name: 'Firebase', icon: 'devicon-firebase-plain' },
    { name: 'Supabase', icon: 'devicon-supabase-plain' },
    { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark' },
    { name: 'Google Cloud', icon: 'devicon-googlecloud-plain' },
    { name: 'Azure', icon: 'devicon-azure-plain' },
    { name: 'Docker', icon: 'devicon-docker-plain' },
    { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
    { name: 'Git', icon: 'devicon-git-plain' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'GitLab', icon: 'devicon-gitlab-plain' },
    { name: 'Bitbucket', icon: 'devicon-bitbucket-original' },
    { name: 'Linux', icon: 'devicon-linux-plain' },
    { name: 'Ubuntu', icon: 'devicon-ubuntu-plain' },
    { name: 'Debian', icon: 'devicon-debian-plain' },
    { name: 'Bash', icon: 'devicon-bash-plain' },
    { name: 'PowerShell', icon: 'fa-solid fa-terminal' },
    { name: 'C', icon: 'devicon-c-plain' },
    { name: 'C++', icon: 'devicon-cplusplus-plain' },
    { name: 'C#', icon: 'devicon-csharp-plain' },
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'Kotlin', icon: 'devicon-kotlin-plain' },
    { name: 'Swift', icon: 'devicon-swift-plain' },
    { name: 'Objective-C', icon: 'devicon-objectivec-plain' },
    { name: 'Ruby', icon: 'devicon-ruby-plain' },
    { name: 'Ruby on Rails', icon: 'devicon-rails-plain' },
    { name: 'PHP', icon: 'devicon-php-plain' },
    { name: 'Laravel', icon: 'devicon-laravel-original' },
    { name: 'Symfony', icon: 'devicon-symfony-original' },
    { name: 'Go', icon: 'devicon-go-original-wordmark' },
    { name: 'Rust', icon: 'devicon-rust-plain' },
    { name: 'Dart', icon: 'devicon-dart-plain' },
    { name: 'Flutter', icon: 'devicon-flutter-plain' },
    { name: 'React Native', icon: 'devicon-react-original' },
    { name: 'Ionic', icon: 'devicon-ionic-original' },
    { name: 'Electron', icon: 'devicon-electron-original' },
    { name: 'Spring', icon: 'devicon-spring-original' },
    { name: 'Flask', icon: 'devicon-flask-original' },
    { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
    { name: 'Express', icon: 'devicon-express-original' },
    { name: 'NestJS', icon: 'devicon-nestjs-plain' },
    { name: 'GraphQL', icon: 'devicon-graphql-plain' },
    { name: 'Apollo', icon: 'fa-solid fa-rocket' },
    { name: 'REST API', icon: 'fa-solid fa-network-wired' },
    { name: 'Socket.io', icon: 'devicon-socketio-original' },
    { name: 'WebSockets', icon: 'fa-solid fa-plug' },
    { name: 'Webpack', icon: 'devicon-webpack-plain' },
    { name: 'Vite', icon: 'devicon-vitejs-plain' },
    { name: 'Gulp', icon: 'devicon-gulp-plain' },
    { name: 'Grunt', icon: 'devicon-grunt-plain' },
    { name: 'Babel', icon: 'devicon-babel-plain' },
    { name: 'Jest', icon: 'devicon-jest-plain' },
    { name: 'Cypress', icon: 'fa-solid fa-vial' },
    { name: 'Mocha', icon: 'devicon-mocha-plain' },
    { name: 'Jasmine', icon: 'devicon-jasmine-plain' },
    { name: 'Selenium', icon: 'devicon-selenium-original' },
    { name: 'Puppeteer', icon: 'devicon-puppeteer-plain' },
    { name: 'Figma', icon: 'devicon-figma-plain' },
    { name: 'Adobe XD', icon: 'devicon-xd-plain' },
    { name: 'Photoshop', icon: 'devicon-photoshop-plain' },
    { name: 'Illustrator', icon: 'devicon-illustrator-plain' },
    { name: 'InVision', icon: 'fa-solid fa-pen-nib' },
    { name: 'Zeplin', icon: 'fa-solid fa-z' },
    { name: 'Markdown', icon: 'devicon-markdown-original' },
    { name: 'Latex', icon: 'devicon-latex-original' },
    { name: 'WordPress', icon: 'devicon-wordpress-plain' },
    { name: 'Joomla', icon: 'fa-brands fa-joomla' },
    { name: 'Drupal', icon: 'devicon-drupal-plain' },
    { name: 'Shopify', icon: 'fa-brands fa-shopify' },
    { name: 'Magento', icon: 'devicon-magento-original' },
    { name: 'WooCommerce', icon: 'devicon-woocommerce-plain' },
    { name: 'Stripe', icon: 'fa-brands fa-stripe' },
    { name: 'PayPal', icon: 'fa-brands fa-paypal' }
];

// --- DOM Elements ---
const projectGrid = document.getElementById('projectGrid');
const emptyState = document.getElementById('emptyState');
const btnAddProject = document.getElementById('btnAddProject');

// Modals
const passwordModal = document.getElementById('passwordModal');
const gitAddModal = document.getElementById('gitAddModal');
const manualAddModal = document.getElementById('manualAddModal');
const closeBtns = document.querySelectorAll('.close-modal');

// Password
const passwordInput = document.getElementById('passwordInput');
const btnSubmitPassword = document.getElementById('btnSubmitPassword');
const passwordError = document.getElementById('passwordError');

// Git Fetch
const gitIdInput = document.getElementById('gitIdInput');
const gitUrlInput = document.getElementById('gitUrlInput');
const btnFetchGit = document.getElementById('btnFetchGit');
const btnShowManual = document.getElementById('btnShowManual');
const gitLoader = document.getElementById('gitLoader');
const gitError = document.getElementById('gitError');

// Manual Add
const manualName = document.getElementById('manualName');
const manualDesc = document.getElementById('manualDesc');
const manualUrl = document.getElementById('manualUrl');
const btnSubmitManual = document.getElementById('btnSubmitManual');
const techDropdownHeader = document.getElementById('techDropdownHeader');
const techOptionsList = document.getElementById('techOptionsList');
const techCount = document.getElementById('techCount');
const selectedTechPreview = document.getElementById('selectedTechPreview');

// --- Initialization ---
function init() {
    populateTechDropdown();
    setupEventListeners();
}

// --- Event Listeners ---
function setupEventListeners() {
    // Open password modal
    btnAddProject.addEventListener('click', () => {
        passwordInput.value = '';
        passwordError.style.display = 'none';
        showModal(passwordModal);
    });

    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            hideModal(e.target.closest('.modal-overlay'));
        });
    });

    // Password Submit
    btnSubmitPassword.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') checkPassword();
    });

    // Git Fetch Submit
    btnFetchGit.addEventListener('click', fetchGitRepo);

    // Show Manual Add
    btnShowManual.addEventListener('click', () => {
        hideModal(gitAddModal);
        resetManualForm();
        showModal(manualAddModal);
    });

    // Tech Dropdown Toggle
    techDropdownHeader.addEventListener('click', () => {
        techOptionsList.classList.toggle('open');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tech-select-container')) {
            techOptionsList.classList.remove('open');
        }
    });

    // Submit Manual
    btnSubmitManual.addEventListener('click', () => {
        if(!manualName.value.trim()) return alert("Project Name required");
        createCard(manualName.value, manualDesc.value, selectedTechnologies, null, manualUrl.value);
        hideModal(manualAddModal);
    });
}

// --- Functions ---
function showModal(modal) { modal.classList.add('show'); }
function hideModal(modal) { modal.classList.remove('show'); }

function checkPassword() {
    if(passwordInput.value === MASTER_PASSWORD) {
        hideModal(passwordModal);
        gitIdInput.value = '';
        gitUrlInput.value = '';
        gitError.style.display = 'none';
        showModal(gitAddModal);
    } else {
        passwordError.style.display = 'block';
    }
}

async function fetchGitRepo() {
    const repoId = gitIdInput.value.trim();
    const liveUrl = gitUrlInput.value.trim();
    if(!repoId || !repoId.includes('/')) {
        gitError.innerText = "Please enter valid owner/repo format.";
        gitError.style.display = 'block';
        return;
    }

    gitError.style.display = 'none';
    gitLoader.style.display = 'block';
    btnFetchGit.disabled = true;

    try {
        const response = await fetch(`https://api.github.com/repos/${repoId}`);
        if(!response.ok) throw new Error("Repo not found");
        const data = await response.json();
        
        // Auto extract some languages if possible via languages_url, but for simplicity we'll just use GitHub's main language
        const techIcon = getTechIcon(data.language);
        const techs = techIcon ? [{name: data.language, icon: techIcon}] : [];

        createCard(data.name, data.description || "No description provided.", techs, data.html_url, liveUrl);
        hideModal(gitAddModal);
    } catch (err) {
        gitError.innerText = "Repository not found. Try manual entry.";
        gitError.style.display = 'block';
    } finally {
        gitLoader.style.display = 'none';
        btnFetchGit.disabled = false;
    }
}

function getTechIcon(langName) {
    if(!langName) return null;
    const found = TECHNOLOGIES.find(t => t.name.toLowerCase() === langName.toLowerCase());
    return found ? found.icon : 'fa-solid fa-code';
}

function populateTechDropdown() {
    techOptionsList.innerHTML = '';
    TECHNOLOGIES.forEach(tech => {
        const div = document.createElement('div');
        div.className = 'tech-option';
        div.innerHTML = `<i class="${tech.icon}"></i> <span>${tech.name}</span>`;
        div.addEventListener('click', () => toggleTechSelection(tech, div));
        techOptionsList.appendChild(div);
    });
}

function toggleTechSelection(tech, el) {
    const index = selectedTechnologies.findIndex(t => t.name === tech.name);
    if(index > -1) {
        selectedTechnologies.splice(index, 1);
        el.classList.remove('selected');
    } else {
        selectedTechnologies.push(tech);
        el.classList.add('selected');
    }
    updateTechPreview();
}

function updateTechPreview() {
    techCount.innerText = selectedTechnologies.length;
    selectedTechPreview.innerHTML = '';
    selectedTechnologies.forEach(t => {
        selectedTechPreview.innerHTML += `<i class="${t.icon}" title="${t.name}"></i>`;
    });
}

function resetManualForm() {
    manualName.value = '';
    manualDesc.value = '';
    manualUrl.value = '';
    selectedTechnologies = [];
    document.querySelectorAll('.tech-option').forEach(el => el.classList.remove('selected'));
    updateTechPreview();
}

function createCard(name, desc, techs, gitUrl, liveUrl) {
    if(emptyState) emptyState.style.display = 'none';

    // Build tech HTML
    let techHtml = '';
    techs.forEach(t => {
        techHtml += `<i class="${t.icon}" title="${t.name}"></i>`;
    });

    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <h3 class="card-title">${name.replace(/-/g, ' ')}</h3>
        <p class="card-desc">${desc}</p>
        <div class="card-bottom">
            <div class="card-tech-stack">
                ${techHtml}
            </div>
            <div class="card-actions">
                ${gitUrl ? `<a href="${gitUrl}" target="_blank" class="card-btn"><i class="fa-brands fa-github"></i></a>` : ''}
                ${liveUrl ? `<a href="${liveUrl}" target="_blank" class="card-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
            </div>
        </div>
    `;
    projectGrid.appendChild(card);
}

// Boot
init();
