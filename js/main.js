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

    // Animaciones iniciales para móvil
    gsap.set(menuList, { autoAlpha: 0, y: -30 });
    gsap.set(menuItems, { autoAlpha: 0, y: -20 });
    gsap.set(langIcon, { autoAlpha: 0, y: -20 });

    // Función para resetear GSAP en desktop
    function resetMenuDesktop() {
        if (window.innerWidth >= 930) {
            gsap.set(menuList, { clearProps: "all" });
            gsap.set(menuItems, { clearProps: "all" });
            gsap.set(langIcon, { clearProps: "all" });
            logo.style.display = 'block';
        }
    }

    // Ejecutar al cargar y al redimensionar
    resetMenuDesktop();
    window.addEventListener('resize', resetMenuDesktop);

    // Toggle del menú (solo móvil)
    menuLogo.addEventListener('click', () => {
        const isActive = menuList.classList.toggle('active');
        menu.classList.toggle('open', isActive);

        // Animación botón MENU / CERRAR
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
            // Ocultar logo principal
            logo.style.display = 'none';

            // Animación de apertura del menú
            gsap.to(menuList, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });

            // Animación de links con stagger
            gsap.to(menuItems, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.1
            });

            // Animación del logo de idioma dentro del menú
            gsap.to(langIcon, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                delay: 0.1
            });

        } else {
            // Mostrar logo principal inmediatamente con fade
            logo.style.display = 'block';
            gsap.fromTo(logo, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });

            // Animación de cierre del menú
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

            // Cambiar texto del botón MENU inmediatamente
            menuLogo.textContent = 'MENU';
        }
    });
});

        
        /*menuLogo.addEventListener('click', () => {
            menuList.classList.toggle('active');

            if (menuList.classList.contains('active')){
                logo.style.display = 'none';
                menuLogo.textContent = 'CERRAR';
                menu.style.flexDirection = 'column';

            } 
            else {
                logo.style.display = 'block';
                menuLogo.textContent = 'MENU';
                menu.style.flexDirection = 'row';

            }
        });
    });*/