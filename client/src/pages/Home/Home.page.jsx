import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./home.scss";
import { useMediaQuery } from "@uidotdev/usehooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { api } from "../../utils/utils";
import ProductCard from "../../components/Shop/ProductCard/ProductCard";

// const HomeContext = createContext()

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [elegantProducts, setElegantProducts] = useState([]);
  const loadDate = async () => {
    setLoading(true);
    try {
      const newArrivalsPromise = api.get("/products?type=new-arrival");
      const elegantProductsPromise = api.get("/products?type=elegant-product");
      const data = await Promise.all([
        newArrivalsPromise,
        elegantProductsPromise,
      ]);
      setNewArrivals(data[0].data);
      setElegantProducts(data[1].data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log({ newArrivals, elegantProducts });
  useEffect(() => {
    loadDate();
  }, []);
  return (
    <>
      <NewArrivals newArrivals={newArrivals} />
      <ElegantProducts elegantProducts={elegantProducts} />
    </>
  );
}

const breakpoints = {
  0: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },
  1440: {
    slidesPerView: 5,
  },
};

function NewArrivals({ newArrivals: products }) {
  return (
    <div className="container-fluid new-arrivals">
      <h2 className="main-title">new arrivals</h2>
      <Swiper breakpoints={breakpoints} spaceBetween={30}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
function ElegantProducts({ elegantProducts: products }) {
  return (
    <div className="container-fluid new-arrivals">
      <h2 className="main-title">elegant products</h2>
      <Swiper breakpoints={breakpoints} spaceBetween={30}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function Testimonials() {}
function Subscribe() {}

function _Section() {}
function __Section() {}
function ___Section() {}
