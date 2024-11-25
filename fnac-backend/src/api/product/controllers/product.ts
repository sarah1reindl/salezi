import { factories } from '@strapi/strapi';
import { Context } from 'koa';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  
  async getFeatured(ctx: Context) {
    try {
      const products = await strapi.db.query('api::product.product').findMany({
        where: {
          featured: true,
        },
        populate: {
          images: true,
          seller: {
            select: ['id', 'name', 'email'],
          },
        },
      });

      return { data: products };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getBySeller(ctx: Context) {
    try {
      const { sellerId } = ctx.params;

      const products = await strapi.db.query('api::product.product').findMany({
        where: {
          seller: sellerId,
        },
        populate: {
          images: true,
        },
      });

      return { data: products };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async search(ctx: Context) {
    try {
      const { q } = ctx.query;

      const products = await strapi.db.query('api::product.product').findMany({
        where: {
          $or: [
            {
              name: {
                $containsi: q,
              },
            },
            {
              description: {
                $containsi: q,
              },
            },
          ],
        },
        populate: {
          images: true,
          seller: {
            select: ['id', 'name'],
          },
        },
      });

      return { data: products };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getByCategory(ctx: Context) {
    const { category } = ctx.params;

    try {
      const products = await strapi.db.query('api::product.product').findMany({
        where: { category },
      });

      return { data: products };
    } catch (err) {
      ctx.throw(500, `Failed to fetch products for category: ${category}`);
    }
  },

  async create(ctx: Context) {
    try {
    
      const user = ctx.state.user;

      
      ctx.request.body.data.createdBy = user.id;

      const response = await super.create(ctx);

      return response;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));
