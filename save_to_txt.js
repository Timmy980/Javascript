var http = require('http');
var fs = require('fs');
var postHTML = '' +
        '<html>' +
            '<head>' +
            '</head>' +
            '<body>' +
                '<form action="/message" method="post">' +
                    '<p>Please enter a message below:</p>' +
                    'Message: <input type="text" name="message"><br>' +
                    '<input type="submit" value="Submit">' +
                '</form>' +
            '</body>' +
        '</html>' +
    '';
http.createServer(function(req, res) {
	if (req.method == 'POST'){
		var body = '';
		req.on('data', function(chunk) {
			chunk = unescape(chunk.toString());
			body += chunk.replace(/\+/g, ' ').slice(chunk.indexOf('=')+1); 
		});
		req.on('end', function() {
			fs.writeFile('new.txt', body, function(err){
				if (err) throw err;
				console.log('Mesage Saved!');
			});
			res.writeHead(200);
			res.end(postHTML);
		});
	}
	else {
		res.writeHead(200);
		res.end(postHTML);
	}
  }).listen(8080);
