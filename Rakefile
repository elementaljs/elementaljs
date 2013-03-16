require 'rake'

begin 
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue Object
  puts "Jasmine not loaded.  Try running 'bundle install'."
  exit(1)
end

begin
  require 'jslint/tasks'
rescue Object
  puts "JSLint not loaded.  Try running 'bundle install'" 
end

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
