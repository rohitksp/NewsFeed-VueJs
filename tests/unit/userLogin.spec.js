import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostList from "@/components/posts/PostList.vue";
import Login from "@/components/Login.vue";
import Swal from "sweetalert2";

const $router = {
  push: jest.fn(),
};
const localVue = createLocalVue();

localVue.use(Vuex);

describe("PostList.vue", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      get_userData: () => [
        {
          userName: "Aman",
          email: "aman@gmail.com",
          password: "aman123",
          id: 1,
        },
      ],
      login_status: () => false,
    };
    actions = {
      loginStatus: jest.fn(),
      getUserId: jest.fn(),
      getPosts: jest.fn(),
      getUserInfo: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    window.scrollTo = () => {};
  });

  it("Checking the router in this file", () => {
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
      stubs: ["router-link"],
      mocks: {
        $router,
      },
    });
    wrapper.find(".success-btn").trigger("click");
    expect($router.push).lastCalledWith("/login");
  });

  it("Checking the userLogin button", () => {
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
      stubs: ["router-link"],
    });
    wrapper.find(".success-btn").trigger("click");
    expect(actions.loginStatus).toHaveBeenCalled();
  });

  it("Checking user input data", () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store,
      data() {
        return {
          userName: "Rohit",
          password: "rohit@123",
        };
      },
    });
    const userName = wrapper.find("#userName").element.value;
    const password = wrapper.find("#password").element.value;
    expect(userName).toEqual("Rohit");
    expect(password).toEqual("rohit@123");
  });

  it("Checking user form data", () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store,
    });
    return Promise.resolve().then(() => {
      return Swal.fire({
        hideClass: false,
        didOpen: () => {
          Swal.clickConfirm();
        },
      });
      wrapper.find("form").trigger("submit");
      expect(actions.loginStatus).toHaveBeenCalled();
    });
  });
});
