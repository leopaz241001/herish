const API_URL = "http://160.250.5.249:5001/api/products";
let currentPage = 1;

// Hàm render 1 sản phẩm
function renderProduct(product, isSlide = false) {
  return `
    <li class="product-item${isSlide ? " swiper-slide" : ""}">
      <a href="product-detail.html?product_code=${product.product_code}" class="product-link block group">
        <div class="image relative overflow-hidden rounded-xl max-sm:aspect-square">
          <img src="./assets/images/product/1.jpg" alt="${product.product_name}" class="w-full h-full object-cover duration-1000 group-hover:scale-[1.1]">
          <span class="badge absolute top-1.5 left-1.5 w-fit sm:py-2 py-1 sm:px-4 px-2 rounded-full bg-secondary-ui font-semibold max-sm:text-xs">-20%</span>
        </div>
        <div class="content sm:mt-5 mt-3">
          <strong class="text-head5 line-clamp-2">${product.product_name}</strong>
          <div class="flex items-end sm:gap-2 gap-1 sm:mt-3 mt-1">
            <span class="sm:text-head4 text-head5-mo text-secondary-txt">₫${Number(product.price).toLocaleString('vi-VN')}</span>
            <span class="text-head6 mb-px text-neutral-txt-low">₫${Number(product.price).toLocaleString('vi-VN')}</span>
          </div>
        </div>
      </a>
    </li>
  `;
}

// Hàm fetch danh sách product
async function fetchProducts({page=1,page_size=6,search="",tags,color_theme,occasion,target_audience,status,featured,min_price,max_price,sort_by,order}) {
  try {
    let url = `${API_URL}?page=${page}&page_size=${page_size}`
    if(search) url+= `&search=${encodeURIComponent(search)}`
    if(featured) url+= `&featured=${featured}`
    if(sort_by) url+= `&sort_by=${sort_by}`
    if(order) url+= `&order=${order}`
    
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Không thể tải sản phẩm");

    return data.data.items || [];
  } catch (err) {
    console.error("Fetch product failed:", err);
    return []; // tránh lỗi undefined khi map()
  }
}

// Hàm render dạng danh sách
async function renderProductList(page = 1, page_size = 6, search = "") {
  try {
    const list = await fetchProducts({page, page_size, search});
    if(list.length > 0) {
      const html = list.map(renderProduct).join("");
  
      if (page === 1) {
        $("#productList").html(html);
      } else {
        $("#productList").addClass("loading");
        setTimeout(() => {
          $("#productList").append(html);
          $("#productList").removeClass("loading");
        }, 1000);
      }
    } else {
      if (page === 1) {
        $("#productList").html(`<li class="error">Không tìm thấy sản phẩm nào phù hợp!</li>`);
      }
    }

    if (list.length < page_size) $("#btnLoadMore").hide();
    else $("#btnLoadMore").show();
  } catch (err) {
    console.error(err);
    $("#productList").html(`<li class="error">Lỗi khi tải sản phẩm!</li>`);
  }
}

// Hàm render dạng swiper cho từng section
async function renderProductSection({selector, page_size = 6, type}) {
  let featured = false, sort_by = "", order = "";
  if(type === "best-seller") {
    sort_by = "sold_count"
    order = "asc"
  }
  if(type === "recent") {
    featured = true
  }
  try {
    const list = await fetchProducts({page: 1, page_size: page_size, featured: featured, sort_by: sort_by, order: order});
    const html = list.map(item => renderProduct(item, true)).join("");
    $(`${selector} .swiper-wrapper`).html(html);

    const swiper = $(`${selector}`)[0]?.swiper;
    if (swiper) swiper.update();
  } catch (err) {
    console.error(`Lỗi khi tải ${type}:`, err);
    $(`${selector} .swiper-wrapper`).html(`<li class="error">Lỗi tải sản phẩm</li>`);
  }
}

$(document).ready(async function() {
  if ($("#productList").length && !$(".search-result").length) {
    renderProductList();

    $("#btnLoadMore .button-main").on("click", () => {
      currentPage++;
      renderProductList(currentPage);
    });
  }

  if($(".search-result").length) {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search") || "";
    $('.search-result-keyword').text(search);
    renderProductList(1, 6, search);

    $("#btnLoadMore .button-main").on("click", () => {
      currentPage++;
      renderProductList(currentPage, 6, search);
    });
  }

  if ($(".product-swiper").length) {
    renderProductSection(".product-swiper", 6, "best-seller");
  }

  if ($(".product-swiper-two").length) {
    renderProductSection(".product-swiper-two", 6, "recent");
  }
});
