import { shallowMount, createLocalVue } from "@vue/test-utils";
import PostList from "@/components/posts/PostList.vue";
import PostDelete from "@/components/posts/PostDelete.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
const $router = {
  push: jest.fn(),
};

describe("PostList.vue and PostDelete.vue", () => {
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
          userId: 2,
        },
      ],
      get_userId: () => 2,
    };
    actions = {
      getPosts: jest.fn(),
      deletePost: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it("Checking if user cick on delete button on the home page", () => {
    // In the first test, I have checked if the user will click on the delete button on the
    // home page, first I found the button, and then inside the function was using router and getters
    // so I initialized the router and getters which are “posts_data” and “get_userId” in my test file,
    // also I used the “stubs” because in the “PostDelete.vue” file using “router-link” that’s why.
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
      stubs: ["router-link"],
      mocks: {
        $router,
      },
    });
    wrapper.find("#deleteBtn").trigger("click");
    expect($router.push).lastCalledWith("/postdelete/2");
  });

  it("Checking the yes button in delete post", () => {
    const wrapper = shallowMount(PostDelete, {
      localVue,
      store,
      stubs: ["router-link"],
    });
    wrapper.find(".danger-btn").trigger("click");
    expect(actions.deletePost).toHaveBeenCalled();
  });
});
