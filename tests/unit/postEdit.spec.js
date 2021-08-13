import { shallowMount, createLocalVue } from "@vue/test-utils";
import PostEdit from "@/components/posts/PostEdit.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PostEdit.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      posts_data: () => "Rohit",
    };
    store = new Vuex.Store({
      getters,
    });
  });

  const wrapper = shallowMount(PostEdit, { localVue, store });
  it("Checking header of the edit file", () => {
    const classTag = wrapper.find(".header");
    expect(classTag.text()).toEqual("Edit The Post");
  });
  // const userName = "Rohit";
  // const title = "Today's Weather";
  // const description = "Very good weather today in delhi";
  // it("Checking value with the vuex state", () => {
  //   const id = wrapper.find("#user-name");
  //   expect(id.element.value).toBe(getters.posts_data());
  // });
});
