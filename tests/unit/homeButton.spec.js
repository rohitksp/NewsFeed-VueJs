import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import HomeButton from "@/components/HomeButton.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("HomeButton.vue", () => {
  it("Checking router-link button name", () => {
    const wrapper = shallowMount(HomeButton, {
      stubs: ["router-link", "router-view"],
    });
    const classTag = wrapper.find("#danger");
    expect(classTag.text()).toEqual("Home");
  });
});
