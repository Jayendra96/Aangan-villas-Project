document.addEventListener('DOMContentLoaded', function() {
    // Video Player Functionality
    const mainVideoThumbnail = document.getElementById('videoThumbnail');
    const mainPlayButton = document.getElementById('playButton');
    const mainVideo = document.getElementById('mainVideo');
    
    const locationThumbnail = document.getElementById('locationThumbnail');
    const locationPlayButton = document.getElementById('playLocationButton');
    const locationVideo = document.getElementById('locationVideo');
    
    // Main Video Player
    if (mainPlayButton && mainVideo) {
        mainPlayButton.addEventListener('click', function() {
            mainVideoThumbnail.style.display = 'none';
            mainPlayButton.style.display = 'none';
            mainVideo.style.display = 'block';
            
            // Modern browsers require this for programmatic play:
            const playPromise = mainVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Video play failed:", error);
                    // Fallback: Show thumbnail again
                    mainVideoThumbnail.style.display = 'block';
                    mainPlayButton.style.display = 'block';
                    mainVideo.style.display = 'none';
                });
            }
        });
    }
    
    // Location Video Player
    if (locationPlayButton && locationVideo) {
        locationPlayButton.addEventListener('click', function() {
            locationThumbnail.style.display = 'none';
            locationPlayButton.style.display = 'none';
            locationVideo.style.display = 'block';
            
            const playPromise = locationVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Location video play failed:", error);
                    locationThumbnail.style.display = 'block';
                    locationPlayButton.style.display = 'block';
                    locationVideo.style.display = 'none';
                });
            }
        });
    }
    
    // Tab Functionality for Floor Plans
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form Submission
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your interest! We will contact you shortly.');
            
            // Reset form
            this.reset();
            
            // In a real implementation, you might use:
            // fetch('your-server-endpoint', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Thank you! We will contact you soon.');
            //     this.reset();
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('There was an error submitting your form. Please try again.');
            // });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.highlight-card, .amenity, .reason');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.highlight-card, .amenity, .reason');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});