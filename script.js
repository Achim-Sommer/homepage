document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');
    
    const startCounter = (element) => {
        const target = +element.getAttribute('data-target');
        const increment = target / 200;

        const updateCounter = () => {
            const count = +element.innerText.replace('+', '');
            if (count < target) {
                element.innerText = `${Math.ceil(count + increment)}+`;
                setTimeout(updateCounter, 1);
            } else {
                element.innerText = `${target}+`;
            }
        };

        updateCounter();
    };

    // Intersection Observer Setup
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // Stop observing the target once it's started counting
            }
        });
    }, { threshold: 0.5 }); // Trigger when at least 50% of the element is visible

    counters.forEach(counter => {
        observer.observe(counter); // Start observing each counter
    });
});

document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault(); // Verhindert die Standard-Link-Aktion
    const nextSection = document.querySelector(this.getAttribute('href')); // Holt sich das Ziel-Element basierend auf dem href-Wert
    nextSection.scrollIntoView({ behavior: 'smooth' }); // Scrollt sanft zum Ziel-Element
});