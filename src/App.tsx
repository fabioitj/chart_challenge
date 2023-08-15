import { ChangeEvent, useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Category from './models/Category';
import Product from './models/Product';
import Brand from './models/Brand';
import Categories from './mocks/categories.json';
import Products from './mocks/products.json';
import Brands from './mocks/brands.json';
import Sales from './mocks/sales.json';
import Select from './components/Select';
import Header from './components/Header';
import Row from './components/Row';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(0);

  const options = {
    title: {
      text: 'Sales By Month for:',
    },
    series: [{
      name: "Sales",
      data: Sales.filter(_ => _.id_brand == selectedBrand).map(d => ({ y: d.value, x: d.month - 1 }))
    }],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        step: 1
      }
    },
  }

  useEffect(() => {
    setCategories(Categories as Category[]);
    setProducts(Products as Product[]);
    setBrands(Brands as Brand[]);

    const firstCategory = Categories[0].id;
    const firstProduct = Products.filter(_ => _.id_category == firstCategory)[0].id;
    const firstBrand = Brands.filter(_ => _.id_product == firstProduct)[0].id;

    setSelectedCategory(firstCategory);
    setSelectedProduct(firstProduct);
    setSelectedCategory(firstBrand);
  }, [])

  useEffect(() => {
    if (selectedCategory == 0) return;

    setSelectedProduct(products.filter(_ => _.id_category == selectedCategory)[0].id);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedProduct == 0) return;

    setSelectedBrand(brands.filter(_ => _.id_product == selectedProduct)[0].id);
  }, [selectedProduct]);

  const handleUpdateBrand = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  }

  const handleUpdateProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value);
  }

  const handleUpdateCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }

  return (
    <section>
      <Header />
      <Row>
        <Select key={0} handleOnChange={handleUpdateCategory} label='Category'>
          {
            categories && categories.map(category => {
              return (
                <option value={category.id}>{category.name}</option>
              )
            })
          }
        </Select>
        <Select key={0} handleOnChange={handleUpdateProduct} label='Product'>
          {
            products && products.filter(_ => _.id_category == selectedCategory).map(product => {
              return (
                <option value={product.id} selected={product.id === selectedProduct ? true : false}>{product.name}</option>
              )
            })
          }
        </Select>
        <Select key={0} handleOnChange={handleUpdateBrand} label='Brand'>
          {
            brands && brands.filter(_ => _.id_product == selectedProduct).map(brand => {
              return (
                <option value={brand.id} selected={brand.id === selectedBrand ? true : false}>{brand.name}</option>
              )
            })
          }
        </Select>
      </Row>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </section>
  )
}

export default App
