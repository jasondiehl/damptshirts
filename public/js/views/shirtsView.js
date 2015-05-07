define( function( require ) {
	
	var Marionette		= require( 'marionette' );
	var Velocity        = require( 'velocity' );
	var Moment          = require( 'moment' );
	var Handlebars      = require( 'handlebars' );

	var ShirtCollection = require( 'js/collections/shirtCollection' );
	var ShirtModel      = require( 'js/models/shirtsModel.js' );
	var ShirtDetailView = require( 'js/views/shirtsDetailView' );

	var tmplThumbnail   = require( 'text!templates/thumbnail.html' );

	var ShirtsView = Marionette.ItemView.extend({
		template: Handlebars.compile( tmplThumbnail )
		, ui: {
			'productLink': '.product-link',
			'productImage': '.product-image',
			'thumbs': '.thumbs',
			'thumbsInfo': '.thumbs_info',
			'voteUp': '.vote-up',
			'voteDown': '.vote-down',
			'voteCount': '.vote-count',
			'destroyMe': '.destroyMe'
		}
		, events: {
			'mouseenter': 'showVoting',
			'mouseleave': 'hideVoting',
			'click @ui.voteUp': 'voteUp',
			'click @ui.voteDown': 'voteDown',
			'click @ui.productImage': 'showDetail'
		}
		, className: 'product'
		, templateHelpers: function() {
			return {
				DateAdded: moment( this.model.get( 'DateAdded' )).fromNow()
			};
		}
		, initialize: function( options ) {
			this.app = options.app;
		}
		, onRender: function( options ) {
			var border = 2;
			var padding = 4;
			var margin = 10;
			this.ui.productImage.css( {
				'width': options.options.maxWidth - margin
			} );
			console.log( this.$el.outerWidth() );
		}
		, showDetail: function() {
			this.app.shirtModel = this.model;
			this.app.router.navigate( 'details' );
		}
		, showVoting: function() {
			this.showRollover = setTimeout( _.bind( this.productRollover, this ), 300 );
		}
		, productRollover: function() {
			var padding = 20;
			var rolloverWidth = this.ui.productImage.outerWidth() + padding*2;
			// Get the thumbs buttons height
			var infoHeight = this.ui.thumbsInfo.clone().appendTo( this.el ).css({
				'position': 'absolute'
				, 'left': -1000
			}).attr('class', 'destroyMe').outerHeight();
			this.bindUIElements();
			var infoWidth = this.ui.destroyMe.outerWidth();
			this.ui.destroyMe.remove()
			
			this.ui.thumbs.height( this.ui.productImage.height() + infoHeight + 40 );
			this.ui.thumbs.velocity( 'fadeIn', { 
				duration: 100
			}).css({
				'width': rolloverWidth
				, 'top': -1*padding
				, 'left': -1*padding
			});
			this.ui.thumbsInfo.css({
				'left': ( rolloverWidth - infoWidth ) / 2
			});
		}
		, hideVoting: function() {
			clearTimeout( this.showRollover );
			this.ui.thumbs.css( 'display', 'none' );
		}
		, voteUp: function( $event ) {
			var thumbs = this.model.get( 'thumbs' ) + 1;
			this.model.save( { 'thumbs': thumbs }, { patch: true } );
			this.voteUpdate();
			$( $event.currentTarget ).prop( 'disabled', true ).addClass( 'disabled' );
		}
		, voteDown: function( $event ) {
			var thumbs = this.model.get( 'thumbs' ) - 1;
			this.model.save( {'thumbs': thumbs}, {patch: true} );
			this.voteUpdate();
			$( $event.currentTarget ).prop( 'disabled', true ).addClass( 'disabled' );
		}
		, voteUpdate: function() {
			this.ui.voteCount.html( this.model.get( 'thumbs' ) + ' votes' );
		}
	});

	return ShirtsView;
});