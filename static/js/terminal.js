// Terminal State
const terminal = {
    history: [],
    historyIndex: -1,
    currentPath: "~",
    username: "luminousv",
    hostname: "fedora",
    statrTime: Date.now()
}

// File System Simulation
const fileSystem = {
    '~': ['Documents', 'Downloads', 'Music', 'Pictures', 'Videos', 'Projects', 'README.md', '.bashrc'],
    '~/Documents': ['portfolio.pdf', 'resume.txt', 'notes.txt'],
    '~/Downloads': ['setup.exe', 'image.png'],
    '~/Music': ['song1.mp3', 'song2.mp3'],
    '~/Pictures': ['photo1.jpg', 'photo2.jpg', 'screenshot.png'],
    '~/Videos': ['video1.mp4', 'tutorial.mp4'],
    '~/Projects': ['3d-portfolio', 'website', 'app']
};

// Command Handlers
const commands = {
    help: () => {
        return `<div class="terminal-info">Available Commands:</div>
<div class="terminal-result">
  <strong>help</strong>       - Show this help message
  <strong>clear</strong>      - Clear terminal screen
  <strong>neofetch</strong>   - Display system information
  <strong>pwd</strong>        - Print working directory
  <strong>ls</strong>         - List directory contents
  <strong>cd</strong>         - Change directory (cd .. to go back)
  <strong>date</strong>       - Show current date and time
  <strong>whoami</strong>     - Print current username
  <strong>uname</strong>      - Print system information
  <strong>echo</strong>       - Display a line of text
  <strong>uptime</strong>     - Show system uptime
  <strong>about</strong>      - About this portfolio
  <strong>contact</strong>    - Contact information
  <strong>skills</strong>     - Technical skills
  <strong>projects</strong>   - View projects
</div>`;
    },

    clear: () => {
        document.getElementById('terminal-output').innerHTML = '';
        return '';
    },

    neofetch: () => {
        const uptimeMs = Date.now() - terminal.startTime;
        const uptimeHours = Math.floor(uptimeMs / 3600000);
        const uptimeMins = Math.floor((uptimeMs % 3600000) / 60000);
        
        return `<div class="neofetch-display">
    <div class="neofetch-ascii">          /:-------------:\\
       :-------------------::
     :-----------/shhOHbmp---:\\
   /-----------omMMMNNNMMD  ---:
  :-----------sMMMMNMNMP.    ---:
 :-----------:MMMdP-------    ---\\
,------------:MMMd--------    ---:
:------------:MMMd-------    .---:
:----    oNMMMMMMMMMNho     .----:
:--     .+shhhMMMmhhy++   .------/
:-    -------:MMMd--------------:
:-   --------/MMMd-------------;
:-    ------/hMMMy------------:
:-- :dMNdhhdNMMNo------------;
:---:sdNMMMMNds:------------:
:------:://:-------------::
:---------------------://</div>
    <div class="neofetch-info">
        <div class="neofetch-line">
            <span class="neofetch-label">OS:</span>
            <span class="neofetch-value">Fedora Linux 43 (Workstation)</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">Host:</span>
            <span class="neofetch-value">Portfolio Desktop</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">Kernel:</span>
            <span class="neofetch-value">6.8.5-301.fc40.x86_64</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">Uptime:</span>
            <span class="neofetch-value">${uptimeHours} hours, ${uptimeMins} mins</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">Packages:</span>
            <span class="neofetch-value">2847 (rpm), 42 (flatpak)</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">Shell:</span>
            <span class="neofetch-value">bash 5.2.26</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">DE:</span>
            <span class="neofetch-value">GNOME 46</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">WM:</span>
            <span class="neofetch-value">Mutter</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">Terminal:</span>
            <span class="neofetch-value">gnome-terminal</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">CPU:</span>
            <span class="neofetch-value">AMD Athlon 3150U Gold 2 Core 4 Threads @ 2.4 GHz</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">GPU:</span>
            <span class="neofetch-value">AMD Vega 8</span>
        </div>
        <div class="neofetch-line">
            <span class="neofetch-label">Memory:</span>
            <span class="neofetch-value">12288 MiB / 32768MiB</span>
        </div>
        <div class="color-palette">
            <div class="color-block" style="background: #e94560;"></div>
            <div class="color-block" style="background: #5eeb5b;"></div>
            <div class="color-block" style="background: #ffd93d;"></div>
            <div class="color-block" style="background: #3584e4;"></div>
            <div class="color-block" style="background: #a855f7;"></div>
            <div class="color-block" style="background: #00f2fe;"></div>
            <div class="color-block" style="background: #f5f5f5;"></div>
        </div>
    </div>
</div>`;
    },

    pwd: () => {
        const fullPath = terminal.currentPath.replace('~', '/home/' + terminal.username);
        return `<div class="terminal-result">${fullPath}</div>`;
    },

    ls: () => {
        const files = fileSystem[terminal.currentPath] || [];
        if (files.length === 0) {
            return '<div class="terminal-error">Directory is empty</div>';
        }
        return '<div class="terminal-result">' + files.join('  ') + '</div>';
    },

    cd: (args) => {
        if (!args || args.trim() === '') {
            terminal.currentPath = '~';
            return '';
        }
        
        const target = args.trim();
        if (target === '..') {
            if (terminal.currentPath !== '~') {
                const parts = terminal.currentPath.split('/');
                parts.pop();
                terminal.currentPath = parts.join('/') || '~';
            }
            return '';
        }

        const newPath = terminal.currentPath === '~' 
            ? '~/' + target 
            : terminal.currentPath + '/' + target;

        if (fileSystem[newPath] || fileSystem[terminal.currentPath]?.includes(target)) {
            terminal.currentPath = newPath;
            return '';
        } else {
            return `<div class="terminal-error">cd: no such file or directory: ${target}</div>`;
        }
    },

    date: () => {
        const now = new Date();
        return `<div class="terminal-result">${now.toString()}</div>`;
    },

    whoami: () => {
        return `<div class="terminal-result">${terminal.username}</div>`;
    },

    uname: (args) => {
        if (args && args.includes('-a')) {
            return '<div class="terminal-result">Linux fedora 6.8.5-301.fc40.x86_64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</div>';
        }
        return '<div class="terminal-result">Linux</div>';
    },

    echo: (args) => {
        return `<div class="terminal-result">${args || ''}</div>`;
    },

    uptime: () => {
        const uptimeMs = Date.now() - terminal.startTime;
        const uptimeHours = Math.floor(uptimeMs / 3600000);
        const uptimeMins = Math.floor((uptimeMs % 3600000) / 60000);
        return `<div class="terminal-result">up ${uptimeHours} hours, ${uptimeMins} minutes</div>`;
    },

    about: () => {
        return `<div class="terminal-info">
╔════════════════════════════════════════════╗
║        3D Interactive Portfolio            ║
╚════════════════════════════════════════════╝
</div><div class="terminal-result">
Welcome to my 3D portfolio! This is an interactive
showcase built with Three.js and SvelteKit.

Navigate through the 3D environment to explore:
• Terminal with custom commands
• Project showcases
• Interactive elements
• Modern web technologies

Type <strong>help</strong> to see all available commands.
</div>`;
    },

    contact: () => {
        return `<div class="terminal-success">
╔════════════════════════════════════════════╗
║          Contact Information               ║
╚════════════════════════════════════════════╝
</div><div class="terminal-result">
Email   : farelreyhan6@gmail.com
GitHub  : https://github.com/LuminousVar
LinkedIn: https://www.linkedin.com/in/reyhan-al-farel/
Website : luminousv.my.id
</div>`;
    },

    skills: () => {
        return `<div class="terminal-info">
╔════════════════════════════════════════════╗
║          Technical Skills                  ║
╚════════════════════════════════════════════╝
</div><div class="terminal-result">
<strong>Frontend:</strong>
  • React, Vue, Svelte, SvelteKit
  • Three.js, WebGL, GLSL
  • TypeScript, JavaScript (ES6+)
  • HTML5, CSS3, Tailwind CSS

<strong>Backend:</strong>
  • Node.js, Express
  • Python, Django, FastAPI
  • PostgreSQL, MongoDB

<strong>Tools & DevOps:</strong>
  • Git, GitHub Actions
  • Docker, Kubernetes
  • AWS, Vercel, Netlify

<strong>3D & Graphics:</strong>
  • Three.js, React Three Fiber
  • Blender, 3D Modeling
  • GLSL Shaders, WebGL
</div>`;
    },

    projects: () => {
        return `<div class="terminal-success">
╔════════════════════════════════════════════╗
║            Featured Projects               ║
╚════════════════════════════════════════════╝
</div><div class="terminal-result">
<strong>1. 3D Portfolio Website</strong>
   Interactive 3D portfolio built with Three.js
   Tech: SvelteKit, Three.js, GLSL, TypeScript

<strong>2. E-Commerce Platform</strong>
   Full-stack online shopping platform
   Tech: React, Node.js, MongoDB, Stripe

<strong>3. Real-time Chat App</strong>
   WebSocket-based messaging application
   Tech: Vue.js, Socket.io, Express, Redis

<strong>4. AI Image Generator</strong>
   AI-powered image generation tool
   Tech: Python, FastAPI, Stable Diffusion

<strong>5. Task Management Dashboard</strong>
   Project tracking and team collaboration
   Tech: React, TypeScript, PostgreSQL
</div>`;
    }
};