var express = require('express');
var router = express.Router();
var NodeRSA = require('node-rsa');
var privatekey = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
'MIICWwIBAAKBgQDl7r3XKkDoQxtg+Wg3YdZGE0LmZsK85s5C7f4Sz2r8D2tezoej\n'+
'AYgKJzUHSusUinpc/B8AQys0ty1ZaPIrMAUpNtSnjTbsjtHnjA+NiSD93M6DyIp3\n'+
'afczJoxsPZe5OiZxpiNPOFR0cUgP1rwc7+x6JZob7IqP5ocwXa9H3ryOCQIDAQAB\n'+
'AoGAd3AThwA45S1uvGnx28rjnlUFDF/Wyn9uJ1AvCaBa54Iu+Pl5dZAnFXcWUap2\n'+
'AJ6KP2DrzZwWhnSchvQ/z3VLSAgeTt6rCuZuETxjo76iUQxvzZ+0kiaUIgHht9GR\n'+
'U8PNp3jenurRAbR9wqXNxCu6TOxu2knfIthC/rvB+/mDnfECQQD9FXzrN7hbuaQ5\n'+
'fYWNVR17NYO9OGConORYSZLuAHYdTcvQIIIF3jQDYEMGmpP1MpL3jUW2qXP3ZfbN\n'+
'trltGQiVAkEA6JT3Bh4VeD9/L17nAbqohngGYx8evYP2s9K+k1Q8GmgcQ1HMukOv\n'+
'FqQa18DIwm28kQ0jwA/VF/i5AvPMX8JupQJAd43iD/+ncHU21g2svEIcBisWi5mJ\n'+
'V72dxPMknJfNNDSe9jeVFI6ORZYAs6rsACWe9aBf8VUFOjaJq04JNDdiLQJAGqxa\n'+
'2BzDIZNGpswfehdKFIHXWa7L+7gSpvTYXlUev3iJJT9QV1xDzDjtyyiU3ZdwNMJp\n'+
'AzHNon4n2arUGXdW8QJAUM4rUOuQER/y1GQHYuSacb0uu7AL0EW8lgBaFp2PzXgx\n'+
'gVdOWBEmt2J8eTADEZERn5iK5KVoLL0cOwXJ1Ysb2w==\n'+
'-----END RSA PRIVATE KEY-----',{
  encryptionScheme: {
    scheme: 'pkcs1', //scheme
  }});
/*Mock*/
router.get('/', function(req, res, next) {
	
	console.log('key: ', key);
	var decrypted = privatekey.decrypt("y/GRlkc1U3V2US/ZG4UUDMO6WDU178vJ/eG6Zr5VkdbkMOOFCSZOsWGl2PduCTbgEnDgSNQhqIuO9HNmD+z17Lv32W0yD0MI1EHWW/Lhc+7WJIGQHsSVF0j7K6RZ5estrlr1lm1z0DBqvS7So8BZt9Ud/IwrzwgC1pUHA6S67qk=", 'utf-8');
	console.log('decrypted: ', decrypted);
	res.send(decrypted)
    res.send(req.query)
});
router.post('/', function(req, res, next) {
    res.send(req.body);
});
module.exports = router;
