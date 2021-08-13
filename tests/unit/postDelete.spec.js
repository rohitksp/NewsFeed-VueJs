import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import PostDelete from "@/components/posts/PostDelete.vue";
import PostList from "@/components/posts/PostList.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const routes = [
  { name: "postlist", path: "/", component: PostList },
  { name: "postdelete", path: "/postdelete", component: PostDelete },
];

describe("PostDelete.vue", () => {
  let actions;
  let store;
  let router;

  beforeEach(() => {
    actions = {
      deletePost: jest.fn(),
      getPosts: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
    router = new VueRouter({
      routes,
    });
  });

  it("Checking router in the component", () => {
    const wrapper = shallowMount(PostDelete, {
      stubs: ["router-link"],
      mocks: {
        $route: { path: "/postdelete" },
      },
    });
    expect(wrapper.vm.$route.path).toBe("/postdelete");
    expect(wrapper.vm.$route).toBeInstanceOf(Object);
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
