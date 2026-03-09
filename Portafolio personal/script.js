document.addEventListener("DOMContentLoaded", () => {

    const main = document.querySelector("main");

    // Fade in inicial
    if (main) {
        main.classList.add("fade-in");
    }

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-paginas a").forEach(link => {

        const linkHref = link.getAttribute("href");

        if (!linkHref.includes("#") && linkHref === currentPage) {
            link.classList.add("active");
        }

        link.addEventListener("click", function(e) {
            if (this.hash) return;

            if (this.hostname === window.location.hostname && main) {
                e.preventDefault();

                main.classList.remove("fade-in");
                main.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = this.href;
                }, 150);
            }
        });

    });

    // Fade proyectos
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const defaultTab = tabButtons[0];
    if (defaultTab) {
        defaultTab.classList.add("active");
        const tabId = defaultTab.dataset.tab;
        const defaultContent = document.getElementById(tabId);
        if (defaultContent) {
            defaultContent.style.display = "block";
            defaultContent.classList.add("fade-in");
        }
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            tabButtons.forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            const proyectosSection = document.getElementById("proyectos");
            if (proyectosSection) {
                proyectosSection.scrollIntoView({ behavior: "smooth" });
            }

            const tabId = btn.dataset.tab;
            const newContent = document.getElementById(tabId);

            const visibleContent = Array.from(tabContents).find(c => c.style.display !== "none");

            if (visibleContent && visibleContent !== newContent) {
                visibleContent.classList.remove("fade-in");
                visibleContent.classList.add("fade-out");

                setTimeout(() => {
                    visibleContent.style.display = "none";

                    newContent.style.display = "block";
                    setTimeout(() => {
                        newContent.classList.remove("fade-out");
                        newContent.classList.add("fade-in");
                    }, 20);
                }, 150);

            } else if (newContent) {
                newContent.style.display = "block";
                newContent.classList.remove("fade-out");
                newContent.classList.add("fade-in");
            }

        });
    });



    //imágenes slide
    const carousels = document.querySelectorAll(".image-carousel");

    carousels.forEach(carousel => {
        const slides = Array.from(carousel.querySelectorAll("img"));
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        let currentIndex = 0;
        const total = slides.length;

        const wrapper = document.createElement("div");
        wrapper.classList.add("slides-wrapper");

        slides.forEach(img => wrapper.appendChild(img));
        carousel.insertBefore(wrapper, prevBtn);

        const showSlide = (index) => {
            const offset = -index * 100;
            wrapper.style.transform = `translateX(${offset}%)`;
        };

        showSlide(currentIndex);

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % total;
            showSlide(currentIndex);
        });

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + total) % total;
            showSlide(currentIndex);
        });

        // iintervalo
        setInterval(() => {
            currentIndex = (currentIndex + 1) % total;
            showSlide(currentIndex);
        }, 5000);
    });

});
