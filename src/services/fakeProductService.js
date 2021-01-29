import * as categoryAPI from "./fakeCategoryService";

export const products = [
  {
    id: "1",
    name: "laptop hp",
    category: { id: "1", name: "فئة اللابتوب" }, //in db,field like this should hold categoryId only, but here in our immaginary db we simulate the eager loading of data (product row)
    numberInStock: 10,
    price: 20,
  },
  {
    id: "2",
    name: "laptop DELL",
    category: { id: "1", name: "فئة اللابتوب" },
    numberInStock: 4,
    price: 22,
  },
  {
    id: "3",
    name: "tablet iPad 5",
    category: { id: "2", name: "فئة التابلت" },
    numberInStock: 6,
    price: 19,
    liked: true,
  },
  {
    id: "4",
    name: "notebook hp",
    category: { id: "2", name: "فئة التابلت" },
    numberInStock: 6,
    price: 30,
  },
  {
    id: "5",
    name: "tablet Galaxy",
    category: { id: "2", name: "فئة التابلت" },
    numberInStock: 2,
    price: 50,
  },
  {
    id: "6",
    name: "Hard disk 1 TB",
    category: { id: "3", name: "فئة الملحقات" },
    numberInStock: 10,
    price: 6.5,
  },
  {
    id: "7",
    name: "Printer Canon",
    category: { id: "3", name: "فئة الملحقات" },
    numberInStock: 5,
    price: 24,
  },
  {
    id: "8",
    name: "Hard disk 0.5 TB",
    category: { id: "3", name: "فئة الملحقات" },
    numberInStock: 6,
    price: 18,
  },
  {
    id: "9",
    name: "laptop lenova",
    category: { id: "1", name: "فئة اللابتوب" },
    numberInStock: 3,
    price: 65,
  },
];

export function getProduct(id) {
  return products.find((p) => p.id === id);
}

export function getProducts() {
  return products;
}

export function saveProduct(product) {
  //if it is an edit operation, then find() will return that product from the db; but if it is an add new operation, then find() will return null, so we want to make it {} to fill it with data
  const productInDb = products.find((p) => p.id === product.id) || {};

  productInDb.name = product.name;
  productInDb.category = categoryAPI.categories.find(
    (c) => c.id === product.categoryId
  );
  productInDb.numberInStock = product.numberInStock;
  productInDb.price = product.price;

  if (!productInDb.id) {
    productInDb.id = Date.now().toString();
    products.push(productInDb);
  }

  return productInDb;
}

export function deleteProduct(id) {
  const productInDb = products.find((p) => p.id === id);
  products.splice(products.indexOf(productInDb), 1);

  return productInDb;
}
