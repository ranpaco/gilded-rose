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
      let { name, sellIn, quality } = item;
      sellIn = sellIn - 1;
      switch (name) {
        case "Sulfuras":
          sellIn = sellIn + 1;
          break;

        case "Aged Brie":
          quality += sellIn < 0 ? 2 : 1;
          break;

        case "Backstage passes":
          if (sellIn < 0) {
            quality = 0;
          } else if (sellIn < 5) {
            quality = quality + 3;
          } else if (sellIn < 10) {
            quality = quality + 2;
          }
          break;

        case "Conjured":
          quality += sellIn < 0 ? -4 : -2;
          break;

        default:
          quality += sellIn < 0 ? -2 : -1;
      }
      if (name != "Sulfuras" && quality > 50) quality = 50;
      if (quality < 0) quality = 0;
      return { name, sellIn, quality };
    });

    return updateItems;
  }

  updateQuality_old() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == "Backstage passes") {
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
      if (this.items[i].name != "Sulfuras") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes") {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras") {
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
