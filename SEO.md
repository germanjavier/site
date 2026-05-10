# Mejores Prácticas de SEO para Webs, PWAs y Apps (Vercel/GitHub Pages)

A continuación presento las mejores prácticas de SEO para sitios web, aplicaciones web progresivas (PWA) y páginas de aterrizaje de apps alojadas en Vercel o GitHub Pages. Ten en cuenta que el ASO (App Store Optimization) para apps nativas está fuera del alcance, salvo que alojes páginas de aterrizaje para apps en estas plataformas.

---

## 1. Prácticas Universales de SEO (Aplican a todos los proyectos)
Esta sección es la más crítica, ya que aplica a cualquier sitio web, PWA o página de aterrizaje de app en cualquiera de las dos plataformas.

### 1.1 SEO Técnico
- **Archivo `robots.txt`**: Coloca un archivo `robots.txt` en la raíz del proyecto para indicar a los crawlers qué contenido pueden indexar. Incluye siempre el enlace al sitemap. Ejemplo:
  ```
  User-agent: *
  Allow: /
  Disallow: /privado/
  Sitemap: https://tudominio.com/sitemap.xml
  ```
- **Sitemap XML**: Genera automáticamente un `sitemap.xml` que liste todas las URLs públicas de tu sitio, y envíalo a Google Search Console. Para sitios estáticos usa herramientas como `sitemap-generator`; para proyectos Next.js en Vercel usa el paquete `next-sitemap`.
- **URLs Canónicas**: Evita contenido duplicado usando la etiqueta `<link rel="canonical" href="..." />` en el `<head>` de cada página, apuntando a la versión preferida de la URL.
- **Metaetiquetas Robots**: Usa `<meta name="robots" content="index, follow" />` para páginas públicas, y `content="noindex"` para páginas privadas o de administración.
- **Datos Estructurados (Schema.org)**: Usa JSON-LD para generar rich snippets en resultados de búsqueda. Tipos comunes: `WebSite`, `Article`, `Product`, `SoftwareApplication` (para apps/PWAs). Ejemplo para una app:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nombre de tu App",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
  ```

### 1.2 SEO On-Page
- **Etiquetas Title**: Únicas por página, de 50-60 caracteres, incluye la palabra clave principal. Formato recomendado: `Palabra Clave Principal | Nombre de Marca`.
- **Meta Descripciones**: De 150-160 caracteres, incluye un CTA (llamado a la acción) y palabras clave relevantes.
- **Jerarquía de Encabezados**: Solo un H1 por página, usa H2-H6 de forma lógica e incluye palabras clave en los encabezados.
- **SEO de Imágenes**: Texto alternativo (`alt`) descriptivo para todas las imágenes, nombres de archivo descriptivos (ej: `checklist-seo-2026.png` en lugar de `img1.png`), comprime imágenes en formato WebP/AVIF y usa lazy loading.
- **Enlazado Interno**: Vincula páginas relacionadas con texto ancla descriptivo, evita usar "haz clic aquí".

### 1.3 SEO de Rendimiento (Factor crítico de ranking)
- **Core Web Vitals**: Cumple con los estándares: LCP < 2.5s, FID < 100ms, CLS < 0.1. Optimiza imágenes, minifica CSS/JS y reduce scripts de terceros.
- **Caché**: Configura cabeceras de caché adecuadas para activos estáticos (imágenes, CSS, JS): `Cache-Control: public, max-age=31536000, immutable` para archivos con hash en el nombre.
- **Minificación**: Minifica HTML, CSS y JS, y elimina código no usado (tree shaking).

### 1.4 SEO para PWAs y Apps
- **Archivo `manifest.json`**: Requerido para PWAs, incluye `name`, `short_name`, `description`, `icons` (tamaños 192x192 y 512x512 mínimo), `start_url`, `display` (standalone/fullscreen), `theme_color` y `background_color`. Ejemplo:
  ```json
  {
    "name": "Nombre de tu PWA",
    "short_name": "PWA",
    "description": "Descripción de tu app para SEO y mensajes de instalación",
    "icons": [/* íconos en todos los tamaños necesarios */],
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#ffffff",
    "background_color": "#ffffff"
  }
  ```
- **Service Worker**: Registra un service worker válido para soporte offline, lo que mejora la capacidad de instalación de la PWA y el engagement de usuarios (factor de ranking).
- **Páginas de Aterrizaje de Apps**: Incluye badges de App Store/Google Play con enlaces profundos, smart app banners de iOS (`<meta name="apple-itunes-app" content="app-id=TU_APP_ID" />`), y filtros de intención de Android para enlaces profundos.

---

## 2. Prácticas Específicas para Vercel
Vercel es una plataforma orientada a frameworks como Next.js, Astro, Nuxt o SvelteKit, con soporte para SSR, SSG e ISR.

### 2.1 Configuración por Framework (Next.js es el más común)
- **Next.js (App Router o Pages Router)**:
  - Usa la exportación `metadata` o la función `generateMetadata` para configurar metaetiquetas en archivos `page.tsx` o `layout.tsx`. Ejemplo para App Router:
    ```tsx
    export const metadata = {
      title: "Inicio | Mi App",
      description: "La mejor app para X",
    };
    export default function Inicio() { ... }
    ```
  - Usa el paquete `next-sitemap` para generar automáticamente `sitemap.xml` y `robots.txt`: instala `next-sitemap`, crea un archivo `next-sitemap.config.js` en la raíz:
    ```js
    /** @type {import('next-sitemap').IConfig} */
    module.exports = {
      siteUrl: process.env.SITE_URL || "https://tudominio.com",
      generateRobotsTxt: true,
    };
    ```
  - Usa ISR (Regeneración Estática Incremental) para contenido dinámico, para que las páginas se mantengan actualizadas para los crawlers.
  - Evita renderizado solo del lado del cliente para contenido crítico: los crawlers pueden no ejecutar JS, así que usa SSR/SSG para el contenido principal.
- **Astro**: Usa la integración `@astrojs/sitemap`, configura `site` en `astro.config.mjs` y usa el frontmatter de SEO integrado de Astro para markdown.

### 2.2 Funcionalidades Nativas de Vercel
- **Edge Middleware**: Usa middleware de edge para gestionar redirecciones, añadir cabeceras de seguridad o inyectar metaetiquetas de SEO dinámicamente sin ralentizar las respuestas.
- **Vercel Speed Insights**: Actívalo para monitorear Core Web Vitals directamente en el dashboard de Vercel.
- **Cabeceras Personalizadas**: Configura cabeceras relacionadas con SEO (ej: `X-Robots-Tag` para activos no HTML) en `vercel.json`:
  ```json
  {
    "headers": [
      {
        "source": "/public/(.*)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      }
    ]
  }
  ```
- **Configuración de Dominio**: Verifica tu dominio en Vercel, establece el dominio principal y redirige www a non-www (o viceversa) con redirecciones 301 en `vercel.json`.

---

## 3. Prácticas Específicas para GitHub Pages
GitHub Pages sirve solo archivos estáticos, ideal para sitios generados con Jekyll, Hugo, React/Vue (build estático) o HTML puro.

### 3.1 Configuración de Generadores de Sitios Estáticos (SSG)
- **Jekyll (por defecto en GitHub Pages)**: Configura `url` y `baseurl` en `_config.yml`, usa el plugin `jekyll-seo-tag` (añádelo a la lista de plugins en `_config.yml` y luego incluye `{% seo %}` en el `<head>` de tu layout predeterminado). Ejemplo de `_config.yml`:
  ```yml
  title: Mi Sitio
  description: Descripción del sitio
  url: "https://tunombre.github.io"
  baseurl: "/nombre-repo" # si usas páginas de proyecto
  plugins:
    - jekyll-seo-tag
  ```
- **Hugo**: Configura `baseURL` en `hugo.toml`, usa el comando `hugo sitemap` para generar el sitemap y usa el módulo `hugo-seo` o el frontmatter de SEO integrado.
- **Sitios Estáticos Personalizados (React/Vue build)**: Añade `sitemap.xml` y `robots.txt` a la carpeta `/public` después del build, usa librerías como `react-helmet` o `vue-meta` para gestionar metaetiquetas.

### 3.2 Funcionalidades Nativas de GitHub Pages
- **Dominio Personalizado**: Configura tu dominio en Ajustes del repositorio > Pages, añade un archivo `CNAME` a la raíz y configura los DNS (registros A para dominio apex, CNAME para www).
- **HTTPS**: GitHub Pages aprovisiona SSL automáticamente para dominios personalizados, asegúrate de que todos los enlaces usen HTTPS (el contenido mixto perjudica el SEO).
- **Sin Soporte para SSR**: GitHub Pages solo sirve archivos estáticos, así que evita el renderizado solo del lado del cliente para contenido crítico (los crawlers no lo indexarán). Pre-renderiza todas las páginas en tiempo de build.
- **Redirecciones 301**: Usa el plugin `jekyll-redirect-from` para Jekyll, o añade redirecciones de meta refresh HTML (no ideal, pero funcional) para sitios no Jekyll. Para dominios personalizados, usa Cloudflare Workers (si haces proxy de GitHub Pages) para mejores redirecciones.

### 3.3 Limitaciones y Soluciones
- **Sitemap dinámico no soportado**: Genera `sitemap.xml` en tiempo de build y haz commit en el repositorio.
- **Sin middleware de edge**: Usa Cloudflare Workers (si haces proxy de GitHub Pages) para inyección dinámica de cabeceras o redirecciones.

---

## 4. Prácticas Menos Críticas (Casos Especiales)
<details>
<summary>Haz clic para expandir: Prácticas de SEO secundarias o para casos especiales</summary>
- Evita el keyword stuffing: mantén la densidad de palabras clave por debajo del 2%.
- Usa etiquetas `hreflang` para sitios multilingües: añade `<link rel="alternate" hreflang="es" href="https://es.tudominio.com" />` para contenido en español.
- Monitorea errores de rastreo: Usa Google Search Console para corregir errores 404, 500, etc.
- Construcción de backlinks: Obtén backlinks de alta calidad de sitios relevantes (SEO off-page).
- Metaetiquetas para Redes Sociales: Open Graph (OG) y Twitter Cards para compartir en redes sociales: `<meta property="og:title" content="..." />`, `<meta name="twitter:card" content="summary_large_image" />`.
</details>

---

## 5. Referencia Estructurada para IA
Esta sección está diseñada para que puedas copiarla directamente a una IA, con formato legible por humanos (tabla) y legible por máquinas (JSON).

### Tabla de Prácticas Priorizadas
| Categoría | Práctica | Aplicabilidad | Prioridad |
|----------|----------|------------------------|----------|
| SEO Técnico | Incluir `robots.txt` válido en raíz con enlace al sitemap | Universal | Alta |
| SEO Técnico | Generar `sitemap.xml` automáticamente y enviar a GSC | Universal | Alta |
| On-Page | Etiquetas title únicas (50-60 caracteres) por página | Universal | Alta |
| Rendimiento | Optimizar Core Web Vitals (LCP <2.5s, CLS <0.1) | Universal | Alta |
| PWA/Apps | Incluir `manifest.json` válido con campos requeridos | Universal (PWAs) | Alta |
| Vercel | Usar `next-sitemap` para proyectos Next.js | Vercel | Alta |
| Vercel | Configurar redirecciones 301 en `vercel.json` | Vercel | Media |
| GitHub Pages | Usar plugin `jekyll-seo-tag` para sitios Jekyll | GitHub Pages | Alta |
| GitHub Pages | Generar `sitemap.xml` en tiempo de build | GitHub Pages | Media |

### JSON Legible por Máquinas (Copia esto directamente a la IA)
```json
{
  "seo_best_practices": {
    "universal": {
      "technical": [
        "Añadir archivo `robots.txt` en raíz con línea `Sitemap: https://dominio.com/sitemap.xml`",
        "Generar `sitemap.xml` automáticamente (usar `next-sitemap` para Next.js en Vercel, plugins de SSG para GitHub Pages)",
        "Añadir etiqueta de URL canónica a todas las páginas",
        "Añadir datos estructurados JSON-LD (Schema.org) para tipos de contenido relevantes (WebSite, Article, SoftwareApplication)"
      ],
      "on_page": [
        "Un H1 por página, etiquetas title de 50-60 caracteres con palabra clave principal, meta descripciones de 150-160 caracteres",
        "Texto alt descriptivo para todas las imágenes, formatos WebP/AVIF comprimidos",
        "Jerarquía lógica de encabezados H2-H6 con palabras clave"
      ],
      "performance": [
        "Cumplir Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1",
        "Configurar caché para activos estáticos: `Cache-Control: public, max-age=31536000, immutable` para archivos con hash",
        "Minificar todo el HTML/CSS/JS, eliminar código no usado (tree shaking)"
      ],
      "pwa_app": [
        "Incluir `manifest.json` válido con name, short_name, description, icons, start_url, theme_color",
        "Registrar service worker válido para soporte offline",
        "Para páginas de aterrizaje de apps: añadir badges de App Store/Google Play, smart app banners de iOS, enlaces profundos de Android"
      ]
    },
    "vercel_specific": [
      "Next.js: Usar exportación `metadata` o función `generateMetadata` para metaetiquetas, evitar renderizado solo cliente para contenido crítico",
      "Añadir `next-sitemap.config.js` para generar sitemap y robots.txt automáticamente",
      "Configurar redirecciones 301 y cabeceras personalizadas en `vercel.json`",
      "Usar Vercel Edge Middleware para inyección dinámica de cabeceras o redirecciones"
    ],
    "github_pages_specific": [
      "Jekyll: Usar plugin `jekyll-seo-tag`, configurar `url` y `baseurl` en `_config.yml`",
      "Generar `sitemap.xml` en tiempo de build y hacer commit en el repositorio",
      "Configurar dominio personalizado y activar HTTPS (aprovisionado automáticamente por GitHub)",
      "Pre-renderizar todas las páginas en tiempo de build (no hay soporte para SSR en GitHub Pages)"
    ],
    "low_priority": [
      "Añadir metaetiquetas Open Graph y Twitter Card para compartir en redes sociales",
      "Usar etiquetas hreflang para sitios multilingües",
      "Monitorear errores de rastreo en Google Search Console",
      "Construir backlinks de alta calidad (SEO off-page)"
    ]
  }
}
```

---

# Extensiones y Prácticas Adicionales de SEO (Vercel/GitHub Pages)

Complementando la guía anterior, aquí tienes prácticas avanzadas, casos de uso específicos, errores comunes y estándares actualizados para 2026 (incluyendo optimización para crawlers de LLM, métricas de engagement de PWA y más).

---

## 1. Prácticas Avanzadas Universales (No Cubiertas Previamente)

### 1.1 Optimización para Crawlers de LLM (Estándar 2026)
Los grandes modelos de lenguaje (LLMs) como GPT, Claude y Gemini usan crawlers dedicados para entrenar modelos y responder consultas en tiempo real. Controla su acceso en tu `robots.txt`:
```
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
```
- Añade un archivo `llms.txt` en la raíz (estándar emergente) que resuma el contenido de tu sitio para LLMs, similar a `robots.txt` pero legible para modelos.

### 1.2 SEO para SPAs (Single Page Applications)
Tanto Vercel como GitHub Pages alojan SPAs (React, Vue, Svelte) pero el renderizado solo del lado del cliente (CSR) bloquea la indexación de crawlers tradicionales. Soluciones:
- **Universal**: Usa pre-renderizado en tiempo de build con herramientas como `react-snap`, `vite-plugin-prerender` o `puppeteer` para generar HTML estático de cada ruta.
- **Vercel (Next.js)**: Usa `output: export` para sitios estáticos, o ISR para rutas dinámicas. Evita `use client` para contenido crítico en App Router.
- **GitHub Pages**: Añade un script de pre-renderizado en tu pipeline de build (ej: en `package.json` `build` script: `vite build && react-snap`).

### 1.3 Mobile-First Indexing (Factor Crítico)
Google indexa la versión móvil de tu sitio primero. Verifica:
- Diseño responsive con meta tag `viewport`: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- No ocultes contenido en móvil que esté visible en escritorio (penalizado por crawlers).
- Usa la [herramienta de prueba móvil de Google](https://search.google.com/test/mobile-friendly).

### 1.4 Breadcrumbs y Estructura de Navegación
Añade breadcrumbs con datos estructurados para mejorar navegación y rich snippets:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Inicio",
    "item": "https://tudominio.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Blog",
    "item": "https://tudominio.com/blog"
  }]
}
</script>
```

### 1.5 Manejo de Errores 404 y 5xx
- Crea una página `404.html` personalizada con enlaces a contenido relevante (no uses la página por defecto de la plataforma).
  - Vercel: Crea `app/not-found.tsx` (Next.js App Router) o `404.html`.
  - GitHub Pages: Crea `404.html` en la raíz del repositorio.
- Devuelve códigos de estado correctos: no uses redirecciones 301 para páginas 404, devuelve `404 Not Found` real.

### 1.6 Accesibilidad (A11y) como Factor de Ranking
Google usa señales de accesibilidad para ranking. Cumple con WCAG 2.1 AA: contraste de color adecuado, navegación por teclado, etiquetas ARIA para elementos interactivos. Usa Lighthouse o axe DevTools para auditorías.

### 1.7 Cabeceras de Seguridad (Ranking Factor)
Añade cabeceras que mejoran la confianza de los crawlers:
- `X-Frame-Options: DENY` (previene clickjacking).
- `Content-Security-Policy` (previene inyección de scripts).
  - Vercel: Configura en `vercel.json`:
    ```json
    {
      "headers": [{
        "source": "/(.*)",
        "headers": [
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "Content-Security-Policy", "value": "default-src 'self'" }
        ]
      }]
    }
    ```
  - GitHub Pages: Usa Cloudflare Workers (si haces proxy del dominio) para inyectar estas cabeceras, ya que GitHub Pages no permite configurarlas nativamente.

---

## 2. Extensiones Específicas para Vercel

### 2.1 Optimización de Rutas Dinámicas e ISR
Para proyectos Next.js con rutas dinámicas (ej: `/blog/[slug]`):
- Usa `generateStaticParams` en App Router para pre-renderizar todas las rutas en build time.
- Para contenido frecuente, usa ISR con `revalidate: 60` (regenera la página cada 60 segundos) para que los crawlers vean contenido actualizado sin sacrificar rendimiento.

### 2.2 Edge Functions para SEO Dinámico
Usa Vercel Edge Functions para:
- Inyectar metaetiquetas dinámicas basadas en geolocalización (ej: cambiar título por país).
- Redirigir usuarios a versiones localizadas con etiquetas `hreflang` correctas.
```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US'
  if (country === 'ES' && !request.nextUrl.pathname.startsWith('/es')) {
    return NextResponse.redirect(new URL('/es', request.url))
  }
}
```

### 2.3 Errores Comunes en Vercel
- No configurar `siteUrl` en `next-sitemap.config.js`, genera sitemaps con URLs `localhost`.
- Usar `basePath` incorrecto en `next.config.js` para proyectos en subrutas.
- No configurar redirecciones 301 para dominios www/non-www (causa contenido duplicado).
- Usar CSR solo para contenido crítico en Next.js App Router (sin `generateMetadata`).

---

## 3. Extensiones Específicas para GitHub Pages

### 3.1 Automatización de SEO con GitHub Actions
GitHub Pages no genera sitemaps dinámicos, usa GitHub Actions para generar `sitemap.xml` y `robots.txt` automáticamente en cada push:
```yml
# .github/workflows/seo.yml
name: Generate SEO Files
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm install && npm run build
      - run: npx sitemap-generator-cli https://tunombre.github.io/nombre-repo -o dist/sitemap.xml
      - run: |
          echo "User-agent: *" > dist/robots.txt
          echo "Allow: /" >> dist/robots.txt
          echo "Sitemap: https://tunombre.github.io/nombre-repo/sitemap.xml" >> dist/robots.txt
      - uses: peaceiris/actions-gh-pages@v3
        with: { github_token: ${{ secrets.GITHUB_TOKEN }}, publish_dir: ./dist }
```

### 3.2 Integración con Cloudflare para SEO Avanzado
GitHub Pages no soporta cabeceras personalizadas o redirecciones 301 complejas. Solución:
1. Configura tu dominio para que apunte a Cloudflare en lugar de directamente a GitHub Pages.
2. Usa Cloudflare Workers para añadir cabeceras de seguridad, configurar redirecciones 301 e inyectar metaetiquetas dinámicas.

### 3.3 Errores Comunes en GitHub Pages
- No añadir `.nojekyll` en la raíz si usas un SPA que no es Jekyll (GitHub procesa archivos innecesarios).
- Configurar `baseurl` incorrecto en Jekyll, rompe enlaces relativos y sitemaps.
- Subir `sitemap.xml` con URLs `localhost` en lugar del dominio real.
- No activar HTTPS para dominios personalizados (GitHub lo hace automáticamente, pero requiere forzar redirección en Cloudflare).

---

## 4. SEO Adicional para Apps y PWAs

### 4.1 Optimización de Landing Pages de Apps
Para páginas de aterrizaje de apps alojadas en estas plataformas:
- Usa el esquema `SoftwareApplication` de Schema.org con campos adicionales: `aggregateRating`, `operatingSystem`, `downloadUrl`.
- Añade smart app banners:
  ```html
  <!-- iOS -->
  <meta name="apple-itunes-app" content="app-id=TU_APP_ID, app-argument=tu-app://">
  <!-- Android -->
  <meta name="google-play-app" content="app-id=TU_APP_ID">
  ```

### 4.2 Métricas de Engagement de PWA y Ranking
Google considera métricas de engagement de PWA (instalabilidad, tiempo de uso, retención) como señales de ranking indirectas. Asegúrate de cumplir con los requisitos de instalabilidad de Chrome (manifest.json válido, service worker, HTTPS).

---

## 5. Monitoreo y Reportes de SEO

### Herramientas Recomendadas
| Herramienta | Uso | Plataforma |
|-------------|-----|------------|
| Google Search Console | Indexación, errores de rastreo, palabras clave | Universal |
| Lighthouse | Core Web Vitals, A11y, auditoría SEO | Universal |
| Vercel Speed Insights | Core Web Vitals en tiempo real | Vercel |
| Google Analytics 4 | Engagement, rebote, conversiones | Universal |

### Configuración de Google Search Console
1. Verifica tu dominio (usa etiqueta HTML o DNS).
2. Envía tu `sitemap.xml` manualmente en la sección "Sitemaps".
3. Configura alertas para errores de rastreo y páginas no indexadas.

---

## 6. JSON Actualizado para IA (Copia Directa)
Este JSON incluye todas las prácticas originales y nuevas adiciones, estructurado para procesamiento automático:

```json
{
  "seo_best_practices": {
    "universal": {
      "core": [
        "Añadir `robots.txt` en raíz con línea `Sitemap: https://dominio.com/sitemap.xml`",
        "Generar `sitemap.xml` automáticamente (usar `next-sitemap` para Next.js en Vercel, GitHub Actions para GitHub Pages)",
        "Añadir etiqueta de URL canónica a todas las páginas",
        "Añadir datos estructurados JSON-LD (Schema.org) para WebSite, Article, SoftwareApplication, BreadcrumbList",
        "Un H1 por página, títulos de 50-60 caracteres con palabra clave principal, meta descripciones de 150-160 caracteres",
        "Texto alt descriptivo para imágenes, formatos WebP/AVIF, `loading=\"lazy\"` para imágenes no críticas",
        "Cumplir Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1",
        "Configurar caché para activos estáticos: `Cache-Control: public, max-age=31536000, immutable` para archivos con hash",
        "Incluir `manifest.json` válido con name, short_name, description, icons, start_url, theme_color (PWAs)",
        "Registrar service worker válido para soporte offline (PWAs)"
      ],
      "advanced": [
        "Optimizar para crawlers de LLM: reglas en `robots.txt` para GPTBot, ClaudeBot, archivo `llms.txt` en raíz",
        "Pre-renderizar SPAs en tiempo de build para evitar problemas de indexación por CSR",
        "Cumplir Mobile-First Indexing: diseño responsive, meta tag viewport, no ocultar contenido en móvil",
        "Crear `404.html` personalizada con enlaces a contenido relevante, devolver código 404 real",
        "Cumplir WCAG 2.1 AA para accesibilidad (factor de ranking)",
        "Añadir cabeceras de seguridad: X-Frame-Options, Content-Security-Policy"
      ],
      "app_pwa_specific": [
        "Landing pages de apps: usar esquema SoftwareApplication con aggregateRating, operatingSystem, downloadUrl",
        "Añadir smart app banners de iOS (`apple-itunes-app` meta tag) y Android (`google-play-app` meta tag)",
        "Configurar deep linking para apps nativas con enlaces de fallback a app stores",
        "Cumplir requisitos de instalabilidad de PWA para mejorar engagement (señal de ranking indirecta)"
      ]
    },
    "vercel_specific": [
      "Next.js: Usar `metadata` o `generateMetadata` para metaetiquetas, `generateStaticParams` para rutas dinámicas",
      "Usar ISR para contenido dinámico frecuente: `revalidate: 60` en page/layout de Next.js",
      "Configurar redirecciones 301 y cabeceras en `vercel.json`",
      "Usar Vercel Edge Middleware para inyección dinámica de cabeceras, redirecciones localizadas",
      "Activar Vercel Analytics y Speed Insights para monitoreo de Core Web Vitals",
      "Errores comunes: no configurar `siteUrl` en `next-sitemap.config.js`, usar CSR solo para contenido crítico"
    ],
    "github_pages_specific": [
      "Jekyll: Usar plugin `jekyll-seo-tag`, configurar `url` y `baseurl` en `_config.yml`, añadir `.nojekyll` si no usas Jekyll",
      "Generar `sitemap.xml` y `robots.txt` en build, usar GitHub Actions para automatizar",
      "Crear `404.html` en raíz para páginas de error personalizadas",
      "Usar Cloudflare Workers para cabeceras personalizadas, redirecciones 301 (GitHub Pages no soporta nativamente)",
      "Errores comunes: `baseurl` incorrecto en Jekyll, subir sitemap con URLs localhost"
    ],
    "monitoring": [
      "Configurar Google Search Console: verificar dominio, enviar sitemap, monitorear errores",
      "Usar Lighthouse para auditorías periódicas de SEO, rendimiento y accesibilidad",
      "Integrar Google Analytics 4 para métricas de engagement y conversión"
    ]
  }
}
```
