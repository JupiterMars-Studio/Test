if (window.innerWidth > 1024) {
document.querySelectorAll(".work-img").forEach((container) => {
  const hover = container.querySelector(".work-hover");
  const maskLayer = container.querySelector(".mask-layer");
  const newMaskLayer = container.querySelector(".color-tint");
  const workItem = container.closest(".work-item");

  container.style.position = "relative";
  hover.style.position = "absolute";
  hover.style.pointerEvents = "none";

  const xMove = gsap.quickTo(hover, "x", { duration: 0.8, ease: "power3.out" });
  const yMove = gsap.quickTo(hover, "y", { duration: 0.8, ease: "power3.out" });

  gsap.set(hover, {
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    transformOrigin: "center center",
  });
  gsap.set(maskLayer, { opacity: 0 });
  gsap.set(newMaskLayer, { opacity: 0 });
  const maskWidth = 560;
  const maskHeight = 200;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xMove(x);
    yMove(y);

    const offsetX = x - maskWidth / 2;
    const offsetY = y - maskHeight / 2;
    const pos = `${offsetX}px ${offsetY}px, center`;

    maskLayer.style.maskPosition = pos;
    newMaskLayer.style.maskPosition = pos;
    maskLayer.style.webkitMaskPosition = pos;
    newMaskLayer.style.webkitMaskPosition = pos;
  });

  workItem.addEventListener("mouseenter", () => {
    gsap.to(hover, { opacity: 1, duration: 0.3, scale: 1 });
    gsap.to(maskLayer, { opacity: 1, duration: 0.3, delay: 0.5, ease: "none" });
    gsap.to(newMaskLayer, { opacity: 1, duration: 0.3, delay: 0.5, ease: "none" });
  });

  workItem.addEventListener("mouseleave", () => {
    gsap.to(hover, { opacity: 0, duration: 0.3, scale: 0 });
    gsap.to(maskLayer, { opacity: 0, duration: 0.3 });
    gsap.to(newMaskLayer, { opacity: 0, duration: 0.3 });
  });
});
}
