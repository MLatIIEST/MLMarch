// Events Module - Handles all event listeners

import { 
    handleGoogleSignIn, 
    handleSignOut, 
    handleProfileCompletion,
    handleProfileUpdate,
    uploadProfilePicture
} from './auth.js';

import { showToast, showDashboard } from './ui.js';

// Setup login and register events
function setupLoginRegisterEvents() {
    // Login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Login button clicked");
            document.getElementById('login-modal').classList.add('active');
        });
    }
    
    // Register buttons
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Register button clicked");
            document.getElementById('register-modal').classList.add('active');
        });
    }
    
    const ctaRegisterBtn = document.getElementById('cta-register-btn');
    if (ctaRegisterBtn) {
        ctaRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("CTA register button clicked");
            document.getElementById('register-modal').classList.add('active');
        });
    }
    
    // Google Login/Register Buttons
    const googleLoginBtn = document.getElementById('google-login-btn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            console.log("Google login button clicked");
            try {
                const loginLoadingIndicator = document.getElementById('login-loading');
                if (loginLoadingIndicator) loginLoadingIndicator.style.display = 'block';
                await handleGoogleSignIn(true); // true = redirect to dashboard
            } catch (error) {
                // Error is already handled in the function
            }
        });
    }
    
    const googleRegisterBtn = document.getElementById('google-register-btn');
    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', async () => {
            console.log("Google register button clicked");
            try {
                const registerLoadingIndicator = document.getElementById('register-loading');
                if (registerLoadingIndicator) registerLoadingIndicator.style.display = 'block';
                await handleGoogleSignIn(true); // true = redirect to dashboard
            } catch (error) {
                // Error is already handled in the function
            }
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log("Logout button clicked");
            
            try {
                await handleSignOut();
                const userDropdown = document.getElementById('user-dropdown');
                if (userDropdown) {
                    userDropdown.classList.remove('active');
                }
            } catch (error) {
                // Error is already handled in the function
            }
        });
    }
    
    // Modal close buttons
    const loginModalClose = document.getElementById('login-modal-close');
    const registerModalClose = document.getElementById('register-modal-close');
    const profileCompletionModalClose = document.getElementById('profile-completion-modal-close');
    
    if (loginModalClose) {
        loginModalClose.addEventListener('click', () => {
            document.getElementById('login-modal').classList.remove('active');
            // Hide loading indicators
            const loginLoading = document.getElementById('login-loading');
            if (loginLoading) loginLoading.style.display = 'none';
        });
    }
    
    if (registerModalClose) {
        registerModalClose.addEventListener('click', () => {
            document.getElementById('register-modal').classList.remove('active');
            // Hide loading indicators
            const registerLoading = document.getElementById('register-loading');
            if (registerLoading) registerLoading.style.display = 'none';
        });
    }
    
    if (profileCompletionModalClose) {
        profileCompletionModalClose.addEventListener('click', () => {
            // Only allow closing if not required
            const isLoginRedirect = sessionStorage.getItem('loginRedirect') === 'dashboard';
            if (!isLoginRedirect) {
                document.getElementById('profile-completion-modal').classList.remove('active');
            } else {
                showToast('error', 'Profile Required', 'Please complete your profile to continue.');
            }
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const loginModal = document.getElementById('login-modal');
        const registerModal = document.getElementById('register-modal');
        const profileCompletionModal = document.getElementById('profile-completion-modal');
        
        if (loginModal && e.target === loginModal) {
            loginModal.classList.remove('active');
            // Hide loading indicators
            const loginLoading = document.getElementById('login-loading');
            if (loginLoading) loginLoading.style.display = 'none';
        }
        
        if (registerModal && e.target === registerModal) {
            registerModal.classList.remove('active');
            // Hide loading indicators
            const registerLoading = document.getElementById('register-loading');
            if (registerLoading) registerLoading.style.display = 'none';
        }
        
        // Don't allow closing profile completion modal by clicking outside
        // if (profileCompletionModal && e.target === profileCompletionModal) {
        //     profileCompletionModal.classList.remove('active');
        // }
    });
    
    // User dropdown toggle
    const userIcon = document.getElementById('user-icon');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userIcon && userDropdown) {
        userIcon.addEventListener('click', () => {
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        window.addEventListener('click', (e) => {
            if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

// Setup dashboard related events
function setupDashboardEvents() {
    const dashboardLogoutBtn = document.getElementById('dashboard-logout');
    if (dashboardLogoutBtn) {
        dashboardLogoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log("Dashboard logout button clicked");
            
            try {
                await handleSignOut();
            } catch (error) {
                // Error is already handled in the function
            }
        });
    }
    
    // Dashboard Link
    const dashboardLink = document.getElementById('dashboard-link');
    if (dashboardLink) {
        dashboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Dashboard link clicked");
            
            // Check if user is logged in
            const userIcon = document.getElementById('user-icon');
            if (userIcon) {
                showDashboard();
                const userDropdown = document.getElementById('user-dropdown');
                if (userDropdown) {
                    userDropdown.classList.remove('active');
                }
            } else {
                showToast('error', 'Error', 'You must be logged in to access the dashboard.');
                // Open login modal with flag to redirect to dashboard
                sessionStorage.setItem('loginRedirect', 'dashboard');
                document.getElementById('login-modal').classList.add('active');
            }
        });
    }
    
    // Back to Home Buttons
    const backToHomeBtn = document.getElementById('back-to-home');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Back to home button clicked");
            window.showWebsiteContent();
        });
    }
    
    const backToHomeSidebarBtn = document.getElementById('back-to-home-sidebar');
    if (backToHomeSidebarBtn) {
        backToHomeSidebarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Back to home sidebar button clicked");
            window.showWebsiteContent();
        });
    }
    
    // Dashboard Tab Navigation - Top Navigation
    const topNavLinks = document.querySelectorAll('.dashboard-nav a[data-tab]');
    if (topNavLinks.length > 0) {
        topNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("Dashboard top nav link clicked:", link.getAttribute('data-tab'));
                
                // Skip if this is the logout or back to home button
                if (link.id === 'dashboard-logout' || link.id === 'back-to-home') return;
                
                // Remove active class from all tabs
                topNavLinks.forEach(t => t.classList.remove('active'));
                const sideNavLinks = document.querySelectorAll('.sidebar-nav a[data-tab]');
                sideNavLinks.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                link.classList.add('active');
                
                // Find and activate corresponding side nav link
                const sideNavLink = Array.from(sideNavLinks).find(
                    t => t.getAttribute('data-tab') === link.getAttribute('data-tab')
                );
                if (sideNavLink) sideNavLink.classList.add('active');
                
                // Hide all tab contents
                document.querySelectorAll('.dashboard-content .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the corresponding tab content
                const targetTab = link.getAttribute('data-tab');
                if (targetTab) {
                    const targetContent = document.getElementById(`${targetTab}-content`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                }
            });
        });
    }
    
    // Dashboard Tab Navigation - Side Navigation
    const sideNavLinks = document.querySelectorAll('.sidebar-nav a[data-tab]');
    if (sideNavLinks.length > 0) {
        sideNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("Dashboard side nav link clicked:", link.getAttribute('data-tab'));
                
                // Skip if this is the logout or back to home button
                if (link.id === 'dashboard-logout' || link.id === 'back-to-home-sidebar') return;
                
                // Remove active class from all tabs
                sideNavLinks.forEach(t => t.classList.remove('active'));
                const topNavLinks = document.querySelectorAll('.dashboard-nav a[data-tab]');
                topNavLinks.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                link.classList.add('active');
                
                // Find and activate corresponding top nav link
                const topNavLink = Array.from(topNavLinks).find(
                    t => t.getAttribute('data-tab') === link.getAttribute('data-tab')
                );
                if (topNavLink) topNavLink.classList.add('active');
                
                // Hide all tab contents
                document.querySelectorAll('.dashboard-content .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the corresponding tab content
                const targetTab = link.getAttribute('data-tab');
                if (targetTab) {
                    const targetContent = document.getElementById(`${targetTab}-content`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                }
            });
        });
    }
}

// Setup profile related events
function setupProfileEvents() {
    // Profile Completion Form
    const profileCompletionForm = document.getElementById('profile-completion-form');
    if (profileCompletionForm) {
        profileCompletionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Profile completion form submitted");
            
            const phone = document.getElementById('profile-phone').value;
            const institution = document.getElementById('profile-institution').value;
            const education = document.getElementById('profile-education').value;
            const experience = document.getElementById('profile-experience').value;
            
            // Get selected interests
            const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
            const interests = Array.from(interestCheckboxes).map(cb => cb.value);
            
            const formData = {
                phone,
                institution,
                education,
                experience,
                interests
            };
            
            try {
                await handleProfileCompletion(formData);
            } catch (error) {
                // Error is already handled in the function
            }
        });
    }

    // Profile Form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Profile form submitted");
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const phone = document.getElementById('phone').value;
            const institution = document.getElementById('institution').value;
            const bio = document.getElementById('bio').value;
            
            const formData = {
                firstName,
                lastName,
                phone,
                institution,
                bio
            };
            
            try {
                await handleProfileUpdate(formData);
            } catch (error) {
                // Error is already handled in the function
            }
        });
    }
    
    // Avatar Upload
    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', async (e) => {
            console.log("Avatar upload changed");
            
            const file = e.target.files[0];
            if (file) {
                try {
                    // Show loading state
                    document.getElementById('avatar-preview').innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-spinner fa-spin"></i></div>';
                    
                    // Upload profile picture
                    await uploadProfilePicture(file);
                    
                } catch (error) {
                    console.error('Error uploading profile picture:', error);
                    showToast('error', 'Error', error.message);
                }
            }
        });
    }
    
    // Prevent form submission with Enter key in profile completion form
    const profileCompletionFormInputs = document.querySelectorAll('#profile-completion-form input, #profile-completion-form select');
    if (profileCompletionFormInputs.length > 0) {
        profileCompletionFormInputs.forEach(input => {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // Focus next input instead
                    const inputs = Array.from(profileCompletionFormInputs);
                    const index = inputs.indexOf(this);
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }
            });
        });
    }
}

// Initialize all event listeners
function initEvents() {
    setupLoginRegisterEvents();
    setupDashboardEvents();
    setupProfileEvents();
}

export { initEvents };