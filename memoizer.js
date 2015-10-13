"use strict";

/**
 *  memoizer.js 0.1.0
 *  Copyright (c) 2013 - 2015 Jean-François Desgagné, http://jfdesgagne.com
 *  memoizer.js is open sourced under the MIT license.
 *  http://jfdesgagne.github.com/memoizer.js
 *
 *
 * Memoizer is a utility function to help memoize any function return with their 
 * passed parameters.
 *
 * Note: Be careful about using this function. The initial cost will be more
 *       expensive when use with Objects as parameters.
 *
 * Example of usage:
 *   function sum() {
 *     var total = 0;
 *     for (var i=0; i<arguments.length; i++) {
 *       total += arguments[i];
 *     }
 *     return total;
 *   }
 *
 *   var memoizedSum = memoizer(null, sum);
 *   memoizedSum(2, 2); //will compute and output 4
 *   memoizedSum(2, 2); //will look from cache and output 4
 */

;
(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.memoizer = factory();
    }

}(this, function () {
    var NO_ARGS = '%NO_ARGUMENTS%',
        SEPARATOR = '-';

    return function (scope, fn) {
        var cache = {};

        return function () {
            //TODO: maybe use JSON.stringify(arguments) instead?
            var memo_key = arguments.length > 0 ? '' : NO_ARGS;
            for (var i = 0; i < arguments.length; i++) {
                if (memo_key) {
                    memo_key += SEPARATOR;
                }
                memo_key += typeof arguments[i] === 'object' ? JSON.stringify(arguments[i]) : arguments[i];
            }
            if (!cache.hasOwnProperty(memo_key)) {
                cache[memo_key] = fn.apply(scope, arguments);
            }
            return cache[memo_key];
        }
    }
}));
