var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var productList = [];
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var currentIndex = -1;
if (localStorage.getItem('productList') == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem('productList'));
  displayProduct(productList);
}
console.log(localStorage.getItem('productList'));

function addProduct() {
  if (validateName() === true && validatePrice() == true && validateCategory() == true && validateDesc() == true) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };
    productList.push(product);
    clear();
    displayProduct(productList);
    localStorage.setItem('productList', JSON.stringify(productList));
    console.log('hello', productList);
  }
  else {

  }
}

function clear() {
  productName.value = '';
  productPrice.value = '';
  productCategory.value = '';
  productDesc.value = '';
}

function displayProduct(products) {
  var cartona = ``;
  for (var i = 0; i < products.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${products[i].newName ? products[i].newName : products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td><div id="scrollDesc">${products[i].desc}</div></td>
        <td>
          <button onclick="getData(${i})" class="btn btn-warning btn-sm">update</button>
        </td>
        <td>
          <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">delete</button>
        </td>
      </tr>
    `;
  }
  document.getElementById('tBody').innerHTML = cartona;
}

function deleteProduct(index) {
  console.log('delete');
  productList.splice(index, 1);
  console.log(productList);
  localStorage.setItem('productList', JSON.stringify(productList));
  displayProduct(productList);
}

function search(term) {
  var foundedNames = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class='text-danger'>${term}</span>`);
      console.log('founded', i);
      foundedNames.push(productList[i]);
    }
  }
  displayProduct(foundedNames);
}


function getData(data) {
  currentIndex = data;
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.remove("d-none");
  productName.value = productList[data].name;
  productPrice.value = productList[data].price;
  productCategory.value = productList[data].category;
  productDesc.value = productList[data].desc;

  localStorage.setItem('productList', JSON.stringify(productList));
  displayProduct(productList);
  console.log(i, "update");
}

function updatedData() {
  addProductBtn.classList.replace("d-none", "d-block");
  updateProductBtn.classList.add("d-none");
  if (currentIndex !== -1) {
    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = productPrice.value;
    productList[currentIndex].category = productCategory.value;
    productList[currentIndex].desc = productDesc.value;

    localStorage.setItem('productList', JSON.stringify(productList));
    displayProduct(productList);
    clear();
  }

}


function validateName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value)) {
    productName.style.border = "";
    document.getElementById("wrongName").classList.add("d-none");
    return true;

  }
  else {
    productName.style.border = "5px solid red";
    document.getElementById("wrongName").classList.remove("d-none");

    return false;

  }
}
function validatePrice() {
  var regex = /^[1-9][0-9]{3}|10000$/;
  if (regex.test(productPrice.value)) {
    productPrice.style.border = "";
    document.getElementById("wrongPrice").classList.add("d-none");

    return true;

  }
  else {
    productPrice.style.border = "5px solid red";
    document.getElementById("wrongPrice").classList.remove("d-none");

    return false;

  }
}
function validateCategory() {
  var regex = /^(tv|mobile|laptop)$/i;
  if (regex.test(productCategory.value)) {
    productCategory.style.border = "";
    document.getElementById("wrongCategory").classList.add("d-none");

    return true;

  }
  else {
    productCategory.style.border = "5px solid red";
    document.getElementById("wrongCategory").classList.remove("d-none");

    return false;

  }
}
function validateDesc() {
  var regex = /[\w\d]{250,}/;
  if (regex.test(productDesc.value )) {
    productDesc.style.border = "";
    document.getElementById("wrongDesc").classList.add("d-none");

    return true;

  }
  else {
    productDesc.style.border = "5px solid red";
    document.getElementById("wrongDesc").classList.remove("d-none");

    return false;

  }
}











console.log(productName);
console.log(productPrice);
console.log(productCategory);
console.log(productDesc);
