module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
    "es6": true,
    "jest": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"indent": [
			"error",
			2
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error", "never"
		],
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
		"no-console": 0
	}
}