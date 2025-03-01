import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = products.length;
  const noOfPages = Math.ceil(products / pageSize);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  console.log(products);

  if (loading) {
    return (
      <div className="flex justify-center  items-center my-12 text-4xl font-semibold ">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-semibold text-center my-5 text-4xl">
        Here are some products
      </h1>

      <div className="grid p-12 gap-9 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => {
          return (
            <div
              className="card cursor-pointer flex flex-col shadow-xl  md:w-[90%] rounded-xl"
              key={product.id}
            >
              <img
                className="w-[100%] object-cover"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex flex-col justify-center gap-5 items-center font-semibold text-xl p-5">
                <h1>{product.title}</h1>
                <p className="text-lg font-extralight">
                  {product.description.substring(0, 50)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
