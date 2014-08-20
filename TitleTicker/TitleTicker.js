/*jslint browser: true, plusplus: true, sloppy: true, white: true */

!function(name, factory) {

    "use strict";

    if (typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // and other AMD like modules
        define(name, factory);
    } else {
        // if no AMD environment make global function...
        window[name] = factory();
    }
}('TitleTicker', function() {
    "use strict";

    var

        /**
         * The current operating version of TitleTicker
         * @example
         * Versioning = (R|B|A) (Recommended | Beta | Alpha - Build)  \b(\d\.\d\.\d) (1 (Major Version) . 1 (Minor Version) . 0 (Bug Patch))
         * Must match regex pattern - /\b(R|B|A)\d\.\d\.\d\b/
         * @type {String}
         */
        version = 'R1.0.0',

         /**
         * 
         * Allows you to do cool effects with the title tag on a website
         *
         * @module TitleTicker
         * @alias module:TitleTicker
         *  
         */
        TitleTicker = {

            /**
             * Makes the title of the page blink
             *
             * @param {Object} parameters             The parameters for this function
             * @param {String} parameters.text        If you want to use custom text for the title instead of the text currently in there 
             * @param {Number} parameters.fps         Frames per second (How many times a second blink) 
             * @param {Number} parameters.titleLength Max Title length
             *
             * @alias module:TitleTicker.blink
             * @memberOf module:TitleTicker
             *
             * @return {Object} a stop function that can be called to stop it
             */
            blink: function(parameters) {

                var
                    title = document.getElementsByTagName("title")[0],

                    /**
                     * If you want to use custom text for the title instead of the text currently in there 
                     * @type {String}
                     * @default What the title already is
                     */
                    text = parameters.text || title.innerHTML,

                    /**
                     * Frames per second (How many times a second blink)
                     * @type {Number}
                     * @default 1
                     */
                    fps = parameters.fps || 1,

                    /**
                     * Max Title length
                     * @type {Number}
                     * @default 25
                     */
                    titleLength = parameters.titleLength || 25,

                    curTitle = text.substring(0, titleLength - 1),

                    timer;


                timer = setInterval(function() {

                    if (curTitle === '') {
                        curTitle = text.substring(0, titleLength - 1);
                    } else {
                        curTitle = '';
                    }
                    title.innerHTML = curTitle;
                }, 1000 / fps);

                return {
                    /**
                     * Call it to stop the blinking of the title
                     * @return {Object} Returns the TitleTicker Object
                     */
                    stop: function() {
                        clearInterval(timer);
                        title.innerHTML = text;

                        return TitleTicker;
                    }
                };
            },

            /**
             * Make the title of the page tick across
             *
             * @param {Object} parameters                The parameters for this function
             * @param {String} parameters.text           If you want to use custom text for the title instead of the text currently in there 
             * @param {Number} parameters.fps            Frames per second (How many times a second tick) 
             * @param {Number} parameters.titleLength    Max Title length
             * @param {String} parameters.spaceCharacter The character to use to space out the title (do not use the space character, it doesn't work!)
             *
             * @alias module:TitleTicker.tick
             * @memberOf module:TitleTicker
             *
             * @return {Object} a stop function that can be called to stop it
             */
            tick: function(parameters) {

                var
                    title = document.getElementsByTagName("title")[0],

                    /**
                     * If you want to use custom text for the title instead of the text currently in there 
                     * @type {String}
                     * @default What the title already is
                     */
                    text = parameters.text || title.innerHTML,

                    /**
                     * Frames per second (How many times a second blink)
                     * @type {Number}
                     * @default 1
                     */
                    fps = parameters.fps || 1,

                    /**
                     * Max Title length
                     * @type {Number}
                     * @default 25
                     */
                    titleLength = parameters.titleLength || 25,

                    /**
                     * The character to use to space out the title (do not use the space character, it doesn't work!)
                     * @type {String}
                     */
                    spaceCharacter = parameters.spaceCharacter || '_',

                    pos = 0,

                    curTitle = text.substring(0, titleLength - 1),

                    timer,

                    beginText = '',


                    // ____ Oh Optimisations how you curse me _____/
                    i = 0,
                    l = 0;

                text = text.replace(' ', spaceCharacter);

                title.innerHTML = text + new Array(titleLength - text.length)
                    .join(spaceCharacter);

                timer = setInterval(function() {

                    curTitle = beginText + new Array(pos - beginText.length + 1)
                        .join(spaceCharacter);

                    curTitle += text.substring(0, titleLength - pos - 1);


                    // Decrement pos by one and if it is smaller than one than set it to titleLength
                    pos = --pos <= 0 ? titleLength : --pos;

                    beginText = text.substring(titleLength - pos, text.length);


                    // Make sure curTitle has trailing space characters (too make it look smooth)
                    for (i = curTitle.length, l = titleLength; i < l; i++) {
                        curTitle += spaceCharacter;
                    }

                    // Replace all spaces in title with the space character as well as making sure it is the exact title length
                    curTitle = curTitle.substring(0, titleLength - 1)
                        .replace(' ', spaceCharacter);

                    title.innerHTML = curTitle;
                }, 1000 / fps);

                return {
                    /**
                     * Call it to stop the ticking of the title
                     * @return {Object} Returns the TitleTicker Object
                     */
                    stop: function() {
                        clearInterval(timer);
                        title.innerHTML = text;

                        return TitleTicker;
                    }
                };
            }

        };

    /**
     * The current operating version of TitleTicker
     * @example
     * Versioning = (R|B|A) (Recommended | Beta | Alpha - Build)  \b(\d\.\d\.\d) (1 (Major Version) . 1 (Minor Version) . 0 (Bug Patch))
     * Must match regex pattern - /\b(R|B|A)\d\.\d\.\d\b/
     * @type {String}
     */
    TitleTicker.version = version;

    return TitleTicker;

});