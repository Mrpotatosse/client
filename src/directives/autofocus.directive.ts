import {type Directive, nextTick} from "vue";

const directive: Directive<HTMLElement, string> = {
  async mounted(el) {
    await nextTick(() => el.focus());
  },
};

export default directive;
