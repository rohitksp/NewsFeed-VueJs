import { shallowMount, createLocalVue } from "@vue/test-utils";
import NotFound from "@/components/NotFound.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("NotFound.vue", () => {
  it("Checking error message", () => {
    const wrapper = shallowMount(NotFound, {
      stubs: ["router-link", "router-view"],
    });
    expect(wrapper.find(".error").text()).toEqual("Oops! 404 Page not found.");
  });
});
