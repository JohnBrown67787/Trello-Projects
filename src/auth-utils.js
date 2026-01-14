/**
 * Auth Utilities
 * dependency: supabase-client.js
 */
const AuthUtils = {
    // Default avatar if none provided
    DEFAULT_AVATAR: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',

    /**
     * Initialize Auth Check and UI Updates
     */
    async init() {
        if (!window.supabaseClient) {
            console.error("Supabase client not initialized. Make sure supabase-client.js is loaded.");
            return;
        }

        // Check initial session
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        this.updateUI(session);

        // Listen for auth changes (login/logout)
        window.supabaseClient.auth.onAuthStateChange((_event, session) => {
            this.updateUI(session);
        });
    },

    /**
     * Update UI elements based on session
     * @param {Object|null} session 
     */
    updateUI(session) {
        const userNameEls = document.querySelectorAll('#user-name');
        const userEmailEls = document.querySelectorAll('#user-email');
        const userAvatarEls = document.querySelectorAll('#user-avatar');
        
        const authButtons = document.getElementById('auth-buttons');
        const profileSection = document.getElementById('user-profile-btn') || document.getElementById('user-profile-section');

        if (session) {
            // LOGGED IN
            const { user } = session;
            const fullName = user.user_metadata.full_name || user.email.split('@')[0];
            const avatarUrl = user.user_metadata.avatar_url || this.DEFAULT_AVATAR;

            // Update Text
            userNameEls.forEach(el => el.textContent = fullName);
            userEmailEls.forEach(el => el.textContent = user.email);

            // Update Avatars
            userAvatarEls.forEach(el => {
                if(el.tagName === 'IMG') {
                    el.src = avatarUrl;
                } else {
                    // Start or Div background
                    el.style.backgroundImage = `url('${avatarUrl}')`;
                    el.style.backgroundSize = 'cover';
                }
            });

            // Toggle Visibility
            if (authButtons) authButtons.style.display = 'none';
            if (profileSection) {
                profileSection.style.display = 'flex';
                // Attach Logout Handler if it's a button/clickable
                profileSection.onclick = () => this.handleProfileClick();
            }

        } else {
            // LOGGED OUT
            userNameEls.forEach(el => el.textContent = 'Guest');
            userEmailEls.forEach(el => el.textContent = 'Sign In');
            
            userAvatarEls.forEach(el => {
                if(el.tagName === 'IMG') {
                    el.src = this.DEFAULT_AVATAR;
                } else {
                    el.style.backgroundImage = `url('${this.DEFAULT_AVATAR}')`;
                }
            });

            // Toggle Visibility
            if (authButtons) authButtons.style.display = 'flex';
            if (profileSection) profileSection.style.display = 'none';
        }
    },

    async handleProfileClick() {
        // Simple logout for now, or redirect to profile page
        // For this task, we assume the user might want to logout
        const confirmLogout = confirm("Do you want to log out?");
        if (confirmLogout) {
            await window.supabaseClient.auth.signOut();
            window.location.reload();
        }
    }
};

// Auto-init if loaded
document.addEventListener('DOMContentLoaded', () => {
    AuthUtils.init();
});
