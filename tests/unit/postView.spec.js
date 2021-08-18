import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostView from "@/components/posts/PostView.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PostView.vue", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      posts_data: () => [
        {
          userName: "John",
          title: "qui est esse",
          body: "est rerum tempore vitae\nsequi sint nihil",
          id: 2,
          userId: 1,
        },
      ],
      comments_data: () => [
        {
          id: 1,
          postId: "10",
          author: "Rohit",
          message: "Bad news",
        },
      ],
    };
    actions = {
      getComments: jest.fn(),
      getPosts: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it("Checking header name", () => {
    const wrapper = shallowMount(PostView, {
      propsData: {
        id: 2,
      },
      localVue,
      store,
    });
    expect(wrapper.find(".header").text()).toBe("View Post");
  });
});
