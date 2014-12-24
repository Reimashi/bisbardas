function strTrim(str) {
  var strcatch = String(str);
  return strcatch.replace(/^\s+|\s+$/gm,'');
}

function validateEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function stringEmpty (str) {
  var strcatch = String(str);
  return strTrim(strcatch).length == 0;
}
