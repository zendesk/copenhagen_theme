import { useEffect, useCallback } from "react";

const observedElements = new Map<Element, () => void>();

let observer: IntersectionObserver | null = null;

const getObserver = () => {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementCallback = observedElements.get(entry.target);
          if (elementCallback) {
            elementCallback();
            observer?.unobserve(entry.target);
            observedElements.delete(entry.target);
          }
        }
      });
    },
    { threshold: 1.0 }
  );

  return observer;
};

export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  markCommentAsVisible: () => void
) => {
  const observe = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const ob = getObserver();
    observedElements.set(element, markCommentAsVisible);
    ob.observe(element);
  }, [ref, markCommentAsVisible]);

  const unobserve = useCallback(() => {
    const element = ref.current;
    if (!element || !observer) return;

    observer.unobserve(element);
    observedElements.delete(element);
  }, [ref]);

  useEffect(() => {
    observe();

    return () => unobserve();
  }, [observe, unobserve]);
};
