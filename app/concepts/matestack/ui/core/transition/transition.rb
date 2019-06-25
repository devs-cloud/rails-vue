module Matestack::Ui::Core::Transition
  class Transition < Matestack::Ui::Core::Component::Dynamic

    def setup
      @component_config[:link_path] = link_path
      @tag_attributes.merge!({
        "href": link_path,
        "@click.prevent": navigate_to(link_path),
        "v-bind:class": "{ active: isActive }"
      })
    end

    def link_path
      if options[:path].is_a?(Symbol)
        return resolve_path
      end
      if options[:path].is_a?(String)
        return options[:path]
      end
    end

    def resolve_path
      begin
        return ::Rails.application.routes.url_helpers.send(options[:path], options[:params])
      rescue => e
        raise "path '#{options[:path]}' not found, using params: #{options[:params]}"
      end
    end

  end
end
