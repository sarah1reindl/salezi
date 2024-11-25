export default {
    routes: [
   
      {
        method: 'GET',
        path: '/products/featured',
        handler: 'api::product.product.getFeatured',
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      
      {
        method: 'GET',
        path: '/products/search',
        handler: 'api::product.product.search',
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      
      {
        method: 'GET',
        path: '/products/category/:category',
        handler: 'api::product.product.getByCategory',
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      
    
      {
        method: 'PUT',
        path: '/products/:id/stock',
        handler: 'api::product.product.updateStock',
        config: {
          auth: { scope: [] }, 
          policies: ['isProductOwner'], 
          middlewares: ['validateStock'], 
        },
      },
    ],
  };