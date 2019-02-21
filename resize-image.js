const sharp = require('sharp');

module.exports = function resize(filename, format, width, height, callback) {
	var index = filename.lastIndexOf('.');
	var filename_no_suffix = filename.substring(0, index);
	console.log('filename: ' + filename);
	console.log('filename_no_suffix: ' + filename_no_suffix);

	sharp('./public/images/' + filename)
		.toFormat(format)
		.resize({
		    width: width,
		    height: height,
		    fit: sharp.fit.outside
		})
		.toFile('./public/images/' + filename_no_suffix + '_thumbnail.' + format, callback);
}