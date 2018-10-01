module Row::Cell
  class Row < Component::Cell::Static

    def row_classes
      classes = []

      classes << "row"
      customized_classes = Customize::Ui::Core::Row.new.row_classes(classes, options)
      classes = customized_classes unless customized_classes.nil?

      return classes.join(" ")
    end

  end
end
