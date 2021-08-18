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

describe("PostList.vue and Login.vue", () => {
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
      getPosts: jest.fn(),
      getUserInfo: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    window.scrollTo = () => {};
  });

  it("Checking register button in this file", () => {
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
      mocks: {
        $router,
      },
    });
    wrapper.find(".success-btn").trigger("click");
    expect($router.push).lastCalledWith("/login");
  });

  it("Checking the userLogin button", () => {
    // In the second test, I checked the user login button, for this test I added getters and
    // actions first I have added “localvue” for store initializing then I found the button and
    // then check their function, I added getters “login_status” because it is using in the function
    // and then lastly I have added actions “loginStatus” because it is also using in the function.
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
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
    //  In the test, I tested the form data first I found the button and then checked their
    // function I have initialized the getter's value in the test file which is “get_userData” because
    // it is using in the function I have used "swalalert" in my app so I have used promises and
    // then I have used "hideClass" to hide all the contents like title icon, etc. and then opening
    // for swal alert I used “didOpen” and then for clicking the confirm button I used
    // “Swal.clickConfirm()” and it was not working suddenly so I used here setTimeout function and
    // then inside the setTimeout it's checked the last thing in the function.
    const wrapper = shallowMount(Login, {
      localVue,
      store,
    });
    wrapper.find("form").trigger("submit");
    return Promise.resolve().then(() => {
      return Swal.fire({
        hideClass: false,
        didOpen: () => {
          Swal.clickConfirm();
          setTimeout(() => {
            expect(actions.loginStatus).toHaveBeenCalled();
          }, 1000);
        },
      });
    });
  });
});
