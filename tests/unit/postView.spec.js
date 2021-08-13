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
      loading_status: () => true,
    };
    actions = {
      loginStatus: jest.fn(),
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
      localVue,
      store,
    });
    expect(wrapper.find(".header").text()).toBe("View Post");
  });
});
