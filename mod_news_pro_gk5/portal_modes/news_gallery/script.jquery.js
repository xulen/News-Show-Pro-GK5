jQuery(document).ready(function() {
	jQuery(document).find('.gkNspPM-NewsGallery').each(function(i, module) {
		module = jQuery(module);
		
		if(!module.hasClass('active')) {
			module.addClass('active');
			gkPortalModeNewsGalleryInit(module);
		}
	});
});

var gkPortalModeNewsGalleryInit = function(module) {
	// set the basic module variables
	module.attr('data-current', 1);
	module.attr('data-blank', 0);
	module.attr('data-stop', 0);
	module.attr('data-all-pages', Math.ceil(module.find('.gkImage').length / module.attr('data-cols')));
	
	// check if buttons exists
	if(module.find('.gkPrevBtn')) {
		module.find('.gkPrevBtn').click(function(e) {
			e.preventDefault();
			module.attr('data-blank', 1);
			gkPortalModeNewsGalleryAnim(module, 'prev');
		});
	
		module.find('.gkNextBtn').click(function(e) {
			e.preventDefault();
			module.attr('data-blank', 1);
			gkPortalModeNewsGalleryAnim(module, 'next');
		});
	}
	
	// check if autoanimation is enabled
	if(module.hasClass('gkAutoAnimation')) {
		setTimeout(function() {
			gkPortalModeNewsGalleryAutoAnim(module);
		}, module.attr('data-autoanim-time'));
	}
	
	// add overlays
	module.find('.gkImage').each(function(i, img) {
		img = jQuery(img);
		img.html(img.html() + '<div class="gkImgOverlay"><span></span></div>');
	});
	
	// add stop event
	module.find('.gkImage').each(function(i, img) {
		img = jQuery(img);
		img.mouseenter(function() {
			module.attr('data-stop', 1);
			var overlay = img.find('.gkImgOverlay');
			var realImg = img.find('img');
			overlay.css({
				'margin-left': (-1.0 * (realImg.outerWidth() / 2.0)) + "px",
				'width': realImg.outerWidth() + "px"
			});
			overlay.attr('class', 'gkImgOverlay active');
		});
		
		img.mouseleave(function() {
			module.attr('data-stop', 0);
			var overlay = img.find('.gkImgOverlay');
			overlay.attr('class', 'gkImgOverlay');
		});
	});
};

var gkPortalModeNewsGalleryAutoAnim = function(module) {
	if(module.attr('data-blank') == 1 || module.attr('data-stop') == 1 ) {
		setTimeout(function() {
			module.attr('data-blank', 0);	
			gkPortalModeNewsGalleryAutoAnim(module);
		}, module.attr('data-autoanim-time'));
	} else {
		gkPortalModeNewsGalleryAnim(module, 'next');
		
		setTimeout(function() {	
			gkPortalModeNewsGalleryAutoAnim(module);
		}, module.attr('data-autoanim-time'));
	}
};

var gkPortalModeNewsGalleryAnim = function(module, dir) {
	// amount of news per page
	var perPage = module.attr('data-cols');
	var current = module.attr('data-current') * 1.0;
	var allPages = module.attr('data-all-pages');
	var next = 0;
	// select next page
	if(dir == 'next') {
		if(current == allPages) {
			next = 1;
		} else {
			next = current + 1;
		}
	} else if(dir == 'prev') {
		if(current == 1) {
			next = allPages;
		} else {
			next = current - 1;
		}
	}
	// set the current page
	module.attr('data-current', next);
	// hide current elements
	module.find('.gkImage').each(function(i, img) {
		img = jQuery(img);
		
		if(img.hasClass('active')) {
			gkPortalModeNewsGalleryImgClass(img, 'active', false, 0);
			gkPortalModeNewsGalleryImgClass(img, '', true, 300);
		}
	});
	// show next elements	
	setTimeout(function() {
		module.find('.gkImage').each(function(i, img) {
			img = jQuery(img);
			
			if(i >= (next - 1) * perPage && i < (next * perPage)) {
				gkPortalModeNewsGalleryImgClass(img, 'active', false, 0);
				gkPortalModeNewsGalleryImgClass(img, 'active show', true, 300);
			}
		});
	}, 300);
};

var gkPortalModeNewsGalleryImgClass = function(img, className, delay, time) {
	if(!delay) {
		img.attr('class', 'gkImage ' + className);
	} else {
		setTimeout(function() {
			img.attr('class', 'gkImage ' + className);	
		}, time);
	}
};