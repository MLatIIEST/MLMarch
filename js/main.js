// Main Module - Application entry point

import { initAuth } from './auth.js';
import { initUI } from './ui.js';
import { initEvents } from './events.js';
// The animations.js file is loaded directly in the HTML because it doesn't have dependencies

// Main initialization function
function initApp() {
    console.log('Initializing ML March application...');
    
    // Initialize UI first
    initUI();
    
    // Initialize authentication
    initAuth();
    
    // Initialize event handlers
    initEvents();
    
    console.log('ML March application initialized successfully');
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Export any necessary functions
export { initApp };