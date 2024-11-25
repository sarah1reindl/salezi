import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::product.product', {
  config: {
    find: {
      auth: false, 
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    create: {
      auth: { scope: [] }, 
      policies: [],
      middlewares: [],
    },
    update: {
      auth: { scope: [] }, 
      policies: [],
      middlewares: [],
    },
    delete: {
      auth: { scope: [] }, 
      policies: [],
      middlewares: [],
    },
  },
  only: ['find', 'findOne', 'create', 'update', 'delete'], 
});
