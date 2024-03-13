const initCourseSlider = () => {
    const container = document.querySelector(".courses-container .card-container");
    const slideButtons = document.querySelectorAll(".courses-container .slide-button");

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = container.clientWidth * direction;
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
}

window.addEventListener("load", initCourseSlider);