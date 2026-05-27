// Página: Mi Primera Web — comportamiento simple y coherente con js/main.js
class CoursePage {
  constructor() {
    this.init();
  }

  init() {
    this.initInscripcion();
    this.initTimeline();
  }

  initInscripcion() {
    const btn = document.getElementById('inscribirme');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      setTimeout(() => {
        this.showNotification('Se abrió el cliente de correo. También podés escribir a info@tucorreo.com', 'info');
      }, 300);
    });
  }

  initTimeline() {
    const container = document.querySelector('.timeline-container');
    const progress = document.querySelector('.timeline-progress');
    const blocks = document.querySelectorAll('.course-class-block');

    if (!container || !progress) return;

    const updateTimeline = () => {
      const rect = container.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.6;

      let filledPx = 0;

      if (rect.top > triggerPoint) {
        filledPx = 0;
      } else if (rect.bottom < triggerPoint) {
        filledPx = rect.height;
      } else {
        filledPx = triggerPoint - rect.top;
      }

      const pct = Math.min(100, Math.max(0, (filledPx / rect.height) * 100));
      progress.style.height = `${pct}%`;

      // Toggle visible class on each block based on scroll position
      blocks.forEach((block) => {
        const blockRect = block.getBoundingClientRect();
        const dotTop = blockRect.top + 30; // dot is at top: 30px inside the block
        if (dotTop < triggerPoint) {
          block.classList.add('visible');
        } else {
          block.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', updateTimeline);
    updateTimeline();
  }

  showNotification(message, type = 'info') {
    const n = document.createElement('div');
    n.className = `course-notif ${type}`;
    n.textContent = message;
    document.body.appendChild(n);
    requestAnimationFrame(() => n.classList.add('show'));
    setTimeout(() => {
      n.classList.remove('show');
      setTimeout(() => n.remove(), 300);
    }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', () => new CoursePage());
