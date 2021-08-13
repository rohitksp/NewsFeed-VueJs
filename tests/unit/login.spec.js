import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Login from "@/components/Login.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("Login.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      loginStatus: jest.fn(),
      getUserInfo: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("Checking home button", () => {
    const wrapper = shallowMount(Login, {
      stubs: ["router-link", "router-view"],
      localVue,
      store,
    });
    wrapper.find("#danger").trigger("click");
    expect(actions.loginStatus).toHaveBeenCalled();
  });
});
