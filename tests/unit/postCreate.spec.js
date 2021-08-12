import { shallowMount } from "@vue/test-utils";
import PostCreate from "@/components/posts/PostCreate.vue";

const factory = () => {
  return shallowMount(PostCreate, {
    data() {
      return {
        postData: {
          userName: "Rohit",
          title: "Today's news",
          body: "Good weather in the delhi",
        },
      };
    },
  });
};

describe("PostCreate.vue", () => {
  it("Checking userName field", () => {
    const wrapper = factory();
    expect(wrapper.find("#user-name").element.value).toEqual("Rohit");
  });
  it("Checking title field", () => {
    const wrapper = factory();
    expect(wrapper.find("#title").element.value).toEqual("Today's news");
  });
  it("Checking description field", () => {
    const wrapper = factory();
    expect(wrapper.find("#description").element.value).toEqual(
      "Good weather in the delhi"
    );
  });
});
