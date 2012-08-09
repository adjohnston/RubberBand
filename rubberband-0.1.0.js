/*
* RubberBand
* A responsive web design tool
* ver - 0.1.0
* Adam Johnston
* rubberband.adamjohnston.co.uk
*/

var rubberband = (function (win, doc) {

  'use strict';

  var options = { hideColumns: false, hideLines: false, showAlways: false }, value, viewports = { mobileLandscape: 640, mobilePortrait: 480, tabletLandscape: 1024, tabletPortrait: 768 },

    pxToEm = function (px) {
      if (typeof px === 'number') {
        return px / value.fontSize;
      }
    },

    get = function (string) {
      return doc.getElementById(string);
    },

    storage = function (string, boolean) {
      try {
        if (typeof boolean === 'boolean') {
          localStorage.setItem(string, boolean);
        } else {
          return localStorage.getItem(string);
        }
      } catch (error) {}
    },

    showAlways = function () {
      var i, style = { height: '100%', margin: 0, background: "rgba(255, 255, 255, .8)" };

      for (i in style) {
        if (style.hasOwnProperty(i)) {
          get('rb-tools').style[i] = style[i];
        }
      }
    },

    addCSS = function () {
      doc.head.insertAdjacentHTML('beforeend', ' <link rel="stylesheet" data-rel="RubberBand" href="http://adamjohnston.co.uk/rubberband/stylesheets/rubberband.min.css?v=1" media="screen" /><style data-rel="RubberBand">#rb-col-left div{right:-' + pxToEm(value.lineHeight) / 2 + 'em}#rb-col-right div{left:-' + pxToEm(value.lineHeight) / 2 + 'em}.rb-col{margin-left:-' + pxToEm(value.lineHeight) / 2 + 'em}.rb-col div{border-width:0 ' + pxToEm(value.lineHeight) / 2 + 'em}</style>');
    },

    addHTML = function () {
      doc.body.insertAdjacentHTML('beforeend', '<div id="rb-cols"><div id="rb-col-left" class="rb-col"><div></div></div><div id="rb-col-2" class="rb-col"><div></div></div><div id="rb-col-3" class="rb-col"><div></div></div><div id="rb-col-4" class="rb-col"><div></div></div><div id="rb-col-5" class="rb-col"><div></div></div><div id="rb-col-6" class="rb-col"><div></div></div><div id="rb-col-7" class="rb-col"><div></div></div><div id="rb-col-8" class="rb-col"><div></div></div><div id="rb-col-centre" class="rb-col"><div></div></div><div id="rb-col-10" class="rb-col"><div></div></div><div id="rb-col-11" class="rb-col"><div></div></div><div id="rb-col-12" class="rb-col"><div></div></div><div id="rb-col-13" class="rb-col"><div></div></div><div id="rb-col-14" class="rb-col"><div></div></div><div id="rb-col-15" class="rb-col"><div></div></div><div id="rb-col-16" class="rb-col"><div></div></div><div id="rb-col-right" class="rb-col"><div></div></div></div><div id="rb-lines"></div><div id="rb-tools"><div id="rb-header"><img src="http://adamjohnston.co.uk/rubberband/images/logo.png" alt="RubberBand" width="152" height="51" /></div><div id="rb-guide-toggle"><h1>toggle guide</h1><div class="rb-wrapper"><button id="rb-guide-on" role="button">on</button><button id="rb-guide-off" role="button">off</button></div></div><div id="rb-view-toggle"><h1>toggle view</h1><div class="rb-wrapper"><button id="rb-view-desktop" title="view desktop" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/desktop.png" alt="desktop" width="20" height="22" /></button><button id="rb-view-tablet-portrait" title="view tablet portrait" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/tablet_portrait.png" alt="tablet portrait" width="20" height="22" /></button><button id="rb-view-tablet-landscape" title="view tablet landscape" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/tablet_landscape.png" alt="tablet landscape" width="20" height="22" /></button><button id="rb-view-mobile-portrait" title="view mobile portrait" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/mobile_portrait.png" alt="mobile portrait" width="20" height="22" /></button><button id="rb-view-mobile-landscape" title="view mobile landscape" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/mobile_landscape.png" alt="mobile landscape" width="20" height="22" /></button></div></div><div id="rb-font-size-line-height"><h1>font-size / line-height</h1><p><span id="rb-font-size">?</span> / <span id="rb-line-height">?</span></p></div><div id="rb-width-height"><h1>width / height</h1><p><span id="rb-width">?</span> / <span id="rb-height">?</span></p></div><div id="rb-calculator"><h1>calculator</h1><div class="rb-wrapper"><input id="rb-desired-font-size" placeholder="??px" /><button id="rb-calculate" title="calculate" role="button"><img src="http://adamjohnston.co.uk/rubberband/images/buttons/calculate.png" alt="calculate" width="21" height="21" /></button></div><p>font-size : <span id="rb-new-font-size">?</span></p><p>line-height : <span id="rb-new-line-height">?</span></p><p>padding : <span id="rb-new-padding">?</span></p><p>single line : <span id="rb-new-single-line">?</span></p><textarea id="rb-new-css" placeholder="CSS will be generated here for easy copy and paste"></textarea></div></div>');
    },

    addLines = function () {
      var i = 1, lineHTML = '', numOfLines = (value.winHeight > value.docHeight) ? value.winHeight : value.docHeight;

      for (i; i <= Math.floor(numOfLines / value.lineHeight); i += 1) {
        lineHTML += '<div>' + i + '</div>';
      }

      get('rb-lines').innerHTML = lineHTML;
    },

    addValues = function () {
      get('rb-width').innerHTML = value.docWidth + 'px';
      get('rb-height').innerHTML = value.winHeight + 'px';
      get('rb-font-size').innerHTML = value.fontSize + 'px';
      get('rb-line-height').innerHTML = pxToEm(value.lineHeight) + 'em';
    },

    calculate = function (string) {
      var userFontSize = parseInt(string, 10), newFontSize = userFontSize / value.fontSize, multiplier = Math.round(newFontSize), newLineHeight = ((value.fontSize / userFontSize) * value.lineHeight * multiplier) / value.fontSize,
        stringFormat = function (val, limit, unit) {
          val = String(val).substr(0, limit);
          val = parseFloat(val);
          val = val.toString() + unit;
          return val;
        };

      if (userFontSize) {
        get('rb-new-font-size').innerHTML = stringFormat(newFontSize, 6, 'em');
        get('rb-new-line-height').innerHTML = stringFormat(newLineHeight, 6, 'em');
        get('rb-new-padding').innerHTML = stringFormat((newLineHeight / multiplier) / 2, 6, 'em');
        get('rb-new-single-line').innerHTML = stringFormat(value.lineHeight / value.fontSize / newFontSize, 6, 'em');
        get('rb-new-css').value = 'margin: ' + stringFormat((value.lineHeight / value.fontSize) / newFontSize, 6, 'em ') + '0; padding: 0 ' + stringFormat((newLineHeight / multiplier) / 2, 6, 'em; ') + 'font-size: ' + stringFormat(newFontSize, 6, 'em; ') + 'line-height: ' + stringFormat(newLineHeight, 6, 'em; ');
      } else {
        win.alert('Error! Please make sure you enter a number');
      }
    },

    guideToggle = function (boolean) {
      var a = { rbCols: get('rb-cols'), rbLines: get('rb-lines') }, i, rbGuideOff = get('rb-guide-off'), rbGuideOn = get('rb-guide-on');

      if (boolean) {
        rbGuideOn.className = 'rb-active';
        rbGuideOff.className = null;
      } else {
        rbGuideOff.className = 'rb-active';
        rbGuideOn.className = null;
      }

      for (i in a) {
        if (a.hasOwnProperty(i)) {
          if (boolean) {
            a[i].style.opacity = 1;
            a[i].style.zIndex = 1000000;
          } else {
            a[i].style.opacity = 0;
            a[i].style.zIndex = -1;
          }
        }
      }

      storage('rbGuideOn', boolean);
    },

    guideToggleCheck = function () {
      if (storage('rbGuideOn') === 'true') {
        guideToggle(true);
      } else {
        guideToggle(false);
      }
    },

    hideElement = function (element) {
      get('rb-' + element).style.display = 'none';
    },

    setOptions = function (object) {
      var i;

      for (i in object) {
        if (object.hasOwnProperty(i)) {
          options[i] = object[i];
        }
      }

      (function () {
        var i;

        for (i in options) {
          if (options.hasOwnProperty(i)) {
            if (i === 'showAlways' && options[i] === true) {
              showAlways();
            } else if (i === 'hideColumns' && options[i] === true) {
              hideElement('cols');
            } else if (i === 'hideLines' && options[i] === true) {
              hideElement('lines');
            }
          }
        }
      }());

      return options;
    },

    setViewports = function (object) {
      var i;

      for (i in object) {
        if (object.hasOwnProperty(i)) {
          viewports[i] = object[i];
        }
      }

      return viewports;
    },

    values = function () {
      value = { winHeight: win.innerHeight, docWidth: doc.body.clientWidth, docHeight: doc.body.clientHeight, fontSize: parseInt(win.getComputedStyle(doc.body).fontSize, 10), lineHeight: parseInt(win.getComputedStyle(doc.body).lineHeight, 10) };
    },

    viewToggle = function (string, boolean) {
      var a = { rbFrame: get('rb-frame'), rbOverlay: get('rb-overlay') }, i,
        viewStyling = function () {
          get('rb-frame').style.width = (win.scrollMaxY > value.winHeight) ? (viewports[string] + 16) + 'px' : viewports[string] + 'px';
          get('rb-frame').style.left = (((value.docWidth - viewports[string]) / 2) / value.docWidth) * 100 + '%';
        };

      if (boolean) {
        if (!get('rb-frame')) {
          doc.body.insertAdjacentHTML('afterbegin', '<div id="rb-overlay"></div><iframe id="rb-frame" name="rb-frame" src="' + doc.URL + '?id=rb-copy"></iframe>');
          viewStyling();
        } else {
          viewStyling();
        }
      }

      for (i in a) {
        if (a.hasOwnProperty(i) && !boolean) {
          try {
            doc.body.removeChild(a[i]);
            storage('rbViewOn', false);
          } catch (errorA) {}
        }
      }

      try {
        localStorage.setItem('rbViewport', string);
      } catch (errorB) {}
    };

  win.onload = (function () { return [values(), addCSS(), addHTML(), addValues(), addLines(), guideToggleCheck()]; }());

  win.onresize = function () { return [values(), addValues(), addLines()]; };

  get('rb-guide-on').onclick = function () { guideToggle(true); };

  get('rb-guide-off').onclick = function () { guideToggle(false); };

  get('rb-view-desktop').onclick = function () { viewToggle('desktop', false); };

  get('rb-view-mobile-landscape').onclick = function () { viewToggle('mobileLandscape', true); };

  get('rb-view-mobile-portrait').onclick = function () { viewToggle('mobilePortrait', true); };

  get('rb-view-tablet-landscape').onclick = function () { viewToggle('tabletLandscape', true); };

  get('rb-view-tablet-portrait').onclick = function () { viewToggle('tabletPortrait', true); };

  get('rb-calculate').onclick = function () { calculate(get('rb-desired-font-size').value); };

  get('rb-desired-font-size').onkeypress = function () {
    if (event.which === 13) {
      calculate(get('rb-desired-font-size').value);
    }
  };

  return {
    options: setOptions,
    viewports: setViewports,
    viewSettings: (function () {
      var a;

      try {
        a = localStorage.getItem('rbViewport');
      } catch (error) {}

      if (storage('rbViewOn') === 'true') {
        viewToggle(a, true);
        storage('rbViewOn', false);
      }

      if (win.name === 'rb-frame') {
        get('rb-view-toggle').style.visibility = 'hidden';
        get('rb-calculator').style.visibility = 'hidden';
        get('rb-font-size-line-height').style.top = '-56px';
        get('rb-width-height').style.top = '-56px';
        storage('rbViewOn', true);
      }
      return null;
    }())
  };

}(window, document));