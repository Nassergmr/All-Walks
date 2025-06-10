import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { getSeachProducts } from "@/services/productServices";
import SearchProductCard from "../../elements/searchProductCard";
import { Loader2 } from "lucide-react";
import PopularBrands from "./popularBrands";

interface SearchComponentProps {
  setOpen: (value: boolean) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setOpen }) => {
  const [products, setproducts] = useState<
    {
      id: string;
      image: string;
      title: string;
      gender: string;
      min_price: number;
    }[]
  >([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [brandsVisible, setBrandsVisible] = useState(true);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setproducts([]);
      setNoResults(false);
    }
  }, [query]);

  // Live Fetching (when user stops typing)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim() !== "") {
      setBrandsVisible(false);
    }
    if (query.trim() === "") {
      setproducts([]);
      setNoResults(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      fetchProducts();
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Fetch Products On Click (button or enter key)
  const fetchProducts = async () => {
    if (query.trim() !== "") {
      setBrandsVisible(false);
    }
    if (query.trim() === "") {
      return;
    }
    setLoading(true);
    setNoResults(false);
    try {
      const { products } = await getSeachProducts(query);
      const filteredProducts = products.filter(
        (item: { min_price: number | null }) =>
          item.min_price !== null && item.min_price !== 0
      );

      if (!filteredProducts || filteredProducts.length === 0) {
        setNoResults(true);
      } else {
        setproducts(filteredProducts);
      }
    } catch {
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Exclude Products With Duplicated IDs
  const uniqueProducts = Array.from(
    new Map(products.map((item) => [item.id, item])).values()
  );

  return (
    <div className="z-[1000]">
      {/* Seach Input & Button */}
      <div className="flex w-full  focus:outline-black ">
        <input
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchProducts();
            }
          }}
          type="text"
          placeholder="Search 1000+ brands & 40K+ items"
          className="w-full rounded-md rounded-r-none  bg-gray-100 text-black text-sm px-4 py-3"
        />
        <button
          onClick={() => fetchProducts()}
          type="button"
          className="flex items-center justify-center  bg-black px-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="18px"
            className="fill-white"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </button>
      </div>

      {/* Popular Brands */}
      {brandsVisible && <PopularBrands query={query} setOpen={setOpen} />}

      {/* No Results & Searched Products */}
      <div id="products_container" className="flex flex-col py-8">
        {loading ? <Loader2 className="animate-spin mx-auto" /> : ""}

        {noResults ? (
          <div
            id="No_results_container"
            className="mx-auto flex flex-col gap-5"
          >
            <Image
              src="/images/icons/no-results.png"
              width={300}
              height={300}
              alt=""
              className="mx-auto"
            />
            {/* <p className="font-bold">
              Oops, nothing found ! Please try something else.
            </p> */}
          </div>
        ) : (
          uniqueProducts.map((product) => (
            <div key={product.id}>
              <SearchProductCard
                setOpen={setOpen}
                key={product.id}
                imageSrc={product.image}
                model={product.title}
                gender={product.gender}
                price={product.min_price}
                link={`/product/${product.id}`}
              />
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
