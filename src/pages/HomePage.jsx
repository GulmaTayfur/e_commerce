import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../componenets/Loader";
import { getData } from "../redux/actions/productActions";
import Card from "../componenets/Card";
import { getBasket } from "../redux/actions/basketActions";

const HomePage = () => {
  // store'a abone ol
  const store = useSelector((store) => store.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    // sepetteki verileri al
    dispatch(getBasket());
  }, []);

  return (
    <div className="container">
      {/* veriler yükleniyorsa */}
      {store.isLoading && <Loader />}

      {/* hata oluştuysa ekrana bas */}
      {store.isError && <h1 className="text-center my-5">{store.isError}</h1>}

      {/* veriler geldiyse ekrana bas */}
      <div className="d-flex flex-wrap gap-5 justify-content-center my-5">
        {store?.products.map((item) => (
          <Card key={item.ide} product={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
