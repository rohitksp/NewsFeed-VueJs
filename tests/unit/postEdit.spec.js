import { shallowMount } from "@vue/test-utils";
import PostEdit from "@/components/posts/PostEdit.vue";

describe("PostEdit.vue", () => {
  const wrapper = shallowMount(PostEdit);
  it("Checking header of the edit file", () => {
    const classTag = wrapper.find(".header");
    expect(classTag.text()).toEqual("Edit The Post");
  });
});
