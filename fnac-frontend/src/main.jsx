import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

const initialProducts = [
  {
    id: 1,
    name: 'Iphone 13',
    price: 1999,
    category: 'Electronics',
    image: '/api/placeholder/300/200',
  },
  {
    id: 2,
    name: 'Laptop',
    price: 3480,
    category: 'Chairs',
    collection: 'Bubble',
    image: '/api/placeholder/300/200',
    description: 'A unique, ergonomic sofa that adds a pop of color to any space.'
  },
  {
    id: 3,
    name: 'Astrea',
    price: 2981,
    category: 'Chairs',
    collection: 'Bamboo',
    image: '/api/placeholder/300/200',
    description: 'A minimalist dining table that combines elegance with comfort.'
  },
  {
    id: 4,
    name: 'Bubble',
    price: 2478,
    category: 'Sofas',
    collection: 'Bubble',
    image: '/api/placeholder/300/200',
    description: 'A compact and stylish mini sofa perfect for small spaces.'
  },
  {
    id: 5,
    name: 'Bubble mini',
    price: 4000,
    category: 'Sofas',
    collection: 'Bamboo',
    image: '/api/placeholder/300/200',
    description: 'A sustainable bamboo coffee table that adds natural elegance to your living room.'
  },
  {
    id: 6,
    name: 'Bubble',
    price: 4589,
    category: 'Beds',
    collection: 'Bamboo',
    image: '/api/placeholder/300/200',
    description: 'A soft, reclining chair designed for ultimate relaxation.'
  }
];

const Navbar = ({ cartCount, toggleCart, toggleMenu }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <img src="/api/placeholder/100/40" alt="Logo" className="h-10" />
        <button onClick={toggleMenu} className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Shop</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Magazine</a>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <button onClick={toggleCart} className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cartCount}
          </span>
        </button>

        <a href="#" className="text-gray-600 hover:text-gray-900">Login</a>
      </div>
    </nav>
  );
};

const Sidebar = ({ onFilterChange, onSortChange }) => {
  const [priceRange, setPriceRange] = useState(10000);

  return (
    <div className="w-64 p-4 border-r">
      <div className="mb-6">
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="best-match">Best Match</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        
        <div>
          <h4 className="font-medium mb-2">Category</h4>
          <div className="space-y-2">
            {['Living Room', 'Dinning Room', 'Decoration'].map(category => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => onFilterChange('category', category, e.target.checked)}
                  className="rounded"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Collection</h4>
          <div className="space-y-2">
            {['Bubble', 'Bamboo'].map(collection => (
              <label key={collection} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => onFilterChange('collection', collection, e.target.checked)}
                  className="rounded"
                />
                {collection}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Price Range</h4>
          <input
            type="range"
            min="500"
            max="10000"
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              onFilterChange('price', e.target.value);
            }}
            className="w-full"
          />
          <p className="text-sm text-gray-600">Price: ${priceRange}</p>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-xl font-semibold">${product.price.toFixed(2)}</h4>
        <p className="text-gray-600">{product.name}</p>
        <div className="text-sm text-gray-500 mt-1">
          <span className="mr-2">{product.category}</span>
          <span>{product.collection}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const CartModal = ({ cart, onClose, onRemoveItem }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-auto">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => onRemoveItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    collections: [],
    maxPrice: 10000
  });

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleFilterChange = (type, value, checked) => {
    setFilters(prev => {
      if (type === 'price') {
        return { ...prev, maxPrice: value };
      }
      
      const filterKey = type === 'category' ? 'categories' : 'collections';
      const updatedFilters = checked
        ? [...prev[filterKey], value]
        : prev[filterKey].filter(item => item !== value);
      
      return { ...prev, [filterKey]: updatedFilters };
    });
  };

  const handleSort = (value) => {
    const sorted = [...products].sort((a, b) => {
      if (value === 'low-high') return a.price - b.price;
      if (value === 'high-low') return b.price - a.price;
      return 0;
    });
    setProducts(sorted);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
    const collectionMatch = filters.collections.length === 0 || filters.collections.includes(product.collection);
    const priceMatch = product.price <= filters.maxPrice;
    return categoryMatch && collectionMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartCount={cart.length}
        toggleCart={() => setShowCart(true)}
        toggleMenu={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <div className="lg:hidden bg-white border-b p-4">
          <div className="space-y-4">
            <a href="#" className="block text-gray-600">Home</a>
            <a href="#" className="block text-gray-600">Shop</a>
            <a href="#" className="block text-gray-600">Magazine</a>
          </div>
        </div>
      )}

      <div className="flex">
        <Sidebar onFilterChange={handleFilterChange} onSortChange={handleSort} />
        
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </main>
      </div>

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemoveItem={handleRemoveFromCart}
        />
      )}
    </div>
  );
};

export default App;