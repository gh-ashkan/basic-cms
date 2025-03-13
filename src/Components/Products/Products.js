import React,{useState , useEffect} from 'react'
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductTable from '../ProductTable/ProductTable'

export default function Products() {

  const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
      getAllProducts();
    }, []);
  
    const getAllProducts = () => {
      fetch("http://localhost:8000/api/products")
        .then((res) => res.json())
        .then((products) => setAllProducts(products));
    };
  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductTable allProducts={allProducts} getAllProducts={getAllProducts} />
    </>
  )
}
