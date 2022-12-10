const Category = require("../models/Category");
const Tag = require("../models/Tag");
const categoriesMock = require("../mock/categories_old.json");
const productsMock = require("../mock/products.json");
const tagsMock = require("../mock/tags.json");
const Product = require("../models/Product");
const Country = require("../models/Country");
const countriesMock = require("../mock/country.json");
const City = require("../models/City");
const citiesMock = require("../mock/cities.json");
const shopsMock = require("../mock/shops.json");
const Shop = require("../models/Shop");

module.exports = async () => {
  // const categories = await Category.find();
  // if (categories.length !== categoriesMock.length) {
  //   await createInitialEntity(Category, categoriesMock);
  // }
  // const products = await Product.find();
  // if (products.length !== productsMock.length) {
  //   await createInitialEntity(Product, productsMock);
  // }
  // const countries = await Country.find();
  // if (countries.length !== countriesMock.length) {
  //   await createInitialEntity(Country, countriesMock);
  // }
  // const cities = await City.find();
  // if (cities.length !== citiesMock.length) {
  //   await createInitialEntity(City, citiesMock);
  // }
  // const shops = await Shop.find();
  // if (shops.length !== shopsMock.length) {
  //   await createInitialEntity(Shop, shopsMock);
  // }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
