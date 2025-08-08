gsap.registerPlugin(Flip, SplitText, ScrollTrigger);

const mm = gsap.matchMedia();
document.fonts.ready.then(() => {
    
  const quotes = document.querySelectorAll(".founder-desc");


  const founderDesc = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_about-founders",
      start: "top top",
      end: "bottom+=200% top",
      scrub: true,
      pin: true,
      markers: false,
      id: "founderPin",
    },
  });
  
  quotes.forEach((quote) => {
    if (!quote) return; 
    const split = new SplitText(quote, {
      type: "lines,words",
      linesClass: "line",
      mask: "lines",
    });

    const lines = split.lines;

    const founderDescTl = gsap.timeline();

    founderDescTl
      .from(lines, {
        yPercent: 100,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
      })

      .to(quote.querySelectorAll("span"), {
        color: "var(--swatch--photon)",
        opacity: 1,
        duration: 1
      })

    .to(lines, {
        color: "var(--swatch--grey)",
        duration: 1,
      }, "<")

      .to(lines, {
        yPercent: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
        stagger: 0.5,
        delay: 1,
      });

    founderDesc.add(founderDescTl);
  });
  


  const movingImg = document.querySelector(".founder-image");
  const moveHere = document.querySelector(".goal-move-here");
  const beforeSection = document.querySelector(".section_about-founders");

  if (movingImg && moveHere && beforeSection) {
  ScrollTrigger.create({
    trigger: ".section_about-founders",
    start: "bottom+=100 bottom",
    end: "+=100",
    markers: false,
    onEnter: () => {
      const state = Flip.getState(movingImg);
      moveHere.appendChild(movingImg);
      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
        absolute: true,
      });
    },
    onLeaveBack: () => {
      const state = Flip.getState(movingImg);
      beforeSection.appendChild(movingImg);
      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
        absolute: true,
      });
    },
  });
}

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_about-goal",
      start: "top-=150 top",
      end: "+=100",
      markers: false,
      scrub: true,
      pin: false,
    },
  });

  tl.to(movingImg, {clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "power2.in"});
  tl.from(".icons-goal", { autoAlpha: 0 }, "<");



//about-name section
gsap.set(".name_text-one", { autoAlpha: 0 });
gsap.set(".name_text-two", { autoAlpha: 0 });
gsap.set(".about-name_right", { yPercent: 50 });
gsap.set(".about-name_desc", { color: "#DFDDD7" });

mm.add("(min-width: 769px)", () => {
    const nameTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_about-name",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true,
    markers: false,
  },
});
nameTl
  .to(".about-name_right", { yPercent: 18, duration: 1, ease: "none" })
  .to(".name_text-one", { autoAlpha: 1, duration: 1, delay: 0.5, ease: "none" }, "<")
  .to(".about-name_desc:nth-child(1)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<")
  .to("#maskRectLeft", {attr: { y: -300 }, duration: 1.5, ease: "none" })
  .to("#maskRectRight", { attr: { y: -300 }, duration: 1.5, ease: "none", }, "<")
  .to(".mask_one", { top: "50%", ease: "none", duration: 1.1 }, "<")
  .to(".about-name_right", { yPercent: -8, duration: 1, ease: "none" }, "<")
  .to(".about-name_desc:nth-child(1)", { autoAlpha: 0, duration: 0.5, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(2)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<")
  .set("#maskRectLeft", { attr: { y: 300 } })
  .set("#maskRectRight", { attr: { y: 300 } })
  .to(".about-name_right", { yPercent: -38, duration: 1, ease: "none" })
  .to("#maskRectLeft", { attr: { y: 0 }, duration: 1.5, ease: "none" }, "<")
  .to(".about-name_desc:nth-child(2)", { autoAlpha: 0, duration: 0.5, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(3)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<")
  .to("#maskRectRight", {attr: { y: 0 }, duration: 1.5, ease: "none"})
  .to(".about-name_right", { yPercent: -68, duration: 1, ease: "none" }, "<")
  .to(".mask_one", { top: "0%", ease: "none", duration: 1, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(3)", { autoAlpha: 0, duration: 0.5, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(4)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<");
});
mm.add("(max-width: 768px)", () => {
    const nameTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_about-name",
    start: "top top",
    end: "+=100%",
    scrub: 0.5,
    pin: true,
    markers: false,
  },
});
nameTl
  .to(".about-name_right", { yPercent: 9, duration: 1, ease: "none" })
  .to(".name_text-one", { autoAlpha: 1, duration: 1, delay: 0.5, ease: "none" }, "<")
  .to(".about-name_desc:nth-child(1)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<")
  .to("#maskRectLeft", {attr: { y: -300 }, duration: 1.5, ease: "none" })
  .to("#maskRectRight", { attr: { y: -300 }, duration: 1.5, ease: "none", }, "<")
  .to(".mask_one", { top: "50%", ease: "none", duration: 1.1 }, "<")
  .to(".about-name_right", { yPercent: -21 , duration: 1, ease: "none" }, "<")
  .to(".about-name_desc:nth-child(1)", { autoAlpha: 0, duration: 0.5, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(2)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<")
  .set("#maskRectLeft", { attr: { y: 300 } })
  .set("#maskRectRight", { attr: { y: 300 } })
  .to(".about-name_right", { yPercent: -52, duration: 1, ease: "none" })
  .to("#maskRectLeft", { attr: { y: 0 }, duration: 1.5, ease: "none" }, "<")
  .to(".about-name_desc:nth-child(2)", { autoAlpha: 0, duration: 0.5, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(3)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<")
  .to("#maskRectRight", {attr: { y: 0 }, duration: 1.5, ease: "none"})
  .to(".about-name_right", { yPercent: -79 , duration: 1, ease: "none" }, "<")
  .to(".mask_one", { top: "0%", ease: "none", duration: 1, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(3)", { autoAlpha: 0, duration: 0.5, delay: 0.5 }, "<")
  .to(".about-name_desc:nth-child(4)", { color: "var(--color--text)", duration: 0.5, ease: "none" }, "<");
});



// ScrollTrigger.create({
//   trigger: ".section_about-model",
//   start: "top top",
//   end: "bottom+=100% bottom",
//   pin: false,
//   scrub: true,
//   markers: true
// });

function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}

const debouncedRefresh = debounce(() => {
  ScrollTrigger.refresh();
}, 200);

    mm.add("(min-width: 769px)", () => {
         document.querySelectorAll(".accordion-item").forEach((el) => {
            const icon = el.querySelector(".accordion-item-icon-bottom");

            gsap.to(el, {
                scrollTrigger: {
                trigger: el,
                start: "top-=300 top",
                end: "+=150",
                scrub: 0.5,
                markers: false,
                onUpdate: debouncedRefresh
                },
                height: "auto",
                duration: 0.5,
                ease: "power2.out"
            });

            if (icon) {
                gsap.to(icon, {
                scrollTrigger: {
                    trigger: el,
                    start: "top-=300 top",
                    end: "+=150",
                    scrub: 0.5,
                    onUpdate: debouncedRefresh
                },
                top: "80%",
                ease: "power2.out"
                });
            }
            });
    });

mm.add("(max-width: 768px)", () => {
  document.querySelectorAll(".accordion-item").forEach((el) => {
    const icon = el.querySelector(".accordion-item-icon-bottom");

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%", 
       toggleActions: "play none none reverse",
        markers: false
      },
      height: "auto",
      duration: 0.5,
      ease: "power2.out"
    });

    if (icon) {
      gsap.to(icon, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        toggleActions: "play none none reverse",
          markers: false
        },
        top: "80%",
        duration: 0.5,
        ease: "power2.out"
      });
    }
  });
});


  

  


  //vision section
    let visionTop = SplitText.create(".about-vision_content-top", {
    type: "chars, words",
  });
  let visionBottom = SplitText.create(".about-vision_content-bottom", {
    type: "chars, words",
  });


//   mm.add("(min-width: 769px)", () => {
     let visionTimeline = gsap.timeline({
        scrollTrigger: {
        trigger: ".section_about-vision",
        start: "top-=100 top",
        end: "bottom+=100% top",
        scrub: false,
        toggleActions: "play none none reverse",
        markers: false,
        pin: false,
        },
    });

    visionTimeline
    .from(visionTop.chars, {y: -100, rotation: -20, autoAlpha: 0,
      stagger: {
        each: 0.05,
      },
      ease: "circ.out",
    })

    .from(
      visionBottom.chars,
      {
        y: 100,
        rotation: 20,
        autoAlpha: 0,
        stagger: {
          each: 0.05,
        },
        ease: "circ.out",
      },
      "<"
    );
//   })
//   mm.add("(max-width: 768px)", () => {
//          let visionTimeline = gsap.timeline({
//         scrollTrigger: {
//         trigger: ".section_about-vision",
//         start: "top top",
//         end: "bottom+=100% top",
//         toggleActions: "play none none reverse",
//         },
//     });

//     visionTimeline
//     .from(visionTop.chars, {y: -100, rotation: -20, autoAlpha: 0,
//       stagger: {
//         each: 0.05,
//       },
//       ease: "circ.out",
//     })

//     .from(
//       visionBottom.chars,
//       {
//         y: 100,
//         rotation: 20,
//         autoAlpha: 0,
//         stagger: {
//           each: 0.05,
//         },
//         ease: "circ.out",
//       },
//       "<"
//     );
//   })




  



    //text-reveal
    document.querySelectorAll(".about-reveal").forEach((el) => {
    let split = SplitText.create(el, { type: "lines, chars, words" });

    const revealTl = gsap.timeline ({
      scrollTrigger: {
        trigger: el,
        start: "top-=400 top",
        end: "+=300",
        scrub: true,
        markers: false,
      },
    });

    revealTl.from(split.chars, {
      autoAlpha: 0.5,
      color: "#DFDDD7",
      stagger: {
        each: 0.05,
      },
    })
    .to(split.chars, {
    //   autoAlpha: 0.5,
      color: "#DFDDD7",
     stagger: {
        each: 0.05,
      },
      delay: 1
    });
  });





});

