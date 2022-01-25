/**
 * Product from
 * validation script
 */
$("#p_sell_price").onkeyup = () => {
  let result = $("#p_main_price").value - $("#p_sell_price").value;
  if (result < 0) {
    $("#p_sell_price").style.border = "2px solid red";
    $("#p_main_price").style.border = "2px solid red";
    discount = 0;
  } else {
    discount = (result / $("#p_main_price").value) * 100;
    $("#p_sell_price").style.border = "1px solid #ced4da";
    $("#p_main_price").style.border = "1px solid #ced4da";
  }
};
$("#p_main_price").onkeyup = () => {
  let result = $("#p_main_price").value - $("#p_sell_price").value;
  if ($("#p_sell_price").value != true) {
    discount = 0;
  } else {
    discount = (result / $("#p_main_price").value) * 100;
    $("#p_sell_price").style.border = "1px solid #ced4da";
    $("#p_main_price").style.border = "1px solid #ced4da";
  }
};
/**
 * Product view exchange scripts
 */
$("#list").onclick = function () {
  addclass($(".product_root"), "product-list");
  addclass($("#list"), "active");
  removeclass($("#grid"), "active");
};
$("#grid").onclick = function () {
  removeclass($(".product_root"), "product-list");
  removeclass($("#list"), "active");
  addclass($("#grid"), "active");
};
/**
 * backend frontend exchange scripts
 */
$("#backendbtn").onclick = function () {
  addclass($(".frontEnd"), "d-none");
  addclass($("#backendbtn"), "active");
  removeclass($("#frontendbtn"), "active");
  removeclass($(".pageLoader"), "d-none");
  setTimeout(() => {
    addclass($(".pageLoader"), "d-none");
    removeclass($(".BackendEnd"), "d-none");
  }, 1000);
};
$("#frontendbtn").onclick = function () {
  addclass($(".BackendEnd"), "d-none");
  removeclass($("#backendbtn"), "active");
  addclass($("#frontendbtn"), "active");
  removeclass($(".pageLoader"), "d-none");
  setTimeout(() => {
    addclass($(".pageLoader"), "d-none");
    removeclass($(".frontEnd"), "d-none");
  }, 1000);
};
/**
 * default dummy product
 * script below
 */
let all_product = [];
if(localStorage.getItem('product')){
  all_product = JSON.parse(localStorage.getItem('product'));
}else{
  all_product = [
    {
      name: "Apple Monitor 3.0",
      main_price: 30000,
      sell_price: 28500,
      p_image: "https://images.macrumors.com/t/u5qFUnuK3qopG8nIsOOX74kgtk8=/1600x0/article-new/2019/02/MR-Future-Products-2020-2.png",
      discount: 5
  },
  {
      name: "Mask 50",
      main_price: 150,
      sell_price: 125,
      p_image: "https://static.toiimg.com/photo/msid-86481241/86481241.jpg",
      discount: 16.666666666666664
  },
  {
      name: "Watch 3.0",
      main_price: 1500,
      sell_price: 1420,
      p_image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8&w=1000&q=80",
      discount: 5.333333333333334
  },
  {
      name: "Bag",
      main_price: 500,
      sell_price: 420,
      p_image: "https://img.pixelz.com/blog/using-product-images-on-ecommerce-site/F_Purse1_drop.jpg?w=1000",
      discount: 16
  },
  {
      name: "OPPO Mobile for Smartphones & Accessories | OPPO Bangladesh",
      main_price: 10000,
      sell_price: 9500,
      p_image: "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/a16/middlebanner/A16-middlebanner-blue-640x480-mobile.jpg.thumb.webp",
      discount: 5
  },
  {
      name: "Camera",
      main_price: 25000,
      sell_price: "",
      p_image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      discount: 0
  }
  ];
}

if(localStorage.getItem('product')){
  showProduct(allProducts);
}else{
  localStorage.setItem('product' , JSON.stringify(all_product))
  $(".product_root").innerHTML = `<div class="load-message">Loading product from default server...</div>`;
  setTimeout(() => {
    showProduct(JSON.parse(localStorage.getItem('product')));
  },3000)
}
/**
 * throw product with form submit
 */
$("#p_form").addEventListener("submit", function (e) {
  e.preventDefault();
  all_product.unshift({
    name: `${$("#p_name").value}`,
    main_price: `${$("#p_main_price").value}`,
    sell_price: `${$("#p_sell_price").value}`,
    p_image: `${$("#p_url").value}`,
    discount: discount,
  });
  localStorage.setItem("product", JSON.stringify(all_product));
  allProducts = JSON.parse(localStorage.getItem("product"));
  showProduct(allProducts);
  /**
   * after submit form empty
   */
  document.querySelectorAll("input").forEach((getelement) => {
    getelement.value = "";
  });
  //Back to frontend
  $("#frontendbtn").click()
});
/**
 * Realtime search
 * script below
 */
$("#search").onkeyup = function () {
  let pattern = new RegExp(`${this.value}`, "i");
  let searchProducts = [];
  JSON.parse(localStorage.getItem("product")).map((data) => {
    if (pattern.test(data.name)) {
      searchProducts.unshift({
        name: data.name,
        main_price: data.main_price,
        sell_price: data.sell_price,
        p_image: data.p_image,
        discount: data.discount,
      });
    }
  });
  showProduct(searchProducts);
};
/**
 * Show all product from local host
 * script bellow
 */
