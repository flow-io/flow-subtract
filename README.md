flow-subtract
=============

Transform stream factory to decrement streamed numeric data values.


## Installation

``` bash
$ npm install flow-subtract
```

## API

To create a stream factory,

``` javascript
var subStream = require( 'flow-subtract' );

// Create a new factory:
var sStream = subStream();
```

### sStream.subtract( [value] )

This method is a setter/getter. If no `value` is provided, returns the `value` subtracted from streamed values (a.k.a., the `subtrahend`); default is `0`. To set the `value`,

``` javascript
sStream.subtract( 1 );
```

### sStream.stream()

To create a new subtraction stream,

``` javascript
var stream = sStream.stream();
```


## Usage

Methods are chainable.

``` javascript
subStream()
	.subtract( 1 )
	.stream()
	.pipe( /* writable stream */ );
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	sStream = require( 'flow-subtract' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new subtraction stream:
var stream = sStream()
	.subtract( 1 )
	.stream();

// Pipe the data:
readStream.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ) {
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

