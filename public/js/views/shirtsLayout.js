define( function( require ) {

	var Marionette  = require( 'marionette' );

	var ShirtsCollectionView = require( 'js/views/shirtsCollectionView' );
	var SortBar              = require( 'js/views/sortBar.js' );
	var ShirtDetail          = require( 'js/views/shirtsDetailView' );

	var tmplShirts = require( 'text!/templates/shirts.html' );

	shirtsLayout = Marionette.Layout.extend({
		template: _.template( tmplShirts )
		, className: 'shirts'
		, regions: {
			sortBar:     '.sort-bar',
			shirtsList:  '.shirts-list',
			detailModal: '.detailModal'
		}
		, initialize: function( options ) {
			this.app = options.app
			this.collection = this.app.collection;

			if( this.id ) {
				shirtModel = this.collection.get( this.id );
			}
		}
		, onRender: function() {
			this.sortBar.show( new SortBar( this.app ) );
			this.shirtsList.show( new ShirtsCollectionView({ 
				collection: this.collection
			}));

			if( this.id ) {
				this.detailModal.show( new ShirtDetail( shirtModel ) );
			};
			
			console.log('Shirt Layout Rendered');
		}
	});

	return shirtsLayout;
});