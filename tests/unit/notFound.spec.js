import { shallowMount } from "@vue/test-utils";
import PostCreate from "@/components/posts/PostCreate.vue";

describe("PostCreate.vue", () => {
  it("Checking error message", () => {
    const wrapper = shallowMount(PostCreate);
    expect(wrapper.find(".error").exists()).toBe(true);
  });
});
