gsap.registerPlugin(ScrollTrigger, SplitText);


const mm = gsap.matchMedia();

document.addEventListener("DOMContentLoaded", () => {

    mm.add("(min-width: 769px)", () => {
      const allLis = document.querySelectorAll(".audit-step");
      const tlHows = gsap.timeline();
      const heading = document.querySelector(".audit-steps_icon svg");
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
        trigger: ".audit-steps_icon",
        start: "center center",
        endTrigger: ".audit-step:last-of-type",
        end: "center center",
        pin: true,
        markers: false,
        animation: tlHows,
        scrub: true,
      });
    });

    mm.add("(max-width: 768px)", () => {
      const allLis = document.querySelectorAll(".audit-step");
      const tlHows = gsap.timeline();
      const heading = document.querySelector(".audit-steps_icon svg");
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
        trigger: ".audit-steps_icon",
        start: "center center",
        endTrigger: ".audit-step:last-of-type",
        end: "center center",
        pin: false,
        markers: false,
        animation: tlHows,
        scrub: true,
      });
    });
});



$( document ).ready(function() {
    console.clear();
    $('video').addClass('video-background');



const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});



setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);
});



const wrappers = gsap.utils.toArray(".section_audit-questions .audit-question");
const videos   = wrappers.map(w => w.querySelector("video"));

// Wait for all durations
Promise.all(videos.map(v => new Promise(res => {
  if (v.readyState >= 1 && !isNaN(v.duration)) return res();
  v.addEventListener("loadedmetadata", res, { once: true });
}))).then(() => buildTimeline());

function buildTimeline() {
  // Pixels of scroll per second of video time (tweak feel here)
  const PX_PER_SEC = 200;

  const totalSeconds = videos.reduce((sum, v) => sum + v.duration, 0);
  const totalScroll  = Math.max(1, Math.round(totalSeconds * PX_PER_SEC));

  // Ensure all start hidden; first will fade in
  gsap.set(wrappers, { opacity: 0 });
  // Safari/iOS paint hints
  videos.forEach(v => { try { v.currentTime = 0; } catch(e){} });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".section_audit-questions",
      start: "top top",
      end: `+=${totalScroll}`,
      scrub: true,
      pin: true,
      markers: true,
      anticipatePin: 1
    }
  });

const lastIndex = videos.length - 1;

  videos.forEach((video, i) => {
    const wrap = wrappers[i];
    const segSeconds = video.duration;             
    const fade = 0.3;                               
    const isLast = i === lastIndex;

    // 1) Fade in this video at the beginning of its segment
    tl.to(wrap, { opacity: 1, duration: fade });

    // 2) Scrub through the video frames for the bulk of the segment
    tl.fromTo(video, 
      { currentTime: 0 },
      { currentTime: segSeconds, duration: segSeconds, ease: "none" },
      "<" // start at the same time as fade-in
    );

    // 3) Fade out just before the segment ends (so next can appear)
     if (!isLast) {
      tl.to(wrap, { opacity: 0, duration: fade }, `>-=${fade}`);
    } else {
      tl.to({}, { duration: fade });
    }
  });


  
}
