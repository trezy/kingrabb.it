// Module imports
const path = require('path')





module.exports = {
  sassOptions: {
		functions: require(path.resolve(__dirname, 'src', 'scss', 'functions')),
  },
}
