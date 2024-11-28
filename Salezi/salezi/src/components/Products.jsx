import React, { useState, useEffect, useMemo } from "react";
import "./Products.css";

const Products = ({ searchResults = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("All");
  const itemsPerPage = 6;

  const carouselSlides = [
    { image: "../../public/images/fnac1.jpg", alt: "FNAC 1" },
    { image: "../../public/images/fnac2.jpg", alt: "FNAC 2" },
    { image: "../../public/images/fnac3.jpg", alt: "FNAC 3" }
  ];
  

  const products = [
    { id: 1, name: "Iphone 16", price: 299.99, category: "Electronique", image: '../../public/images/fnac5.jpeg' },
    { id: 2, name: "Dune", price: 349.99, category: "Medias", image: "../../public/images/fnac6.jpeg" },
    { id: 3, name: "Gaming", price: 599.99, category: "Gaming", image: "../../public/images/fnac7.jpeg" },
    { id: 4, name: "Livres", price: 649.99, category: "livres", image: "../../public/images/fnac8.jpeg" },
    { id: 5, name: "David Bowie", price: 79.99, category: "Medias", image: "../../public/images/fnac9.jpeg" },
    { id: 6, name: "Home camera", price: 129.99, category: "Electronique", image: "../../public/images/fnac10.jpeg" },
    { id: 7, name: "Dyson", price: 149.99, category: "Electronique", image: "../../public/images/fnac11.jpeg" },
    { id: 8, name: "Collection", price: 249.99, category: "Maison", image: "../../public/images/fnac12.jpeg" },
  ];

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    if (searchResults.length > 0) {
      return searchResults;
    }
    return currentCategory === "All"
      ? products
      : products.filter((p) => p.category === currentCategory);
  }, [searchResults, currentCategory, products]);

  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => Math.ceil(filteredProducts.length / itemsPerPage), [filteredProducts, itemsPerPage]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const addToCart = (product) => {
    window.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home">
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide, index) => (
            <div key={index} className="carousel-slide">
              <img src={slide.image} alt={slide.alt} />
            </div>
          ))}
        </div>
        <button className="carousel-button prev" onClick={prevSlide}>
          &lt;
        </button>
        <button className="carousel-button next" onClick={nextSlide}>
          &gt;
        </button>
      </div>

      <div className="welcome-section">
        <h1>BLACK FRIDAY DEALS</h1>
      </div>

      <div className="featured-section">
        <h2>{searchResults.length > 0 ? "Search Results" : "Notre Product"}</h2>
        {searchResults.length === 0 && (
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setCurrentCategory(category);
                  setCurrentPage(1);
                }}
                className={currentCategory === category ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price.toFixed(2)} €</p>
              <p className="category">{product.category}</p>
              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`page-number ${currentPage === page ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="page-number next-page"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Products
