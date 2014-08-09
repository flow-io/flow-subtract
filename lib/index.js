/**
*
*	STREAM: subtract
*
*
*	DESCRIPTION:
*		- Transform stream factory to decrement streamed numeric data values.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/08/08: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through2
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through2 module:
		through2 = require( 'through2' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData( subtrahend )
	*	Returns a callback which performs subtraction.
	*
	* @private
	* @param {Number} subtrahend - value to subtract from streamed values
	* @returns {Function} callback
	*/
	function onData( subtrahend ) {
		/**
		* FUNCTION: onData( newVal, encoding, clbk )
		*	Data event handler. Performs subtraction.
		*
		* @private
		* @param {Number} newVal - streamed data value
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after performing subtraction. Function accepts two arguments: [ error, chunk ].
		*/
		return function onData( newVal, encoding, clbk ) {
			clbk( null, newVal-subtrahend );
		}; // end FUNCTION onData()
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		this._subtrahend = 0;
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: subtract( value )
	*	Setter and getter for the subtrahend. If a value is provided, sets the subtrahend. If no value is provided, returns the subtrahend.
	*
	* @param {Number} value - subtrahend (the value to be subtracted from streamed values)
	* @returns {Stream|Number} Stream instance or subtrahend
	*/
	Stream.prototype.subtract = function( value ) {
		if ( !arguments.length ) {
			return this._subtrahend;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new Error( 'subtract()::invalid input argument. Subtrahend must be numeric.' );
		}
		this._subtrahend = value;
		return this;
	}; // end METHOD subtract()

	/**
	* METHOD: stream()
	*	Returns a through stream for performing subtraction.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2({'objectMode': true}, onData( this._subtrahend ) );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();