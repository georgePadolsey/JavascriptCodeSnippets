!function (name, factory) {
	// CommonJS
    if (typeof module != 'undefined') module.exports = factory()
  	// and other AMD like modules
    else if (typeof define == 'function' && define.amd) define(name, factory)
    // if no AMD environment make global function...
    else this[name] = factory()
}('aReplace', /** @module aReplace */ function () {


	var 
		
		/**
		 * The current operating version of aReplace 
		 * @example
		 * Versioning = (R|B|A) (Recommended | Beta | Alpha - Build)  \b(\d\.\d\.\d) (1 (Major Version) . 1 (Minor Version) . 0 (Bug Patch))
		 * Must match regex pattern - /\b(R|B|A)\d\.\d\.\d\b/
		 * @type {String}
		 */
		version = 'R1.1.0',

		/**
		 * 
		 * Replaces all anchor tags (a tags) with a fake address when hovered over;
		 * Though it still takes the person to the required place;
		 * It degrades to the normal hover over link if javascript is off;
		 *
		 * @param {Object}   properties The properties for the aReplace
		 * @param {Object}   properties.container The container to run aReplace in {@link aReplace#container}
		 * @param {Boolean}  properties.recursive Whether it will go in the child elements of the container and run aReplace on them {@link aReplace#recursive}
		 * @param {String}   properties.text The, "fake", address of the text when hovered over
		 *
		 * @return {Boolean} if completed sucessfully _mainly a fallback incase an error didn't correctly break the function_ 
		 *
		 * @alias module:aReplace
		 * 
		 * @example 
		 * aReplace({
		 * 		// Run through the container element
		 *		container: document.getElementById('container'), 
		 *		// Recurse through the child elements of it
		 *		recursive: true, 
		 *		// Make the link appear as http://www.georgep.co.uk/
		 * 		text: 'http://www.georgep.co.uk/'
		 * });	
		 *  
		 */
		aReplace = function(parameters) {
			var 

				/**
				 * The container to run aReplace in
				 * @type {Object}
				 * @default document.body
				 */
				container = parameters.container || document.body,

				/**
				 * Whether it will go in the child elements of the container and run aReplace on them
				 * @type {Boolean}
				 * @default false
				 */
				recursive = parameters.recursive || false,

				/**
				 * The, "fake", address of the text when hovered over
				 * @type {String}
				 * @default "http://www.howtouseascript.com/"
				 */
				text = parameters.text || "http://www.howtouseascript.com/",

				// Get all anchor elements in the container
				aElements = container.getElementsByTagName('a');
			
			// If the container it isn't an element - error and break out of function
			if(!isElement(container)) {
				error('The container you passed into '+getNameWithVersion()+' !== DOM element');
				return false;
			}

			// Loop through all the anchor elements
			for(var i = 0, l = aElements.length, aElement; i < l; i++) {
				aElement = aElements[i];
				// If recursive 
				if(recursive) {
					// If the element doesn't descend the container then go to next anchor link
					if(!isDescendant(aElement, container))
						continue;
					// make it a fake link
					makeFakeLink(aElement, text);
				} else {
					// If a element parent node isn't the container go to the next anchor element
					if(aElement.parentNode !== container)
						continue;
					// make it a fake link
					makeFakeLink(aElement, text);
				}
			}

			// Return successfully
			return true;
		};

	/**
	 * The current operating version of aReplace 
	 * @example
	 * Versioning = (R|B|A) (Recommended | Beta | Alpha - Build)  \b(\d\.\d\.\d) (1 (Major Version) . 1 (Minor Version) . 0 (Bug Patch))
	 * Must match regex pattern - /\b(R|B|A)\d\.\d\.\d\b/
	 * @type {String}
	 */
	aReplace.version = version;

	/**
	 * Returns true if object is a dom element
	 * @param  {Object}  o   object to test
	 * @return {Boolean}     if it is a dom element
	 */
	function isElement(o) {
		return (
			typeof HTMLElement === "object" ? 
				o instanceof HTMLElement : //DOM2
				o &&
				typeof o === "object" &&
				o !== null && 
				o.nodeType === 1 && 
				typeof o.nodeName === "string"
		);
	}

	/**
	 * Make an anchor element a fake link
	 * @param  {Object} anchorElement the anchor element
	 * @param  {String} text          the fake text
	 */
	function makeFakeLink(anchorElement, text) {

		// If it isn't an element break
		if(!isElement(anchorElement)) 
			return;

		// Set it's data-href to it's current href tag (it is originally href for good degradation if javascript is disabled)
		anchorElement.setAttribute('data-href', anchorElement.href);

		// Set's it's href to the custom text
		anchorElement.href = text;

		// On click make sure it goes to original place with the click event
		anchorElement.onclick = clickEvent;
	}

	function getNameWithVersion() {
		return 'aReplace-'+aReplace.version;
	}

	/**
	 * The custom click event used to make fake links
	 * @param  {Object} event The Click Event
	 * @return {Boolean}       Whether it should allow the click event _fallback for event.preventDefault()_
	 */
	function clickEvent(event) {
		window.location = this.getAttribute('date-href');
		event.preventDefault();
		// Stop propagation aswell
		return false;
	}

	/**
	 * Throw an error
	 * @param  {String} msg Message in Error
	 * @throws {Error} If always
	 */
	function error(msg) {
		throw new Error(msg);
	}

	/**
	 * Check if element is a descendant of the parent
	 * @param  {Object} elem   the element to check
	 * @param  {Object} parent the parent
	 * @return {Boolean}       If element is a descendant of the parent
	 */
	function isDescendant(elem, parent) {

		// If either isn't a Dom element break silently
		if(!isElement(elem) || !isElement(parent))
			return;

		while(elem.parentNode !== null) {
			if(elem.parentNode !== parent) {
				elem = elem.parentNode;
				continue;
			}
			return true;
		}
		return false;
	}

	// Return aReplace as a module
	return aReplace;

});
