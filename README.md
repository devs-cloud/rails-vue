# Basemate::Ui::Core
Create component based, object oriented views. Get dynamic SPA-like behaviour through integrated vue.js with zero effort.
TODO

## Current State
This repo is currently under heavy development and should not be used until the first tested, stable version is released. Please use it only, if you are onboarded by the Basemate Team. Feel free to reach out :)

First stable release is scheduled for October 2018.

## Setup for Sprockets (limited extendability, for more extendability use the webpacker approach)
This setup part documents the simplest approach to use Basemate::Ui::Core without any Basemate Bundle or Theme in charge. Assets are compiled and served only via sprockets. This makes it very easy to integrate it in a classic Rails Project without any further dependencies. It is not recommend if you want to extend Basemate through building your own vue.js components; you should use Webpacker instead (see: TODO).

### Gemfile

Add 'basemate-ui-core' to your Gemfile

Gemfile
```ruby
gem 'basemate-ui-core', :git => 'https://github.com/basemate/basemate-ui-core.git'
```

and run bundle install.

### Javascript

Add 'basemate-ui-core' to your application.js

assets/javascript/application.js
```
//= require basemate-ui-core
```

### Basemate Folder

Create a folder called 'basemate' to your app directory. All your Basemate apps, pages, components will be defined there.

### Include Helper

Include the Basemate Helper to your controllers. If you want to make the helpers available in all controllers, include it to your 'ApplicationController' like:

app/controllers/application_controller.rb
```ruby
class ApplicationController < ActionController::Base
  include Basemate::Ui::Core::ApplicationHelper
  #TODO
end

```

## Usage

### Create a Basemate Page
Scenario: You want to use a Basemate Page instead of a classic Rails view as a response for your controller action.
Your setup would be:

Your routes:

config/routes.rb
```ruby
Rails.application.routes.draw do
  get '/home', to:'landing_page#home'
end
```

Your Controller Action:

app/controllers/landing_page_controller.rb
```ruby
class LandingPageController < ApplicationController

  def home
    @foo = "foo"
    @bar = "bar"
    responder_for(LandingPage::Home)
  end

end

```

Your Basemate Page:

app/basemate/landing_page/home.rb
```ruby
module LandingPage
  class Home < Page::Cell::Page

    def response

      components {
        row do
          col do
            plain @foo
          end
          col do
            plain @bar
          end
        end
      }

    end

  end
end

```
This gives you following output:

```html
<div class='row'>
  <div class='col'>
    foo
  </div>
  <div class='col'>
    bar
  </div>
</div>
```
Note:
- "row", "col", "plain" are predefined core components
- you can customize the output of the core components (see: TODO)
- you can add your own components (see: TODO)
- you can use components from basemate bundles (see: TODO)

## Customize Core Components

Add a ruby file to the correct basemate customize folder, for example:

app/basemate/customize/ui/core/row.rb
```ruby

module Customize::Ui::Core
  class Row

    def row_classes(classes, options)
      classes << "justify-content-md-center" if options[:center] == true
    end

  end
end
```

and change your Basemate Page to use your new interface:

app/basemate/landing_page/home.rb
```ruby
module LandingPage
  class Home < Page::Cell::Page

    def response

      components {
        row center: true do
          col do
            plain @foo
          end
          col do
            plain @bar
          end
        end
      }

    end

  end
end

```
This gives you following, customized output:

```html
<div class='row justify-content-md-center'>
  <div class='col'>
    foo
  </div>
  <div class='col'>
    bar
  </div>
</div>
```
## Structure your Basemate Page response with partials

If you don't want to define the response of you page in one block, you can use partials:

You could refactor this:

app/basemate/landing_page/home.rb
```ruby
module LandingPage
  class Home < Page::Cell::Page

    def response

      components {
        row center: true do
          col do
            plain @foo
          end
          col do
            plain @bar
          end
        end
        row center: true do
          col do
            plain "hello"
          end
          col do
            plain "world"
          end
        end
      }

    end

  end
end

```

to this:

```ruby
module LandingPage
  class Home < Page::Cell::Page

    def response
      components {
        partial :row_1
        partial :row_2
      }
    end

    def row_1
      partial {
        row center: true do
          col do
            plain @foo
          end
          col do
            plain @bar
          end
        end
      }
    end

    def row_2
      partial {
        row center: true do
          col do
            plain "hello"
          end
          col do
            plain "world"
          end
        end
      }
    end


  end
end

```

You could also implement dynamic partials, for example:

```ruby
module LandingPage
  class Home < Page::Cell::Page

    def response
      components {
        partial :row, @foo, @bar
        partial :row, "hello", "world"
      }
    end

    def row first_col, second_col
      partial {
        row center: true do
          col do
            plain first_col
          end
          col do
            plain second_col
          end
        end
      }
    end

  end
end

```



## Create your own Component

TODO

## Wrap your Basemate Page into a Basemate App for SPA-like behaviour

TODO

## Use Templates

TODO

## Use Bundles

TODO

## Contributing

### Core

TODO

### Bundles

TODO

### Themes

TODO

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
