# -*- encoding: utf-8 -*-
require File.expand_path('../lib/openxjs/rails/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Softgames GmbH"]
  gem.email         = ["scotty@softgames.de"]
  gem.summary       = %q{openxjs.js via asset pipeline}
  gem.homepage      = "http://github.com/softgames/openxjs-rails"

  gem.files         = `git ls-files`.split("\n")
  gem.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  gem.name          = "openxjs-rails"
  gem.require_paths = ["lib"]
  gem.version       = Openxjs::Rails::VERSION

  gem.add_dependency 'railties', '>= 3.1'
end