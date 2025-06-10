import axiosInstance from "@/lib/axios";

export const getNikeBrand = async () => {
  const res = await axiosInstance.get(`/stockx/products?brand=Nike&&limit=6`);
  return res.data;
};

export const getJordanBrand = async () => {
  const res = await axiosInstance.get(`/stockx/products?brand=Jordan&&limit=6`);
  return res.data;
};

export const getMoreProducts = async () => {
  const res = await axiosInstance.get(`/stockx/products?limit=18&page=2`);
  return res.data;
};

export const getNewArrivalsMenProducts = async () => {
  const res = await axiosInstance.get(
    `/stockx/products?sort=rank&product_type=sneakers&page=3&gender=men&limit=8`
  );
  return res.data;
};

export const getNewArrivalsWomenProducts = async () => {
  const res = await axiosInstance.get(
    `/stockx/products?sort=rank&product_type=sneakers&page=3&gender=women&limit=8`
  );
  return res.data;
};

// Get Brands Only
export const getAllBrands = async () => {
  const res = await axiosInstance.get(`/utils/brands`);
  const brands = res.data.data;
  return brands;
};

export const getAllMenProducts = async (page = 1) => {
  const limit = 20;

  const res = await axiosInstance.get(
    `/stockx/products?limit=${limit}&product_type=sneakers&gender=men&page=${page}`
  );
  const products = res.data.data;

  return { products };
};

export const getAllWomenProducts = async (page = 1) => {
  const limit = 20;

  const res = await axiosInstance.get(
    `/stockx/products?limit=${limit}&product_type=sneakers&gender=women&page=${page}`
  );
  const products = res.data.data;

  return { products };
};

export const getAllKidsProducts = async (page = 1) => {
  const limit = 20;

  const res = await axiosInstance.get(
    `/stockx/products?limit=${limit}&product_type=sneakers&gender=kids&page=${page}`
  );
  const products = res.data.data;

  return { products };
};

export const getMenProductsByBrand = async (
  brand: string,
  page: number = 1
) => {
  const res = await axiosInstance.get(
    `/stockx/products?brand=${brand}&limit=20&product_type=sneakers&gender=men&page=${page}`
  );
  const products = res.data.data;

  return { products };
};

export const getWomenProductsByBrand = async (
  brand: string,
  page: number = 1
) => {
  const res = await axiosInstance.get(
    `/stockx/products?brand=${brand}&limit=20&product_type=sneakers&gender=women&page=${page}`
  );
  const products = res.data.data;

  return { products };
};

export const getKidsProductsByBrand = async (
  brand: string,
  page: number = 1
) => {
  const res = await axiosInstance.get(
    `/stockx/products?brand=${brand}&limit=20&product_type=sneakers&gender=kids&page=${page}`
  );
  const products = res.data.data;

  return { products };
};

export const getSingleProduct = async (id: string) => {
  const res = await axiosInstance.get(`/stockx/products/${id}`);

  const product = res.data.data;

  return { product };
};

export const getSeachProducts = async (searchItem: string) => {
  const res = await axiosInstance.get(
    `/stockx/products?query=${encodeURIComponent(
      searchItem
    )}&limit=50&product_type=sneakers&sort=rank`
  );

  const products = res.data.data;

  return { products };
};
