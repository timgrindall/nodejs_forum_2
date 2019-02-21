window.onload = function(){

	// retrieve count here from database using AJAX (GET request getting JSON data)
	ajax.get('/get-count', {}, function(numNewPosts) {

		// convert to Javascript object
		// countDataJSON is an object
		var numNewPostsJSON = JSON.parse(numNewPosts);
		console.log(numNewPostsJSON);	// testing

		if (numNewPostsJSON != null && Object.keys(numNewPostsJSON).length !== 0 && numNewPostsJSON.constructor !== Object) {
		
			// Update page with differences
			var i = 0;
			console.log('numNewPostsJSON.length: ' + numNewPostsJSON.length);
			for (i = 0; i < numNewPostsJSON.length; i++) {
				document.getElementById(i.toString() + '-index').textContent = numNewPostsJSON[i].toString() + ' new';
			}
		}
	});
}

// note: following code snippet comes from https://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery

var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};