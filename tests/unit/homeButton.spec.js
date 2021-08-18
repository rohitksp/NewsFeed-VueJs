import { shallowMount } from "@vue/test-utils";
import HomeButton from "@/components/HomeButton.vue";

describe("HomeButton.vue", () => {
  it("Checking router-link button name", () => {
    const wrapper = shallowMount(HomeButton, {
      stubs: ["router-link"],
    });
    const classTag = wrapper.find("#danger");
    expect(classTag.text()).toEqual("Home");
  });
});
