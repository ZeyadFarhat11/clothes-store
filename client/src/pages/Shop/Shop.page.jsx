import React, { useState } from "react";
import Sidebar from "../../components/Shop/Sidebar/Sidebar";
import { api } from "../../utils/utils";
import handleError from "../../utils/handleError";
import "./shop.scss";
import ProductCard from "../../components/Shop/ProductCard/ProductCard";
import { useEffect } from "react";
import Breadcrumb from "../../components/forms/Breadcrumb/Breadcrumb";
function Shop() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?_limit=16&_page=${page}`);
      console.log(response);
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="shop py-5">
      <Breadcrumb>Shop</Breadcrumb>
      <div className="content">
        <Sidebar />
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Shop;
