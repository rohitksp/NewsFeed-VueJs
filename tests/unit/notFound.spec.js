import { shallowMount } from "@vue/test-utils";
import NotFound from "@/components/NotFound.vue";

describe("NotFound.vue", () => {
  it("Checking error message", () => {
    const wrapper = shallowMount(NotFound, {
      stubs: ["router-link"],
    });
    expect(wrapper.find(".error").text()).toEqual("Oops! 404 Page not found.");
  });
});
