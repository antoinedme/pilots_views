// js to manage the notification modal
var alert = {};
$(document).ready(function() {
    io.socket.on('controller:notification:show', function(msg) {
	alert = msg;
	console.log(alert);
	$( '#alertTitle' ).html('<center>Alert ' + msg.serviceName+'</center>');
	$( '#alertImage' ).attr( 'src', '/images/notification/'+ msg.serviceName +'.jpg' );
	$( '#alertImage' ).attr( 'alt', msg.serviceName );
	$( '#alertModal' ).modal('show');
    }); 
});
