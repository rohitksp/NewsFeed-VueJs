import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostList from "@/components/posts/PostList.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PostList.vue", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      // posts_data: () => [
      //   {
      //     userName: "John",
      //     title: "qui est esse",
      //     body: "est rerum tempore vitae\nsequi sint nihil",
      //     id: 2,
      //     userId: 1,
      //   },
      // ],
      // get_userId: () => 2,
      login_status: () => true,
    };
    actions = {
      loginStatus: jest.fn(),
      getUserId: jest.fn(),
      getPosts: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it("Checking the userLogin button", () => {
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
      stubs: ["router-link"],
    });
    wrapper.find(".success-btn").trigger("click");
    expect(actions.loginStatus).toHaveBeenCalled();
  });
});
