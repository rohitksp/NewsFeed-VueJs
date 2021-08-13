import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import PostList from "@/components/posts/PostList.vue";
import Login from "@/components/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const routes = [
  { path: "/", component: PostList },
  { path: "/login", component: Login },
];

describe("Login.vue", () => {
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
    const wrapper = shallowMount(Login, {
      localVue,
      store,
      router,
      mocks: {
        $route: { path: "/login" },
      },
    });
    expect(wrapper.vm.$route.path).toBe("/login");
    expect(wrapper.vm.$route).toBeInstanceOf(Object);
  });

  it("Checking home button", () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store,
      router,
      mocks: {
        $route: { path: "/login" },
      },
    });
    wrapper.find("#danger").trigger("click");
    expect(actions.loginStatus).toHaveBeenCalled();
  });
});
