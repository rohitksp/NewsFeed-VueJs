import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PostList from "@/components/posts/PostList.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PostList.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      addComment: jest.fn(),
      getUserId: jest.fn(),
      getPosts: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("Checking header name", () => {
    const wrapper = shallowMount(PostList, {
      stubs: ["router-link"],
      localVue,
      store,
    });
    const idTag = wrapper.find("#mainHeader");
    expect(idTag.text()).toEqual("NewsFeed");
  });
});
