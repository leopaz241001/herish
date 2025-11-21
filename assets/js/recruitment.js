function renderRecruitment(item) {
  return `
    <li class="recruitment-item grid sm:grid-cols-6 items-center sm:gap-6 gap-4 py-8 max-sm:py-5 border-b border-neutral-hover duration-500 hover:px-8 hover:bg-white hover:bg-opacity-20">
      <div class="lg:col-span-2 col-span-12">
        <a href="recruitment-detail.html" class="text-head4">Graphic Designer</a>
      </div>
      <div class="lg:col-span-3 col-span-12">
        <div class="flex max-sm:flex-wrap sm:gap-6 gap-4">
          <div class="flex items-center gap-3 lg:w-1/3">
            <span class="icon-clock text-[24px]"></span>
            <span>31/10/2025</span>
          </div>
          <div class="flex items-center gap-3 lg:w-1/3">
            <span class="icon-dollar-circle text-[24px]"></span>
            <span>up to 20M</span>
          </div>
          <div class="flex items-center gap-3 lg:w-1/3">
            <span class="icon-manager text-[24px]"></span>
            <span>Middle</span>
          </div>
        </div>
      </div>
      <div class="action lg:col-span-1 col-span-12 lg:text-end">
        <a href="recruitment-detail.html" class="button-main bg-white">Xem chi tiết</a>
      </div>
    </li>
  `;
}

async function fetchRecruitment() {
  try {
    const res = await fetch('https://herish.id.vn/api/recruitments');
    const data = await res.json();
    const list = data.data;
    
    $("#recruitmentList").html("");
    if(list?.length > 0) {
      const html = list.map(renderRecruitment).join("");
      $("#recruitmentList").append(html);
    } else {
      $(".recruitment-list-blank").removeAttr("style");
    }
  } catch (err) {
    console.error("Fetch reminder failed:", err);
    $(".recruitment-list-blank").removeAttr("style");
  }
}

if($('#recruitmentList').length) {
  fetchRecruitment();
}