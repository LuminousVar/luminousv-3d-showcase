// Main initialization script
// This file loads after all other scripts and initializes the desktop

document.addEventListener('DOMContentLoaded', () => {
    // Initialize window dragging
    initializeWindowDragging();
    
    // Initialize window focus management
    initializeWindowFocus();
    
    // Initialize time display
    initializeTime();
    
    // Initialize terminal
    initializeTerminal();
    
    // Initialize dock indicators
    updateDockIndicators();

    // Debug: Test if clicks are reaching the iframe
    document.body.addEventListener('click', (e) => {
        console.log('[Fedora HTML] Body clicked at:', e.clientX, e.clientY, 'Target:', e.target);
    });

    // Auto-open terminal on load
    setTimeout(() => openTerminal(), 500);
});
