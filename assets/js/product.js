const API_URL = "https://realhome-be-dpc0.onrender.com/api/products";

// Hàm render 1 sản phẩm
function renderProduct(product) {
  return `
    <a href="product-detail.html" class="product-link block group">
      <div class="image relative overflow-hidden rounded-xl max-sm:aspect-square">
        <img src="./assets/images/product/1.jpg" alt="[20/10] Hộp quà tặng dây chuyền - Lấp lánh những điều nhỏ" class="w-full h-full object-cover duration-1000 group-hover:scale-[1.1]">
        <span class="badge absolute top-1.5 left-1.5 w-fit sm:py-2 py-1 sm:px-4 px-2 rounded-full bg-secondary-ui font-semibold max-sm:text-xs">-20%</span>
      </div>
      <div class="content sm:mt-5 mt-3">
        <strong class="text-head5 line-clamp-2">[20/10] Hộp quà tặng dây chuyền - Lấp lánh những điều nhỏ</strong>
        <div class="flex items-end sm:gap-2 gap-1 sm:mt-3 mt-1">
          <span class="sm:text-head4 text-head5-mo text-secondary-txt">₫899.000</span>
          <span class="text-head6 mb-px text-neutral-txt-low">₫1.101.000</span>
        </div>
      </div>
    </a>
  `;
}

// Hàm fetch danh sách sản phẩm
async function fetchProducts(keyword = "") {
  try {
    const res = await fetch(`${API_URL}?search=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Không thể tải sản phẩm");

    const list = data.products || data; // tuỳ theo bạn trả về `products` hay mảng trực tiếp
    const html = list.map(renderProduct).join("");

    $("#productList").html(html);
  } catch (err) {
    console.error(err);
    $("#productList").html(`<p class="error">Lỗi khi tải sản phẩm!</p>`);
  }
}

// Sự kiện tìm kiếm
$("#searchBtn").on("click", () => {
  const keyword = $("#searchInput").val().trim();
  fetchProducts(keyword);
});

// Khi tải trang lần đầu
$(document).ready(() => {
  fetchProducts();
});
