import React from "react";
import { removeItem, updateItem } from "../redux/actions/basketActions";
import { useDispatch } from "react-redux";

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="rounded-2 p-4 bg-white d-flex justify-content-between text-black mb-5">
      <div className="d-flex align-items-center gap-3">
        <img src={product.image} width={60} height={60} className="rounded-3" />
        <h4 className="">
          <span className="">{product.make} </span>
          <span className="">{product.model} </span>
        </h4>
        <h4 className="text-success">{product.price} $</h4>
      </div>

      <div className="d-flex align-items-center gap-3">
        <h6>Miktar: {product.amount} </h6>
        <button
          onClick={() => dispatch(updateItem(product))}
          className="btn btn-sm btn-primary"
        >
          +
        </button>
        <button
          onClick={() => dispatch(removeItem(product.id))}
          className="btn btn-sm btn-danger"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
