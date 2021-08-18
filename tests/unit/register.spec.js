import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Register from "@/components/Register.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};

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

  it("Checking router in the component", () => {
    const wrapper = shallowMount(Register, {
      localVue,
      store,
      mocks: {
        $router,
      },
    });
    wrapper.find("#danger").trigger("click");
    expect($router.push).lastCalledWith("/");
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
