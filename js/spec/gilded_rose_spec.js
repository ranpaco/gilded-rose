var { Shop, Item } = require("../src/gilded_rose.js");
var filters = {
	notNegative: [
		new Item("something", 0, 0),
		new Item("Conjured", 0, 0),
		new Item("Sulfuras", 0, 0),
		new Item("Backstage passes", 0, 0),
		new Item("Aged Brie", 0, 0)
	],
	sulfurasMoreThan50: [
		new Item("something", 0, 0),
		new Item("Conjured", 0, 0),
		new Item("Sulfuras", 0, 80),
		new Item("Backstage passes", 0, 0),
		new Item("Aged Brie", 0, 0)
	]	
}
describe("Gilded Rose", function() {
	// it("should foo", function() {
	//   const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
	//   const items = gildedRose.updateQuality();
	//   expect(items[0].name).toEqual("fixme");
	// });

	beforeEach(function() {
		jasmine.addMatchers({
			qualityNeverNegative: function() {
				return {
					compare: function(actual, expected) {
						if (expected === undefined) {
							expected = "";
						}
						var result = {};
						var foundNegative = actual.filter(function(item) {
							return item.quality < 0;
						});
						result.pass = foundNegative.length>0?false:true;
						if (result.pass){
							result.message = "All quality are positve";
						} else {
							result.message = "Some quality are negative";
						}
						return result;
					}
				};
			}
		});
	});

	it("quality never is negative", function() {
		const gildedRose = new Shop(filters.notNegative);
		const items = gildedRose.updateQuality();
		console.log(items);
		expect(items).qualityNeverNegative();
	});
	
});
