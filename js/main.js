/*let title = document.querySelector(".title");
gsap.from(title,{
    color:"red",
    backgroundColor: "green",
    x: -100,
    rotate:360,
    scale: 3,
    duration: 5,
    delay:0,
    ease:"back.out"

} )*/

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