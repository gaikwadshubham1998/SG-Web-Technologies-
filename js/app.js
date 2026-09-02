
// 1. Preloader
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => preloader.style.display = "none", 400);
    }, 300); // 1s minimum load
});

// 2. Sticky Navbar
window.addEventListener("scroll", () => {
    document.querySelector(".navbar")
        .classList.toggle("scrolled", window.scrollY > 50);
});

// 3. Hero Typing 
const heroTextEl = document.getElementById("heroText");
const heroTexts = [
    "Best Web Solutions for Your Business",
    "We Build Fast, Secure & Scalable Websites",
    "Turn Business into a Powerful Digital Brand",
    "Websites That Generate Leads, Not Just Views",
    "Your Online Presence, Done Right"
];

let textIndex = 0, charIndex = 0;
let typingDelay = 100, erasingDelay = 50, delayBetweenTexts = 1500;

function typeText() {
    if (!heroTextEl) return;
    const currentText = heroTexts[textIndex];

    if (charIndex < currentText.length) {
        heroTextEl.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingDelay);
    } else {
        setTimeout(eraseText, delayBetweenTexts);
    }
}

function eraseText() {
    if (charIndex > 0) {
        heroTextEl.textContent = heroTexts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, erasingDelay);
    } else {
        textIndex = (textIndex + 1) % heroTexts.length;
        setTimeout(typeText, typingDelay);
    }
}





// 4. Smooth Scroll 
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// 5. IMPROVED Counter Animation 
function animateCounters() {
    const counters = document.querySelectorAll('.counter:not(.animated)');
    counters.forEach(counter => {
        counter.classList.add('animated');
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / 200;
        const timer = setInterval(() => {
            count += inc;
            if (count < target) {
                counter.innerText = Math.ceil(count).toLocaleString() + '+';  // ✅ + AFTER
            } else {
                counter.innerText = target.toLocaleString() + '+';             // ✅ + AFTER
                clearInterval(timer);
            }
        }, 20);
    });
}


// // 6. Intersection Observer (Triggers counters ONCE)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// 7. Initialize Everything Safely
document.addEventListener('DOMContentLoaded', () => {
    // Start typing if hero exists
    if (heroTextEl) typeText();

    // Observe stats section
    const statsSection = document.querySelector('.bg-navy, .stats-section, [class*="stats"]');
    if (statsSection) observer.observe(statsSection);
});




// progressbar
document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".progress-animate");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute("data-width");
                bar.style.width = width + "%";
            }
        });
    }, { threshold: 0.4 });

    bars.forEach(bar => observer.observe(bar));
});




// newsslider
function sendSubscription(event) {
    event.preventDefault();

    const email = document.getElementById("subscriberEmail").value.trim();

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    const subject = encodeURIComponent("New Newsletter Subscription");
    const body = encodeURIComponent(
        "You have received a new newsletter subscription.\n\n" +
        "Subscriber Email: " + email
    );

    // your email
    const yourEmail = "info@sgwebtechnologies.in";

    window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;
}


// Close banner function
function closeOffer() {
    document.getElementById('offerBanner').style.display = 'none';
}



// Show banner after 5 seconds with fade-in, then flashing
setTimeout(function () {
    const banner = document.getElementById('offerBanner');
    banner.style.display = 'flex';   // make visible
    banner.classList.add('fade-in');

    // Wait for fade-in to finish, then start flashing
    setTimeout(() => {
        banner.classList.add('flash');
    }, 1000); // fade-in duration
}, 2000);



// portfoilo page

function openModal(title, image, description, url = "#") {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("livePreviewBtn").href = url;

    new bootstrap.Modal(document.getElementById("portfolioModal")).show();
}

// Filter logic
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        document.querySelectorAll(".portfolio-item").forEach(item => {
            item.classList.toggle("hidden", filter !== "all" && !item.classList.contains(filter));
        });
    });
});




// contact page
function getLeadText() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value || "No message provided";

    if (!firstName || !lastName || !phone || !email || !service) {
        alert("Please fill all required fields");
        return null;
    }

    return `New Lead / New Enquiry - SG Web Technologies

Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}
Service: ${service}

Message:
${message}`;
}

function sendEmail() {
    const text = getLeadText();
    if (!text) return;

    window.location.href =
        "mailto:info@sgwebtechnologies.in" +
        "?subject=" + encodeURIComponent("New Website Enquiry") +
        "&body=" + encodeURIComponent(text);
}

function sendWhatsApp() {
    const text = getLeadText();
    if (!text) return;

    const waURL =
        "https://api.whatsapp.com/send?phone=919699564112&text=" +
        encodeURIComponent(text);

    window.open(waURL, "_blank");
}

// 8. Show More / Show Less for Home Page Services & Industries
document.addEventListener("DOMContentLoaded", () => {
    // Services Toggle
    const toggleServicesBtn = document.getElementById("toggleServicesBtn");
    if (toggleServicesBtn) {
        let isExpanded = false;
        toggleServicesBtn.addEventListener("click", () => {
            isExpanded = !isExpanded;
            const moreItems = document.querySelectorAll(".service-more-item");
            moreItems.forEach(item => {
                if (isExpanded) {
                    item.classList.remove("d-none");
                    item.classList.add("reveal-fade-in");
                } else {
                    item.classList.add("d-none");
                    item.classList.remove("reveal-fade-in");
                }
            });

            toggleServicesBtn.innerHTML = isExpanded
                ? '<i class="bi bi-grid-fill text-teal me-2"></i>Show Less Services <i class="bi bi-chevron-up ms-1"></i>'
                : '<i class="bi bi-grid-fill text-teal me-2"></i>Show More Services <i class="bi bi-chevron-down ms-1"></i>';
        });
    }

    // Industries Toggle
    const toggleIndustriesBtn = document.getElementById("toggleIndustriesBtn");
    if (toggleIndustriesBtn) {
        let isIndustriesExpanded = false;
        toggleIndustriesBtn.addEventListener("click", () => {
            isIndustriesExpanded = !isIndustriesExpanded;
            const moreIndustries = document.querySelectorAll(".industry-more-item");
            moreIndustries.forEach(item => {
                if (isIndustriesExpanded) {
                    item.classList.remove("d-none");
                    item.classList.add("reveal-fade-in");
                } else {
                    item.classList.add("d-none");
                    item.classList.remove("reveal-fade-in");
                }
            });

            toggleIndustriesBtn.innerHTML = isIndustriesExpanded
                ? '<i class="bi bi-briefcase-fill text-teal me-2"></i>Show Less Industries <i class="bi bi-chevron-up ms-1"></i>'
                : '<i class="bi bi-briefcase-fill text-teal me-2"></i>Show More Industries <i class="bi bi-chevron-down ms-1"></i>';
        });
    }
});

