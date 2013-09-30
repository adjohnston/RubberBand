//  RubberBand, a tool for developing responsive websites.
//  http://rubberband.adamjohnston.co.uk
//  copyright Adam Johnston 28/09/2013

var RubberBand = (function (window, document, undefined) {

    'use strict';

    //  private
    var i,
        defaults = {
            showAlways: false,
            showColumns: true,
            showLines: true,
            lineHeight: 24,
            gutterWidth: 24,
            columnCount: 12,
            viewportWidths: {
                mobile: 240,
                phablet: 480,
                tablet: 600,
                laptop: 992,
                desktop: 1408
            }
        },

        getColumnPercentage = function (mutiplier) {
            var pcent = 100 / defaults.columnCount * mutiplier;

            return pcent.toFixed(5) + '%';
        },

        //  create columns
        //  ==============
        //  creates the columns needed based on the options the user sets or the defaults.
        //  ------------------------------------------------------------------------------
        createCols = function () {
            for (i = 0; i < defaults.columnCount; i++) {
                document.getElementById('rb-cols').insertAdjacentHTML('beforeend', '<div class="rb-col rb-pos-fixed" style="width:' + 
                    getColumnPercentage(1) + ';border-width: ' + defaults.gutterWidth + 'px;left:' + 
                    getColumnPercentage(i) + ';"></div>');
            }
        },

        createLines = function () {
            var numOfLines = Math.floor(document.documentElement.clientHeight / defaults.lineHeight);

            for (i = 0; i <= numOfLines; i++) {
                document.getElementById('rb-lines').insertAdjacentHTML('beforeend', '<div class="rb-line rb-one-whole" style="height:' + 
                    defaults.lineHeight + 'px"></div>');
            }
        };

    addEventListener('load', function () {
        return [createCols(), createLines()];
    }, false);

    addEventListener('resize', function () {
        return createLines();
    }, false);

    //  public
    return {
        defaults: defaults
    }

} (window, document));