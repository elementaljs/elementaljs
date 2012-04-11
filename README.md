
# Development

## Dependencies

You'll need bundler to install the Rubygem dependencies for the build process.

	gem install bundler
	bundle install --binstubs
	
When you're developing, run the following command to use binaries in the bin folder that bundler has installed there. 

	export PATH=`pwd`/bin:$PATH

## Tests

### Jasmine

To get Jasmine up and running, run the following rake task

	rake jasmine
	
Then point your browser to http://localhost:8888	

### Continuous Integration

A rake task called 'ci' will run JSLint and Jasmine tests.

	rake ci
	
