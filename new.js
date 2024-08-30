const form = {
  title: "",
  price: 0,
  description: "",
  category_id: "",
  company: "",
  stock: 0,
  shipping: false,
  featured: false,
  colors: ["#000"],
  images: ["image old"],
};

// console.log("sebelum upload", form);
console.log(form);

const newForm = {
  ...form,
  newData: true,
};

console.log(newForm);

// // upload image
const data = {
  images: ["image 1", "image 2", "image 3"],
};

const test = {
  ...form,
  images: [],
  newData: true,
};

// form.images = [...form.images, ...data.images];

// console.log("setelah upload", form);
