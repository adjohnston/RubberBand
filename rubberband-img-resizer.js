/*
* RubberBand Image Re-Sizer
* Makes your images nicely fit with RubberBand
* ver - 0.1.3
* 18/09/2012
* Adam Johnston
* rubberband.adamjohnston.co.uk
*/

var rbImgResizer = (function (w, d) {

  'use strict';

  var i,
    imgs = function () {
      try {
        return d.getElementsByClassName('rb-img-resizer');
      } catch (e) {}
    },
    fontSize = function (elem) {
      var fontSize;

      try {
        fontSize = w.getComputedStyle(elem).fontSize;
      } catch (e) {
        fontSize = elem.currentStyle.fontSize;
      }

      return parseInt(fontSize, 10);
    },
    lineHeight = function (elem) {
      var lineHeight;

      try {
        lineHeight = w.getComputedStyle(elem).lineHeight;
      } catch (e) {
        lineHeight = elem.currentStyle.lineHeight;
      }

      lineHeight = parseInt(lineHeight, 10) / fontSize(elem);
      lineHeight = String(lineHeight).substr(0, 7);

      return parseFloat(lineHeight, 10);
    },
    resize = function () {
      for (i in imgs()) {
        if (imgs().hasOwnProperty(i)) {
          var img = imgs()[i],
            imgLineHeight = lineHeight(img.parentNode);
          img.style.maxHeight = Math.floor(img.height / fontSize(img.parentNode) / imgLineHeight) * imgLineHeight + 'em';
          img.style.display = 'block';
        }
      }
    };

  w.onload = resize();

}(window, document));