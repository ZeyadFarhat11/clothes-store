import React, { useState } from "react";
import Sidebar from "../../components/Shop/Sidebar/Sidebar";
import { api, cls } from "../../utils/utils";
import handleError from "../../utils/handleError";
import "./shop.scss";
import ProductCard from "../../components/Shop/ProductCard/ProductCard";
import { useEffect } from "react";
import Breadcrumb from "../../components/forms/Breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import SortField from "../../components/Shop/SortField/SortField";
function Shop() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?_limit=16&_page=${page}`);
      // console.log(response);
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
      <Breadcrumb className="py-5">Shop</Breadcrumb>
      <div className="container-fluid">
        <div className="content">
          <Sidebar />
          <div className="products-wrapper">
            <header>
              <p>Showing 1-16 of 16 Results</p>
              <SortField />
            </header>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shop;
