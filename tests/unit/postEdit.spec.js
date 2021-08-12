import { shallowMount, createLocalVue } from "@vue/test-utils";
import PostEdit from "@/components/posts/PostEdit.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PostEdit.vue", () => {
  let state;
  let store;

  beforeEach(() => {
    state = {
      body: "Lockdown period has been ended",
      title: "Good News",
      userName: "Rohit",
      userId: 7,
      id: 11,
    };
    store = new Vuex.Store({
      state,
    });
  });

  const wrapper = shallowMount(PostEdit, { localVue, store });
  // const userName = "Rohit";
  // const title = "Today's Weather";
  // const description = "Very good weather today in delhi";
  it("Checking value with the vuex state", () => {
    expect(wrapper.find("#user-name").element.value).toEqual(state.userName);
  });
});
