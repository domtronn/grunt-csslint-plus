## Getting Started
This plugin was developed against
- [grunt-contrib-csslint](https://www.npmjs.com/package/grunt-contrib-csslint) ```>= 0.4.0```
- [grunt](https://www.npmjs.com/package/grunt) ```>= 0.4.5```

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```
npm install grunt-csslint-plus --save-dev
```
Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:
```javascript
grunt.loadNpmTasks('grunt-csslint-plus');
```

## Csslint Plus Task
Run this task with `grunt csslint_plus` command

## Options
To include your own custom rules for csslinting, you must provide an array of directories containing rules in the following way:

```javascript
csslint_plus: {
  rules: [
	'node_modules/grunt-more-csslint-rules/examples/*.js'
  ]
}
```

Two example rules are provided in the node module

## Custom Rule Files
To define your own custom css rules, you must provide rules in the following example format:
```javascript
var rule = {
  id: "example_id",
  name: "example_rule_name",
  desc: "description of rule",
  init: function(parser, reporter) {
	var rule = this;
	parser.addListener("startRule", function(evt) { ... } ), # example listeners
	parser.addListener("endRule", function(evt) { ... } ) # another example listener
  }
}

exports.Rule = rule
```

Probably the best way to get documentation is to look through the rules available in csslint as there are a lot more listeners.
