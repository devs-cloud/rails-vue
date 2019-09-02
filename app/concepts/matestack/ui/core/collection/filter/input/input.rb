module Matestack::Ui::Core::Collection::Filter::Input
  class Input < Matestack::Ui::Core::Component::Static

    def setup
      @tag_attributes.merge!({
        "v-model#{'.number' if options[:type] == :number}": input_key,
        type: options[:type],
        class: options[:class],
        id: component_id,
        "@keyup.enter": "submitFilter()",
        ref: "filter.#{attr_key}",
        placeholder: options[:placeholder]
      })
    end

    def input_key
      'filter["' + options[:key].to_s + '"]'
    end

    def attr_key
      return options[:key].to_s
    end

  end
end
