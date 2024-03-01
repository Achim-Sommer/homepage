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


document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
        });
    }, {threshold: 0.6}); // Startet die Animation, wenn 60% des Elements sichtbar sind

    // Alle Skill-Level-Elemente beobachten
    document.querySelectorAll('.skill-level').forEach((el) => {
        observer.observe(el);
    });
});

particlesJS("particles-js", {
    particles: {
      number: {
        value: 80, /* Anzahl der Partikel */
        density: {
          enable: true,
          value_area: 800 /* Dichte der Partikel */
        }
      },
      color: {
        value: "#ffffff" /* Farbe der Partikel */
      },
      shape: {
        type: "circle", /* Form der Partikel */
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
        }
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
    },
    retina_detect: true,
  });