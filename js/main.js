// Configuración global
const CONFIG = {
  // Proyectos que se mostrarán en la sección de proyectos
  projects: [
    {
      id: 0,
      title: 'Altoque',
      description: 'Plataforma web de compras por proximidad con geolocalización en tiempo real y algoritmos de recomendación avanzados.',
      image: 'images/Altoque.png',
      tags: ['Javascript', 'Next.js', 'Tailwind', 'Express', 'MongoDB'],
      demo: 'https://altoque-ar.vercel.app/',
      code: '#',
    },
    {
      id: 9,
      title: 'Altoque Eats',
      description: 'Plataforma de pedidos para locales con sistema integrado de WhatsApp y gestión de ventas. Registro exclusivo para comercios.',
      image: 'images/Altoque-eats.png',
      tags: ['React', 'Tailwind', 'MongoDB', 'JavaScript'],
      demo: '#',
      code: '#',
    },
    {
      id: 1,
      title: 'Chat de Con Mark AI',
      description: 'Una IA de creación de webs y herramientas de IA.',
      image: 'images/ChatLumina.png',
      tags: ['Javascript', 'Next.js', 'Tailwind'],
      demo: 'https://chat-mark-ai.vercel.app/',
      code: '#',
    },
    {
      id: 2,
      title: 'Glosario de Ingles tecnico',
      description: 'Diccionario interactivo de términos técnicos en inglés con definiciones, pronunciación y ejemplos para estudiantes de programación.',
      image: 'images/Glosario.png',
      tags: ['HTML', 'CSS', 'Javascript', 'JSON'],
      demo: 'https://germanjavier.github.io/glosario-io/',
      code: '#'
    },
    {
      id: 3,
      title: 'StudyLoop',
      description: 'Aplicación Web Progresiva (PWA) para que estudiantes organicen su vida académica de manera eficiente e intuitiva.',
      image: 'images/StudyLoop.png',
      tags: ['Vue.js', 'CSS', 'Tailwind', 'JavaScript', 'Vite'],
      demo: 'https://u-x-o-n-e.github.io/Focus-App/',
      code: '#'
    },
    {
      id: 4,
      title: 'Web UX/ONE',
      description: 'Desarrollo de una pagina web profesional para la empresa de diseño y desarrolo web UX/ONE.',
      image: 'images/uxone.png',
      tags: ['Vite', 'CSS', 'Vue.js'],
      demo: 'https://u-x-o-n-e.github.io/uxone/',
      code: '#'
    },
    {
      id: 5,
      title: 'Happy Store - Tienda Online',
      description: 'Software de tienda online con panel administrativo completo para la gestión de productos, inventario y usuarios con catálogo interactivo.',
      image: 'images/HappyStore.png',
      tags: ['SQL', 'Javascript', 'CSS', 'PHP', 'TailWind'],
      demo: 'https://tokiourban.infinityfreeapp.com/index.php',
      code: '#'
    },
    {
      id: 6,
      title: 'Juego de Cubo Rubik',
      description: 'Juego web de Cubo Rubik con movimientos y ranking.',
      image: 'images/CuboRubik.png',
      tags: ['HTML', 'CSS', 'Javacript'],
      demo: 'https://germanjavier.github.io/cube/dist/',
      code: '#'
    },
    {
      id: 7,
      title: 'Aplicación del Clima',
      description: 'Aplicación que muestra el pronóstico del tiempo en tiempo real usando una API externa.',
      image: 'images/Clima.png',
      tags: ['HTML', 'JavaScript', 'API', 'Tailwind'],
      demo: 'https://germanjavier.github.io/clima-io/',
      code: '#'
    }
  ]
};

// Clase principal de la aplicación
class PortfolioApp {
  constructor() {
    this.menuOpen = false;
    this.lastScrollTop = 0;
    this.cleanupFunctions = []; // Array para almacenar funciones de limpieza

    // Inicializar la aplicación
    this.init();
  }

  // Inicializar la aplicación
  init() {
    // Inicializar componentes
    this.initPreloader();
    this.initNavbar();
    this.initScrollReveal();
    this.initProjects();
    this.initContactForm();
    this.initScrollTop();
    this.initCounters();
    this.initCurrentYear();
    this.initSmoothScroll();
    this.initSkillsFilter();
    this.initGitHubRepos();
    this.setupEventListeners();

    // Inicializar animaciones
    this.animateOnScroll();
  }

  // Inicializar el preloader
  initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Deshabilitar scroll mientras carga
    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = '';
      }, 1000);
    });
  }

  // Inicializar la barra de navegación
  initNavbar() {
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-link');
    let navOverlay = document.querySelector('.nav-overlay');

    // Crear overlay si no existe
    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.className = 'nav-overlay';
      document.body.appendChild(navOverlay);
    }

    // Añadir clase scrolled al header al hacer scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    // Manejar el estado del menú
    const toggleMenu = (open) => {
      this.menuOpen = open !== undefined ? open : !this.menuOpen;

      if (this.menuOpen) {
        // Abrir menú
        document.body.style.overflow = 'hidden';
        navToggle.classList.add('active');
        navMenuContainer.classList.add('active');
        navMenu.classList.add('active');
        navOverlay.classList.add('active');

        // Forzar repintado para activar la transición
        navMenuContainer.offsetHeight;

        // Activar animaciones de los ítems
        setTimeout(() => {
          navMenu.classList.add('animating');
        }, 50);
      } else {
        // Cerrar menú
        navMenu.classList.remove('animating');
        navToggle.classList.remove('active');
        navMenuContainer.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Quitar la clase active después de la animación
        setTimeout(() => {
          navMenu.classList.remove('active');
        }, 500);
      }
    };

    // Alternar menú móvil
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          toggleMenu(false);

          // Desplazamiento suave al hacer clic en un enlace
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      });
    });

    // Cerrar menú al hacer clic en el overlay
    navOverlay.addEventListener('click', () => {
      toggleMenu(false);
    });

    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menuOpen) {
        toggleMenu(false);
      }
    });

    // Cerrar menú al redimensionar la ventana
    let resizeTimer;
    const handleResize = () => {
      document.body.classList.add('resize-animation-stopper');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 100);

      if (window.innerWidth > 992) {
        toggleMenu(false);
      }
    };

    // Configurar event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Inicializar estado del header
    handleScroll();

    // Limpiar event listeners al destruir
    this.cleanupFunctions.push(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      navOverlay.remove();
    });
  }

  // Inicializar animaciones de revelación al hacer scroll
  initScrollReveal() {
    // Configuración básica para las animaciones
    this.animateOnScroll();

    // Observar elementos para animaciones de intersección
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observar elementos con la clase 'fade-in'
    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });
  }

  // Inicializar la sección de proyectos
  initProjects() {
    const projectsGrid = document.querySelector('.projects-grid');

    if (!projectsGrid) return;

    // Limpiar el contenedor
    projectsGrid.innerHTML = '';

    // Generar el HTML para cada proyecto
    CONFIG.projects.forEach(project => {
      const projectElement = this.createProjectElement(project);
      projectsGrid.appendChild(projectElement);
    });
  }

  // Crear elemento HTML para un proyecto
  createProjectElement(project) {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-card fade-in';
    projectElement.style.animationDelay = `${project.id * 0.1}s`;

    // Crear etiquetas HTML
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // Plantilla del proyecto
    projectElement.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
        <div class="project-overlay">
          <a href="${project.demo}" class="project-link" target="_blank" rel="noopener">Ver Proyecto</a>
        </div>
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${tagsHTML}
        </div>
      </div>
    `;

    return projectElement;
  }

  // Inicializar el formulario de contacto
  initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener los valores del formulario
      const formData = new FormData(contactForm);
      const formValues = {};

      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }

      // Aquí iría la lógica para enviar el formulario
      console.log('Formulario enviado:', formValues);

      // Mostrar mensaje de éxito
      this.showNotification('¡Mensaje enviado con éxito!', 'success');

      // Restablecer el formulario
      contactForm.reset();
    });
  }

  // Mostrar notificación
  showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Agregar al cuerpo del documento
    document.body.appendChild(notification);

    // Mostrar con animación
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Eliminar después de 5 segundos
    setTimeout(() => {
      notification.classList.remove('show');

      // Eliminar del DOM después de la animación
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // Inicializar botón de scroll al inicio
  initScrollTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollTopBtn);

    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    // Desplazamiento suave al hacer clic
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Inicializar contadores de la sección Sobre Mí
  initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Velocidad de la animación

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const count = parseInt(counter.innerText);
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 5);
      } else {
        counter.innerText = target;
      }
    };

    // Observar cuando los contadores son visibles
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
        }
      });
    }, { threshold: 0.5 });

    // Observar cada contador
    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  // Inicializar año actual en el footer
  initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Inicializar la sección de repositorios de GitHub
  initGitHubRepos() {
    const reposContainer = document.getElementById('repositories-grid');
    if (!reposContainer) return;

    // Mostrar skeleton loaders
    const showSkeletons = () => {
      reposContainer.innerHTML = `
        <div class="repo-skeleton">
          <div class="skeleton-header"></div>
          <div class="skeleton-description"></div>
          <div class="skeleton-footer">
            <span class="skeleton-tag"></span>
            <span class="skeleton-tag"></span>
          </div>
        </div>
        <div class="repo-skeleton">
          <div class="skeleton-header"></div>
          <div class="skeleton-description"></div>
          <div class="skeleton-footer">
            <span class="skeleton-tag"></span>
            <span class="skeleton-tag"></span>
          </div>
        </div>
        <div class="repo-skeleton">
          <div class="skeleton-header"></div>
          <div class="skeleton-description"></div>
          <div class="skeleton-footer">
            <span class="skeleton-tag"></span>
            <span class="skeleton-tag"></span>
          </div>
        </div>
      `;
    };

    // Función para obtener el color del lenguaje de programación (Minimalista B&W)
    const getLanguageColor = (language) => {
      return '#333333';
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para crear el HTML de un repositorio
    const createRepoCard = (repo) => {
      const language = repo.language || 'Otro';
      const languageColor = getLanguageColor(language);

      return `
        <div class="repo-card">
          <div class="repo-header">
            <i class="fas fa-book repo-icon"></i>
            <h3 class="repo-name">
              <a href="${repo.html_url}" target="_blank" rel="noopener">
                ${repo.name}
              </a>
            </h3>
          </div>
          
          <p class="repo-description">
            ${repo.description || 'Sin descripción disponible.'}
          </p>
          
          <div class="repo-footer">
            ${repo.language ? `
              <div class="repo-language" title="${language}">
                <span class="language-color" style="background-color: ${languageColor}"></span>
                <span>${language}</span>
              </div>
            ` : ''}
            
            <div class="repo-stats">
              <div class="repo-stat" title="Estrellas">
                <i class="far fa-star"></i>
                <span>${repo.stargazers_count}</span>
              </div>
              <div class="repo-stat" title="Forks">
                <i class="fas fa-code-branch"></i>
                <span>${repo.forks_count}</span>
              </div>
              <div class="repo-stat" title="Última actualización">
                <i class="far fa-clock"></i>
                <span>${formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    // Función para manejar errores
    const handleError = (error) => {
      console.error('Error al cargar los repositorios de GitHub:', error);
      reposContainer.innerHTML = `
        <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 30px; color: #ff6b6b;">
          <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 15px;"></i>
          <p>No se pudieron cargar los repositorios. Por favor, inténtalo de nuevo más tarde.</p>
          <a href="https://github.com/germanjavier?tab=repositories" target="_blank" rel="noopener" class="btn" style="margin-top: 15px; display: inline-block;">
            Ver en GitHub
          </a>
        </div>
      `;
    };

    // Función para obtener y mostrar los repositorios
    const fetchRepos = async () => {
      try {
        showSkeletons();

        // Hacer la petición a la API de GitHub
        const response = await fetch('https://api.github.com/users/germanjavier/repos?sort=updated&direction=desc&per_page=6');

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const repos = await response.json();

        // Filtrar solo los repositorios que no son forks y tienen descripción
        const filteredRepos = repos.filter(repo =>
          !repo.fork &&
          !repo.archived &&
          (repo.language || repo.description)
        );

        // Mostrar los primeros 6 repositorios
        if (filteredRepos.length > 0) {
          reposContainer.innerHTML = filteredRepos.slice(0, 6).map(createRepoCard).join('');
        } else {
          // Si no hay repositorios, mostrar un mensaje
          reposContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 30px;">
              <p>No se encontraron repositorios públicos.</p>
              <a href="https://github.com/germanjavier?tab=repositories" target="_blank" rel="noopener" class="btn" style="margin-top: 15px; display: inline-block;">
                Ver en GitHub
              </a>
            </div>
          `;
        }
      } catch (error) {
        handleError(error);
      }
    };

    // Cargar los repositorios
    fetchRepos();
  }

  // Inicializar el filtro de habilidades
  initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techItems = document.querySelectorAll('.tech-item');

    // Función para filtrar elementos
    const filterItems = (category) => {
      techItems.forEach(item => {
        // Agregar clase de transición de salida
        item.classList.add('fade-out');

        // Después de la animación de salida, actualizar visibilidad
        setTimeout(() => {
          if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
            // Forzar reflow para reiniciar la animación
            void item.offsetWidth;
            item.classList.remove('fade-out');
          } else {
            item.classList.add('hidden');
          }
        }, 200);
      });
    };

    // Agregar event listeners a los botones de filtro
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover clase activa de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase activa al botón clickeado
        button.classList.add('active');
        // Filtrar elementos
        filterItems(button.dataset.filter);
      });
    });
  }

  // Inicializar desplazamiento suave para enlaces internos
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Obtener la posición del elemento objetivo
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

          // Obtener la altura del encabezado fijo
          const headerHeight = document.querySelector('.header').offsetHeight;

          // Calcular la posición final restando la altura del encabezado
          const finalPosition = targetPosition - headerHeight - 20; // 20px de espacio adicional

          // Desplazamiento suave
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });

          // Actualizar la URL sin recargar la página
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // Configurar manejadores de eventos
  setupEventListeners() {
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
      if (this.menuOpen && !this.menuToggle.contains(e.target) && !this.navLinks.contains(e.target)) {
        this.toggleMenu();
      }
    });

    // Cerrar menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.menuOpen) {
        this.toggleMenu();
      }
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  // Manejar el evento de scroll
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Mostrar/ocultar header al hacer scroll
    if (scrollTop > 100) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    // Actualizar enlaces de navegación activos
    this.updateActiveNavLink();

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  // Actualizar enlace de navegación activo
  updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    // Iterar sobre cada sección
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Actualizar enlace activo
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Animar elementos al hacer scroll
  animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add('visible');
      }
    });
  }

  // Limpiar recursos
  cleanup() {
    // Ejecutar todas las funciones de limpieza
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }
}

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Iniciar la aplicación
  window.app = new PortfolioApp();

  // Limpiar recursos antes de que se cierre la página
  window.addEventListener('beforeunload', () => {
    if (window.app && typeof window.app.cleanup === 'function') {
      window.app.cleanup();
    }
  });

  // Inicializar tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Inicializar popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

// Agregar estilos para el botón de scroll al inicio
const scrollTopStyles = document.createElement('style');
scrollTopStyles.textContent = `
  .scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient);
    color: var(--black);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 999;
  }
  
  .scroll-top-btn.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .scroll-top-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }
  
  .notification {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #28a745;
    color: white;
    padding: 15px 30px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .notification.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  
  .notification.error {
    background: #dc3545;
  }
`;

document.head.appendChild(scrollTopStyles);