/*
* RubberBand Image Re-Sizer
* Makes your images nicely fit with RubberBand
* ver - 0.1.0
* 11/09/2012
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
    fontSize = function () {
      var fontSize;

      try {
        fontSize = w.getComputedStyle(d.body).fontSize;
      } catch (e) {
        fontSize = d.body.currentStyle.fontSize;
      }

      return parseInt(fontSize, 10);
    },
    lineHeight = function () {
      var lineHeight;

      try {
        lineHeight = w.getComputedStyle(d.body).lineHeight;
      } catch (e) {
        lineHeight = d.body.currentStyle.lineHeight;
      }

      return parseInt(lineHeight, 10) / fontSize();
    };

  for (i in imgs()) {
    if (imgs().hasOwnProperty(i)) {
      imgs()[i].style.maxHeight = Math.floor(imgs()[i].height / fontSize() / lineHeight()) * lineHeight() + 'em';
      imgs()[i].style.display = 'block';
    }
  }

}(window, document));