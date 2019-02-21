var Modal = class {				// Declare modal object

	constructor () {
		// var self = this;
		this.window = $(window);
		this.modal = $('<div class="modal" />');
		this.content = $('<div class="modal-content" />');
		this.closeButton = $('<button role="button" class="modal-close">close</button>');

		this.modal.append(this.content, this.closeButton);

		this.closeButton.on('click', (e) => {
			e.preventDefault();
			// console.log(this);
			// console.log(self);
			// console.log(e);
			this.close();
		});
	}

	center () {
		this.modal.css({
			height: 'auto',
			width: 'auto'
		})

		var top = Math.max($(window).height() - this.modal.outerHeight(), 0) / 2;
		var left = Math.max($(window).width() - this.modal.outerWidth(), 0) / 2;

		// console.log(this); /* getting the correct this */
		// console.log(this.modal.outerHeight());
		// console.log('top: ' + top);
		// console.log('left: ' + left);

		this.modal.css({
			top: top + $(window).scrollTop(),
			left: left + $(window).scrollLeft()
		});
	}

	open (settings) {
		this.content.empty().append(settings.content);
		// console.log(this.content);

		var modal_height = this.window.height() - 40;
		var modal_width = this.window.width() - 40;

		var height = modal_height.toString() + 'px';
		var width = modal_width.toString() + 'px';

		this.modal.css({
			width: 'auto',
			height: 'auto'
		}).appendTo('body');

		$('#modal_image').css({
			height: 'auto',
			width: 'auto',
			'max-height': height,	/* should be max-height */
			'max-width': width, 	/* should be max-width */
			border: '1px solid white'
		})

		this.center();
		$(window).on('resize', this.center);
	}

	close() {
		this.content.empty();
		this.modal.detach();
		$(window).off('resize', this.center);
	}

};

//new version of code (for single modal window)
(function() {
	modal = new Modal();
	
	var images = $('.image').each(function() {
		var max_height = $(window).height() - 40;
		var max_width = $(window).width() - 40;

		var image_html = $(this).html();
		var image_path = $(image_html).first().prop('src');
		console.log(image_path);
		var image = $('<img id="modal_image" src="' + image_path + '" style="margin: auto; max-width: ' + max_width + 'px; max-height: ' + max_height + 'px">').detach();
		$(this).on('click', () => {
			modal.open({content: image});
		});
	});

}());