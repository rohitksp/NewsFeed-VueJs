import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Register from "@/components/Register.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("Register.vue", () => {
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

  it("Checking header in the register file", () => {
    const wrapper = shallowMount(Register, {
      stubs: ["router-link", "router-view"],
      localVue,
      store,
    });
    const classTag = wrapper.find(".header");
    expect(classTag.text()).toEqual("Register Page");
  });

  it("Checking home button", () => {
    const wrapper = shallowMount(Register, {
      stubs: ["router-link", "router-view"],
      localVue,
      store,
    });
    wrapper.find("#danger").trigger("click");
    expect(actions.loginStatus).toHaveBeenCalled();
  });
});
