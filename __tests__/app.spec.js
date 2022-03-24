import { mount } from '@vue/test-utils'
import App from './../src/App.vue'
import Nutrition from "@/components/Nutrition.vue"

describe('Mounted App', () => {
    const wrapper = mount(App);
  
    test('does a wrapper exist', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })

  

describe("FormSubmitter", () => {
  it("adds a new item to the list with the add button", async () => {
    const wrapper = mount(Nutrition)

    await wrapper.find("#qty").setValue("2");
    await wrapper.find("#unit").setValue("ounce");
    await wrapper.find("#food").setValue("flour");
    await wrapper.find(".btn-warning").trigger("click");

    expect(wrapper.find(".list-item").text())
      .toBe("2 ounce flour");
  }) 

  it("deletes the newly added item with the trash button", async () => {
    const wrapper = mount(Nutrition)
    await wrapper.find("#qty").setValue("2");
    await wrapper.find("#unit").setValue("ounce");
    await wrapper.find("#food").setValue("flour");
    await wrapper.find(".btn-warning").trigger("click");

    await wrapper.find(".delete-btn").trigger("click");
    
    expect(wrapper.find(".list-item").exists()).toBe(false);
})
});



/*
it('button click with correct sum', () => {
    wrapper.setData({ guess: "15" })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.message).toBe('SUCCESS!')
  }) */