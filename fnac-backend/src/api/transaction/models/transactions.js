module.exports = {
    async beforeCreate(event) {
      const { data } = event.params;
      const product = await strapi.db.query('api::product.product').findOne({
        where: { id: data.product },
      });
  
      if (data.type === 'Sale' && product.stock < data.quantity) {
        throw new Error('Insufficient stock');
      }
  
      if (data.type === 'Sale') {
        await strapi.db.query('api::product.product').update({
          where: { id: data.product },
          data: { stock: product.stock - data.quantity },
        });
      }
  
      if (data.type === 'Restock') {
        await strapi.db.query('api::product.product').update({
          where: { id: data.product },
          data: { stock: product.stock + data.quantity },
        });
      }
    },
  };
  