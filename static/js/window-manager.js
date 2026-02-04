// Window state management
const windowStates = {
    terminal: { open: false, minimized: false },
    files: { open: false, minimized: false },
    settings: { open: false, minimized: false },
    vscode: { open: false, minimized: false },
    github: { open: false, minimized: false },
    credits: { open: false, minimized: false }
};

// Window dragging functionality
function makeWindowDraggable(windowElement) {
    const header = windowElement.querySelector('.window-header');
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let animationId;

    header.addEventListener('mousedown', (e) => {
        // Don't drag if clicking on buttons
        if (e.target.classList.contains('win-btn') || e.target.closest('.win-btn')) {
            return;
        }

        isDragging = true;
        windowElement.classList.add('dragging');
        initialX = e.clientX - windowElement.offsetLeft;
        initialY = e.clientY - windowElement.offsetTop;

        // Bring window to front
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
        windowElement.classList.add('active');
    });

    const dragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        // Cancel any pending animation frame
        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        // Use requestAnimationFrame for smooth updates
        animationId = requestAnimationFrame(() => {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Boundary checking
            const maxX = window.innerWidth - windowElement.offsetWidth;
            const maxY = window.innerHeight - windowElement.offsetHeight - 100; // Account for dock

            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));

            // Use transform for better performance, but fallback to left/top if needed
            windowElement.style.left = currentX + 'px';
            windowElement.style.top = currentY + 'px';
        });
    };

    const dragEnd = () => {
        if (isDragging) {
            isDragging = false;
            windowElement.classList.remove('dragging');
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        }
    };

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
    
    // Handle case when mouse leaves the window while dragging
    document.addEventListener('mouseleave', dragEnd);
}

// Initialize dragging for all windows
function initializeWindowDragging() {
    document.querySelectorAll('.window').forEach(win => {
        makeWindowDraggable(win);
    });
}

// Window focus management
function initializeWindowFocus() {
    document.querySelectorAll('.window').forEach(win => {
        win.addEventListener('mousedown', () => {
            document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
            win.classList.add('active');
        });
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        windowStates,
        makeWindowDraggable,
        initializeWindowDragging,
        initializeWindowFocus
    };
}
