define([
	'intern!object',
	'intern/chai!assert',
	'intern!cucumber',
	'./cucumber_world'
], function (registerSuite, assert, cucumber, world) {
	registerSuite({
		name: 'intern/lib/interfaces/cucumber',

		'Basic cucumber test': function () {
			cucumber(world());
		}

	//	'BDD/TDD interface equivalence check': function () {
	//		assert.strictEqual(tdd.suite, bdd.describe, 'bdd.describe should be an alias for tdd.suite');
	//		assert.strictEqual(tdd.test, bdd.it, 'bdd.it should be an alias for tdd.test');

	//		for (var key in { before: 1, after: 1, beforeEach: 1, afterEach: 1 }) {
	//			assert.strictEqual(tdd[key], bdd[key], 'bdd.' + key + ' should be an alias for tdd.' + key);
	//		}

	//		assert.isUndefined(bdd.suite, 'bdd.suite should not be defined since it is a TDD interface');
	//		assert.isUndefined(bdd.test, 'bdd.test should not be defined since it is a TDD interface');
	//	}
	});
});
