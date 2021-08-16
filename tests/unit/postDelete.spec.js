import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostDelete from "@/components/posts/PostDelete.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};

describe("PostDelete.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      deletePost: jest.fn(),
      getPosts: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("Checking router in the component", () => {
    const wrapper = shallowMount(PostDelete, {
      stubs: ["router-link"],
      mocks: {
        $router,
      },
    });
    wrapper.find("button").trigger("click");
    expect($router.push).lastCalledWith("/");
  });

  it("Checking header in the register file", () => {
    const wrapper = shallowMount(PostDelete, {
      stubs: ["router-link"],
    });
    expect(wrapper.find(".header").text()).toEqual("Delete The Post");
  });

  it("Checking the button", () => {
    const wrapper = shallowMount(PostDelete, {
      stubs: ["router-link"],
      localVue,
      store,
    });
    wrapper.find("button").trigger("click");
    expect(actions.deletePost).toHaveBeenCalled();
  });
});
