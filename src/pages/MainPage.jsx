// API'den ürün verilerini al
// ve yüklenme durumunu hata durumunu
// ve gelen verileri store'da saklayacağız

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../componenets/Loader";
import {
  setError,
  setLoading,
  setProducts,
} from "../redux/actions/productActions";

const MainPage = () => {
  // store'a abone ol
  const store = useSelector((store) => store.products);

  const dispatch = useDispatch();
  console.log(store);

  useEffect(() => {
    //1) istedğin başladınığını store'a bildir
    dispatch(setLoading());

    axios
      .get("http://localhost:3040/products")
      // 2) isteğin başarılı olduğunu store'a bildir.
      .then((res) => dispatch(setProducts(res.data)))
      // 3) isteğin başarısız olduğunu store'a bildir.
      .catch((err) => dispatch(setError(err.message)));
  }, []);
  return (
    <div>
      {/* veriler yükleniyorsa */}
      {store.isLoading && <Loader />}

      {/* hata oluştuysa ekrana bas */}
      {store.isError && <h1 className="text-center my-5">{store.isError} </h1>}

      {/* veriler geldiyse ekrana bas */}
      {store?.products.map((item) => (
        <h3>{item.title} </h3>
      ))}
    </div>
  );
};

export default MainPage;
