import React, { useEffect, useState } from "react";
import "./cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faGift,
  faTruckFast,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../forms/Button/Button";
import useGlobalContext from "../../context/global.context";
import { cls } from "../../utils/utils";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
const initial = [
  {
    id: "32346041641",
    title: "Regular Fit Round Neck T-Shirt",
    slug: "regular-fit-round-neck-t-shirt",
    price: 14,
    color: "Pale Silver",
    image:
      "https://dt-neytiri.myshopify.com/cdn/shop/products/1.1_8f8c9fef-16c4-4df1-bd4d-c9a15c255eee.jpg?v=1677648450&width=533",
    quantity: 1,
    currency: {
      symbol: "$",
      name: "USD",
    },
  },
  {
    id: "32346ads641",
    title: "Regular Fit Round Neck T-Shirt",
    slug: "regular-fit-round-neck-t-shirt",
    price: 14,
    color: "Pale Silver",
    image:
      "https://dt-neytiri.myshopify.com/cdn/shop/products/1.1_8f8c9fef-16c4-4df1-bd4d-c9a15c255eee.jpg?v=1677648450&width=533",
    quantity: 1,
    currency: {
      symbol: "$",
      name: "USD",
    },
  },
  {
    id: "3ad641",
    title: "Regular Fit Round Neck T-Shirt",
    slug: "regular-fit-round-neck-t-shirt",
    price: 14,
    color: "Pale Silver",
    image:
      "https://dt-neytiri.myshopify.com/cdn/shop/products/1.1_8f8c9fef-16c4-4df1-bd4d-c9a15c255eee.jpg?v=1677648450&width=533",
    quantity: 1,
    currency: {
      symbol: "$",
      name: "USD",
    },
  },
];

export default function Cart() {
  const { cartIsActive, setCartIsActive } = useGlobalContext();
  const [items, setItems] = useState(initial);
  const closeCart = () => {
    setCartIsActive(false);
  };
  const loadCart = async () => {};
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <div className={cls("cart", cartIsActive ? "active" : "")}>
      <header>
        <h3>Shopping cart</h3>
        <button className="close" type="button" onClick={closeCart}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </header>
      <div className="body">
        {items.map((product) => (
          <CartItem key={product.id} {...product} />
        ))}
      </div>
      <footer>
        <div className="actions">
          <button type="button">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Add note</span>
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faTruckFast} />
            <span>Shipping</span>
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faGift} />
            <span>Discount</span>
          </button>
        </div>
        <summary>
          <div className="wrapper">
            <h4>Subtotal</h4>
            <h4 className="price">$56.00</h4>
          </div>
          <p>Taxes and shipping calculated at checkout</p>
        </summary>
        <div className="btns">
          <Button>checkout</Button>
          <Button type="secondary">view cart</Button>
        </div>
      </footer>
    </div>
  );
}

function CartItem({
  title,
  slug,
  price,
  color,
  quantity,
  image,
  currency,
  id,
}) {
  const removeItem = async () => {};
  const quantityOnChange = async (newQuantity) => {};
  return (
    <div className="cart-item">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="info">
        <h5>{title}</h5>
        <span className="price">
          {currency.symbol}
          {price}
        </span>
        <p className="color">
          Color: <span>{color}</span>
        </p>
        <QuantityCounter quantity={quantity} onChange={quantityOnChange} />
      </div>
      <button className="remove" type="button" onClick={removeItem}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
