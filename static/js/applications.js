// Application window management functions
// Depends on: window-manager.js (windowStates), dock.js (updateDockIndicators)

// Terminal functions
function openTerminal() {
    const win = document.getElementById('terminal-window');
    windowStates.terminal.open = true;
    windowStates.terminal.minimized = false;
    win.style.display = 'block';
    win.classList.add('active');
    win.classList.remove('minimized');
    document.getElementById('files-window').classList.remove('active');
    updateDockIndicators();
    setTimeout(() => {
        const inputElement = document.getElementById('terminal-input');
        if (inputElement) inputElement.focus();
    }, 100);
}

function minimizeTerminal() {
    const win = document.getElementById('terminal-window');
    windowStates.terminal.minimized = true;
    win.style.display = 'none';
    win.classList.remove('active');
    updateDockIndicators();
}

function closeTerminal() {
    const win = document.getElementById('terminal-window');
    windowStates.terminal.open = false;
    windowStates.terminal.minimized = false;
    win.style.display = 'none';
    win.classList.remove('active', 'minimized');
    updateDockIndicators();
}

function toggleTerminal() {
    const win = document.getElementById('terminal-window');
    if (!windowStates.terminal.open) {
        openTerminal();
    } else if (windowStates.terminal.minimized) {
        openTerminal();
    } else if (win.classList.contains('active')) {
        minimizeTerminal();
    } else {
        openTerminal();
    }
}

// Files functions
function openFiles() {
    const win = document.getElementById('files-window');
    windowStates.files.open = true;
    windowStates.files.minimized = false;
    win.style.display = 'block';
    win.classList.add('active');
    win.classList.remove('minimized');
    document.getElementById('terminal-window').classList.remove('active');
    updateDockIndicators();
}

function minimizeFiles() {
    const win = document.getElementById('files-window');
    windowStates.files.minimized = true;
    win.style.display = 'none';
    win.classList.remove('active');
    updateDockIndicators();
}

function closeFiles() {
    const win = document.getElementById('files-window');
    windowStates.files.open = false;
    windowStates.files.minimized = false;
    win.style.display = 'none';
    win.classList.remove('active', 'minimized');
    updateDockIndicators();
}

// Settings functions
function openSettings() {
    const win = document.getElementById('settings-window');
    windowStates.settings.open = true;
    windowStates.settings.minimized = false;
    win.style.display = 'block';
    win.classList.add('active');
    win.classList.remove('minimized');
    document.getElementById('terminal-window').classList.remove('active');
    document.getElementById('files-window').classList.remove('active');
    updateDockIndicators();
}

function minimizeSettings() {
    const win = document.getElementById('settings-window');
    windowStates.settings.minimized = true;
    win.style.display = 'none';
    win.classList.remove('active');
    updateDockIndicators();
}

function closeSettings() {
    const win = document.getElementById('settings-window');
    windowStates.settings.open = false;
    windowStates.settings.minimized = false;
    win.style.display = 'none';
    win.classList.remove('active', 'minimized');
    updateDockIndicators();
}

// VSCode functions
function openVSCode() {
    const win = document.getElementById('vscode-window');
    windowStates.vscode.open = true;
    windowStates.vscode.minimized = false;
    win.style.display = 'block';
    win.classList.add('active');
    win.classList.remove('minimized');
    document.getElementById('terminal-window').classList.remove('active');
    document.getElementById('files-window').classList.remove('active');
    document.getElementById('settings-window').classList.remove('active');
    updateDockIndicators();
}

function minimizeVSCode() {
    const win = document.getElementById('vscode-window');
    windowStates.vscode.minimized = true;
    win.style.display = 'none';
    win.classList.remove('active');
    updateDockIndicators();
}

function closeVSCode() {
    const win = document.getElementById('vscode-window');
    windowStates.vscode.open = false;
    windowStates.vscode.minimized = false;
    win.style.display = 'none';
    win.classList.remove('active', 'minimized');
    updateDockIndicators();
}

// GitHub Desktop functions
function openGitHub() {
    const win = document.getElementById('github-window');
    windowStates.github.open = true;
    windowStates.github.minimized = false;
    win.style.display = 'block';
    win.classList.add('active');
    win.classList.remove('minimized');
    document.getElementById('terminal-window').classList.remove('active');
    document.getElementById('files-window').classList.remove('active');
    document.getElementById('settings-window').classList.remove('active');
    document.getElementById('vscode-window').classList.remove('active');
    updateDockIndicators();
}

function minimizeGitHub() {
    const win = document.getElementById('github-window');
    windowStates.github.minimized = true;
    win.style.display = 'none';
    win.classList.remove('active');
    updateDockIndicators();
}

function closeGitHub() {
    const win = document.getElementById('github-window');
    windowStates.github.open = false;
    windowStates.github.minimized = false;
    win.style.display = 'none';
    win.classList.remove('active', 'minimized');
    updateDockIndicators();
}

// Credits functions
function openCredits() {
    const win = document.getElementById('credits-window');
    windowStates.credits.open = true;
    windowStates.credits.minimized = false;
    win.style.display = 'block';
    win.classList.add('active');
    win.classList.remove('minimized');
    document.getElementById('terminal-window').classList.remove('active');
    document.getElementById('files-window').classList.remove('active');
    document.getElementById('settings-window').classList.remove('active');
    document.getElementById('vscode-window').classList.remove('active');
    document.getElementById('github-window').classList.remove('active');
    updateDockIndicators();
}

function minimizeCredits() {
    const win = document.getElementById('credits-window');
    windowStates.credits.minimized = true;
    win.style.display = 'none';
    win.classList.remove('active');
    updateDockIndicators();
}

function closeCredits() {
    const win = document.getElementById('credits-window');
    windowStates.credits.open = false;
    windowStates.credits.minimized = false;
    win.style.display = 'none';
    win.classList.remove('active', 'minimized');
    updateDockIndicators();
}

// Resume function
function openResume() {
    // Open resume in a new tab
    window.open('/assets/resume.pdf', '_blank');
}

// Settings panel switcher
function changeSettingsPanel(panel) {
    const content = document.getElementById('settings-content');
    const items = document.querySelectorAll('#settings-window .sidebar-item');
    items.forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const panels = {
        wifi: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Wi-Fi</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">📶 Home Network</div>
                        <div style="font-size: 12px; opacity: 0.7;">Connected</div>
                    </div>
                    <div style="color: #3584e4;">✓</div>
                </div>
                <div style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 4px;">📶 Office WiFi</div>
                    <div style="font-size: 12px; opacity: 0.7;">Available</div>
                </div>
                <div style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 4px;">📶 Guest Network</div>
                    <div style="font-size: 12px; opacity: 0.7;">Available</div>
                </div>
            </div>
        `,
        appearance: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Appearance</h3>
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <div style="font-weight: 600; margin-bottom: 12px;">Style</div>
                    <div style="display: flex; gap: 12px;">
                        <div style="flex: 1; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; text-align: center; border: 2px solid #3584e4;">
                            <div style="font-size: 32px; margin-bottom: 8px;">🌙</div>
                            <div>Dark</div>
                        </div>
                        <div style="flex: 1; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px; text-align: center;">
                            <div style="font-size: 32px; margin-bottom: 8px;">☀️</div>
                            <div>Light</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 12px;">Background</div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                        <div style="aspect-ratio: 16/9; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; border: 2px solid #3584e4;"></div>
                        <div style="aspect-ratio: 16/9; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px;"></div>
                        <div style="aspect-ratio: 16/9; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 8px;"></div>
                    </div>
                </div>
            </div>
        `,
        notifications: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Notifications</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Show Notifications</div>
                        <div style="font-size: 12px; opacity: 0.7;">Display notification banners and sounds</div>
                    </div>
                    <div style="color: #3584e4;">ON</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Lock Screen Notifications</div>
                        <div style="font-size: 12px; opacity: 0.7;">Show notifications on lock screen</div>
                    </div>
                    <div style="opacity: 0.5;">OFF</div>
                </div>
            </div>
        `,
        sound: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Sound</h3>
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <div style="font-weight: 600; margin-bottom: 12px;">Output Volume</div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span>🔇</span>
                        <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 70%; background: #3584e4; border-radius: 4px;"></div>
                        </div>
                        <span>🔊</span>
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 12px;">Input Volume</div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span>🎤</span>
                        <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: #3584e4; border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        power: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Power</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">Battery</div>
                    <div style="font-size: 32px; margin: 12px 0;">🔋 78%</div>
                    <div style="font-size: 12px; opacity: 0.7;">2 hours 30 minutes remaining</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Power Saver</div>
                        <div style="font-size: 12px; opacity: 0.7;">Reduce performance to extend battery</div>
                    </div>
                    <div style="opacity: 0.5;">OFF</div>
                </div>
            </div>
        `,
        displays: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Displays</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">Built-in Display</div>
                    <div style="font-size: 14px; opacity: 0.7;">1920 × 1080 (16:9)</div>
                    <div style="font-size: 14px; opacity: 0.7; margin-top: 4px;">60 Hz</div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 12px;">Night Light</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px;">🌙 Night Light</div>
                            <div style="font-size: 12px; opacity: 0.7;">Reduce blue light in the evening</div>
                        </div>
                        <div style="color: #3584e4;">ON</div>
                    </div>
                </div>
            </div>
        `,
        privacy: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Privacy</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">📷 Camera</div>
                        <div style="font-size: 12px; opacity: 0.7;">Allow apps to use camera</div>
                    </div>
                    <div style="color: #3584e4;">ON</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">🎤 Microphone</div>
                        <div style="font-size: 12px; opacity: 0.7;">Allow apps to use microphone</div>
                    </div>
                    <div style="color: #3584e4;">ON</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">📍 Location</div>
                        <div style="font-size: 12px; opacity: 0.7;">Allow apps to access location</div>
                    </div>
                    <div style="opacity: 0.5;">OFF</div>
                </div>
            </div>
        `,
        users: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Users</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; gap: 16px;">
                    <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 32px;">👤</div>
                    <div>
                        <div style="font-weight: 600; font-size: 18px; margin-bottom: 4px;">luminousv</div>
                        <div style="font-size: 12px; opacity: 0.7;">Administrator</div>
                    </div>
                </div>
                <button style="padding: 12px; background: rgba(255,255,255,0.08); border: none; border-radius: 8px; color: white; cursor: pointer; font-size: 14px;">Add User...</button>
            </div>
        `,
        keyboard: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Keyboard</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">Input Sources</div>
                    <div style="font-size: 14px; opacity: 0.7;">English (US)</div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 12px;">Keyboard Shortcuts</div>
                    <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px;">
                        <span>Copy</span>
                        <span style="opacity: 0.7;">Ctrl+C</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-top: 8px;">
                        <span>Paste</span>
                        <span style="opacity: 0.7;">Ctrl+V</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-top: 8px;">
                        <span>Switch Windows</span>
                        <span style="opacity: 0.7;">Super+Tab</span>
                    </div>
                </div>
            </div>
        `,
        about: `
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">About</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="text-align: center; padding: 24px;">
                    <div style="font-size: 64px; margin-bottom: 16px;">🎩</div>
                    <div style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Fedora 39</div>
                    <div style="opacity: 0.7;">GNOME 45.2</div>
                </div>
                <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span style="opacity: 0.7;">Device Name</span>
                        <span>luminousv-laptop</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span style="opacity: 0.7;">Memory</span>
                        <span>16.0 GB</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span style="opacity: 0.7;">Processor</span>
                        <span>Intel Core i7</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="opacity: 0.7;">OS Type</span>
                        <span>64-bit</span>
                    </div>
                </div>
            </div>
        `
    };

    content.innerHTML = panels[panel] || panels.wifi;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openTerminal, minimizeTerminal, closeTerminal, toggleTerminal,
        openFiles, minimizeFiles, closeFiles,
        openSettings, minimizeSettings, closeSettings,
        openVSCode, minimizeVSCode, closeVSCode,
        openGitHub, minimizeGitHub, closeGitHub,
        openResume,
        changeSettingsPanel
    };
}
