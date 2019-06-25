class Pages::MyApp::MySixthPage < Matestack::Ui::Page

  def prepare
    @dummy_models = DummyModel.all
  end

  def response
    components {
      heading size: 2, text: "This is Page 6"

      custom_card

      custom_fancy_card

      custom_demo_component heading_text: "Custom Vue.js Component"

      async show_on: "my_custom_event", hide_after: "2000" do
        plain "called API!"
      end
    }
  end

end
