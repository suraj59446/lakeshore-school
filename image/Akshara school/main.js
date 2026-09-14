import './style.css'

/* ===== Navbar scroll state ===== */
const navbar = document.getElementById('navbar')
const scrollTopBtn = document.getElementById('scrollTop')

function onScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show')
  } else {
    scrollTopBtn.classList.remove('show')
  }
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

/* ===== Mobile menu ===== */
const navToggle = document.getElementById('navToggle')
const navLinks = document.querySelector('.nav-links')

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open')
  navToggle.classList.toggle('open', open)
  navToggle.setAttribute('aria-expanded', String(open))
})

navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open')
    navToggle.classList.remove('open')
    navToggle.setAttribute('aria-expanded', 'false')
  })
})

/* ===== Scroll to top ===== */
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

/* ===== Active nav link on scroll (scrollspy) ===== */
const sections = document.querySelectorAll('section[id]')
const navLinkEls = document.querySelectorAll('.nav-link')

function spyActive() {
  const pos = window.scrollY + 120
  let current = 'home'
  sections.forEach((sec) => {
    if (pos >= sec.offsetTop) {
      current = sec.id
    }
  })
  navLinkEls.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current)
  })
}
window.addEventListener('scroll', spyActive, { passive: true })
spyActive()

/* ===== Scroll reveal ===== */
const reveals = document.querySelectorAll('.reveal')

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10)
          setTimeout(() => entry.target.classList.add('visible'), delay)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  )
  reveals.forEach((el) => observer.observe(el))
} else {
  reveals.forEach((el) => el.classList.add('visible'))
}

/* ===== Animated counters ===== */
const counters = document.querySelectorAll('[data-count]')
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const target = parseInt(el.dataset.count, 10)
      const duration = 1800
      const start = performance.now()
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target).toLocaleString()
        if (progress < 1) requestAnimationFrame(tick)
        else el.textContent = target.toLocaleString()
      }
      requestAnimationFrame(tick)
      counterObserver.unobserve(el)
    })
  },
  { threshold: 0.5 }
)
counters.forEach((el) => counterObserver.observe(el))

/* ===== Testimonial slider ===== */
const track = document.getElementById('testimonialTrack')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const dotsWrap = document.getElementById('sliderDots')
const slides = track ? Array.from(track.children) : []
let currentSlide = 0
let slideTimer

function buildDots() {
  dotsWrap.innerHTML = ''
  slides.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '')
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`)
    dot.addEventListener('click', () => goToSlide(i))
    dotsWrap.appendChild(dot)
  })
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length
  track.style.transform = `translateX(-${currentSlide * 100}%)`
  dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide)
  })
  resetAutoplay()
}

function nextSlide() {
  goToSlide(currentSlide + 1)
}
function prevSlide() {
  goToSlide(currentSlide - 1)
}

function resetAutoplay() {
  clearInterval(slideTimer)
  slideTimer = setInterval(nextSlide, 6000)
}

if (track && slides.length) {
  buildDots()
  prevBtn.addEventListener('click', prevSlide)
  nextBtn.addEventListener('click', nextSlide)
  resetAutoplay()
  track.addEventListener('mouseenter', () => clearInterval(slideTimer))
  track.addEventListener('mouseleave', resetAutoplay)
}

/* ===== Contact form ===== */
const contactForm = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = contactForm.name.value.trim()
  const email = contactForm.email.value.trim()
  const message = contactForm.message.value.trim()

  if (!name || !email || !message) {
    formSuccess.textContent = 'Please fill in your name, email and message.'
    formSuccess.style.background = '#fef2f2'
    formSuccess.style.color = '#b91c1c'
    formSuccess.hidden = false
    return
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    formSuccess.textContent = 'Please enter a valid email address.'
    formSuccess.style.background = '#fef2f2'
    formSuccess.style.color = '#b91c1c'
    formSuccess.hidden = false
    return
  }

  formSuccess.textContent = 'Thank you! Your message has been received. We\u2019ll get back to you shortly.'
  formSuccess.style.background = '#dcfce7'
  formSuccess.style.color = '#15803d'
  formSuccess.hidden = false
  contactForm.reset()
  setTimeout(() => {
    formSuccess.hidden = true
  }, 6000)
})

/* ===== Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear()
