
# Development

## Dependencies

You'll need bundler to install the Rubygem dependencies for the build process.

	gem install bundler
	bundle install --binstubs
	
When you're developing, run 'export PATH=`pwd`/bin:$PATH to use binaries in the bin folder that bundler has installed there. 

## Tests

A rake task called 'ci' will run JSLint and Jasmine tests.

	rake ci
	
