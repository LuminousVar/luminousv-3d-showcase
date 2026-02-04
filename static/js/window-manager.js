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
        if (e.target.classList.contains('win-btn') || e.target.closest('.win-btn')) {
            return;
        }

        isDragging = true;
        windowElement.classList.add('dragging');
        initialX = e.clientX - windowElement.offsetLeft;
        initialY = e.clientY - windowElement.offsetTop;

        document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
        windowElement.classList.add('active');
    });

    const dragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        animationId = requestAnimationFrame(() => {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            const maxX = window.innerWidth - windowElement.offsetWidth;
            const maxY = window.innerHeight - windowElement.offsetHeight - 100; 

            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));

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
