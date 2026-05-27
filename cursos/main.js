// Página: Mi Primera Web — comportamiento simple y coherente con js/main.js
class CoursePage {
  constructor() {
    this.init();
  }

  init() {
    this.initInscripcion();
  }

  initInscripcion() {
    const btn = document.getElementById('inscribirme');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      // Abrimos el cliente mailto (ya viene por href), mostramos notificación ligera
      setTimeout(() => {
        this.showNotification('Se abrió el cliente de correo. También podés escribir a info@tucorreo.com', 'info');
      }, 300);
    });
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
