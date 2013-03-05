// Generated by CoffeeScript 1.6.1
(function() {

  window.OpenXJS = (function() {

    OpenXJS.prototype.spcScript = "spc.php";

    function OpenXJS(options) {
      this.deliveryUrl = options.deliveryUrl;
    }

    OpenXJS.prototype.displayAds = function(zonesMapping, parameters, callback) {
      var _this = this;
      return this.receiveAdCodes(zonesMapping, parameters, function(codes) {
        var code, target;
        for (target in codes) {
          code = codes[target];
          _this._displayAd(target, code);
        }
        return typeof callback === "function" ? callback() : void 0;
      });
    };

    OpenXJS.prototype.receiveAdCodes = function(zonesMapping, parameters, callback) {
      var openXParameters, scriptUrl,
        _this = this;
      openXParameters = this._openxParameters(zonesMapping, parameters);
      scriptUrl = this.deliveryUrl + this.spcScript + "?" + this._queryString(openXParameters);
      return this._loadScript(scriptUrl, function() {
        return _this._parseResponse(zonesMapping, callback);
      });
    };

    OpenXJS.prototype._parseResponse = function(zonesMapping, callback) {
      var codes, target, zone;
      codes = {};
      if (typeof window.OA_output !== "object") {
        window.OA_output = null;
        if (typeof callback === "function") {
          callback(codes);
        }
        return;
      }
      for (target in zonesMapping) {
        zone = zonesMapping[target];
        if (this._emptyResponse(window.OA_output[target])) {
          continue;
        }
        codes[target] = window.OA_output[target];
      }
      window.OA_output = null;
      return typeof callback === "function" ? callback(codes) : void 0;
    };

    OpenXJS.prototype._displayAd = function(target, code) {
      var targetElement;
      targetElement = document.getElementById(target);
      if (targetElement === null) {
        return;
      }
      return document.getElementById(target).innerHTML = code;
    };

    OpenXJS.prototype._openxParameters = function(zonesMapping, parameters) {
      var key, mappingString, openXParameters, target, value, zone;
      mappingString = "|";
      for (target in zonesMapping) {
        zone = zonesMapping[target];
        mappingString += "" + target + "=" + zone + "|";
      }
      openXParameters = {
        zones: mappingString,
        nz: 1,
        blockcampaign: 1,
        charset: this._documentCharset(),
        cb: this._randomNumber(),
        r: this._randomNumber(),
        loc: this._location(),
        referer: this._referrer()
      };
      for (key in parameters) {
        value = parameters[key];
        openXParameters[key] = value;
      }
      return openXParameters;
    };

    OpenXJS.prototype._loadScript = function(url, callback) {
      var called, s,
        _this = this;
      s = document.createElement('script');
      s.async = "async";
      called = false;
      s.onload = s.onreadystatechange = function() {
        if ((s.readyState && !(/complete|loaded/.test(s.readyState))) || called) {
          return;
        }
        called = true;
        s.onload = s.onreadystatechange = null;
        return typeof callback === "function" ? callback() : void 0;
      };
      s.src = url;
      return this._appendToHead(s);
    };

    OpenXJS.prototype._randomNumber = function() {
      return Math.floor(Math.random() * 99999999999);
    };

    OpenXJS.prototype._location = function() {
      return window.location;
    };

    OpenXJS.prototype._referrer = function() {
      return document.referrer;
    };

    OpenXJS.prototype._documentCharset = function() {
      if (document.charset) {
        return document.charset;
      } else {
        if (document.characterSet) {
          return document.characterSet;
        } else {
          return "";
        }
      }
    };

    OpenXJS.prototype._emptyResponse = function(response) {
      return typeof response !== "string" || response === "" || response === "<a href=\'F\' target=\'_blank\'><img src=\'F\' border=\'0\' alt=\'\'></a>\n";
    };

    OpenXJS.prototype._queryString = function(parameters) {
      var elements, name, value;
      elements = [];
      for (name in parameters) {
        value = parameters[name];
        if (value != null) {
          elements.push("" + name + "=" + (encodeURIComponent(value)));
        }
      }
      return elements.join('&');
    };

    OpenXJS.prototype._appendToHead = function(element) {
      var head;
      head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
      return head.insertBefore(element, head.firstChild);
    };

    return OpenXJS;

  })();

}).call(this);