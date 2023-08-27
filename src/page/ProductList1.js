import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import jwt_decode from 'jwt-decode';

function ProductList1() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  const [id,setId]=useState();

  useEffect(() => {
    axios.get('http://localhost:8080/product')

      .then(response => {
        
        setProducts(response.data);
        setImages(response.data.map(product => product.img));
        
        console.log(response.data)
        // alert(response.data.name)
      })
      .catch(error => {
        alert("Fetching of products failed")
        console.log(error);
      });
  }, []);

  console.log("this is local storage "+localStorage.getItem("token"))
  const userid = localStorage.getItem("user");

  const handleProductClick = (productId) => {
    // Redirect to another page with the product ID as a parameter
    navigate(`/selectedProduct/${productId}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="flex flex-wrap" >
          {products.map((product) => (<div className="w-1/3 p-4" >
            <a href={product.id} className="group"
            onClick={() => handleProductClick(product.id)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img src={`http://localhost:8080/product/getimage/${product.id}`}  
                className="h-full w-full object-cover object-center group-hover:opacity-75" style={{ width: "100%", height: "500px" }}></img>
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900"><h1>Price-</h1>{product.price}</p>
              <p><h1>{product.description}</h1></p>
            </a>
          <h1>{product.id}</h1>
          </div>))
          }
        </div>
      </div>
    </div>
  );
};

export default ProductList1;