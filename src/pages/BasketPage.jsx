import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBasket } from "../redux/actions/basketActions";
import Loader from "../componenets/Loader";
import BasketItem from "../componenets/BasketItem";

const BasketPage = () => {
  const store = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  console.log(store);
  // api'dan sepete eklenen ürünleri al ve store'a aktar
  useEffect(() => {
    dispatch(getBasket());
  }, []);
  const total = store.basket.reduce(
    (total, item) => total + item.amount * item.price,
    0
  );

  return (
    <div className="container p-5">
      <div className="row gap-4">
        <div className="col-md-8">
          {store.isLoading && <Loader />}
          {store.isError && <h3>{store.isError}</h3>}
          {store.basket.map((product) => (
            <h3>
              <BasketItem key={product.id} product={product} />
            </h3>
          ))}
        </div>
        <div className="col-md-4"></div>
        <div className="bg-white p-5 rounded w-100 text-black">
          <h5 className="text-center">Toplam Tutar: {total}$</h5>
          <button className="w-100 my-2">Alışverişi Tamamla</button>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
