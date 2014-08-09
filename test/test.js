
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	subStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-subtract', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( subStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to set/get the subtrahend', function test() {
		var sStream = subStream();
		expect( sStream.subtract ).to.be.a( 'function' );
	});

	it( 'should set the subtrahend', function test() {
		var sStream = subStream();
		sStream.subtract( 1 );
		assert.strictEqual( sStream.subtract(), 1 );
	});

	it( 'should not allow a non-numeric subtrahend', function test() {
		var sStream = subStream(),
			values = [
				'5',
				[],
				{},
				null,
				undefined,
				NaN,
				false,
				function(){}
			];
		
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				sStream.subtract( value );
			};
		}
	});

	it( 'should provide a default behavior of having a subtrahend equal to 0', function test( done ) {
		var data, expected, sStream;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 1,2,3,4,5 ];

		// Create a new subtraction stream:
		sStream = subStream().stream();

		// Mock reading from the stream:
		utils.readStream( sStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, sStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

	it( 'should subtract from piped data using an arbitrary subtrahend', function test( done ) {
		var data, expected, sStream, SUBTRAHEND = 1;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 0,1,2,3,4 ];

		// Create a new subtraction stream:
		sStream = subStream()
			.subtract( SUBTRAHEND )
			.stream();

		// Mock reading from the stream:
		utils.readStream( sStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, sStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});