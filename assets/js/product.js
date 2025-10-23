const API_URL = "https://realhome-be-dpc0.onrender.com/api/products";
let currentPage = 1;

// Hàm render 1 sản phẩm
function renderProduct(product) {
  return `
    <li class="product-item swiper-slide">
      <a href="product-detail.html" class="product-link block group">
        <div class="image relative overflow-hidden rounded-xl max-sm:aspect-square">
          <img src="./assets/images/product/1.jpg" alt="${product.title}" class="w-full h-full object-cover duration-1000 group-hover:scale-[1.1]">
          <span class="badge absolute top-1.5 left-1.5 w-fit sm:py-2 py-1 sm:px-4 px-2 rounded-full bg-secondary-ui font-semibold max-sm:text-xs">-20%</span>
        </div>
        <div class="content sm:mt-5 mt-3">
          <strong class="text-head5 line-clamp-2">${product.title}</strong>
          <div class="flex items-end sm:gap-2 gap-1 sm:mt-3 mt-1">
            <span class="sm:text-head4 text-head5-mo text-secondary-txt">₫${product.price}</span>
            <span class="text-head6 mb-px text-neutral-txt-low">₫${product.price}</span>
          </div>
        </div>
      </a>
    </li>
  `;
}

// Hàm fetch danh sách sản phẩm
async function fetchProducts(page = 1, limit = 3, keyword = "") {
  try {
    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}&search=${encodeURIComponent(keyword)}`);
    // const res = await fetch(API_URL);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Không thể tải sản phẩm");

    const list = data.data;
    const html = list.map(renderProduct).join("");

    if(page === 1) {
      $("#productList").html(html);
    } else {
      $("#productList").addClass('loading');
      setTimeout(() => {
        $("#productList").removeClass('loading');
        $("#productList").append(html);
      }, 1000);
    }

    if (list.length < limit) {
      $("#btnLoadMore").hide();
    } else {
      $("#btnLoadMore").show();
    }
  } catch (err) {
    console.error(err);
    $("#productList").html(`<li class="error">Lỗi khi tải sản phẩm!</li>`);
  }
}

$("#btnLoadMore .button-main").on("click", () => {
  currentPage++;
  fetchProducts(currentPage, 3);
});

// Sự kiện tìm kiếm
$("#searchBtn").on("click", () => {
  const keyword = $("#searchInput").val().trim();
  fetchProducts(keyword);
});

// Khi tải trang lần đầu
$(document).ready(() => {
  fetchProducts(1, 3);
});
