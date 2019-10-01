class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    const updateItems = this.items.map(function(item) {
      item.sellIn = item.sellIn - 1;
      switch (item.name) {
        case "Sulfuras":
          break;

        case "Aged Brie":
          item.quality += (item.sellIn < 0) ? 2 : 1;
          break;

        case "Backstage passes":
          if (item.sellIn < 0) {
            item.quality = 0;
          } else if (item.sellIn < 5) {
            item.quality = item.quality + 3;
          } else if (item.sellIn < 10) {
            item.quality = item.quality + 2;
          }
          break;

        case "Conjured":
          item.quality +=  (item.sellIn < 0) ? -4 : -2;
          break;

        default:
          item.quality +=  (item.sellIn < 0) ? -2 : -1;
      }
      if (item.name != "Sulfuras" && item.quality > 50) item.quality = 50;
      if (item.quality < 0) item.quality = 0;
      return item;
    });
    return updateItems;
  }
  updateQuality_old() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
