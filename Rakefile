require 'rake'
require 'jasmine'
require 'jslint/tasks'

load 'jasmine/tasks/jasmine.rake'
JSLint.config_path = "config/jslint.yml"

desc 'Run all tasks required for a continuous integration build.'
task 'ci' => ['jslint', 'jasmine:ci'] do
  
end

task :default => 'ci'
