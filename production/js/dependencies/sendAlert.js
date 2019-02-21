
// js to send the noficiation once it is triggered
var _csrf = null;
io.socket.get('/csrfToken', function(data) {
    if(data._csrf) {
	_csrf = data._csrf;
	console.log('Obtained CSRF token...');
    } else {
	console.error('Could not get _csrf, printing response...');
	console.log(data);
    }
});

function sendAlert() {
    var postData = alert;
    postData._csrf = _csrf;
    io.socket.post('/service/alertManager', postData, function (data) {
	if(data.error)
	    return console.error(data.error);
	$( '#alertModal' ).modal('hide');
	console.log(data);
	console.log("Alert sent back to the server");
    });
}
