(function() {

  var _ = function(element) {
    u = {
      first: function() {
        return element[0];
      },
      last: function() {
        return element[element.length - 1];
      },
      without: function(item) {
        var args = Array.prototype.slice.call(arguments),
           result = [];
        element.forEach(function(item) {
          if (!args.includes(item)) {
            result.push(item);
          }
        });
        return result;
      },
      lastIndexOf: function(val) {
        var indx;
        for (var i = (element.length - 1); i >= 0; i--) {
         
          if (element[i] === val) {
            
            indx = i;
            break;
          }
        }
        return indx;
      },
      sample: function(n) {
        var result = [];
  
        function get() {
          var i = Math.floor(Math.random() * element.length);
          return element[i];
        }
        if (!n) {
          return get();
        } else {
          while (n > 0) {
            result.push(get());
            n--;
          }
        }
        return result;
      },
      //object functions
      findWhere: function(props) {
        var match;

        element.some(function(obj) {
          var all_match = true;
          
          for (var prop in props) {
            if (!(prop in obj) || obj[prop] !== props[prop]) {
              all_match = false;
            }
          }
          
          if (all_match) {
            match = obj;
            return true;
          }
        });
      return match;
    },
    where: function(props) {
      var result = [];
      element.forEach(function(obj) {
        var all_match = true;
        for (var prop in props) {
          if (!(prop in obj) || obj[prop] !== props[prop]) {
            all_match = false
          }
        }
        if (all_match) {result.push(obj) } 
      });
      console.log(result);
      return result;
    },
    pluck: function(prop) {
      var result = [];
      element.forEach(function(obj) {
        result.push(obj[prop]);
      });
      return result;
    },
    keys: function() {
      //element is a single object.
      result = [];
      for (var prop in element) {
        if (element.hasOwnProperty(prop)) {
          result.push(prop);
        }
      }
      return result;
    },
    values: function() {
      var result = [];
      for (var prop in element) {
        if (element.hasOwnProperty(prop)) {
          result.push(element[prop]);
        }
      }
      return result;
    },
    pick: function(props) {
      //element is an object
      var new_obj = {},
        args = Array.prototype.slice.call(arguments);
        
        args.forEach(function(prop) {
          if (prop in element) {
            new_obj[prop] = element[prop];
          }
        })
      return new_obj;
    },
    omit: function(props) {
      var new_obj = {},
      args = Array.prototype.slice.call(arguments);

      for (var prop in element) {
        if (!args.includes(prop)) {
          new_obj[prop] = element[prop];
        }
      };
      return new_obj;
    },
    has: function(prop) {
      return element[prop];
    }
  };
   
  (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
    u[method] = function() { _[method].call(u, element); };
  });

    return u;
  }

  _.range = function(start, stop) {
    var range = [];

    if (!stop) {
      stop = start;
      start = 0;
    } 
    for (var i = start; i < stop; i++) {
      range.push(i);
    }
    return range; 
  }

  _.extend = function(old) {
    //want to add the properties of new to old.
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(obj) {
      for (var prop in obj) {
        old[prop] = obj[prop];
      }
    });
    return old;
  }
  _.isElement = function(item) {
      return item.tagName ? true : false;
  }

  _.isArray = Array.isArray || function(item) {
    return toString.call(item) === "[obj Array";
  }
  
  _.isString = function(item) {

  } 

  _.isObject = function(item) {
    var type = typeof item;

    return type === "function" || type === "object" && !!item;
  }

  _.isFunction = function(item) {
    var type = typeof item;

    return type === "function"
  }

  _.isBoolean = function(item) {
    return toString.call(item) === "[object Boolean]";
  },

  _.isString = function(item) {
    return toString.call(item) === "[object String]";
  }

  _.isNumber = function(item) {
    return toString.call(item) === "[object Number]";
  }
  window._ = _;
})();