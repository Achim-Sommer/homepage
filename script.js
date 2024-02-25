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

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.github.com/users/Achim-Sommer/repos')
        .then(response => response.json())
        .then(data => {
            // Sortiere die Repositories nach der Anzahl der Sterne, absteigend
            const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

            // Wähle die ersten vier Repositories
            const topRepos = sortedRepos.slice(0, 4);

            const container = document.querySelector('.repos-container');
            topRepos.forEach(repo => {
                const repoBox = document.createElement('div');
                repoBox.classList.add('repo-box');
                repoBox.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Keine Beschreibung verfügbar'}</p>
                    <div class="repo-info">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count} Sterne</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">Repo ansehen</a>
                `;
                container.appendChild(repoBox);
            });
        })
        .catch(error => console.error('Fehler beim Abrufen der Repositories:', error));
});



