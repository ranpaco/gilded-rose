var { Shop, Item } = require("../src/gilded_rose.js");
var filters = {
	notNegative: [
		new Item("something", 0, 0),
		new Item("Conjured", 0, 0),
		new Item("Sulfuras", 0, 0),
		new Item("Backstage passes", 0, 0),
		new Item("Aged Brie", 0, 0)
	]
};

describe("Gilded Rose", function() {
	// it("should foo", function() {
	//   const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
	//   const items = gildedRose.updateQuality();
	//   expect(items[0].name).toEqual("fixme");
	// });
	describe("Items", function() {
		it("should contain name, sellIn, quality attributes", function() {
			const items = new Item("name", 0, 10);

			expect(items).toEqual(
				jasmine.objectContaining({ name: "name", sellIn: 0, quality: 10 })
			);
		});
	});

	it("should degrades quality when the iteam is not Aged Brie or Backstage passes", function() {
		const name = "foo";
		const sellIn = 6;
		const initialQuality = 13;
		const updatedQuality = initialQuality - 1;

		const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	it("should degrades quality twice as fast, once the sell by date has passed", function() {
		const initialQuality = 10;
		const sellIn = 0;
		const updatedQuality = 8;

		const gildedRose = new Shop([new Item("foo", sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	it("should increase in quality when item is Aged Brie and gets older", function() {
		const name = "Aged Brie";
		const sellIn = 1;
		const initialQuality = 10;
		const updatedQuality = 11;

		const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	it("should increase in quality when item is Aged Brie and gets older", function() {
		const name = "Aged Brie";
		const sellIn = 1;
		const initialQuality = 10;
		const updatedQuality = 11;

		const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	it("should never quality of an Aged Brie item be more than 50", function() {
		const name = "Aged Brie";
		const sellIn = 5;
		const initialQuality = 50;
		const updatedQuality = 50;

		const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	it("should never degrade quality or sellin when the item is Sulfuras", function() {
		const name = "Sulfuras";
		const initialSellIn = 5;
		const updatedSellIn = initialSellIn;
		const initialQuality = 30;
		const updatedQuality = initialQuality;

		const gildedRose = new Shop([
			new Item(name, initialSellIn, initialQuality)
		]);
		const items = gildedRose.updateQuality();

		const { quality, sellIn } = items[0];
		expect(quality).toEqual(updatedQuality);
		expect(sellIn).toEqual(updatedSellIn);
	});

	it("should never alter Quality when is 80 and the item is Sulfuras", function() {
		const name = "Sulfuras";
		const sellIn = 5;
		const initialQuality = 80;
		const updatedQuality = 80;

		const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	it("should quality decrease quality twice as fast when item is conjured", function() {
		const name = "Conjured";
		const sellIn = 8;
		const initialQuality = 8;
		const updatedQuality = initialQuality - 2;

		const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	it("should quality decrease quality twice as fast when item is conjured when sell by date has passed", function() {
		const name = "Conjured";
		const sellIn = 0;
		const initialQuality = 8;
		const updatedQuality = initialQuality - 4;

		const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
		const items = gildedRose.updateQuality();

		const { quality } = items[0];
		expect(quality).toEqual(updatedQuality);
	});

	describe("Backstage passes", function() {
		it("should increase by 3 when there are 5 days or less", function() {
			const name = "Backstage passes";
			const sellIn = 4;
			const initialQuality = 20;
			const updatedQuality = initialQuality + 3;

			const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
			const items = gildedRose.updateQuality();

			const { quality } = items[0];
			expect(quality).toEqual(updatedQuality);
		});

		it("should increase by 2 when there are 10 days or less", function() {
			const name = "Backstage passes";
			const sellIn = 7;
			const initialQuality = 25;
			const updatedQuality = initialQuality + 2;

			const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
			const items = gildedRose.updateQuality();

			const { quality } = items[0];
			expect(quality).toEqual(updatedQuality);
		});

		it("should never quality of am item be more than 50", function() {
			const name = "Backstage passes";
			const sellIn = 5;
			const initialQuality = 50;
			const updatedQuality = 50;

			const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
			const items = gildedRose.updateQuality();

			const { quality } = items[0];
			expect(quality).toEqual(updatedQuality);
		});

		it("should Quality drops to 0 after the concert", function() {
			const name = "Backstage passes";
			const sellIn = 0;
			const initialQuality = 45;
			const updatedQuality = 0;

			const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
			const items = gildedRose.updateQuality();

			const { quality } = items[0];
			expect(quality).toEqual(updatedQuality);
		});
	});

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
						result.pass = foundNegative.length > 0 ? false : true;
						if (result.pass) {
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
		const items = gildedRose.updateQuality_old();
		console.log(items);
		expect(items).qualityNeverNegative();
	});
});
