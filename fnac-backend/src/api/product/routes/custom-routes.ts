export default [
    {
      method: 'GET',
      path: '/products/featured',
      handler: 'product.getFeatured',
      config: {
        auth: false, 
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/seller/:sellerId',
      handler: 'product.getBySeller',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/category/:category',
      handler: 'product.getByCategory',
      config: {
        auth: false, 
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/search',
      handler: 'product.search',
      config: {
        auth: false, 
        policies: [],
        middlewares: [],
      },
    },
  ];
  