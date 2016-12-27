'use strict'; // jshint ignore:line
let _ = require('lodash');

module.exports = function(ownJoi) {
	let JoiSequelize = function(model) {
	  this._joi = {};
	  this._model = model;
	  this._types = {};
	  this._allowNull = [];
	  this.sequelize = {
	    define: require('./lib/define')(ownJoi).bind(this)
	  };
	  this.datatypes = require('./lib/datatypes');
	  model(this.sequelize, this.datatypes);
	};

	let fn = require('./lib/functions')(ownJoi);

	_.merge(JoiSequelize.prototype, fn);

	return JoiSequelize;
};
