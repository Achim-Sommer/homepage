document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = +element.getAttribute('data-target');
                
                // Bestimmen der Schrittgröße basierend auf der Dauer und Frequenz der Animation
                const increment = target / (2000 / 16); // Angenommen, wir wollen, dass die Animation 2 Sekunden dauert
                
                const updateCounter = () => {
                    const count = +element.innerText.replace('+', '').replace(/\./g, '');
                    if (count < target) {
                        // Aktualisiere den Zähler und füge Tausenderpunkte hinzu
                        element.innerText = `${Math.ceil(count + increment).toLocaleString('de-DE')}+`;
                        // Farbwechsel zu Lila und pulsierender Effekt
                        element.style.color = 'purple';
                        element.classList.add('pulse');
                        setTimeout(updateCounter, 16); // Aktualisierung alle 16 ms für eine flüssige Animation (60 FPS)
                    } else {
                        element.innerText = `${target.toLocaleString('de-DE')}+`;
                        element.classList.remove('pulse');
                        observer.unobserve(element); // Beenden der Beobachtung nach Abschluss der Animation
                    }
                };

                setTimeout(updateCounter, 16);
            }
        });
    }, { threshold: 0.5 }); // Startet, wenn 50% des Elements sichtbar sind

    counters.forEach(counter => {
        observer.observe(counter);
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



