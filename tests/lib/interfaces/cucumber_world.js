define([], function () {
	return function (callback) {
		console.debug('invoking the world');
		callback();
	};
});
