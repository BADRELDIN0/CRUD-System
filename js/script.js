// CRUDS -> create , retrive , update , delete , search

var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');

var productContainer;

if (localStorage.getItem('test') != null) {
  productContainer = JSON.parse(localStorage.getItem('test'));
  displayData(productContainer);
}
else {
  productContainer = [];
}

function addProduct() {
  if (validateProductName() && validateProductPrice() && validateproductCategory() && validateproductDesc()) {
    var product = {
      pName: productName.value,
      pPrice: productPrice.value,
      pCategory: productCategory.value,
      pDescription: productDesc.value
    }
    productContainer.push(product);
    localStorage.setItem('test', JSON.stringify(productContainer));
    clearForm();
    displayData(productContainer);
  }
  else {
    alert('Enter Validate Products');
  }
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function displayData(list) {
  var cartona = ``;
  for (let i = 0; i < list.length; i++) {
    cartona += `<tr>
             <td>${i}</td>
             <td>${list[i].pName}</td>
             <td>${list[i].pPrice}</td>
             <td>${list[i].pCategory}</td>
             <td>${list[i].pDescription}</td>
            <td>
              <button onclick="updateProduct(${i})" class="btn btn-warning btn-sm">update</button>
            </td>
             <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">delete</button></td>
           </tr>`;

  }
  document.getElementById('myTable').innerHTML = cartona;
}

function deleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem('test', JSON.stringify(productContainer));
  displayData(productContainer);
}

function updateProduct(index) {
  productName.value = productContainer[index].pName;
  productPrice.value = productContainer[index].pPrice;
  productCategory.value = productContainer[index].pCategory;
  productDesc.value = productContainer[index].pDescription;

  document.getElementById('update').classList.replace('d-none', 'd-inline-block');
  document.getElementById('add').classList.add('d-none');

  document.getElementById('update').addEventListener('click', function () {

    productContainer[index].pName = productName.value;
    productContainer[index].pPrice = productPrice.value;
    productContainer[index].pCategory = productCategory.value;
    productContainer[index].pDescription = productDesc.value;
    displayData(productContainer);
    clearForm();

    document.getElementById('update').classList.replace('d-inline-block', 'd-none');
    document.getElementById('add').classList.replace('d-none', 'd-inline-block');

    localStorage.setItem('test', JSON.stringify(productContainer));

  })


}

function search(searchString) {
  var searchContainer = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].pName.toLowerCase().includes(searchString.toLowerCase())) {
      searchContainer.push(productContainer[i]);
      displayData(searchContainer);
    }
    else {
      displayData(searchContainer)
    }
  }
}





function validateProductName() {
  var regx = /^[A-Z][a-z]{1,8}$/;
  if (regx.test(productName.value) == true) {
    if (productName.classList.contains('is-invalid')) {
      productName.classList.replace('is-invalid', 'is-valid');
    }
    return true;
  }
  else {
    productName.classList.add('is-invalid');
    return false;
  }
}

function validateProductPrice() {
  var regx = /^(?:[1-9][0-9]{0,4}(?:\.\d{1,2})?|100000|100000.00)$/
  if (regx.test(productPrice.value) == true) {
    if (productPrice.classList.contains('is-invalid')) {
      productPrice.classList.replace('is-invalid', 'is-valid');
    }
    return true;
  }
  else {
    productPrice.classList.add('is-invalid');
    return false;
  }
}


function validateproductCategory() {
  var regx = /^[A-Z][a-z]{3,8}$/;
  if (regx.test(productCategory.value) == true) {
    if (productCategory.classList.contains('is-invalid')) {
      productCategory.classList.replace('is-invalid', 'is-valid');
    }
    return true;
  }
  else {
    productCategory.classList.add('is-invalid');
    return false;
  }
}


function validateproductDesc() {
  var regx = /^[a-z].{3,500}$/;
  if (regx.test(productDesc.value) == true) {
    if (productDesc.classList.contains('is-invalid')) {
      productDesc.classList.replace('is-invalid', 'is-valid');
    }
    return true;
  }
  else {
    productDesc.classList.add('is-invalid');
    return false;
  }
}
