//  RubberBand-Img-Sizer
//  http://rubberband.adamjohnston.co.uk
//  copyright Adam Johnston 10/12/2012

(function (w) {

  'use strict';

  var lineHeight = parseInt(w.getComputedStyle(w.document.body).lineHeight, 10),
    defaults = { resize: true },
    options = function (object) {
      var i,
        options = object || {};

      for (i in defaults) {
        if (defaults.hasOwnProperty(i) && options.hasOwnProperty(i)) {
          defaults[i] = options[i];
        }
      }

      return defaults;
    },

    resize = function () {
      var i = 0,
        imgs = w.document.getElementsByTagName("img");

      if (defaults.resize) {
        for (i; i < imgs.length; i += 1) {
          imgs[i].style.cssText = null;

          var multiplier = Math.round(imgs[i].height / lineHeight),
            newSize = lineHeight * multiplier;

          imgs[i].style.cssText = "width:auto;max-width:100%;height:" + newSize + "px;";
        }
      }
    }

  w.addEventListener("load", function () {
    resize();
  }, false);

  w.addEventListener("resize", function () {
    resize();
  }, false);

  w.imgSizer = {
    options: options
  };

}(this));