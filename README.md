# Rama Surendra Babu G - Portfolio V1

## Overview
A modern, feature-rich personal portfolio website showcasing 20+ years of IT Architecture experience with emphasis on Kubernetes, Cloud Native, and Generative AI expertise.

---

## Features Checklist

### Visual Effects
| Feature | How to Verify |
|---------|---------------|
| **Custom Cursor** | Move mouse around - see dot + ring cursor following |
| **Glitch Text Effect** | Look at your name in hero - subtle glitch animation |
| **Particle Network** | Background canvas with connected moving dots |
| **Mouse Trail** | Move mouse quickly - see trailing particles |
| **Scroll Progress Bar** | Scroll down - purple bar at top shows progress |
| **Parallax Effect** | Scroll - hero visual moves at different speed |
| **Animated Gradient Background** | Subtle shifting gradient in background |
| **Shine Effect on Cards** | Hover over detail/project cards - light sweep |
| **Gradient Border Animation** | Hover cards - animated gradient border appears |
| **Confetti Effect** | Hover over Achievement cards - confetti burst |

### Interactive Elements
| Feature | How to Verify |
|---------|---------------|
| **Theme Picker** | Click theme icon (top right) - 6 themes available |
| **Smooth Theme Transition** | Switch themes - smooth fade transition |
| **Floating Quick Actions** | Scroll down 400px - Email/LinkedIn/GitHub buttons appear on right |
| **Back to Top Button** | Scroll down - arrow button appears bottom right |
| **Typewriter Effect** | Page load - role title types out letter by letter |
| **Number Counter Animation** | Scroll to stats (20+, 35+, 100+) - numbers count up |
| **Badge Marquee** | Bottom of hero - badges scroll horizontally, pause on hover |
| **Copy Email to Clipboard** | Click email card in Contact section - copies email |
| **Download Resume** | Click "Download CV" button - downloads PDF |
| **Certificate Lightbox** | Click any K8s certificate - popup with details |
| **Expandable Timeline** | Click timeline cards - may expand for more details |
| **Magnetic Button** | Hover "Let's Collaborate" - button follows cursor slightly |
| **Enhanced Scroll Indicator** | Hero bottom - animated mouse + arrows (fades on scroll) |

### Sections to Verify
| Section | Key Elements |
|---------|--------------|
| **Hero** | Name with glitch, orbiting icons (K8s, Cloud, AI), RSB avatar, badges marquee |
| **About** | Detail cards with shine effect, personal info, publications |
| **Experience** | Timeline with 6 positions, tech tags, expandable content |
| **Expertise** | 6 skill categories with modern tech (AI/GenAI, Cloud Native, etc.) |
| **Skill Bars** | 5 animated progress bars (scroll to see fill animation) |
| **Core Competencies** | 8 cards with icons, hover effects |
| **Achievements** | Award cards with confetti on hover |
| **Certifications** | Kubestronaut badge, 5 K8s certs with lightbox |
| **Projects** | 4 enterprise projects + 6 POCs (2 AI-focused featured) |
| **Contact** | Email copy, phone, location, social links |

### Technical Skills Updated (Modern/AI Focus)
- **AI & Generative AI**: ChatGPT/GPT-4, LangChain, RAG Architecture, Azure OpenAI, Prompt Engineering, Vector Databases, Hugging Face, LLM Fine-tuning, AI Agents
- **Cloud Native**: Kubernetes, AWS EKS, Azure AKS, Helm, Istio/Service Mesh, Terraform, ArgoCD, GitOps
- **Data & Streaming**: PostgreSQL, MongoDB, Redis, Pinecone/Weaviate, Apache Kafka, Elasticsearch
- **DevOps & Observability**: GitHub Actions, Prometheus, Grafana, DataDog, OpenTelemetry, Vault, SonarQube

### Files Structure
```
v1/
├── index.html          # Main HTML file
├── style.css           # All styles (4000+ lines)
├── script.js           # All JavaScript (1100+ lines)
├── rama_surendra_babu_g.pdf  # Resume PDF (add your file)
├── sitemap.xml         # SEO sitemap
├── robots.txt          # SEO robots file
└── README.md           # This file
```

---

## Quick Test Checklist

### Page Load
- [ ] Loader animation appears and fades
- [ ] Name types out with glitch effect
- [ ] Stats count up (20+, 35+, 100+)
- [ ] Badge marquee scrolls at bottom
- [ ] Orbiting icons animate around RSB avatar

### Scroll Down
- [ ] Progress bar appears at top
- [ ] Quick action buttons appear on right
- [ ] Back to top button appears
- [ ] Cards fade in as they enter viewport
- [ ] Skill bars animate when visible

### Interactions
- [ ] Theme picker works (6 themes)
- [ ] Hover effects on all cards
- [ ] Click RSB avatar → opens Kubestronaut profile
- [ ] Click email card → copies to clipboard
- [ ] Click Download CV → downloads PDF
- [ ] Click certificates → lightbox popup

### Responsive
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Navigation hamburger on mobile

---

## Deployment

### GitHub Pages
1. Create repository: `username.github.io`
2. Push v1 contents to main branch
3. Enable GitHub Pages in Settings
4. Access at: `https://username.github.io`

### Local Preview
Simply open `index.html` in a browser.

---

## Customization

### To Edit Badges (Marquee)
Find `badge-marquee-content` in `index.html` and add/remove:
```html
<div class="marquee-badge">
    <svg>...</svg>
    <span>Your Badge Text</span>
</div>
```

### To Change Theme Colors
Edit CSS variables at top of `style.css` for each theme.

### To Update Resume
Replace `rama_surendra_babu_g.pdf` with your updated file.

---

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## Credits
Designed & Built by Rama Surendra Babu G
© 2026 All Rights Reserved
