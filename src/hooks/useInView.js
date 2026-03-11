import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isInView].
 * Attach `ref` to a DOM element; `isInView` becomes true once
 * the element enters the viewport (and stays true — fires once).
 *
 * @param {number} threshold  - 0–1, how much of the element must be visible
 * @param {string} rootMargin - e.g. "0px 0px -80px 0px" to trigger slightly early
 */
const useInView = (threshold = 0.15, rootMargin = "0px 0px -60px 0px") => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element); // fire once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView];
};

export default useInView;
