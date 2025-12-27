import type {Directive} from "vue";
import {useAuthStore} from "@/stores/auth.store.ts";

interface RoleRequiredElement extends HTMLElement {
  __placeholder?: Comment;
}

const directive: Directive<RoleRequiredElement, string> = {
  created(el) {
    el.__placeholder = document.createComment("role-required placeholder");
  },
  mounted(el, binding) {
    const auth = useAuthStore();
    const role = binding.value;

    // If user does NOT have the role, replace the element with the placeholder
    if (!auth.hasRole(role) && el.__placeholder) {
      el.parentNode?.replaceChild(el.__placeholder, el);
    }
  },
  updated(el, binding) {
    const auth = useAuthStore();
    const role = binding.value;
    const placeholder = el.__placeholder;

    // If user has role -> ensure the real element is in the DOM
    if (auth.hasRole(role)) {
      if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.replaceChild(el, placeholder);
      }
      return;
    }

    // If user does NOT have role -> ensure placeholder is in the DOM
    if (el.parentNode && placeholder) {
      el.parentNode.replaceChild(placeholder, el);
    }
  },
  unmounted(el) {
    const placeholder = el.__placeholder;
    // Remove placeholder if still present
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }
    delete el.__placeholder;
  }
};

export default directive;
