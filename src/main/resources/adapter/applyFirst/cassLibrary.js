var $ = null;
var document = null;
var window = {};
var localStorage = {};

load("webapps/cass/cass.example/js/cass/stjs.js");
load("webapps/cass/cass.example/js/cass/blobHelper.js");
load("classpath:formdata.js");
print("webapps/cass/cass.example/js/cass/random.js");
load("webapps/cass/cass.example/js/cass/random.js");
print("webapps/cass/cass.example/js/cass/ec.base.js");
load("webapps/cass/cass.example/js/cass/ec.base.js");
print("webapps/cass/cass.example/forge/forge.min.js");
load("webapps/cass/cass.example/forge/forge.min.js");
print("webapps/cass/cass.example/js/cass/ec.crypto.js");
load("webapps/cass/cass.example/js/cass/ec.crypto.js");
print("webapps/cass/cass.example/js/cass/org.json-ld.js");
load("webapps/cass/cass.example/js/cass/org.json-ld.js");
print("webapps/cass/cass.example/js/cass/org.cassproject.schema.general.js");
load("webapps/cass/cass.example/js/cass/org.cassproject.schema.general.js");
print("webapps/cass/cass.example/js/cass/org.schema.js");
load("webapps/cass/cass.example/js/cass/org.schema.js");
print("webapps/cass/cass.example/js/cass/org.cassproject.schema.ebac.js");
load("webapps/cass/cass.example/js/cass/org.cassproject.schema.ebac.js");
print("webapps/cass/cass.example/js/cass/org.cassproject.schema.cass.js");
load("webapps/cass/cass.example/js/cass/org.cassproject.schema.cass.js");
print("webapps/cass/cass.example/js/cass/ebac.identity.js");
load("webapps/cass/cass.example/js/cass/ebac.identity.js");
print("webapps/cass/cass.example/js/cass/ebac.repository.js");
load("webapps/cass/cass.example/js/cass/ebac.repository.js");
print("webapps/cass/cass.example/js/cass/cass.competency.js");
load("webapps/cass/cass.example/js/cass/cass.competency.js");
print("webapps/cass/cass.example/js/cass/cass.rollup.js");
load("webapps/cass/cass.example/js/cass/cass.rollup.js");

EcRepository.caching = true;
EcRemote.async = false;
EcIdentityManager.async = false;

console = {};
console.log = function(s){print(s);}