import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import PostList from "@/components/posts/PostList.vue";
import Register from "@/components/Register.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const routes = [
  { path: "/", component: PostList },
  { path: "/register", component: Register },
];

describe("Register.vue", () => {
  let actions;
  let store;
  let router;

  beforeEach(() => {
    actions = {
      loginStatus: jest.fn(),
      getUserInfo: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
    router = new VueRouter({
      routes,
    });
  });

  it("Checking router in the component", () => {
    const wrapper = shallowMount(Register, {
      localVue,
      store,
      router,
      mocks: {
        $route: { path: "/register" },
      },
    });
    expect(wrapper.vm.$route.path).toBe("/register");
    expect(wrapper.vm.$route).toBeInstanceOf(Object);
  });

  it("Checking header in the register file", () => {
    const wrapper = shallowMount(Register, {
      localVue,
      store,
    });
    const classTag = wrapper.find(".header");
    expect(classTag.text()).toEqual("Register Page");
  });
});
