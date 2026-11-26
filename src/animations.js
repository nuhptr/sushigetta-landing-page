import { animate, inView } from "motion"

const PRESETS = {
    "fade-up": { opacity: [0, 1], y: [40, 0] },
    "fade-down": { opacity: [0, 1], y: [-40, 0] },
    "fade-left": { opacity: [0, 1], x: [40, 0] },
    "fade-right": { opacity: [0, 1], x: [-40, 0] },
    "flip-up": {
        opacity: [0, 1],
        transform: ["perspective(1000px) rotateX(-45deg)", "perspective(1000px) rotateX(0deg)"],
    },
    "flip-down": {
        opacity: [0, 1],
        transform: ["perspective(1000px) rotateX(45deg)", "perspective(1000px) rotateX(0deg)"],
    },
    "zoom-in": { opacity: [0, 1], scale: [0.85, 1] },
}

const DEFAULT_TRANSITION = {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
}

/**
 * Initialize viewport scroll-reveal animations using Motion's inView and animate.
 */
export function initScrollAnimations() {
    const elements = document.querySelectorAll("[data-animate]")
    if (!elements.length) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((el) => {
            el.style.opacity = "1"
        })
        return
    }

    elements.forEach((el) => {
        const preset = PRESETS[el.dataset.animate] ?? PRESETS["fade-up"]

        inView(
            el,
            () => {
                animate(el, preset, DEFAULT_TRANSITION)
            },
            {
                margin: "0px 0px -60px 0px",
                amount: "some",
            },
        )
    })
}
