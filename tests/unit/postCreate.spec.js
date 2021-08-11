import { shallowMount } from "@vue/test-utils";
import PostCreate from "@/components/posts/PostCreate.vue";

describe("PostCreate.vue", () => {
  it("Checking input fields", () => {
    const wrapper = shallowMount(PostCreate, {
      data() {
        return {
          postData: {
            userName: "Rohit",
            title: "Today's news",
            body: "Good weather today in delhi",
          },
        };
      },
    });
    expect(wrapper.find("#user-name").element.value).toBe("Rohit");
    expect(wrapper.find("#title").element.value).toBe("Today's news");
    expect(wrapper.find("#description").element.value).toBe(
      "Good weather today in delhi"
    );
  });
});
