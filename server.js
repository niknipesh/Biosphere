var saml2 = require('saml2-js');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create service provider
var sp_options = {
  //entity_id: "https://sp.example.com/metadata.xml",
  //entity_id: "https://fedlogin.jnj.com",
  entity_id: "https://biosphere.com/placeholder",
  //entity_id: "http://s000.tinyupload.com/download.php?file_id=07350046543285826763&t=0735004654328582676363717",
  private_key: fs.readFileSync("./cert/private.key").toString(),
  certificate: fs.readFileSync("./cert/spcertificate.csr").toString(),
  //assert_endpoint: "https://service-provider.com/sso/asc",
  assert_endpoint: "https://biosphere.com/placeholder"

};
var sp = new saml2.ServiceProvider(sp_options);

// Create identity provider
var idp_options = {
  //sso_login_url: "https://idp.example.com/login",
  sso_login_url: "https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?idpid=0e65561f-9343-4f45-975e-5421c7c67dc0",
  //sso_logout_url: "https://idp.example.com/logout",
  sso_logout_url: "https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?idpid=0e65561f-9343-4f45-975e-5421c7c67dc0",
  certificates: [fs.readFileSync("./cert/idp_cert.pem").toString(), fs.readFileSync("./cert/cert_idp.pem").toString()]
};
var idp = new saml2.IdentityProvider(idp_options);

// ------ Define express endpoints ------

// Endpoint to retrieve metadata
app.get("/metadata.xml", function(req, res) {
  res.type('application/xml');
  res.send(sp.create_metadata());
});

// Starting point for login
app.get("/login", function(req, res) {
  sp.create_login_request_url(idp, {}, function(err, login_url, request_id) {
    if (err != null)
      return res.send(500);
    res.redirect(login_url);
  });
});

// Assert endpoint for when login completes
app.post("/assert", function(req, res) {
  var options = {request_body: req.body};
  sp.post_assert(idp, options, function(err, saml_response) {
    if (err != null)
      return res.send(500);

    // Save name_id and session_index for logout
    // Note:  In practice these should be saved in the user session, not globally.
    name_id = saml_response.user.name_id;
    session_index = saml_response.user.session_index;

    res.send("Hello #{saml_response.user.name_id}!");
  });
});

// Starting point for logout
app.get("/logout", function(req, res) {
  var options = {
    name_id: name_id,
    session_index: session_index
  };

  sp.create_logout_request_url(idp, options, function(err, logout_url) {
    if (err != null)
      return res.send(500);
    res.redirect(logout_url);
  });
});

app.listen(3000);