import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/components/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};
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

  it("Checking back button is working properly", () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store,
      mocks: {
        $router,
      },
    });
    wrapper.find("#danger").trigger("click");
    expect($router.push).lastCalledWith("/");
  });

  it("Checking home button", () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store,
    });
    wrapper.find("#danger").trigger("click");
    expect(actions.loginStatus).toHaveBeenCalled();
  });
});
