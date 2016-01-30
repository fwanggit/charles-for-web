var os = require('os');
exports.getLocalIP= function() {
    var map = [];
    var ifaces = os.networkInterfaces();
    //console.log(ifaces);
    for (var dev in ifaces) {
		var _iface=ifaces[dev]
		for (var _dev in _iface) 
		{
			var iface=_iface[_dev]
			if(iface.family!="IPv4")
			{
				continue
			}
			if(iface.internal)
			{
				continue
			}
			map.push(iface.address)
		}
    }  
    return map;
}