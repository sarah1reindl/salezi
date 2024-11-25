module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const product = await strapi.services.product.findOne({ id: data.product });

      if (data.type === 'Sell' && product.stock < data.quantity) {
        throw new Error('Not enough stock available.');
      }
    },

    async afterCreate(result) {
      const product = await strapi.services.product.findOne({ id: result.product });

      if (result.type === 'Sell') {
        product.stock -= result.quantity;
      } else if (result.type === 'Receive') {
        product.stock += result.quantity;
      }

      await strapi.services.product.update({ id: product.id }, { stock: product.stock });
    },
  },
};
