
document.addEventListener('DOMContentLoaded', () => {
    const menuLogo = document.querySelector('.menu-logo');
    const menuList = document.querySelector('.menu-list');
    const logo = document.querySelector('.logo');
    const menu = document.querySelector('.menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const langIcon = document.querySelector('.lang-icon');

    gsap.set(menuList, { autoAlpha: 0, y: -30 });
    gsap.set(menuItems, { autoAlpha: 0, y: -20 });
    gsap.set(langIcon, { autoAlpha: 0, y: -20 });

    // resetear GSAP en desktop
    function resetMenuDesktop() {
        if (window.innerWidth >= 930) {
            gsap.set(menuList, { clearProps: "all" });
            gsap.set(menuItems, { clearProps: "all" });
            gsap.set(langIcon, { clearProps: "all" });
            logo.style.display = 'block';
        }
    }

    resetMenuDesktop();
    window.addEventListener('resize', resetMenuDesktop);

    menuLogo.addEventListener('click', () => {
        const isActive = menuList.classList.toggle('active');
        menu.classList.toggle('open', isActive);

        gsap.to(menuLogo, {
            duration: 0.2,
            autoAlpha: 0,
            y: -10,
            onComplete: () => {
                menuLogo.textContent = isActive ? 'CERRAR' : 'MENU';
                gsap.to(menuLogo, { duration: 0.2, autoAlpha: 1, y: 0 });
            }
        });

        if (isActive) {

            logo.style.display = 'none';

            gsap.to(menuList, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });

            gsap.to(menuItems, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.1
            });

            gsap.to(langIcon, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                delay: 0.1
            });

        } else {
            logo.style.display = 'block';
            gsap.fromTo(logo, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });

            gsap.to(menuList, {
                autoAlpha: 0,
                y: -30,
                duration: 0.4,
                ease: "power2.in"
            });

            gsap.to(menuItems, {
                autoAlpha: 0,
                y: -20,
                duration: 0.3,
                stagger: 0.05
            });

            gsap.to(langIcon, {
                autoAlpha: 0,
                y: -20,
                duration: 0.3
            });

            menuLogo.textContent = 'MENU';
        }
    });
});

gsap.registerPlugin(ScrollTrigger);

const dynamicText = document.querySelector(".changing-text");

// Timeline para rotar tipografías y tamaños instantáneamente
const tl = gsap.timeline({ repeat: -1 });

tl.to(dynamicText, { fontFamily: "interlope", fontSize: "3.9rem", duration: 0.01, ease: "none", delay: 2 })
    .to(dynamicText, { fontFamily: "picnic", fontSize: "4rem", duration: 0.01, ease: "none", delay: 3 })
    .to(dynamicText, { fontFamily: "murmure", fontSize: "8rem", duration: 0.01, ease: "none", delay: 2})
    .to(dynamicText, { fontFamily: "outward", fontSize: "15rem",fontWeight: 100, duration: 0.01, ease: "none", delay: 2 })
    .to(dynamicText, { fontFamily: "steps-mono", fontSize: "3rem", duration: 0.01, ease: "none", delay: 2 });
    ;

// Fijar fuente al hacer scroll a la siguiente sección
ScrollTrigger.create({
    trigger: ".scroll-image",       // sección siguiente
    start: "top center",
    onEnter: () => {
        gsap.set(dynamicText, {
            fontFamily: "Inter, sans-serif",
            fontSize: "3rem"
        });
    }
});

gsap.utils.toArray('.hero-text').forEach(text => {
    gsap.to(text, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom 20%',
            scrub: true,
        }
    });
});

gsap.registerPlugin(ScrollTrigger);

// === FADE DEL HERO ===
const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true, // mantiene fijo el hero mientras hace fade
    anticipatePin: 1
  }
});

// Fade del texto y la flechita al mismo tiempo
heroTimeline.to(".hero-text, .scroll", {
  opacity: 0,
  y: -50,
  ease: "power2.out",
  duration: 1
});

// === CAMBIO DE FUENTE AL ENTRAR A GALERÍA ===
ScrollTrigger.create({
  trigger: ".scroll-image",
  start: "top center",
  onEnter: () => {
    gsap.set(".dynamic-text", {
      fontFamily: "Inter, sans-serif",
      fontSize: "3rem"
    });
  }
});

// Scroll horizontal real
const track = document.querySelector(".gallery-track");

if (track) {
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".gallery-horizontal",
      start: "top top",
      end: () => "+=" + (track.scrollWidth - window.innerWidth),
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true, // recalcula si cambian tamaños
      markers: false
    }
  });
  gsap.to(".gallery-horizontal", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".gallery-horizontal",
      start: () => "right center", // empieza el fade cuando casi termina
      end: () => "+=400", // controla qué tan largo es el desvanecido
      scrub: true,
      markers: false
    }
  });
}

const galleryItems = gsap.utils.toArray(".gallery-item:not(.item0)"); // excluye el texto inicial

galleryItems.forEach((item, i) => {
  const speed = gsap.utils.random(0.3, 1); // define qué tan rápido va cada imagen

    gsap.to(item, {
    x: () => -(document.querySelector(".gallery-track").scrollWidth - window.innerWidth) * speed,
    ease: "none",
    scrollTrigger: {
        trigger: ".gallery-horizontal",
        start: "top top",
        end: () => "+=" + document.querySelector(".gallery-track").scrollWidth,
        scrub: true,
        pin: false
    }
    });
});