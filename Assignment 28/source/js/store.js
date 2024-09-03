let allProducts = [
  {
    id: 1,
    title: "Album 1",
    price: 12.93,
    img: "Images/Album 1.png",
    count: 1
  },
  { id: 2, title: "Album 2", price: 21, img: "Images/Album 2.png", count: 1 },
  { id: 3, title: "Album 3", price: 33, img: "Images/Album 3.png", count: 1 },
  {
    id: 4,
    title: "Album 4",
    price: 41.98,
    img: "Images/Album 4.png",
    count: 1
  },
  { id: 5, title: "Coffee", price: 98, img: "Images/Cofee.png", count: 1 },
  { id: 6, title: "Shirt", price: 65.33, img: "Images/Shirt.png", count: 1 }
];

let userBasket = [];

const shopItemContainer = document.querySelector(".shop-items");
const basketProductsContainer = document.querySelector(".cart-items");
const removeAllProductsBtn = document.querySelector("#remove-all-products");
const cartTotalPriceElem = document.querySelector(".cart-total-price");

allProducts.forEach(function (product) {
  let productContainer = document.createElement("div");
  productContainer.classList.add("shop-item");

  let productTitleSpan = document.createElement("span");
  productTitleSpan.classList.add("shop-item-title");
  productTitleSpan.innerHTML = product.title;

  let productImageElem = document.createElement("img");
  productImageElem.classList.add("shop-item-image");
  productImageElem.setAttribute("src", product.img);

  let productDetailsContainer = document.createElement("div");
  productDetailsContainer.classList.add("shop-item-details");

  let productPriceSpan = document.createElement("span");
  productPriceSpan.innerHTML = product.price;
  productPriceSpan.classList.add("shop-item-price");

  let productAddButton = document.createElement("button");
  productAddButton.innerHTML = "Add to cart";
  productAddButton.className = "btn btn-primary shop-item-button";
  productAddButton.addEventListener("click", function () {
    addProductToBasketArray(product.id);
  });

  productDetailsContainer.append(productPriceSpan, productAddButton);
  productContainer.append(
    productTitleSpan,
    productImageElem,
    productDetailsContainer
  );
  shopItemContainer.append(productContainer);
});

function addProductToBasketArray(productId) {
  let mainProduct = allProducts.find(function (product) {
    return product.id === productId;
  });
  userBasket.push(mainProduct);

  basketProductGenerator(userBasket);

  calcTotalPrice(userBasket);
}

function basketProductGenerator(userBasketArray) {
  basketProductsContainer.innerHTML = "";
  userBasketArray.forEach(function (product) {
    let basketProductContainer = document.createElement("div");
    basketProductContainer.classList.add("cart-row");

    let basketProductDetailsContainer = document.createElement("div");
    basketProductDetailsContainer.className = "cart-item cart-column";

    let basketProductImg = document.createElement("img");
    basketProductImg.setAttribute("src", product.img);
    basketProductImg.setAttribute("width", "100");
    basketProductImg.setAttribute("height", "100");
    basketProductImg.classList.add("cart-item-image");

    let basketProductTitleSpan = document.createElement("span");
    basketProductTitleSpan.classList.add("cart-item-title");
    basketProductTitleSpan.innerHTML = product.title;

    basketProductDetailsContainer.append(
      basketProductImg,
      basketProductTitleSpan
    );

    let basketProductPriceSpan = document.createElement("span");
    basketProductPriceSpan.className = "cart-price cart-column";
    basketProductPriceSpan.innerHTML = product.price;

    let basketProductInputsContainer = document.createElement("div");
    basketProductInputsContainer.className = "cart-quantity cart-column";

    let basketProductInput = document.createElement("input");
    basketProductInput.className = "cart-quantity-input";
    basketProductInput.value = product.count;
    basketProductInput.setAttribute("type", "number");
    basketProductInput.addEventListener("change", function () {
      updateProductCount(product.id, basketProductInput.value);
    });

    let basketProductRemoveBtn = document.createElement("button");
    basketProductRemoveBtn.className = "btn btn-danger";
    basketProductRemoveBtn.innerHTML = "Remove";
    basketProductRemoveBtn.addEventListener("click", function () {
      removeProductFromBasket(product.id);
    });

    basketProductInputsContainer.append(
      basketProductInput,
      basketProductRemoveBtn
    );

    basketProductsContainer.append(
      basketProductDetailsContainer,
      basketProductPriceSpan,
      basketProductInputsContainer
    );

    basketProductsContainer.append(basketProductContainer);
  });
}

function removeProductFromBasket(productId) {
  userBasket = userBasket.filter(function (product) {
    return product.id !== productId;
  });
  basketProductGenerator(userBasket);
  calcTotalPrice(userBasket);
}

removeAllProductsBtn.addEventListener("click", function () {
  userBasket = [];
  basketProductGenerator(userBasket);
  calcTotalPrice(userBasket);
});

function calcTotalPrice(userBasketArray) {
  let sum = 0;
  userBasketArray.forEach(function (product) {
    sum += product.count * product.price;
  });
  cartTotalPriceElem.innerHTML = sum;
}

function updateProductCount(productId, newCount) {
  userBasket.forEach(function (product) {
    if (product.id === productId) {
      product.count = newCount;
    }
  });
  calcTotalPrice(userBasket);
}
