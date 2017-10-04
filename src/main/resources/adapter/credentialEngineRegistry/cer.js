var navigator = {};
load("https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/8.0.4/jsrsasign-all-min.js");

registerWithCer = function(){

	var query = queryParse.call(this);
    var framework = null;
    if (framework == null)
    	framework = skyrepoGet.call(this,query);
    if (framework == null || framework["@type"] == null || !framework["@type"].contains("ramework"))
    	framework = null;
    if (framework == null)
    	framework = EcFramework.getBlocking(urlDecode(this.params.id));
    else
    {
		var f = new EcFramework();
		f.copyFrom(framework);
		framework = f;
    }

	var ceGuid = framework.getGuid();
	var envelopeGuid = ceGuid;
	ceGuid = "ce-"+ceGuid;

	var asnFramework = httpGet(debug(repoEndpoint()+"asn"+this.params.urlRemainder));

	// Creating JWT encoded package.
    var sHeader = JSON.stringify({alg: 'RS256', typ: 'JWT'});
    var sPayload = JSON.stringify(asnFramework);
	var prvKey = KEYUTIL.getKey(EcPpk.fromPem(cerPpk()).toPkcs8Pem());
	var sJWT = KJUR.jws.JWS.sign("RS256", sHeader, sPayload, prvKey);

	var package = {};
	package.envelope_id=envelopeGuid;
	package.envelope_type="resource_data";
	package.envelope_version="1.0.0";
	package.resource = sJWT;
	package.resource_format="json";
	package.resource_encoding="jwt";
	//var result = httpPost(JSON.stringify(package),"http://lr-staging.learningtapestry.com/resources/"+ceGuid,"application/json","false");
	return JSON.stringify(package);
}

bindWebService("/cer/register",registerWithCer);