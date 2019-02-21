// js script for views/gateway/showRegistrations

$(document).ready(function() {
    // connect the socket on the room id_request
    io.socket.get('/gateway/subscribe');

    // handle request from the gateway
    var gateways = [];
    var count = 0;
    io.socket.on('registration:new', function(registration) {
	var gateway = _.find(gateways, registration.gateway);
	// create the gateway if it wasn't
	if(!gateway) {
	    count++;
	    gateway = registration.gateway;
	    gateway.id = count;
	    cloneTemplate($('#gatewaysWrapper'), {
		stringsToReplace: {
		    'NUMBER': count,
		    'MACADDRESS': gateway.macAddress,
		    'LOCALIP': gateway.localIp,
		    'PUBLICIP': gateway.publicIp
		}
	    });
	    // delete temporary text
	    if(gateways.length===0)
		$(".temporary").remove();
	    gateways.push(gateway);
	}
	// Display the request
	$("#collapse"+gateway.id+" .requestContainer").prepend(moment(new Date(registration.request.date)).format("YYYY-MM-DD HH:mm:ss Z")+" <br/>");
    });
    
});
