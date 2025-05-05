import gsap from 'gsap';

export const GsapAnimateElement = (
  elements: string | string[],
  fromProps: gsap.TweenVars,
  toProps: gsap.TweenVars,
  scrollTriggerProps?: Partial<gsap.plugins.ScrollTrigger> | Partial<gsap.plugins.ScrollTrigger>[]
) => {
  const targetElements = typeof elements === "string"
    ? gsap.utils.toArray(elements) as Element[]
    : elements.flatMap(selector => gsap.utils.toArray(selector) as Element[]);

  const isArrayOfScrollProps = Array.isArray(scrollTriggerProps);

  targetElements.forEach((element, index) => {
    const individualScrollProps = isArrayOfScrollProps
      ? (scrollTriggerProps as Partial<gsap.plugins.ScrollTrigger>[])[index] || {}
      : (scrollTriggerProps || {});

    gsap.fromTo(
      element,
      fromProps,
      {
        ...toProps,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          scrub: 1,
          // markers: true, // you can set this dynamically too
          ...individualScrollProps,
        },
      }
    );
  });
};