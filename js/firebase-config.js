// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDOCHKLCcyOdhHf_f0zqQgJq0_LuyPT0UU",
    authDomain: "mlmarch.firebaseapp.com",
    projectId: "mlmarch",
    storageBucket: "mlmarch.appspot.com",
    messagingSenderId: "869363742024",
    appId: "1:869363742024:web:4993ffca9dd8ba9fae2f7d",
    measurementId: "G-XKY8SBDV82"
};

// Initialize Firebase services
let app, auth, db, storage, analytics, googleProvider;

// Initialize Firebase with error handling
try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Set auth language
    auth.languageCode = 'en';
    
    // Google Auth Provider
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });
} catch (error) {
    console.error("Firebase initialization error:", error);
    showGlobalError("Failed to initialize the application. Please refresh the page or try again later.");
}

// Show global error message
function showGlobalError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '50%';
    errorDiv.style.left = '50%';
    errorDiv.style.transform = 'translate(-50%, -50%)';
    errorDiv.style.background = '#fff';
    errorDiv.style.padding = '20px';
    errorDiv.style.borderRadius = '8px';
    errorDiv.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    errorDiv.style.zIndex = '9999';
    errorDiv.style.maxWidth = '80%';
    errorDiv.style.textAlign = 'center';
    
    const title = document.createElement('h3');
    title.textContent = 'Application Error';
    title.style.color = '#ef4444';
    title.style.marginBottom = '10px';
    
    const text = document.createElement('p');
    text.textContent = message;
    
    const button = document.createElement('button');
    button.textContent = 'Refresh Page';
    button.style.marginTop = '15px';
    button.style.padding = '8px 16px';
    button.style.background = '#6366F1';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => window.location.reload());
    
    errorDiv.appendChild(title);
    errorDiv.appendChild(text);
    errorDiv.appendChild(button);
    
    document.body.appendChild(errorDiv);
}

// Export all required Firebase services
export { 
    app, 
    auth, 
    db, 
    storage, 
    analytics, 
    googleProvider, 
    onAuthStateChanged, 
    signInWithPopup, 
    signOut, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    serverTimestamp, 
    ref, 
    uploadBytes, 
    getDownloadURL 
};