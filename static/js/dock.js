

function updateDockIndicators() {
    const terminalDockIcon = document.querySelector('.dock-icon[onclick="openTerminal()"]');
    if (terminalDockIcon) {
        if (windowStates.terminal.open) {
            terminalDockIcon.classList.add('has-window');
        } else {
            terminalDockIcon.classList.remove('has-window');
        }
    }

    // Update files dock indicator
    const filesDockIcon = document.querySelector('.dock-icon[onclick="openFiles()"]');
    if (filesDockIcon) {
        if (windowStates.files.open) {
            filesDockIcon.classList.add('has-window');
        } else {
            filesDockIcon.classList.remove('has-window');
        }
    }

    // Update settings dock indicator
    const settingsDockIcon = document.querySelector('.dock-icon[onclick="openSettings()"]');
    if (settingsDockIcon) {
        if (windowStates.settings.open) {
            settingsDockIcon.classList.add('has-window');
        } else {
            settingsDockIcon.classList.remove('has-window');
        }
    }

    // Update vscode dock indicator
    const vscodeDockIcon = document.querySelector('.dock-icon[onclick="openVSCode()"]');
    if (vscodeDockIcon) {
        if (windowStates.vscode.open) {
            vscodeDockIcon.classList.add('has-window');
        } else {
            vscodeDockIcon.classList.remove('has-window');
        }
    }

    // Update github dock indicator
    const githubDockIcon = document.querySelector('.dock-icon[onclick="openGitHub()"]');
    if (githubDockIcon) {
        if (windowStates.github.open) {
            githubDockIcon.classList.add('has-window');
        } else {
            githubDockIcon.classList.remove('has-window');
        }
    }

    // Update credits dock indicator
    const creditsDockIcon = document.querySelector('.dock-icon[onclick="openCredits()"]');
    if (creditsDockIcon) {
        if (windowStates.credits.open) {
            creditsDockIcon.classList.add('has-window');
        } else {
            creditsDockIcon.classList.remove('has-window');
        }
    }

    // Update app menu visibility
    const terminalMenu = document.getElementById('terminal-menu');
    if (terminalMenu) {
        if (windowStates.terminal.open) {
            terminalMenu.style.display = 'flex';
        } else {
            terminalMenu.style.display = 'none';
        }
    }
}

// Time update function
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const date = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    if (timeElement) timeElement.textContent = time;
    if (dateElement) dateElement.textContent = date;
}

// Initialize time and start interval
function initializeTime() {
    updateTime();
    setInterval(updateTime, 1000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateDockIndicators,
        updateTime,
        initializeTime
    };
}
