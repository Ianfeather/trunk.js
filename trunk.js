(function(){

  // Polyfill older browsers
  if (!window.console) {
    console = {
      log: function(){}
    };
  }

  var _endpoint = 'http://127.0.0.1:3000/js-error?type=error', 
      _iframe = null;

  _buildClientInfo = function() {
    var user_agent = navigator.userAgent,
        location = window.location.href;
    return "&ua=" + user_agent + "&url" + location;
  },

  _buildUrl = function (error, clientInfo, url) {
    url += _endpoint.match(/\?.+$/) ? '&' : '?';
    url += error + clientInfo;
    return url.split(' ').join('%20');
  },

  _send = function(error) {
    url = _buildUrl(error, _buildClientInfo(), _endpoint);
    

    if (_iframe === null) {
      _iframe = document.createElement("iframe");
      _iframe.id = 'js-err-logging';
      _iframe.src = url;
      _iframe.setAttribute('class', 'is-hidden');
      t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(_iframe, t);
    } else {
      _iframe.src = url;
    }

  };

  window.onerror = function(message, file, line) {
    var error = "error=" + message + "&file=" + file + "&line=" + line;
    _send(error);
  };

})();