import { shallowMount, createLocalVue } from "@vue/test-utils";
import PostList from "@/components/posts/PostList.vue";
import PostCreate from "@/components/posts/PostCreate.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
const $router = {
  push: jest.fn(),
};

describe("PostList.vue and PostCreate.vue", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      login_status: () => true,
      get_userId: () => 2,
    };
    actions = {
      getPosts: jest.fn(),
      addPost: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it("Checking create post button in the home page", () => {
    const wrapper = shallowMount(PostList, {
      localVue,
      store,
      mocks: {
        $router,
      },
    });
    wrapper.find("#addPost").trigger("click");
    expect($router.push).lastCalledWith("/postcreate");
  });

  it("Checking user input in creatpost page", () => {
    const wrapper = shallowMount(PostCreate, {
      data() {
        return {
          postData: {
            userName: "Rohit",
            title: "Todya's News",
            body: "Good weather in the delhi",
          },
        };
      },
    });
    const userName = wrapper.find("#user-name").element.value;
    const title = wrapper.find("#title").element.value;
    const description = wrapper.find("#description").element.value;
    expect(userName).toEqual("Rohit");
    expect(title).toEqual("Todya's News");
    expect(description).toEqual("Good weather in the delhi");
  });

  it("Checking form data if user will click on the submit button", () => {
    const wrapper = shallowMount(PostCreate, {
      localVue,
      store,
    });
    wrapper.find("form").trigger("submit");
    expect(actions.addPost).toHaveBeenCalled();
  });
});
