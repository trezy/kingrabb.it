// Module imports
const sass = require('sass')





function generateScalerString(value) {
	return new sass.types.String(`calc(var(--pixel-multiplier) * ${value})`)
}

function scaleValue(value) {
	if (value instanceof sass.types.Number) {
		return generateScalerString(`${value.getValue()}${value.getUnit()}`)
	}

	if (value instanceof sass.types.String) {
		return generateScalerString(value.getValue())
	}

	throw "$value: Expected a number or string.";
}





module.exports = {
	'scaleValue($value)': scaleValue,
}
