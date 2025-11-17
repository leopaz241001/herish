const API_URL = "/api/products";
let currentPage = 1;
let pageSize = 12;

// Hàm render 1 sản phẩm
function renderProduct(product, isSlide = false) {
  const percentDiscount = product.sale_price ? parseInt((1 - Number(product.sale_price) / Number(product.price)) * 100) : null;

  return `
    <li class="product-item${isSlide ? " swiper-slide" : ""}">
      <a href="product-detail.html?product_code=${product.product_code}" class="product-link block group">
        <div class="image relative overflow-hidden rounded-xl max-sm:aspect-square">
          <img src="./assets/images/product/1.jpg" alt="${product.product_name}" class="w-full h-full object-cover duration-1000 group-hover:scale-[1.1]">
          ${percentDiscount ? `<span class="badge absolute top-1.5 left-1.5 w-fit sm:py-2 py-1 sm:px-4 px-2 rounded-full bg-secondary-ui font-semibold max-sm:text-xs">-${percentDiscount}%</span>` : ""}
        </div>
        <div class="content sm:mt-5 mt-3">
          <strong class="text-head5 line-clamp-2">${product.product_name}</strong>
          <div class="flex items-end sm:gap-2 gap-1 sm:mt-3 mt-1">
          ${percentDiscount ? `
              <span class="sm:text-head4 text-head5-mo text-secondary-txt">₫${Number(product.sale_price).toLocaleString('vi-VN')}</span>
              <span class="text-head6 mb-px text-neutral-txt-low">₫${Number(product.price).toLocaleString('vi-VN')}</span>
            ` : `
              <span class="sm:text-head4 text-head5-mo text-secondary-txt">₫${Number(product.price).toLocaleString('vi-VN')}</span>
            `
          }
          </div>
        </div>
      </a>
    </li>
  `;
}

function toggleClearFilterBtn() {
  const hasQuery = window.location.search.length > 1;

  if (hasQuery) {
    $(".btn-clear-filter").closest("li").removeClass("hidden");
  } else {
    $(".btn-clear-filter").closest("li").addClass("hidden");
  }
}

function appendArrayParams(url, key, values) {
  if (!values) return url;
  if (Array.isArray(values)) {
    values.forEach(v => url += `&${key}=${encodeURIComponent(v)}`);
  } else {
    url += `&${key}=${encodeURIComponent(values)}`;
  }
  return url;
}

function updateURLParams(newParams) {
  const url = new URL(window.location.href);
  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  window.history.replaceState({}, "", url);
  toggleClearFilterBtn();
}

// Hàm fetch danh sách product
async function fetchProducts({page=1,page_size,search,tags,color_theme,occasion,product_type,target_audience,status,featured,min_price,max_price,sort_by,order}) {
  try {
    let url = `${API_URL}?page=${page}`
    if(page_size) url+= `&page_size=${page_size}`
    if(search) url+= `&search=${encodeURIComponent(search)}`
    if(occasion) url+= `&occasion=${occasion}`
    if(product_type) url+= `&product_type=${product_type}`
    if(featured) url+= `&featured=${featured}`
    if(min_price) url+= `&min_price=${min_price}`
    if(max_price) url+= `&max_price=${max_price}`
    if(sort_by) url+= `&sort_by=${sort_by}`
    if(order) url+= `&order=${order}`
    url = appendArrayParams(url, "tags", tags);
    url = appendArrayParams(url, "target_audience", target_audience);
    
    const res = await fetch(url);
    const data = await res.json();    
    if (!res.ok) throw new Error(data.error || "Không thể tải sản phẩm");

    return data.data;
  } catch (err) {
    console.error("Fetch product failed:", err);
    return []; // tránh lỗi undefined khi map()
  }
}

// Hàm render dạng danh sách
async function renderProductList({page=1, page_size, search, occasion, product_type, target_audience, tags, min_price, max_price, sort_by, order}) {
  try {
    const { items, pagination } = await fetchProducts({
      page:page,
      page_size:page_size,
      search:search,
      occasion:occasion,
      product_type:product_type,
      target_audience:target_audience,
      tags:tags,
      min_price:min_price,
      max_price:max_price,
      sort_by:sort_by,
      order:order,
    });
    
    if(pagination.total_items > 0) {
      const html = items.map(renderProduct).join("");
  
      $("#productList").addClass("loading");
      if (page === 1) {
        $("#productList").html(html);
      } else {
        $("#productList").append(html);
      }
      setTimeout(() => {
        $("#productList").removeClass("loading");
      }, 1000);
    } else {
      if (page === 1) {
        $("#productList").html(`<li class="error">Không tìm thấy sản phẩm nào phù hợp!</li>`);
      }
    }

    $(".products-quantity").html(pagination.total_items);
    $("#btnLoadMore").toggle(pagination.total_pages > page);
  } catch (err) {
    console.error(err);
    $("#productList").html(`<li class="error">Lỗi khi tải sản phẩm!</li>`);
  }
}

async function renderProductByParams(page=1, page_size) {
  const params = Object.fromEntries(new URLSearchParams(window.location.search)); // { key: value }
  renderProductList({page:page, page_size: page_size, ...params});
}

// Hàm render dạng swiper cho section Best seller
async function renderProductSection({selector, page_size=pageSize, featured=false, sort_by="", order=""}) {
  try {
    const { items } = await fetchProducts({page: 1, page_size: page_size, featured: featured, sort_by: sort_by, order: order});
    const html = items.map(item => renderProduct(item, true)).join("");
    $(`${selector} .swiper-wrapper`).html(html);

    const swiper = $(`${selector}`)[0]?.swiper;
    if (swiper) swiper.update();
  } catch (err) {
    console.error(`Lỗi khi tải: `, err);
    $(`${selector} .swiper-wrapper`).html(`<li class="error">Lỗi tải sản phẩm</li>`);
  }
}

// Hàm render sản phẩm gợi ý dựa trên sản phẩm hiện tại
async function renderProductSuggestion() {
  const params = new URLSearchParams(window.location.search);
  const product_code = params.get("product_code") || "";

  try {
    let url = `${API_URL}/suggestions?product_code=${product_code}`
    
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      const list = data.data.items;
      if(list.length > 0) {
        const html = list.map(item => renderProduct(item, true)).join("");
        $(`.related-product .swiper-wrapper`).html(html);
    
        const swiper = $(`.related-product .product-swiper`)[0]?.swiper;
        if (swiper) swiper.update();
      } else {
        $(`.related-product .swiper-wrapper`).html(`<li class="error">Không tìm thấy sản phẩm nào phù hợp.</li>`);
      }
    } else {
      $(`.related-product .swiper-wrapper`).html(`<li class="error">Lỗi tải sản phẩm</li>`);
    }
  } catch (err) {
    console.error("Fetch product failed:", err);
    $(`.related-product .swiper-wrapper`).html(`<li class="error">Lỗi tải sản phẩm</li>`);
  }
}

// Hàm render sản phẩm đã xem
async function renderProductRecent() {
  try {
    const access_token = localStorage.getItem('access_token');
    const res = await fetch(`/api/user/viewed-products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });

    const data = await res.json();
    if (res.ok) {
      const list = data.data.items;
      if(list.length > 0) {
        const html = list.map(item => renderProduct(item, true)).join("");
        $(`.recent-product .swiper-wrapper`).html(html);
    
        const swiper = $(`.recent-product .product-swiper-two`)[0]?.swiper;
        if (swiper) swiper.update();
      } else {
        $(`.recent-product .swiper-wrapper`).html(`<li class="error">Không tìm thấy sản phẩm nào đã xem.</li>`);
      }
    } else {
      $(`.recent-product .swiper-wrapper`).html(`<li class="error">Lỗi tải sản phẩm</li>`);
    }
  } catch (err) {
    console.error("Fetch product failed:", err);
    $(`.recent-product .swiper-wrapper`).html(`<li class="error">Lỗi tải sản phẩm</li>`);
  }
}

// Hàm render sản phẩm yêu thích
async function fetchProductWishlist() {
  try {
    const access_token = localStorage.getItem('access_token');
    const res = await fetch('/api/user/favorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });

    const data = await res.json();
    if (res.ok) {
      return data.data.items;
    } else {
      return [];
    }
  } catch(err) {
    console.error("Fetch product failed:", err);
    return [];
  }
}

async function renderProductWishlist() {
  const access_token = localStorage.getItem('access_token');
  if (!access_token) {
    alert('Vui lòng đăng nhập để xem danh sách yêu thích');
    window.location.href = "login.html"
    return;
  }
  const list = await fetchProductWishlist();
  
  if(list.length > 0) {
    const html = list.map(renderProduct).join("");
    $("#productWishlist").addClass("loading");
    $("#productWishlist").html(html);
    setTimeout(() => {
      $("#productWishlist").removeClass("loading");
    }, 1000);
  } else {
    $('#productWishlist').hide();
    $('.product-list-blank').show();
  }
}

// Hàm render chi tiết sản phẩm
async function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const product_code = params.get("product_code") || "";
  const access_token = localStorage.getItem('access_token');
  
  try {
    let url = `${API_URL}/${product_code}`
    let res;

    if(access_token) {
      res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      })
    } else {
      res = await fetch(url);
    }
    
    const data = await res.json();
    if (res.ok) {
      const detail = data.data;
      
      $('.breadcrumb .title, .product-detail .title').html(detail.product_name_full);
      $('.product-detail .short-desc').html(detail.short_description);
      const tags = detail.tags.map(item => `<li><a href="product-list.html?tags=${item}" class="button-main small bg-secondary-ui">${item}</a></li>`).join("");
      $('.product-detail .tags-list').html(tags);
      $('.product-detail .sale-price').html(detail.sale_price ? "₫" + Number(detail.sale_price).toLocaleString('vi-VN') : "₫" + detail.price);
      $('.product-detail .price').html(detail.sale_price ? "₫" + Number(detail.price).toLocaleString('vi-VN') : '');
      const discount = detail.sale_price ? parseInt((1 - Number(detail.sale_price) / Number(detail.price)) * 100) : null;
      if(discount) {
        $('.product-detail .discount').html('-' + discount + '%');
      } else {
        $('.product-detail .discount').hide();
      }
      $('.product-detail .desc').html(`${detail.detailed_info.introduction}<br>${detail.detailed_info.meaning}<br>${detail.detailed_info.suitableFor}`);
    }
  } catch (err) {
    console.error("Fetch product failed:", err);
  }
}

function filterProductByLink() {
  $('.btn-filter-product').each(function() {
    $(this).on('click', function (e) {
      e.preventDefault();
      const key = $(this).attr(`data-key`);
      const value = $(this).attr(`data-value`);
      
      if (key && value) window.location.href = `product-list.html?${key}=${encodeURIComponent(value)}`;
      else window.location.href = `product-list.html`
    })
  })
}

function filterProductBySelect() {
  $('.filter .list-option li').each(function() {
    $(this).on('click', function () {
      currentPage = 1;
      const item = $(this);
      let key = item.closest('.select-block').attr(`data-key`);
      let value = item.attr(`data-value`);
      if(key === "max_price") {
        const min_price = item.attr(`data-min`);
        const max_price = item.attr(`data-max`);
        updateURLParams({min_price: min_price, max_price: max_price}); // ?min_price=xxx&max_price=yyy
        renderProductByParams(1, pageSize);
      } else if(key) {
        updateURLParams({[key]: value}); // { occasion: "birthday" }
        renderProductByParams(1, pageSize);
      }
    })
  })
}

function sortProductBySelect() {
  $('.select-sort .list-option li').each(function() {
    $(this).on('click', function () {
      currentPage = 1;
      const item = $(this);
      let value = item.attr(`data-value`);
      if(value !== "price_asc" && value !== "price_desc") {
        updateURLParams({sort_by: value, order: "desc"});
        renderProductByParams(1, pageSize);
      } else if(value === "price_asc") {
        updateURLParams({sort_by: "price", order: "asc"});
        renderProductByParams(1, pageSize);
      } else if(value === "price_desc") {
        updateURLParams({sort_by: "price", order: "desc"});
        renderProductByParams(1, pageSize);
      }
    })
  })
}

async function fetchProductCategory() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("occasion") || params.get("product_type") || "";

  try {
    const res = await fetch('assets/data/category.json');
    const data = await res.json();
    
    const selectedCategory = data.find(item => item.name === category);
    if(selectedCategory) {
      $('.category-img').attr('src', selectedCategory.image);
      $('.category-img').attr('alt', selectedCategory.name);
      $('.category-name').text(selectedCategory.name);
      $('.category-title').text(selectedCategory.title);
      $('.category-desc').text(selectedCategory.desc);
    }
  } catch(err) {
    console.error(err);
  }
}

async function addProductToWishlist() {
  const params = new URLSearchParams(window.location.search);
  const product_code = params.get("product_code");
  const access_token = localStorage.getItem('access_token');

  if (!$(".button-wishlist").length) return;

  const list = await fetchProductWishlist();
  const isInWishlist = list.some(item => item.product_code === product_code);
  $(".button-wishlist").toggleClass("active", isInWishlist);

  $(".button-wishlist").on("click", async function() {
    if (!access_token) {
      alert('Vui lòng đăng nhập để thêm vào danh sách yêu thích');
      window.location.href = "login.html"
      return;
    }

    const isActive = $(this).hasClass("active");
    try {
      if(!isActive) {
        const res = await fetch(`/api/user/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
          body: JSON.stringify({ product_code }),
        });
        if(res.ok) $(".button-wishlist").addClass("active");
      } else {
        const res = await fetch(`/api/user/favorites/${product_code}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
        if(res.ok) $(".button-wishlist").removeClass("active");
      }
    } catch(err) {
      console.error(err);
    }
  });
}

function clearFilterProduct() {
  $('.btn-clear-filter').on('click', function() {
    window.location.href = window.location.pathname;
  })
}

$(document).ready(async function() {
  filterProductByLink();
  filterProductBySelect();
  sortProductBySelect();
  fetchProductCategory();
  addProductToWishlist();
  clearFilterProduct();
  toggleClearFilterBtn();

  if ($("#productWishlist").length) {
    renderProductWishlist();
  }
  
  if ($("#productList").length && !$(".search-result").length) {
    renderProductByParams(1, pageSize);

    $("#btnLoadMore .button-main").on("click", () => {
      currentPage++;
      renderProductByParams(currentPage, pageSize);
    });
  }

  if($(".search-result").length) {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search") || "";
    $('.search-result-keyword').text(search);
    renderProductByParams(1, pageSize);

    $("#btnLoadMore .button-main").on("click", () => {
      currentPage++;
      renderProductByParams(currentPage, pageSize);
    });
  }

  if ($(".best-seller .product-swiper").length) {
    renderProductSection({selector:".best-seller .product-swiper", page_size:pageSize, sort_by:"sold_count", order:"asc"});
  }

  if ($(".recent-product .product-swiper-two").length) {
    renderProductRecent();
  }

  if ($(".related-product").length) {
    renderProductSuggestion();
  }

  if ($(".product-detail").length) {
    renderProductDetail();
  }
});
