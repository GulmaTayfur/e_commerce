//aksiyon oluşturan fonksiyonlar
// Obje oluşturan fonksiyonlar

import axios from "axios";

export const setLoading = () => {
  return {
    type: "SET_LOADING",
  };
};

export const setProducts = (payload) => {
  return {
    type: "SET_PRODUCTS",
    payload,
  };
};

export const setError = (payload) => {
  return {
    type: "SET_ERROR",
    payload,
  };
};

//! Redux Thunk devreye girince
// Aksiyon oluşturan fonksiyonlar
// redux thunk işin içerisine girince bu a.o.f return satırında
// yeni bir fonksiyon döndürme yeteneğine sahip olur.
// Bu sayede bu return edilen fonksiyonların içerisinde api istekleri
// yapabiliriz.

export const getData = () => {
  return (dispatch) => {
    dispatch(setLoading());
    // api istekleri atabilir daha sonra store'a haber verebiliriz.
    axios
      .get("http://localhost:3040/products")
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  };
};
