import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Hook untuk meng-handle animasi toggle (expand / collapse)
 * @param {number} duration - Durasi animasi dalam ms (default: 300)
 * @returns {object} - { isOpen, toggle, contentRef, iconRef }
 */

export default function useToggleAnimation(duration = 300) {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const content = contentRef.current;
    const icon = iconRef.current;

    if (!content || !icon) return;

    content.style.transition = `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out, margin ${duration}ms ease-in-out`;
    content.style.overflow = "hidden";
    content.style.maxHeight = "0px";
    content.style.opacity = "0";
    content.style.marginTop = "0";

    if (isOpen) {
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
      content.style.marginTop = "0";
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "1";
      content.style.marginTop = "1rem";
      if (icon) {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
    }
  }, [isOpen, duration]);

  return {
    toggle,
    contentRef,
    iconRef,
  };
}
