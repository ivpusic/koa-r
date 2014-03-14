'use strict';

/**
 * koa-r
 * @author Ivan Pusic
 *
 */

var cache = {},
  postpone;

function validateReq(module, req) {
  return typeof module === 'string' && typeof req === 'string';
}

/**
 * Function for requering function from modules
 *
 * If first and second arguments are strings, function will assume that
 * first argument is a module to search, and second is a requested function.
 *
 * Function will throw error if you don't provide requested parameters.
 *
 * @api public
 */

function r(module, fn) {
  if (validateReq.apply(null, arguments)) {
    return cache.hasOwnProperty(module) ? cache[module][fn] : postpone(module, fn);
  } else {
    throw new Error('Please provide correct arguments to r function');
  }
}

/**
 * Function for adding module to cache
 *
 * @api public
 */

r.set = function (key, val) {
  cache[key] = val;
};

/**
 * Function for enabling/disabling global module flag
 *
 * @api public
 */

r.isGlobal = function (value) {
  return value ? global.r = r: delete global.r;
};

/**
 * If module wasn't available in time of requesting function,
 * process will be postponed to next time when you call function
 *
 * @api private
 */

postpone = function (module, fn) {
  return function () {
    if (cache[module]) {
      var Fn = r(module, fn);
      if (Fn) {
        return Fn.apply(this, arguments);
      }
      throw new Error('Cannot find function ' + fn + ' in module ' + module);
    }
    throw new Error('Cannot find module' + module);
  };
};

/**
 * Expose r 
 */

exports = module.exports = r;
