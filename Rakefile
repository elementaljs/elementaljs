require 'rake'
require 'jasmine'
require 'jslint/tasks'

load 'jasmine/tasks/jasmine.rake'
JSLint.config_path = "config/jslint.yml"

desc 'Run all tasks required for a continuous integration build.'
task 'ci' => ['jslint', 'jasmine:ci'] do
end

task :travis => ['jslint'] do
  ["rake jasmine:ci"].each do |cmd|
    puts "Starting to run #{cmd}..."
    system("export DISPLAY=:99.0 && bundle exec #{cmd}")
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end
