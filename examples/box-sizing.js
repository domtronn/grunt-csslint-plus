var rule = {
		//rule information
		id: "no-border-box",
		name: "box-sizing",
		desc: "The use of border-radius for IPTV is not supported and may cause unexpected behaviour on older devices.",
		browsers: "IPTV",

		//initialization
		init: function(parser, reporter){
	    var rule = this,
					properties,
					has_property = false;

	    function startRule(){
				properties = {};
				has_property = false;
	    }

	    function endRule(){
				var prop, value;
				if (has_property) {
					prop = properties[rule.name];
					reporter.error("Using " + rule.name  + " may not be supported on some devices.\n", prop.line, prop.col, rule);
				}
	    }

	    parser.addListener("startrule", startRule);
	    parser.addListener("endrule", endRule);
	    parser.addListener("property", function(event){
				var prop_name = event.property.text.toLowerCase();
				if (prop_name === rule.name ){
					properties[rule.name] = { line: event.property.line, col: event.property.col, value: event.value };
					has_property = true;
				}
	    });
		}

};

exports.Rule = rule;
