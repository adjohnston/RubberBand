//  RubberBand, a tool for developing responsive websites.
//  http://rubberband.adamjohnston.co.uk
//  copyright Adam Johnston 20/12/2012

(function (w) {

    "use strict";

    var defaults = { showAlways : false, showColumns : true, showLines : true, desktop : 992, tablet : 600, mobile : 240 },
        values,

        //  private methods
        //  add required values
        addValues = function () {
            var styles;

            (function () {
                try {
                    styles = w.getComputedStyle(w.document.body);
                } catch (error) {
                    styles = w.document.body.currentStyle;
                }
            }());

            values = { fontSize : parseInt(styles.fontSize, 10), lineHeight : parseInt(styles.lineHeight, 10), winHeight : w.innerHeight, docWidth : w.document.body.clientWidth, docHeight : w.document.body.clientHeight };
        },

        //  add required HTML to the DOM
        addHTML = (function () {
            addValues();

            var linesHTML = "",

                pxToEm = function (value) {
                    return value / values.fontSize;
                },

                addLines = (function () {
                    var i = 1,
                        numOfLines = (values.winHeight > values.docHeight) ? (values.winHeight / values.lineHeight) : (values.docHeight / values.lineHeight);

                    for (i; i <= numOfLines; i += 1) {
                        linesHTML += "<div>" + i + "</div>";
                    }
                }());

            try {
                //  add CSS
                w.document.head.insertAdjacentHTML("beforeend", " <style id=\"rb-style\">@import url(http://fonts.googleapis.com/css?family=Pacifico);#rb-cols{width:100%;height:100%;overflow:hidden;position:fixed;top:0;left:0}#rb-cols .rb-col{height:100%;margin-left:-" + pxToEm(values.lineHeight / 2) + "em;border:1px solid rgba(255,120,158,.25);border-width:0 " + pxToEm(values.lineHeight / 2) + "em;opacity:0;position:absolute;top:0}#rb-cols .rb-col div{height:100%;margin-left:-1px;border:1px solid rgba(255,120,158,.25);border-width:0 2px 0 0;position:absolute;top:0}#rb-col-1{left:6.25%}#rb-col-2{left:12.5%}#rb-col-3{left:18.75%}#rb-col-4{left:25%}#rb-col-5{left:31.25%}#rb-col-6{left:37.5%}#rb-col-7{left:43.75%}#rb-col-centre{left:50%}#rb-col-9{left:56.25%}#rb-col-10{left:62.5%}#rb-col-11{left:68.75%}#rb-col-12{left:75%}#rb-col-13{left:81.25%}#rb-col-14{left:87.5%}#rb-col-15{left:93.75%}#rb-col-centre.rb-col div{border-style:dashed}#rb-col-left.rb-col{opacity:1;left:0}#rb-col-right.rb-col{opacity:1;right:-" + pxToEm(values.lineHeight / 2) + "em}#rb-lines{width:100%;height:100%;position:absolute;top:0;left:0}#rb-lines div{margin-top:-1px;padding-left:4px;border-bottom:1px solid rgba(62,62,155,0.25);color:rgba(62,62,155,0.25)}#rb-tools{width:190px;margin-top:-456px;padding:12px;background:rgba(255,255,255,.8);color:#444;font-family:arial,sans-serif;text-shadow:0 1px 0 #eee;position:fixed;top:0;right:0;z-index:1000003;-moz-transition:margin .25s;-webkit-transition:margin .25s;-o-transition:margin .25s;-ms-transition:margin .25s;transition:margin .25s;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}#rb-tools:focus,#rb-tools:hover{margin:0}#rb-tools *:focus{outline:0}#rb-tools>div{margin:12px 0;position:relative}#rb-tools h6{margin:0;font-size:10px;line-height:24px;text-transform:uppercase}#rb-tools button{width:50px;min-width:24px;height:24px;margin:0;padding:0;background-color:#444;border:0;border-radius:4px;box-shadow:inset 5px 5px 10px transparent,inset -5px -5px 10px transparent;font:10px/24px arial,sans-serif;text-shadow:0 -1px 0 #111;color:#fff;float:left;-moz-transition:background .5s,box-shadow .2s;-webkit-transition:background .5s,box-shadow .2s;-o-transition:background .5s,box-shadow .2s;-ms-transition:background .5s,box-shadow .2s;transition:background .5s,box-shadow .2s}#rb-tools p{margin:0!important;padding:0!important;font-size:12px!important;font-weight:bold;line-height:24px!important}#rb-tools fieldset,#rb-tools input,#rb-tools textarea{min-height:24px;margin:0;padding:0;border:0;font:bold 10px/14px arial,sans-serif}#rb-tools button:hover{box-shadow:inset 5px 5px 10px #58a07d,inset -5px -5px 10px #58a07d;cursor:pointer}h6#rb-header{margin:12px 0 24px!important;font:24px/24px Pacifico!important;text-align:center!important;text-transform:none;text-shadow:0 -1px 0 #000;-moz-transform:skew(0,-6deg);-webkit-transform:skew(0,-6deg);-o-transform:skew(0,-6deg);-ms-transform:skew(0,-6deg);transform:skew(0,-6deg)}#rb-toggle-guide div{overflow:hidden}#rb-toggle-guide button{width:35px;float:left}#rb-toggle-guide button.active{background:#78b99b;font-weight:bold;text-shadow:0 1px 0 #98d3ba;color:#444}#rb-toggle-on{border-radius:4px 0 0 4px!important}#rb-toggle-off{border-radius:0 4px 4px 0!important}#rb-toggle-viewport div{overflow:hidden}#rb-toggle-viewport button{margin-right:4px}#rb-calc input{width:44px;height:24px;border-radius:4px 0 0 4px;float:left}#rb-calc button{margin-left:-4px}#rb-calc textarea{width:100%;height:60px;margin:12px 0 0;border-radius:4px;float:left;resize:none}#rb-pull-tab{width:12px;margin:0 auto!important;padding:12px;background:rgba(255,255,255,.8);position:absolute!important;right:0;bottom:-36px}#rb-pull-tab hr{width:0!important;margin:0!important;border:6px solid #000!important;border-color:#444 transparent transparent!important;display:block!important;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s;-ms-transition:-ms-transform .5s;transition:transform .5s}#rb-tools:hover #rb-pull-tab hr{-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}#rb-overlay{width:100%;height:100%;background:rgba(0,0,0,.9);opacity:0;position:fixed;top:0;left:0;z-index:-1}#rb-helper-message{padding:0 8px;background:#78b99b;border-radius:0 0 4px;font:bold 12px/24px arial,sans-serif;text-shadow:0 1px 0 #98d3ba;color:#444;opacity:0;cursor:pointer;position:fixed;top:0;left:0}#rb-frame{height:100%;border:0;opacity:0;overflow-y:scroll;position:fixed;top:0;z-index:-1}#rb-cols,#rb-lines,#rb-frame{-moz-transition:opacity .5s;-webkit-transition:opacity .5s;-o-transition:opacity .5s;-ms-transition:opacity .5s;transition:opacity .5s}#rb-overlay{-moz-transition:opacity .25s;-webkit-transition:opacity .25s;-o-transition:opacity .25s;-ms-transition:opacity .25s;transition:opacity .25s}#rb-frame{-moz-transition:width .5s,left .5s;-webkit-transition:width .5s,left .5s;-o-transition:width .5s,left .5s;-ms-transition:width .5s,left .5s;transition:width .5s,left .5s}#rb-frame *{-moz-transition:width .5s,height .5s;-webkit-transition:width .5s,height .5s;-o-transition:width .5s,height .5s;-ms-transition:width .5s,height .5s;transition:width .5s,height .5s}#rb-cols .rb-col{-moz-transition:opacity .5s,border-width .5s;-webkit-transition:opacity .5s,border-width .5s;-o-transition:opacity .5s,border-width .5s;-ms-transition:opacity .5s,border-width .5s;transition:opacity .5s,border-width .5s}.hide{display:none}@media screen{#rb-col-centre.rb-col{opacity:1}}@media screen and (min-width:30em){#rb-col-4.rb-col,#rb-col-12.rb-col{opacity:1}}@media screen and (min-width:48em){#rb-col-2.rb-col,#rb-col-6.rb-col,#rb-col-10.rb-col,#rb-col-14.rb-col{opacity:1}}@media screen and (min-width:62em){#rb-cols .rb-col{opacity:1}}</style>");
                //  add tools
                w.document.body.insertAdjacentHTML("beforeend", "<div id=\"rb-cols\"><div id=\"rb-col-left\" class=\"rb-col\"></div><div id=\"rb-col-1\" class=\"rb-col\"><div></div></div><div id=\"rb-col-2\" class=\"rb-col\"><div></div></div><div id=\"rb-col-3\" class=\"rb-col\"><div></div></div><div id=\"rb-col-4\" class=\"rb-col\"><div></div></div><div id=\"rb-col-5\" class=\"rb-col\"><div></div></div><div id=\"rb-col-6\" class=\"rb-col\"><div></div></div><div id=\"rb-col-7\" class=\"rb-col\"><div></div></div><div id=\"rb-col-centre\" class=\"rb-col\"><div></div></div><div id=\"rb-col-9\" class=\"rb-col\"><div></div></div><div id=\"rb-col-10\" class=\"rb-col\"><div></div></div><div id=\"rb-col-11\" class=\"rb-col\"><div></div></div><div id=\"rb-col-12\" class=\"rb-col\"><div></div></div><div id=\"rb-col-13\" class=\"rb-col\"><div></div></div><div id=\"rb-col-14\" class=\"rb-col\"><div></div></div><div id=\"rb-col-15\" class=\"rb-col\"><div></div></div><div id=\"rb-col-right\" class=\"rb-col\"></div></div><div id=\"rb-lines\"></div><div id=\"rb-tools\"><h6 id=\"rb-header\">RubberBand</h6><div id=\"rb-toggle-guide\"><h6>toggle guide</h6><div><button id=\"rb-toggle-on\" class=\"active\">on</button><button id=\"rb-toggle-off\">off</button></div></div><div id=\"rb-toggle-viewport\"><h6>toggle viewport</h6><div><button id=\"rb-toggle-desktop\" title=\"view desktop\">desktop</button><button id=\"rb-toggle-tablet\" title=\"view tablet\">tablet</button><button id=\"rb-toggle-mobile\" title=\"view mobile\">mobile</button></div></div><div id=\"rb-width-height\"><h6>width / height</h6><p>? / ?</p></div><div id=\"rb-font-size-line-height\"><h6>font-size / line-height</h6><p>? / ?</p></div><div id=\"rb-calc\"><h6>calculator</h6><fieldset><input id=\"rb-calc-value\" type=\"text\" placeholder=\"??px\"/><button id=\"rb-calc-submit\" title=\"calculate CSS\">calculate</button><textarea id=\"rb-calc-result\" placeholder=\"CSS will appear here.\"></textarea></fieldset></div><div id=\"rb-pull-tab\"><hr /></div></div><div id=\"rb-overlay\"></div><div id=\"rb-helper-message\">&times;</div><iframe id=\"rb-frame\" name=\"rb-frame\"></iframe>");
                 //  add lines
                w.document.getElementById("rb-lines").innerHTML = linesHTML;
            } catch (error) {}
        }()),

        //  resizes image heights to fit in with line-height
        imgSizer = function () {
            var i = 0,
                imgs = w.document.getElementsByTagName("img");

            for (i; i < imgs.length; i += 1) {
                imgs[i].style.cssText = null;

                var multiplier = Math.round(imgs[i].height / values.lineHeight),
                    newSize = values.lineHeight * multiplier;

                imgs[i].style.cssText = "width:auto;max-width:100%;height:" + newSize + "px;";
            }
        },

        //  update the tool with values
        setValues = function () {
            addValues();

            w.document.getElementById("rb-width-height").children[1].innerHTML = values.docWidth + "px / " + values.winHeight + "px";
            w.document.getElementById("rb-font-size-line-height").children[1].innerHTML = values.fontSize + "px / " + String(values.lineHeight).substr(0, 7) + "px";
        },

        //  add or remove values to localstorage
        storage = function (key, value) {
            try {
                if (value !== undefined) {
                    w.localStorage.setItem(key, value);
                } else {
                    return w.localStorage.getItem(key);
                }
            } catch (error) {}
        },

        //  toggle the guide
        toggleGuide = function (element, show) {
            var buttons = [ w.document.getElementById("rb-toggle-on"), w.document.getElementById("rb-toggle-off") ],
                guides = [ w.document.getElementById("rb-cols"), w.document.getElementById("rb-lines") ],
                i;

            for (i in buttons) {
                try {
                    if (buttons.hasOwnProperty(i)) {
                        buttons[i].className = "";
                    }
                } catch (error1) {}
            }

            for (i in guides) {
                try {
                    if (guides.hasOwnProperty(i)) {
                        guides[i].style.cssText = "opacity: 0; z-index: -1;";

                        if (show) {
                            guides[i].style.cssText = "opacity: 1; z-index: 1000000;";
                        }
                    }
                } catch (error2) {}
            }

            element.className = "active";
            storage("RBShowGuide", show);
        },

        toggleGuideCheck = (function () {
            if (storage("RBShowGuide") === "true") {
                toggleGuide(w.document.getElementById("rb-toggle-on"), true);
            } else {
                toggleGuide(w.document.getElementById("rb-toggle-off"), false);
            }
        }()),

        //  toggle the view
        toggleView = function (viewWidth, show) {
            var frame = w.document.getElementById("rb-frame"),
                overlay = w.document.getElementById("rb-overlay"),
                helperMessage = w.document.getElementById("rb-helper-message"),
                hideCSS = "opacity: 0; z-index: -1";

            if (!frame.src) {
                w.document.getElementById("rb-frame").src = w.document.URL + "?id=rb-copy";
            }

            overlay.style.cssText = hideCSS;
            frame.style.cssText = hideCSS;
            helperMessage.style.cssText = hideCSS;
            frame.width = viewWidth + 16;

            if (show) {
                overlay.style.cssText = "opacity: 1; z-index: 1000001;";
                helperMessage.style.cssText = "opacity: 1; z-index: 1000003;";
                frame.style.cssText = "left: " + ((((values.docWidth - viewWidth) / values.docWidth) * 100) / 2) + "%; opacity: 1; z-index: 1000002;";
            }

            storage("RBViewWidth", viewWidth);
            storage("RBShowView", show);
        },

        toggleViewCheck = (function () {
            if (storage("RBShowView") === "true" && w.name !== "rb-frame") {
                toggleView(parseInt(storage("RBViewWidth"), 10), true);
            }
        }()),

        //  calculate CSS
        calculate = function (val) {
            var value = parseInt(val, 10),
                fontSize = (value / values.fontSize),
                multiplier = Math.ceil(fontSize),
                lineHeight = (Math.ceil(((values.lineHeight / value) * multiplier) * 1000)) / 1000,
                margin = (lineHeight / multiplier),
                padding = ((lineHeight / 2) / multiplier),

                format = function (attr) {
                    attr = String(attr).substr(0, 7);
                    return attr;
                };

            if (value && typeof value === "number") {
                w.document.getElementById("rb-calc-result").innerHTML = "margin: " + format(margin) + "em 0; padding: 0 " + format(padding) + "em; font-size: " +
                                                                        format(fontSize) + "em; line-height: " + format(lineHeight) + "em;";
            } else {
                w.alert("please enter a value");
            }
        },

        //  check for user options
        optionsCheck = function () {
            //  check for show always
            if (defaults.showAlways) {
                w.document.getElementById("rb-tools").style.cssText = "width: 190px; height: 100%; margin-top: 0;";
                w.document.getElementById("rb-pull-tab").style.display = "none";
            }

            //  check for show columns
            if (!defaults.showColumns) {
                w.document.getElementById("rb-cols").className += "hide";
            }

            //  check for show lines
            if (!defaults.showLines) {
                w.document.getElementById("rb-lines").className += "hide";
            }
        },

        //  return default options or set user specific
        options = function (userOptns) {
            var i, userOptions = userOptns || {};

            for (i in defaults) {
                try {
                    if (defaults.hasOwnProperty(i) && userOptions.hasOwnProperty(i)) {
                        defaults[i] = userOptions[i];
                    }
                } catch (error) {}
            }

            optionsCheck();

            return defaults;
        },

        frameCheck = (function () {
            if (w.name === "rb-frame") {
                w.document.getElementById("rb-toggle-viewport").style.visibility = "hidden";
                w.document.getElementById("rb-helper-message").style.visibility = "hidden";
                w.document.getElementById("rb-width-height").style.top = "-56px";
                w.document.getElementById("rb-font-size-line-height").style.top = "-56px";
                w.document.getElementById("rb-calc").style.top = "-56px";
            }
        }());

    //  load rubberband
    w.addEventListener("load", function () {
        return [setValues(), imgSizer()];
    }, false);

    //  on resize of the window
    w.addEventListener("resize", function () {
        return [setValues(), imgSizer()];
    }, false);

    //  on clicks of various buttons
    w.document.getElementById("rb-toggle-on").addEventListener("click", function () {
        toggleGuide(this, true);
    }, false);

    w.document.getElementById("rb-toggle-off").addEventListener("click", function () {
        toggleGuide(this, false);
    }, false);

    w.document.getElementById("rb-toggle-desktop").addEventListener("click", function () {
        toggleView(defaults.desktop, true);
    }, false);

    w.document.getElementById("rb-toggle-tablet").addEventListener("click", function () {
        toggleView(defaults.tablet, true);
    }, false);

    w.document.getElementById("rb-toggle-mobile").addEventListener("click", function () {
        toggleView(defaults.mobile, true);
    }, false);

    w.document.getElementById("rb-helper-message").addEventListener("click", function () {
        toggleView(0, false);
    }, false);

    w.addEventListener("keydown", function (event) {
        try {
            if (event.keyCode === 27) {
                toggleView(0, false);
            }
        } catch (error) {}
    }, false);

    w.document.getElementById("rb-calc-submit").addEventListener("click", function () {
        calculate(w.document.getElementById("rb-calc-value").value);
    }, false);

    w.document.getElementById("rb-calc-value").addEventListener("keydown", function (event) {
        try {
            if (event.keyCode === 13) {
                calculate(w.document.getElementById("rb-calc-value").value);
            }
        } catch (error) {}
    }, false);

    //  public rubberband object
    w.rubberband = {

        options: options

    };

}(this));