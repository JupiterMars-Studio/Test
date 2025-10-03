gsap.registerPlugin(ScrollTrigger, SplitText);
const windowWidth = window.innerWidth;
const isMobile = window.innerWidth <= 768;
const mm = gsap.matchMedia();


// ---- Video helpers ----
function getBgVideo(sel = '.background-video video') {
  return document.querySelector(sel);
}

function whenCanPlay(video) {
  return new Promise((resolve) => {
    if (!video) return resolve();
    if (video.readyState >= 2) return resolve(); // have current data
    const onReady = () => { video.removeEventListener('canplay', onReady); resolve(); };
    video.addEventListener('canplay', onReady, { once: true });
  });
}

async function playBgVideo(sel) {
  const v = getBgVideo(sel);
  if (!v) return;
  v.muted = true;       // mobile autoplay requirement
  v.playsInline = true; // iOS requirement
  v.currentTime = 0;    // start from beginning when loader runs
  await whenCanPlay(v);
  try { await v.play(); }
  catch {
    // fallback: start on first user interaction
    const resume = () => { v.play().catch(() => {}); window.removeEventListener('pointerdown', resume); };
    window.addEventListener('pointerdown', resume, { once: true });
  }
}

function stopBgVideo(sel) {
  const v = getBgVideo(sel);
  if (!v) return;
  try { v.pause(); } catch {}
  v.currentTime = 0; // optional: freeze on first frame
  v.removeAttribute('autoplay'); // don’t let it restart
  const wrap = v.closest('.w-background-video');
  if (wrap) wrap.setAttribute('data-autoplay', 'false');
}


if (!sessionStorage.getItem("loaderPlayed")) {
  sessionStorage.setItem("loaderPlayed", "true");
  //loader
  gsap.set(".loader", { opacity: 1, display: "flex" });
  const wrapper = document.querySelector(".svg-wrapper");
  const original = document.querySelector(".svg-container");

  // Add class 'first' to the original (first) element
  original.classList.add("first");

  const totalCount = isMobile ? 18 : 35;
  // console.log(totalCount)
  for (let i = 1; i < totalCount; i++) {
    const clone = original.cloneNode(true);

    if (i === 1) {
      clone.classList.remove("first");
      clone.classList.add("second");
    } else {
      clone.classList.remove("first");
      clone.classList.add("show");
    }

    wrapper.appendChild(clone);
  }

  const wrapperWidth = document.querySelector(".svg-wrapper").offsetWidth;
  const svgCount = 32;
  const gap = isMobile ? 8 : 16;
  const svgWidth = document.querySelector(".svg-container").offsetWidth;

  const moveDistance = wrapperWidth - svgWidth * 2 - gap;

  gsap.set(".bracket-text", { opacity: 0 });
  gsap.set(".section_home-header", { y: "100vh" });
  gsap.set(".section_scrolling-logo", { y: "100vh" });
  gsap.set(".navbar", { opacity: 0 });
  gsap.set(".hero-grid", { opacity: 0 });
  gsap.set(".bracket-end", { opacity: 0 });
  gsap.set(".link-hover-line", { opacity: 0 });
  gsap.set(".heading-hero", {y: 0, opacity: 1})
  gsap.set(".hero-description", {y: 0, opacity: 1})
  gsap.set(".button-hero_wrapper", {y: 0, opacity: 1})
  gsap.set(".video-mask", { x: isMobile ? "36px" : "75px" });
  gsap.set(".masking-left", { width: "120px", display: "block" });
  gsap.set(".masking-right", { width: "333px", display: "block" });

  const navbarWidth = document.querySelector(".navbar-container").offsetWidth;
  const bracketWidth = (navbarWidth - (isMobile ? 8 : 12.47) * 2 - 20) / 2;

const tl = gsap.timeline()
  .from(".show", {visibility: "hidden", stagger: 0.05, ease: "none"})
  .to(".second", {x: moveDistance, ease: "none", duration: isMobile ? 0.3 : 0.64, delay: 1})
  .to(".show", {
  visibility: "hidden",
  stagger: {
    each: 0.02,
    from: "start" // ensures first to last
  },
  ease: "none"
}, "<")
  .to(".bracket-text", {opacity: 1, duration: 0.5, ease: "none"}, "<=0.2")
  .to(".svg-container", {opacity: 0, delay: 1})
  .call(() => playBgVideo('.background-video video'), null, "<")
  .to(".background-video", {width: "100%", height: "50vh", duration: 2, ease: "none"})
  .to(".video-mask", {x: 0, duration: 2, ease: "none"}, "<")
  .to(".company-1", {scale: isMobile ? 4 : 6, duration: 2, ease: "none", x: "-120vw", y: "-40vh"}, "<")
  .to(".company-2", {scale: isMobile ? 4 : 6, duration: 2, ease: "none", x: "120vw", y: "-40vh"}, "<")
  .to(".video-mask", {bottom: "10%", top: "10%", duration: 0.5, ease: "none"})
  .to(".background-video", {height: "80vh", duration: 1.5, ease: "none"}, "<")
  .to(".video-mask", {top: "0%", bottom: "unset", duration: 1, ease: "none"})
  .to(".background-video", {height: isMobile ? "27px" : "44px", width: isMobile ? "27px" : "44px", duration: 1.5, ease: "none"})

  .to(".section_home-header", {y: 0, duration: 2, ease: "none"}, "<")
  .to(".bracket-end", {opacity: 1, duration: 0.5, ease: "none"})
  .to(".section_scrolling-logo", {y: 0, duration: 1, ease: "power2.out"}, "<")
  .to(".navbar", {opacity: 1, duration: 0.5, ease: "none"})
  .to(".bracket-end", {opacity: 0, duration: 0.5, ease: "none"}, "<")
  .to(".bracket-end-nav", {display: "flex", duration: 0.5, ease: "none"}, "<")
  .to(".logo-right-nav", {x: bracketWidth, duration: 0.5, ease: "none"}, "<")
  .to(".logo-left-nav", {x: -bracketWidth, duration: 0.5, ease: "none"}, "<")
  .to(".link-hover-line", {opacity: 1, duration: 0.5, ease: "none"}, "<")
  .to(".video-mask", {display: "none", duration: 0}, "<")
  .to(".loader", {backgroundColor: "transparent", duration: 0.5, ease: "none"}, "<")
  .to(".logo-right-nav", {opacity: 0, duration: 0.2, ease: "none"})
  .to(".masking-right", { x: -333, width: "0px", duration: 1, ease: "none"}, "<")
  .to(".masking-left", { x: 34, width: "0px", duration: 1, ease: "none"}, "<")
  .to(".bracket-end-nav", {display: "none", duration: 0, ease: "none"})
  .to(".hero-grid", {opacity: 1, duration: 1, ease: "none"})
  .to(".loader", {display: "none"})
  .to({}, { duration: 0, onComplete: runAutoExpandIcons })
  .set("body", {overflow: "auto"})
  .from(".flowappz-cookie-consent-popup-14", {autoAlpha: 0})

} else{
  stopBgVideo('.background-video video');

    gsap.to(".heading-hero", { y: 0, duration: 0.5, autoAlpha: 1, ease: "power1.in" });
    gsap.to(".hero-description", { y: 0, duration: 0.5, autoAlpha: 1, ease: "power1.in" }, "<");
    gsap.to(".button-hero_wrapper", { y: 0, duration: 0.5, autoAlpha: 1, ease: "power1.in" }, "<");
    gsap.to(".section_scrolling-logo", { y: 0, duration: 0.5, ease: "power1.in" });
    gsap.to(".navbar", { duration: 0.5, autoAlpha: 1, ease: "power1.in" });
    gsap.to(".hero-grid", { opacity: 1, duration: 1, ease: "power1.in" });
    gsap.set("body", {overflow: "auto"}, "<")
  setTimeout(runAutoExpandIcons, 600);

    // gsap.set(".loader", { display: "none" });
}

//hero
const heroGrid = document.getElementById("hero-grid");
const specialIndexes = [368, 394, 476, 500];
const specialMobileIndexes = [184, 191, 160, 168];
const specialColor = [
  "quaternary-color",
  "plasma-fluor",
  "laser-fluor",
  "secondary-background",
];
const texts = [
  "B2B Design",
  "B2B Marketing Design",
  "B2B Design Ops",
  "B2B Branding",
];

const mql = window.matchMedia("(max-width: 768px)");

  function buildGrid() {
    const mobile = mql.matches;
    const rows = mobile ? 19 : 18;
    const columns = mobile ? 11 : 30;
    const activeSpecialIndexes = mobile ? specialMobileIndexes : specialIndexes;

    // Clear previous nodes
    heroGrid.replaceChildren();

    // Build fast using a fragment
    const frag = document.createDocumentFragment();

    for (let i = 0; i < rows * columns; i++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("hero-svg-wrapper");

      const iconWrapper = document.createElement("div");
      iconWrapper.classList.add("hero-svg-icon");

      const isSpecial = activeSpecialIndexes.includes(i);
      const labelIndex = isSpecial ? activeSpecialIndexes.indexOf(i) : -1;
      if (isSpecial) iconWrapper.classList.add("special");

      iconWrapper.innerHTML = `
        <svg viewBox="0 0 10 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.35 29.9971C3.89716 28.6535 2.33617 24.9387 2.33617 16.4973C2.33617 8.05596 3.90247 4.34112 9.35 2.99757V0H0V33H9.35V30.0024V29.9971Z" fill="${
            isSpecial
              ? `var(--color--${specialColor[labelIndex]})`
              : "var(--color--hero-grid)"
          }"/>
        </svg>
        ${isSpecial ? `<span class="expander">${texts[labelIndex]}</span>` : ""}
        <svg viewBox="0 0 10 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.648438 0V2.99805C6.10128 4.34182 7.66227 8.05727 7.66227 16.5C7.66227 24.9427 6.10128 28.6582 0.648438 30.0019V33H9.99844V0H0.648438Z" fill="${
            isSpecial
              ? `var(--color--${specialColor[labelIndex]})`
              : "var(--color--hero-grid)"
          }"/>
        </svg>
      `;

      wrapper.appendChild(iconWrapper);
      frag.appendChild(wrapper);
    }

    heroGrid.appendChild(frag);
  }

  // Build once on load
  buildGrid();

  // Rebuild when crossing the breakpoint (mobile <-> desktop)
  mql.addEventListener("change", buildGrid);


function runAutoExpandIcons() {
  document.querySelectorAll(".hero-svg-icon.special").forEach((icon, index) => {
    const leftSVG = icon.querySelector("svg:first-of-type");
    const rightSVG = icon.querySelector("svg:last-of-type");
    const expander = icon.querySelector(".expander");

    const isTouch = window.matchMedia("(max-width: 1024px)").matches; // Tablet & Mobile

    gsap.set(expander, { width: 0, opacity: 0 });

    if (isTouch) {
      setTimeout(() => {
        gsap.to(leftSVG, { x: -6, duration: 0.3, ease: "power2.out" });
        gsap.to(rightSVG, { x: 6, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, {
          background: "var(--color--background)",
          zIndex: 2,
          width: "auto",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(expander, {
          width: "auto",
          opacity: 1,
          duration: 0.3,
          display: "flex",
          ease: "power2.out",
          onUpdate: () => {
            expander.style.width = expander.scrollWidth + "px";
          },
        });
      }, index * 1000); // Customize delay per icon (1s between)
    } else {
      // Desktop hover animation
      icon.addEventListener("mouseenter", () => {
        gsap.to(leftSVG, { x: -6, duration: 0.3, ease: "power2.out" });
        gsap.to(rightSVG, { x: 6, duration: 0.3, ease: "power2.out" });

        gsap.to(expander, {
          width: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onUpdate: () => {
            expander.style.width = expander.scrollWidth + "px";
          },
        });
      });

      icon.addEventListener("mouseleave", () => {
        gsap.to(leftSVG, { x: 0, duration: 0.5 });
        gsap.to(rightSVG, { x: 0, duration: 0.5 });
        gsap.to(expander, { width: 0, opacity: 0, duration: 0.5 });
      });
    }
  });
}

//how we do
document.addEventListener("DOMContentLoaded", () => {

    mm.add("(min-width: 769px)", () => {
      const allLis = document.querySelectorAll(".text_how-we");
      const tlHows = gsap.timeline();
      const heading = document.querySelector(".icon_how-we svg");
      const staggerDelay = 0.5;

      allLis.forEach((li, index) => {
        const isFirst = index === 0;
        const isLast = index === allLis.length - 1;

        if (!isFirst) {
          gsap.set(li, {opacity: 0.2, x: -50 });

          const time = (index - 1) * staggerDelay;

          // Animate in
          tlHows.to(li, { opacity: 1, x: 0 }, time ); // simulate stagger
        }

        // Animate out (skip last one)
        if (!isLast) {
          tlHows.to(li, { opacity: 0.2, x: -100 }, index * 0.5);
        }
      });

      ScrollTrigger.create({
        trigger: ".icon_how-we",
        start: "center center",
        endTrigger: ".text_how-we:last-of-type",
        end: "center center",
        pin: true,
        markers: false,
        animation: tlHows,
        scrub: true,
      });
    });

    mm.add("(max-width: 768px)", () => {
      const allLis = document.querySelectorAll(".text_how-we");
      const tlHows = gsap.timeline();
      const heading = document.querySelector(".icon_how-we svg");
      const staggerDelay = 0.5;

      allLis.forEach((li, index) => {
        const isFirst = index === 0;
        const isLast = index === allLis.length - 1;

        if (!isFirst) {
          gsap.set(li, { opacity: 0.2, x: -10});

          const time = (index - 1) * staggerDelay;

          // Animate in
          tlHows.to( li, { opacity: 1, x: 0}, time ); // simulate stagger

        }

        // Animate out (skip last one)
        if (!isLast) { 
          tlHows.to( li, { opacity: 0.2, x: -10}, index * 0.5 );
        }
      });

      ScrollTrigger.create({
        trigger: ".icon_how-we",
        start: "center center",
        endTrigger: ".text_how-we:last-of-type",
        end: "center center",
        pin: false,
        markers: false,
        animation: tlHows,
        scrub: true,
      });
    });
});

//our result
document.querySelectorAll(".our-result").forEach((caseEl) => {
  const accordions = caseEl.querySelectorAll(".our-result_accordion");
  const items = caseEl.querySelectorAll(".our-result_item");
  const seeProjectLink = caseEl.querySelector(".our-result_see-project");

  // Assign index manually
  accordions.forEach((acc, index) => (acc.dataset.index = index));
  items.forEach((item, index) => (item.dataset.index = index));

  // Expand/collapse with animated height
  const toggleAccordionHeight = (acc, expand) => {
    const content = acc.querySelector(".our-result_accordion-content");
    if (!content) return;

    if (expand) {
      acc.classList.add("expanded");

      content.style.transition = "none";
      content.style.maxHeight = "0px";
      content.offsetHeight;
      content.style.transition = "max-height 0.3s ease, padding-top 0.3s ease";

      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      acc.classList.remove("expanded");
      content.style.maxHeight = "0px";
    }
  };

  // Activate and update link
  const updateActive = (index) => {
    accordions.forEach((acc) => {
      const isActive = acc.dataset.index === index;
      acc.classList.toggle("active", isActive);
      toggleAccordionHeight(acc, isActive);

      if (isActive && seeProjectLink) {
        const url = acc.dataset.url;
        seeProjectLink.href = "case/" + url;
      }
    });
  };

  // Accordion click scroll
  accordions.forEach((acc) => {
    acc.addEventListener("click", () => {
      const index = acc.dataset.index;
      const item = caseEl.querySelector(
        `.our-result_item[data-index="${index}"]`
      );

      if (item) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: item,
            offsetY: window.innerHeight / 2 - item.offsetHeight / 2,
          },
          ease: "power2.out",
        });
      }

      const isExpanded = acc.classList.contains("expanded");
      accordions.forEach((a) => toggleAccordionHeight(a, false));
      toggleAccordionHeight(acc, !isExpanded);
    });
  });

  // Activate on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          updateActive(index);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  items.forEach((item) => observer.observe(item));
});

//whatwedo
// document.querySelectorAll(".what-we_services").forEach((itemsContainer) => {
//   const items = Array.from(
//     itemsContainer.querySelectorAll(".what-we_service-item")
//   );
//   const itemCount = items.length;

//   const itemWidth = 500;
//   const itemHeight = 100;
//   const padding = 20;

//   const areaWidth = isMobile
//     ? window.innerWidth
//     : itemCount * (itemWidth + padding);
//   const areaHeight = isMobile
//     ? window.innerHeight * 0.45
//     : window.innerHeight * 0.6;


//   if (isMobile != true) {
//     itemsContainer.style.position = "relative";
//     itemsContainer.style.width = `${areaWidth}px`;
//     itemsContainer.style.height = `100%`;
//   }
// });

const panels = gsap.utils.toArray(".what-we_panel");

  mm.add("(min-width: 991px)", () => {
  const master = gsap.timeline({
      scrollTrigger: {
        trigger: ".section_what-we",
        pin: true,
        scrub: true,
        markers: false,
        start: "top top",
        end: () => "+=" + window.innerWidth * panels.length, // extra scroll space
      },
    });

    const BASE_SCROLL_SPEED = 1000; // smaller = longer scroll

    panels.forEach((panel, i) => {
      const inner =
        panel.querySelector(".what-we_inner") ||
        panel.querySelector(".what-we_services");
      const panelWidth = panel.offsetWidth;

      // Step 1: Slide horizontally to this panel
      master.to(panels, {
        xPercent: -100 * i,
        duration: i === 0 ? 0.3 : 2,
        ease: "none",
      });

      // Step 2: Scroll .inner if it overflows
      if (inner && inner.scrollWidth > panelWidth) {
        const scrollDistance = inner.scrollWidth - panelWidth;
        const scrollDuration = scrollDistance / BASE_SCROLL_SPEED;

        if (scrollDistance > 0) {
          master.to(inner, {
            x: -scrollDistance,
            ease: "none",
            duration: scrollDuration,
          });
        } else {
          master.to({}, { duration: 0.3 }); // filler time if no scroll needed
        }
      }

      const items = panel.querySelectorAll(".what-we_service-item[data-expand]");

      items.forEach((item) => {
        const img = item.querySelector("img");
        const svgs = item.querySelectorAll("svg");
        const wrapper = item.querySelector(".what-we_service-item-icon");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 0, opacity: 0, width: 0, marginLeft: 0, marginRight: 0 },
            {
              scale: 1,
              opacity: 1,
              width: "auto",
              transformOrigin: "top right",
              marginLeft: "-43px",
              marginRight: "-18px",
              scrollTrigger: {
                containerAnimation: master,
                trigger: item,
                start: "left 50%",
                end: "right 50%",
                scrub: true,
                markers: false,
              },
            }
          );
        }

        svgs.forEach((svg) => {
          gsap.fromTo(
            svg,
            { scale: 1 },
            {
              scale: 2.5,
              transformOrigin: "top right",
              scrollTrigger: {
                containerAnimation: master,
                trigger: item,
                start: "left 50%",
                end: "right 50%",
                scrub: true,
              },
            }
          );
        });

        if (wrapper) {
          gsap.to(wrapper, {
            gridColumnGap: "0px",
            scrollTrigger: {
              containerAnimation: master,
              trigger: item,
              start: "left 50%",
              end: "right 50%",
              scrub: true,
              markers: false,
            },
          });
        }
      });
    });
  });

  mm.add("(max-width: 992px)", () => {
    // Mobile version
    panels.forEach((panel) => {
      const items = panel.querySelectorAll(".what-we_service-item[data-expand]");

      items.forEach((item) => {
        const wrapper = item.querySelector(".what-we_service-item-icon");
        const img = item.querySelector("img");
        const svgs = item.querySelectorAll("svg");

        if (wrapper) {
          gsap.to(wrapper, {
            gridColumnGap: "0px",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "+=200",
              scrub: false,
              toggleActions: "play none none reverse",
              markers: false,
            },
          });
        }

        if (img) {
          gsap.fromTo(
            img,
            {
              display: "none",
              scale: 0,
              opacity: 0,
              width: 0,
              marginLeft: 0,
              marginRight: 0,
            },
            {
              scale: 1,
              opacity: 1,
              display: "block",
              width: "auto",
              transformOrigin: "top right",
              marginRight: "-1px",
              marginLeft: "-13px",
              duration: 2,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "+=200",
                scrub: true,
                markers: false,
              },
            }
          );
        }

        svgs.forEach((svg) => {
          gsap.fromTo(
            svg,
            { scale: 1 },
            {
              scale: 2.5,
              ease: "none",
              transformOrigin: "top right",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                duration: 1,
                end: "+=200",
                scrub: true,
              },
            }
          );
        });
      });
    });
  });






mm.add("(min-width: 769px)", () => {
  const textWidth = document.querySelector(".connect_content").offsetWidth;
  const footer = document.querySelector(".section_connect");
  const whatWeSection = document.querySelector(".section_what-we");
  const windowWidth = window.innerWidth;

  const pinnedScrollHeight = window.innerWidth * panels.length * 3;

  const getOverlap = () => {
    const baseHeight = footer.offsetHeight;
    return Math.min(window.innerHeight, baseHeight + pinnedScrollHeight);
  };

  const adjustFooterOverlap = () => {
    footer.style.marginTop = -getOverlap() + "px";
  };

  adjustFooterOverlap();
  ScrollTrigger.addEventListener("revert", adjustFooterOverlap);

  ScrollTrigger.create({
    trigger: footer,
    start: () => "top " + (window.innerHeight - getOverlap()),
    end: () => "+=" + (textWidth),
    pin: true,
    markers: false,
  });

  const initialLogoX = textWidth - window.innerWidth / 2 + 10;

  gsap.set(".connect_logo", {
    xPercent: -50,
    yPercent: -50,
    x: initialLogoX,
  });

  gsap.set(".footer-wrapper", { height: "70vh" });
  gsap.set(".connect_logo", {opacity: 1});

  const scrollText = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".connect_wrapper",
        start: "top top",
        end: `+=${textWidth}`,
        scrub: true,
        pin: true,
        markers: false,
      },
    })
    .to({}, { duration: 2 })
    .to(".connect_content", { x: -textWidth, duration: 8, ease: "none" })
    .to(".connect_logo", { x: 0, duration: 7, ease: "none" }, "<");

  const postScrollLogoAnim = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_footer",
      start: "top bottom",
      end: `+=${window.innerHeight}`,
      scrub: true,
      markers: false,
      toggleActions: "play reverse reset reverse",
    },
  });

  gsap.set(".connect_form", { height: "0px", display: "none" });

  postScrollLogoAnim
    .to(".footer", {
      position: "sticky",
      bottom: 0,
      duration: 1,
    })
    .to(".footer-wrapper", { height: "90vh", ease: "none", duration: 2 })
    .to(".connect_logo", { top: "82.2px",  yPercent: 0, ease: "none", duration: 1.5 }, "<+1")
    .to(".connect_logo", { scale: 0.3, ease: "none", duration: 0.9 })
    .to(".connect_logo", {
      opacity: 0,
      duration: 0.1,
      ease: "none",
      onComplete: triggerLogoBurst,
    })
    .to(
      ".connect_form-wrapper",
      { opacity: 1, marginTop: "20vh", ease: "power2.out", duration: 0.4 },
      "<"
    )
    .to(
      ".connect_form",
      {
        height: "max-content",
        display: "flex",
        ease: "power2.out",
        paddingBottom: "0px",
        duration: 0.4,
        delay: 0.1,
      },
      "<"
    )
    .to(".footer-wrapper", {
      height: "68vh",
      ease: "power2.out",
      duration: 0.5,
    }, "<");

  // SplitText animation
  let split = SplitText.create(".connect_content-after", {
    type: "chars",
    charsClass: "letter",
  });

  split.chars.forEach((char) => {
    const randomY = (Math.floor(7 * Math.random()) + 10) * (Math.random() < 0.5 ? -1 : 1) * 10;
    const randomRot = (Math.floor(11 * Math.random()) + 10) * (Math.random() < 0.5 ? -1 : 1);

    gsap.set(char, {
      yPercent: randomY,
      rotation: randomRot,
    });

    gsap.fromTo(
      char,
      {
        yPercent: randomY,
        rotation: randomRot,
      },
      {
        yPercent: 0,
        rotation: 0,
        ease: "elastic.out(1.2, 1)",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollText,
          start: "left 80%",
          end: "left 0%",
          scrub: true,
          markers: false,
        },
      }
    );
  });

  let hasBurstRun = false;

  function triggerLogoBurst() {
    if (hasBurstRun) return;
    hasBurstRun = true;

    const explotionAnimation = document.getElementById("explotionAnimation");
    explotionAnimation.style.display = "block";

    const svgTemplate = `
      <svg class="logo-burst" width="176" height="176" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.8667 159.984C20.7849 152.819 12.4596 133.006 12.4596 87.9857C12.4596 42.9651 20.8132 23.1526 49.8667 15.987V0H0V176H49.8667V160.013V159.984Z" fill="#C4B5F2"/>
        <path d="M126.134 0V15.9896C155.216 23.1564 163.541 42.9721 163.541 88C163.541 133.028 155.216 152.844 126.134 160.01V176H176V0H126.134Z" fill="#C4B5F2"/>
      </svg>`;

    const bg = document.getElementById("explotionBackground");
    let logos = [];

    for (let i = 0; i < 80; i++) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = svgTemplate;
      const logo = wrapper.firstElementChild;
      bg.appendChild(logo);
      logos.push(logo);
    }

    gsap.set(logos, {
      scale: "1",
      x: 100,
      y: 100,
      rotation: "random(0, 360)",
    });

    gsap.to(logos, {
      duration: 5,
      physics2D: {
        velocity: "random(200, 1000)",
        angle: "random(250, 290)",
        gravity: 500,
      },
      onComplete: () => {
        logos.forEach((logo) => logo.remove());
        explotionAnimation.style.display = "none";
        hasBurstRun = false;
      },
    });
  }

  // Cleanup for leaving footer
  ScrollTrigger.create({
    trigger: ".section_footer",
    start: "top bottom",
    end: "bottom bottom",
    onLeaveBack: () => {
      const explotionAnimation = document.getElementById("explotionAnimation");
      if (explotionAnimation) explotionAnimation.style.display = "none";
      hasBurstRun = false;
    },
  });
});
