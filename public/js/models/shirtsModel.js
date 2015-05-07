define( function( require ) {

	var Backbone = require( 'backbone' );

	var ShirtsModel = Backbone.Model.extend({
	 	urlRoot: 'api/product/'
	 	, defaults: {
			'image': 'http://5.media.bustedtees.cvcdn.com/a/-/bustedtees.f96bd6ba-85ea-409f-abc0-d4df595e.gif',
			'imageLg': null,
			'thumbs': 0,
		}
	  	, initialize: function( options ) {
	  		console.log('Shirt Model Rendered' );
	  		this.slug = options.slug;
	  	}
	  	, idAttribute: 'slug'
	});

	return ShirtsModel;
});