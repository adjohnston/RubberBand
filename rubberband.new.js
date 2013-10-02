//  RubberBand, a tool for developing responsive websites.
//  http://rubberband.adamjohnston.co.uk
//  copyright Adam Johnston 28/09/2013

var RubberBand = (function (window, document, undefined) {

    'use strict';

    //  private
    var i,
        htmlStr,
        defaults = {
            showAlways: false,
            showColumns: true,
            showLines: true,
            lineHeight: 24,
            gutterWidth: 24,
            columnCount: 12,
            viewportWidths: {
                mobile: 360,
                phablet: 480,
                tablet: 600,
                laptop: 992,
                desktop: 1408
            }
        },

        //  get column percentage
        //  =====================
        //  returns the percentage of the columns based on the number of columns.
        //  ---------------------------------------------------------------------
        //  @param {integer} the number of columns
        //  @param {integer} the column number
        //  @return {string} the percentage of a column
        //  -------------------------------------------
        getColumnPercentage = function (numOfCols, colNum) {
            var pcent = 100 / numOfCols * colNum;
            numOfCols = numOfCols || defaults.columnCount;

            return pcent.toFixed(5) + '%';
        },

        //  create columns
        //  ==============
        //  creates the columns needed based on the options the user sets or the defaults.
        //  it also takes into account the size of the viewport, which is partly set and partly
        //  based on the user settings.
        //  ---------------------------
        //  @param {integer} the number of columns
        //  --------------------------------------
        createCols = function (numOfCols) {
            var clientWidth = document.documentElement.clientWidth;
            numOfCols = numOfCols || defaults.columnCount;
            htmlStr = [];
            i = 0;

            if (clientWidth <= defaults.viewportWidths.mobile) {
                numOfCols = 2;
            } else if (clientWidth > defaults.viewportWidths.mobile && clientWidth <= defaults.viewportWidths.tablet) {
                numOfCols = 4;
            } else if (clientWidth > defaults.viewportWidths.tablet && clientWidth <= defaults.viewportWidths.desktop) {
                numOfCols = defaults.columnCount / 2;
            }

            for (i; i < numOfCols; i++) {
                htmlStr[i] = '<div class="rb-col rb-pos-abs" style="width:' + getColumnPercentage(numOfCols, 1) + ';border-width: ' +
                    defaults.gutterWidth + 'px;left:' + getColumnPercentage(numOfCols, i) + ';"></div>';
            }

            document.getElementById('rb-cols').innerHTML = htmlStr.join('');
        },

        //  create lines
        //  ============
        createLines = function () {
            var numOfLines = Math.floor(document.documentElement.clientHeight / defaults.lineHeight);
            htmlStr = [];
            i = 0;

            for (i; i < numOfLines; i++) {
                htmlStr[i] = '<div class="rb-line rb-one-whole" style="height:' + defaults.lineHeight + 'px"></div>';
            }

            document.getElementById('rb-lines').innerHTML = htmlStr.join('');
        };

    window.addEventListener('load', function () {
        createCols();
        createLines();
    }, false);

    window.addEventListener('resize', function () {
        createCols();
        createLines();
    }, false);

    //  public
    return {
        defaults: defaults
    }

}(window, document));