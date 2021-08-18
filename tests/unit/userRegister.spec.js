import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostList from "@/components/posts/PostList.vue";
import Register from "@/components/Register.vue";

const $router = {
  push: jest.fn(),
};
const localVue = createLocalVue();
localVue.use(Vuex);

describe("PostList.vue and Register.vue", () => {
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
    };
    actions = {
      getUserInfo: jest.fn(),
      registerUser: jest.fn(),
      getPosts: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });
  it("Checking register button in this file", () => {
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
      mocks: {
        $router,
      },
    });
    wrapper.find("#registerBtn").trigger("click");
    expect($router.push).lastCalledWith("/register");
  });

  it("Checking user input data", () => {
    const wrapper = shallowMount(Register, {
      localVue,
      store,
      data: function() {
        return {
          userData: {
            userName: "Rohit",
            email: "rohit123@gmail.com",
            password: "rohit@123",
          },
        };
      },
    });
    const userName = wrapper.find("#userName").element.value;
    const emailId = wrapper.find("#emailId").element.value;
    const password = wrapper.find("#password").element.value;
    expect(userName).toEqual("Rohit");
    expect(emailId).toEqual("rohit123@gmail.com");
    expect(password).toEqual("rohit@123");
  });
  it("Checking user form button", () => {
    const wrapper = shallowMount(Register, {
      localVue,
      store,
    });
    wrapper.find("form").trigger("submit");
    expect(actions.registerUser).toHaveBeenCalled();
  });
});
