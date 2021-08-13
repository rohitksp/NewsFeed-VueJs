import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import PostDelete from "@/components/posts/PostDelete.vue";

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(Vuex);

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

  it("Checking header name", () => {
    const wrapper = shallowMount(PostDelete, {
      stubs: ["router-link", "router-view"],
    });
    expect(wrapper.find(".header").text()).toEqual("Delete The Post");
  });
  it("Checking the button", () => {
    const wrapper = shallowMount(PostDelete, { localVue, store });
    wrapper.find("button").trigger("click");
    expect(actions.deletePost).toHaveBeenCalled();
  });
});
