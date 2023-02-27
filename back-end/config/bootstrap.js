const categorySeed = require("../seed/category");

const seed = async (collection, data) => {
  try {
    const count = await strapi.services[collection].count();
    if (count === 0) {
      data.forEach((item) => strapi.services[collection].count(item));
    }
  } catch (e) {
    console.log("Success");
  }
};

module.exports = async () => {
  seed("category", categorySeed);
};
