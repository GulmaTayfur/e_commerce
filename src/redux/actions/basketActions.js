// Asenkron Aksiyon | Thunk Aksiyonu

import axios from "axios";

// Sepete yeni eleman ekleme işini yapacak
//Önce api'ya post isetği ile elemanı ekleyecek
// api'a eklenirse store'a da ekleyecek

export const addToBasket = (product) => async (dispatch) => {
  // 1) yeni bir nesne oluşturup miktsrını 1 olarak belile
  const newProduct = { ...product, amount: 1 };

  // 2) nesneden gereksiz verileri kaldır
  delete newProduct.specs;
  delete newProduct.color;
  delete newProduct.title;
  delete newProduct.stockAmount;

  // 3) ürünü api'a kaydet

  const res = await axios.post("http://localhost:3040/basket", newProduct);

  // 4) store'a yeni ürünü ekle

  dispatch({
    type: "ADD",
    payload: newProduct,
  });
};

// api'dan sepete verilerini alıp aşama aşama
// (yükleme / başarılı olma / hata oluşma) store'u
// bilgilendiren asenkron thunk aksiyonu
export const getBasket = () => (dispatch) => {
  dispatch({
    type: "SET_BASKET_LOADING",
  });

  axios
    .get("http://localhost:3040/basket")
    .then((res) =>
      dispatch({
        type: "SET_BASKET_DATA",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "SET_BASKET_ERROR",
        payload: err.message,
      })
    );
};

// sepette var olan ürünün miktarını bir arttır
export const updateItem = (product) => (dispatch) => {
  axios
    .patch(`http://localhost:3040/basket/${product.id}`, {
      amount: product.amount + 1,
    })
    // istek başarılı olursa reducera haber ver
    .then(() =>
      dispatch({
        type: "UPDATE",
        payload: product.id,
      })
    );
};

export const removeItem = (delete_id) => (dispatch) => {
  axios.delete(`http://localhost:3040/basket/${delete_id}`).then(() =>
    dispatch({
      type: "DELETE",
      payload: delete_id,
    })
  );
};
