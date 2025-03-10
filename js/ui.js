// UI Module - Handles UI updates and visual elements

// Show toast notification
function showToast(type, title, message) {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon i');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set toast content
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Set toast type
    toast.className = 'toast';
    toast.classList.add(type);
    
    // Set icon
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Show dashboard
function showDashboard() {
    console.log("Showing dashboard");
    document.getElementById('website-content').style.display = 'none';
    document.getElementById('dashboard-page').classList.add('active');
    window.scrollTo(0, 0);
    
    // Update URL hash
    window.history.replaceState(null, null, '#dashboard');
}

// Show website content
function showWebsiteContent() {
    console.log("Showing website content");
    document.getElementById('website-content').style.display = 'block';
    document.getElementById('dashboard-page').classList.remove('active');
    
    // Update URL hash
    window.history.replaceState(null, null, '#');
}

// Update UI based on auth state
function updateAuthUI(user, userData) {
    const loggedInElements = document.querySelectorAll('.logged-in');
    const loggedOutElements = document.querySelectorAll('.logged-out');
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    const profileInitials = document.getElementById('profile-initials');
    const sidebarProfileImage = document.getElementById('sidebar-profile-image');
    const avatarInitials = document.getElementById('avatar-initials');
    
    if (user) {
        // User is signed in
        console.log("Updating UI for signed-in user");
        loggedInElements.forEach(el => el.style.display = 'block');
        loggedOutElements.forEach(el => el.style.display = 'none');
        
        // Basic user info from auth
        const displayName = user.displayName || (userData ? `${userData.firstName} ${userData.lastName}` : 'User');
        const email = user.email;
        
        console.log("User display name:", displayName);
        console.log("User email:", email);
        
        // Update user info in UI
        if (userNameElement) userNameElement.textContent = displayName;
        if (userEmailElement) userEmailElement.textContent = email;
        
        // Update profile images
        let initials = 'U';
        if (userData && userData.firstName && userData.lastName) {
            initials = userData.firstName.charAt(0) + userData.lastName.charAt(0);
        } else if (displayName && displayName.includes(' ')) {
            const nameParts = displayName.split(' ');
            initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
        } else if (displayName) {
            initials = displayName.charAt(0);
        }
        
        console.log("Setting profile initials:", initials);
        
        // Set initials
        if (profileInitials) profileInitials.textContent = initials.toUpperCase();
        if (avatarInitials) avatarInitials.textContent = initials.toUpperCase();
        
        // Check for profile picture
        const photoURL = user.photoURL || (userData ? userData.photoURL : null);
        if (photoURL) {
            console.log("User has profile picture:", photoURL);
            // Update profile picture in UI
            if (sidebarProfileImage) {
                sidebarProfileImage.innerHTML = `<img src="${photoURL}" alt="Profile">`;
            }
            if (document.getElementById('avatar-preview')) {
                document.getElementById('avatar-preview').innerHTML = `<img src="${photoURL}" alt="Profile">`;
            }
            if (document.getElementById('user-icon')) {
                document.getElementById('user-icon').innerHTML = `<img src="${photoURL}" alt="Profile">`;
            }
        }
        
        // Update profile form if exists
        if (userData) {
            const firstNameInput = document.getElementById('first-name');
            const lastNameInput = document.getElementById('last-name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const institutionInput = document.getElementById('institution');
            const bioInput = document.getElementById('bio');
            
            if (firstNameInput) firstNameInput.value = userData.firstName || '';
            if (lastNameInput) lastNameInput.value = userData.lastName || '';
            if (emailInput) emailInput.value = email || '';
            if (phoneInput && userData.phone) phoneInput.value = userData.phone;
            if (institutionInput && userData.institution) institutionInput.value = userData.institution;
            if (bioInput && userData.bio) bioInput.value = userData.bio;
        }
        
        // Check if profile is complete
        const isProfileComplete = userData && userData.isProfileComplete;
        console.log("Profile complete:", isProfileComplete);
        
        if (!isProfileComplete) {
            // Show profile completion modal
            document.getElementById('profile-completion-modal').classList.add('active');
        } else {
            // Auto-redirect to dashboard if login button was clicked
            if (sessionStorage.getItem('loginRedirect') === 'dashboard') {
                sessionStorage.removeItem('loginRedirect');
                console.log("Redirecting to dashboard based on login redirect flag");
                showDashboard();
            }
        }
    } else {
        // User is signed out
        console.log("Updating UI for signed-out user");
        loggedInElements.forEach(el => el.style.display = 'none');
        loggedOutElements.forEach(el => el.style.display = 'block');
        
        // Reset UI
        if (userNameElement) userNameElement.textContent = 'User Name';
        if (userEmailElement) userEmailElement.textContent = 'user@example.com';
        if (profileInitials) profileInitials.textContent = 'U';
        if (avatarInitials) avatarInitials.textContent = 'U';
        
        // Ensure we're on the main website
        showWebsiteContent();
    }
    
    // Hide loading indicators
    const loginLoadingIndicator = document.getElementById('login-loading');
    const registerLoadingIndicator = document.getElementById('register-loading');
    if (loginLoadingIndicator) loginLoadingIndicator.style.display = 'none';
    if (registerLoadingIndicator) registerLoadingIndicator.style.display = 'none';
}

// Setup toast notification
function setupToastNotification() {
    const toast = document.getElementById('toast');
    const toastClose = document.getElementById('toast-close');
    
    // Close toast
    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }
}

// Initialize UI based on window location hash
function initUIBasedOnHash() {
    if (window.location.hash === '#dashboard') {
        showDashboard();
    }
}

// Initialize the UI module
function initUI() {
    // Set up toast notifications
    setupToastNotification();
    
    // Initialize UI based on hash
    initUIBasedOnHash();
    
    // Make UI functions globally available
    window.showDashboard = showDashboard;
    window.showWebsiteContent = showWebsiteContent;
}

// Export UI functions
export { 
    initUI, 
    showToast, 
    showDashboard, 
    showWebsiteContent, 
    updateAuthUI 
};