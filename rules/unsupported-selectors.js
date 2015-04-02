var rule =	{
		id: "non-supported-selectors",
		name: "Disallow unsupported selectors",
		desc: "The use of some selectors for IPTV may not be supported and can cause unexpected behaviour on older devices.",
		browsers: "All",

		//initialization
		init: function(parser, reporter) {
			var rule = this;

			parser.addListener("startrule", function(event) {
				var selectors = event.selectors;
				var unsupportedSelectors = [
					":firstChild", ":link", "~", ":checked", ":disabled", ":empty", ":enabled",
					":first-of-type", ":in-range", ":invalid", ":last-child",":last-of-type", ":only-of-type",
					":only-child", ":optional", ":out-of-range", ":read-only", ":read-write", ":required", ":root",
					":target", ":valid", ":not", ":nth-last-child", ":nth-last-of-type", ":nth-child", ":nth-of-type"
				];
				var i = selectors.length;
				for (i; i--;) {
					var selector = selectors[i];
					var j = selector.parts.length;
					for (j; j--;) {
						var part = selectors[i].parts[j];
						if (part.type == parser.SELECTOR_PART_TYPE) {
							var k = part.modifiers.length;
							for (k; k--;) {
								var modifier = part.modifiers[k];
								if (modifier.type == "class" || modifier.type == "id"){
									continue;
								}
								var regexp = new RegExp(unsupportedSelectors.join("|"));
								if (regexp.test(part.text)) {
									reporter.warn("Selector " + modifier.text + " may not be supported on TVs\n", part.line, part.col, rule);
								}
							}
						} else if (part.type == 'sibling') {
							if (unsupportedSelectors.indexOf(part)) {
								reporter.warn("Selector " + part.text + " may not be supported on TVs\n", part.line, part.col, rule);
							}
						}
					}
				}
			});
		}
};

exports.Rule = rule;
