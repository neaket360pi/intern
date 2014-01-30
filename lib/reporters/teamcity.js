define([], function () {
	var teamcity = {
		_suiteStarts: {},

		_escapeString: function (str) {
			var replacer = /['\n\r\|\[\]\u0100-\uffff]/g,
				map = {
					'\'': '|\'',
					'|': '||',
					'\n': '|n',
					'\r': '|r',
					'[': '|[',
					']': '|]'
				};

			return str.toString().replace(replacer, function (character) {
				if (character in map) {
					return map[character];
				}
				else if (/[^\u0000-\u00ff]/.test(character)) {
					return '|0x' + character.charCodeAt(0).toString(16);
				}
				else {
					return '';
				}
			});
		},

		_sendMessage: function (type, args) {
			args.flowId = Math.floor(Math.random() * (1e10 - 1e6 + 1)) + 1e6;
			args.timestamp = new Date().toISOString();
			args = Object.keys(args).map(function (key) {
				return key + '=' + '\'' + teamcity._escapeString(args[key]) + '\'';
			}).join(' ');
			console.log('##teamcity[' + type + ' ' + args + ']');
		},

		'/test/start': function (test) {
			teamcity._sendMessage('testStarted', { name: test.get('id') });
		},

		'/test/end': function (test) {
			teamcity._sendMessage('testFinished', {
				name: test.get('id'),
				duration: test.timeElapsed
			});
		},

		'/test/fail': function (test) {
			var message = {
				name: test.get('id'),
				message: test.error.message
			};

			if (test.error.actual && test.error.expected) {
				message.type = 'comparisonFailure';
				message.expected = test.error.expected;
				message.actual = test.error.actual;
			}

			teamcity._sendMessage('testFailed', message);
		},

		'/suite/start': function (suite) {
			if (suite.root) {
				return;
			}

			var startDate = teamcity._suiteStarts[suite.get('id')] = new Date();

			teamcity._sendMessage('testSuiteStarted', {
				name: suite.get('id'),
				startDate: startDate
			});
		},

		'/suite/end': function (suite) {
			if (suite.root) {
				return;
			}

			teamcity._sendMessage('testSuiteFinished', {
				name: suite.get('id'),
				duration: new Date() - teamcity._suiteStarts[suite.get('id')]
			});
		}
	};

	return teamcity;
});
