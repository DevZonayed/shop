/**
 * innitial variables
 */
let discount,
  allProducts = JSON.parse(localStorage.getItem("product"));

/**
 * Get element from document type HTML
 * @param {*} all
 * @param {*} inner
 * @param {*} element
 * @returns
 */
function $(element, all = false, inner = "false") {
  if (all != false) {
    if (inner != "false") {
      let value = [];
      let selector = inner.querySelectorAll(element);
      selector.forEach((v) => {
        value.push(v);
      });
      return value;
    } else {
      let value = [];
      let selector = document.querySelectorAll(element);
      selector.forEach((v) => {
        value.push(v);
      });
      return value;
    }
  } else {
    if (inner != "false") {
      return inner.querySelector(element);
    } else {
      return document.querySelector(element);
    }
  }
}

/**
 * for create an document element
 * @param {*} element
 * @returns
 */
function creat(element) {
  return document.createElement(element);
}

/**
 * add class in a element
 * @param {*} element
 * @param {*} className
 */
function addclass(element, className) {
  if (element != false) {
    element.classList.add(className);
  } else {
    console.log(element + "fild to add class");
  }
}

/**
 * remove class from an element
 * @param {*} element
 * @param {*} className
 */
function removeclass(element, className) {
  if (element != false) {
    element.classList.remove(className);
  } else {
    console.log(element + "fild to add class");
  }
}

/**
 * Show product to elemetn
 */

function showProduct(getProducts) {
  if (getProducts == null || getProducts.length == 0) {
    $(".product_root").innerHTML = `<div class="empty-message">We Are Out Of This Universe</div>`;
  } else {
    let throwproduct = "";
    let p_title;
    getProducts.map((data) => {
      if (data.name.length >= 27) {
        p_title = data.name.slice(0, 27) + "...";
      } else {
        p_title = data.name;
      }
      throwproduct += `
          <div class="product-wrapper">
          <div class="discount ${
            data.discount <= 2 ? "d-none" : ""
          }">-${data.discount.toFixed(0)}%</div>
          <div title="${data.name}" class="p_image-wrapper">
          <img
              src="${data.p_image}"
              alt=""
              class="p_image"
          />
          </div>
          <div title="${data.name}" class="p_name">${p_title}</div>
          <div class="price">
          Price : <span id="main_price" class="${
            data.discount == 0 ? "" : "have-sell"
          }">${data.main_price}</span> <span id="sell_price">${
        data.discount == 0 ? "" : "-"
      } ${data.sell_price}</span>
          </div>
          <div class="p_button">
          <button class="btn btn-cart">Add to cart</button>
          </div>
      </div>
  
      `;
    });
    $(".product_root").innerHTML = throwproduct;
  }
}
