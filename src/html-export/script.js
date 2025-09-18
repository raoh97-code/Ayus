// Global variables
let currentUser = null;
let isLoggedIn = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupScrollAnimations();
});

// Initialize the application
function initializeApp() {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('ayursutra_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateAuthUI();
    }

    // Set minimum date for appointment booking
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Handle form submissions
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentBooking);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-item, .treatment-card, .contact-card');
    animateElements.forEach(el => observer.observe(el));
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showLogin() {
    showModal('loginModal');
}

function showAppointment() {
    showModal('appointmentModal');
}

function showRegister() {
    closeModal('loginModal');
    alert('Registration feature coming soon! Please contact us directly for now.');
}

// Treatment detail function
function showTreatmentDetail(treatmentId) {
    const treatments = {
        vaman: {
            name: 'Vaman',
            title: 'Therapeutic Vomiting',
            description: 'Vaman is a controlled therapeutic vomiting procedure that eliminates excess Kapha dosha and toxins from the upper respiratory tract and stomach. This ancient Ayurvedic therapy is particularly effective for respiratory disorders, skin conditions, and digestive issues.',
            benefits: [
                'Removes excess Kapha dosha',
                'Clears respiratory congestion',
                'Improves digestion and metabolism',
                'Treats chronic cough and asthma',
                'Enhances mental clarity',
                'Balances body constitution'
            ],
            process: [
                'Pre-treatment preparation (Purvakarma)',
                'Oil massage and steam therapy',
                'Administration of medicated emetics',
                'Controlled therapeutic vomiting',
                'Post-treatment care (Paschatkarma)',
                'Dietary guidelines and lifestyle advice'
            ],
            duration: '7-14 days',
            suitability: 'Best for Kapha-dominant conditions and respiratory disorders'
        },
        virechan: {
            name: 'Virechan',
            title: 'Purgation Therapy',
            description: 'Virechan is a controlled purgation therapy that cleanses the small intestine, liver, and eliminates excess Pitta dosha. This treatment is highly effective for liver disorders, skin diseases, and inflammatory conditions.',
            benefits: [
                'Eliminates excess Pitta dosha',
                'Detoxifies liver and gallbladder',
                'Improves skin health and complexion',
                'Treats inflammatory conditions',
                'Enhances digestive fire (Agni)',
                'Balances hormonal functions'
            ],
            process: [
                'Preparatory treatments (Snehana & Swedana)',
                'Internal oleation therapy',
                'Steam therapy sessions',
                'Administration of purgative medicines',
                'Controlled therapeutic purgation',
                'Recovery and rejuvenation phase'
            ],
            duration: '10-15 days',
            suitability: 'Ideal for Pitta-related disorders and liver conditions'
        },
        basti: {
            name: 'Basti',
            title: 'Medicated Enema',
            description: 'Basti is considered the most important of all Panchakarma therapies. It involves the administration of medicated oils, decoctions, or herbal preparations through the rectum to cleanse and nourish the colon.',
            benefits: [
                'Balances Vata dosha effectively',
                'Strengthens nervous system',
                'Improves joint health and mobility',
                'Enhances reproductive health',
                'Treats chronic constipation',
                'Rejuvenates the entire body'
            ],
            process: [
                'Pre-treatment body preparation',
                'Oil massage and heat therapy',
                'Administration of medicated enemas',
                'Retention of medicinal substances',
                'Gradual elimination process',
                'Post-treatment nourishment'
            ],
            duration: '15-30 days',
            suitability: 'Excellent for Vata disorders and neurological conditions'
        },
        nasya: {
            name: 'Nasya',
            title: 'Nasal Therapy',
            description: 'Nasya involves the administration of medicated oils, powders, or herbal preparations through the nasal passages. This therapy is particularly effective for treating disorders of the head, neck, and upper respiratory tract.',
            benefits: [
                'Clears sinuses and nasal passages',
                'Improves mental clarity and concentration',
                'Treats chronic headaches and migraines',
                'Enhances sensory functions',
                'Prevents premature graying of hair',
                'Strengthens neck and shoulder muscles'
            ],
            process: [
                'Facial massage with medicated oils',
                'Steam therapy for face and head',
                'Nasal administration of medicines',
                'Specific breathing techniques',
                'Post-treatment rest period',
                'Dietary and lifestyle guidance'
            ],
            duration: '7-21 days',
            suitability: 'Perfect for head and neck related disorders'
        },
        raktamokshana: {
            name: 'Raktamokshana',
            title: 'Bloodletting Therapy',
            description: 'Raktamokshana is a specialized therapy that involves the controlled removal of impure blood to treat various blood-related disorders. This therapy purifies the blood and treats conditions caused by vitiated blood.',
            benefits: [
                'Purifies blood and improves circulation',
                'Treats various skin disorders',
                'Reduces inflammation and swelling',
                'Manages hypertension naturally',
                'Treats chronic wounds and ulcers',
                'Enhances overall immunity'
            ],
            process: [
                'Thorough health assessment',
                'Pre-treatment preparation',
                'Sterilization and safety protocols',
                'Controlled bloodletting procedure',
                'Immediate post-treatment care',
                'Follow-up and monitoring'
            ],
            duration: '1-7 days',
            suitability: 'Recommended for blood-related and skin disorders'
        }
    };

    const treatment = treatments[treatmentId];
    if (treatment) {
        let modalContent = `
            <div class="modal" id="treatmentModal">
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2>${treatment.name} - ${treatment.title}</h2>
                        <span class="close" onclick="closeModal('treatmentModal')">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; margin-bottom: 1rem; color: var(--primary);">About This Treatment</h3>
                            <p style="line-height: 1.6; margin-bottom: 1.5rem;">${treatment.description}</p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
                            <div>
                                <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; margin-bottom: 1rem; color: var(--primary);">Key Benefits</h3>
                                <ul style="list-style: none; padding: 0;">
                                    ${treatment.benefits.map(benefit => `
                                        <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                            <span style="width: 0.25rem; height: 0.25rem; background: var(--primary); border-radius: 50%; flex-shrink: 0;"></span>
                                            ${benefit}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            
                            <div>
                                <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; margin-bottom: 1rem; color: var(--primary);">Treatment Process</h3>
                                <ol style="padding-left: 1.5rem;">
                                    ${treatment.process.map(step => `<li style="margin-bottom: 0.5rem;">${step}</li>`).join('')}
                                </ol>
                            </div>
                        </div>
                        
                        <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(85, 139, 47, 0.05); border-radius: 0.5rem;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--foreground);">Duration</h4>
                                    <p style="color: rgba(33, 33, 33, 0.7);">${treatment.duration}</p>
                                </div>
                                <div>
                                    <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--foreground);">Best For</h4>
                                    <p style="color: rgba(33, 33, 33, 0.7);">${treatment.suitability}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 2rem; text-align: center;">
                            <button class="btn btn-primary btn-lg" onclick="closeModal('treatmentModal'); showAppointment();">
                                Book This Treatment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing treatment modal if any
        const existingModal = document.getElementById('treatmentModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', modalContent);
        showModal('treatmentModal');
    }
}

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login (in real app, this would be an API call)
    const userData = {
        email: email,
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
    };
    
    // Save user data
    localStorage.setItem('ayursutra_user', JSON.stringify(userData));
    currentUser = userData;
    isLoggedIn = true;
    
    // Update UI
    updateAuthUI();
    closeModal('loginModal');
    
    // Show success message
    alert('Login successful! Welcome to AyurSutra.');
}

function logout() {
    localStorage.removeItem('ayursutra_user');
    currentUser = null;
    isLoggedIn = false;
    updateAuthUI();
    alert('You have been logged out successfully.');
}

function updateAuthUI() {
    const authSection = document.querySelector('.auth-section');
    if (!authSection) return;
    
    if (isLoggedIn && currentUser) {
        authSection.innerHTML = `
            <button class="btn btn-outline btn-sm" onclick="showDashboard()">
                <i class="fas fa-calendar"></i> Dashboard
            </button>
            <button class="btn btn-ghost btn-sm" onclick="showProfile()">
                <i class="fas fa-user"></i> ${currentUser.name}
            </button>
            <button class="btn btn-ghost btn-sm" onclick="logout()" style="color: var(--destructive);">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        `;
    } else {
        authSection.innerHTML = `
            <button class="btn btn-outline btn-sm" onclick="showLogin()">Login</button>
            <button class="btn btn-primary btn-sm" onclick="showAppointment()">Book Appointment</button>
        `;
    }
}

function showDashboard() {
    alert('Dashboard feature coming soon! You can track your appointments and treatment progress here.');
}

function showProfile() {
    alert('Profile management coming soon! You can update your personal information and preferences here.');
}

// Appointment booking
function handleAppointmentBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const appointmentData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        treatment: formData.get('treatment'),
        date: formData.get('date'),
        time: formData.get('time'),
        message: formData.get('message'),
        bookingTime: new Date().toISOString()
    };
    
    // Validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'treatment', 'date', 'time'];
    const missingFields = requiredFields.filter(field => !appointmentData[field]);
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(appointmentData.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Date validation (must be in the future)
    const selectedDate = new Date(appointmentData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date');
        return;
    }
    
    // Save appointment (in real app, this would be sent to server)
    const appointments = JSON.parse(localStorage.getItem('ayursutra_appointments') || '[]');
    appointmentData.id = 'APT' + Date.now();
    appointments.push(appointmentData);
    localStorage.setItem('ayursutra_appointments', JSON.stringify(appointments));
    
    // Show success message
    const treatmentNames = {
        vaman: 'Vaman (Therapeutic Vomiting)',
        virechan: 'Virechan (Purgation Therapy)',
        basti: 'Basti (Medicated Enema)',
        nasya: 'Nasya (Nasal Therapy)',
        raktamokshana: 'Raktamokshana (Bloodletting)'
    };
    
    const treatmentName = treatmentNames[appointmentData.treatment] || appointmentData.treatment;
    const appointmentDate = new Date(appointmentData.date).toLocaleDateString();
    
    alert(`Appointment booked successfully!

Appointment Details:
- Name: ${appointmentData.firstName} ${appointmentData.lastName}
- Treatment: ${treatmentName}
- Date: ${appointmentDate}
- Time: ${appointmentData.time}
- Appointment ID: ${appointmentData.id}

You will receive a confirmation email shortly. Our team will contact you 24 hours before your appointment.`);
    
    // Reset form and close modal
    event.target.reset();
    closeModal('appointmentModal');
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Search functionality (for future use)
function searchTreatments(query) {
    const treatments = document.querySelectorAll('.treatment-card');
    const searchTerm = query.toLowerCase();
    
    treatments.forEach(card => {
        const title = card.querySelector('.treatment-name').textContent.toLowerCase();
        const description = card.querySelector('.treatment-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Contact form handling (if needed)
function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    event.target.reset();
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (if needed)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// setupLazyLoading();

// Export functions for global access
window.toggleMobileMenu = toggleMobileMenu;
window.showLogin = showLogin;
window.showAppointment = showAppointment;
window.showRegister = showRegister;
window.showTreatmentDetail = showTreatmentDetail;
window.closeModal = closeModal;
window.logout = logout;
window.showDashboard = showDashboard;
window.showProfile = showProfile;