import {type Directive} from "vue";

interface AutoScrollElement extends HTMLElement {
  __autoScrollCleanup__?: () => void;
}

const directive: Directive<AutoScrollElement, string> = {
  mounted(el) {
    let isAtBottom = true;
    let hadOverflow = false;

    const updateIsAtBottom = () => {
      isAtBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    };

    el.addEventListener("scroll", updateIsAtBottom);

    const observer = new ResizeObserver(() => {
      const hasOverflow = el.scrollHeight > el.clientHeight;

      // ✅ Scroll when scrollbar FIRST appears
      if (hasOverflow && !hadOverflow) {
        el.scrollTop = el.scrollHeight;
      }
      // ✅ Normal behavior: scroll only if user is at bottom
      else if (hasOverflow && isAtBottom) {
        el.scrollTop = el.scrollHeight;
      }

      hadOverflow = hasOverflow;
    });

    observer.observe(el);

    el.__autoScrollCleanup__ = () => {
      observer.disconnect();
      el.removeEventListener("scroll", updateIsAtBottom);
    };
  },

  unmounted(el) {
    el.__autoScrollCleanup__?.();
  }
};

export default directive;
