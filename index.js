const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname + '/../..');

exports.compress = function(name, elements) {
	return new Promise(function(resolve, reject) {
		const output = fs.createWriteStream(baseDir + '/'+name+'.zip');
		const archive = archiver('zip', {
			zlib: { 
				level: 9 
			},
		});
		let msg = '';

		output.on('close', function() {
			msg = 'Size of archive: ' + Math.ceil(archive.pointer()/1000) + ' kB';
			resolve(msg);
		});

		archive.pipe(output);

		if (typeof elements === 'string') {
			const fullPath = baseDir + '/' +elements;
			const stats = fs.statSync(fullPath);
			if (stats.isDirectory()) {
				archive.directory(fullPath, false);
			}
			else {
				archive.append(fs.createReadStream(fullPath), { 
					name: elements, 
				});
			}
		}
		else if (Array.isArray(elements)) {
			for (let i=0; i<elements.length; i++) {
				const fullPath = baseDir + '/' +elements[i];
				const stats = fs.statSync(fullPath);
				if (stats.isDirectory()) {
					archive.directory(fullPath, elements[i]);
				}
				else {
					archive.append(fs.createReadStream(fullPath), { 
						name: elements[i], 
					});
				}
			}
		}
		archive.finalize();
	});
}

exports.getConfig = function(key) {
	const { extensionZipperConfig } = require(baseDir + '/package.json');
	if (key) {
		if (extensionZipperConfig[key]) {
			return extensionZipperConfig[key];
		}
		else {
			throw new Error(`'${key}' is not a valid configuration entry`);
		}
	}
	return extensionZipperConfig;
}

exports.run = function(arg) {
	const config = exports.getConfig(arg);
	if (arg) {
		return exports.compress(arg, config);
	}
	else {
		return Promise.all(Object.keys(config).map(function(k) {
			return exports.compress(k, config[k]);
		}));
	}
}
