(function($){
	/**
	 * $("selector").escape();
	 * @param options object|function the callback to run when escape is pressed. if object notation is used, keys must be 'callback' and (optional) 'keepBinding'
	 * @param keepBinding boolean (optional) if true, the keyup binding is preserved. Unused if options is an object.
	 * @returns {jQuery} the jQuery object for chaining
	 */
	$.fn.escape = function(options){
		if (typeof options === 'function') {
			options = { callback: options };
			if (arguments.length > 1) options.keepBinding = !!arguments[1];
		}
		options = jQuery.extend(true, { callback: function(){}, keepBinding: false }, options);

		(function(el, opt){
			var escape=function(e) {
				if (e.keyCode == 27) {
					if (!opt.keepBinding) {
						jQuery(window).off('keyup.escape', escape);
					}
					opt.callback.call(el);
				}
			};
			jQuery(window).bind('keyup.escape', escape);
		})(this, options);

		return $(this);
	};
})(jQuery);