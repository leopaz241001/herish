function renderFaq(faq) {
  return `
    <li class="faq-item h-fit sm:p-8 py-5 px-4 rounded-xl bg-neutral-ui">
      <button type="button" class="heading flex items-center justify-between gap-6 w-full">
        <strong class="title sm:text-head6 text-body1 font-semibold text-left">${faq.question}</strong>
        <i class="ic-down hgi hgi-stroke hgi-arrow-down-01 text-[24px] text-neutral-txt-low duration-300"></i>
      </button>
      <p class="answer sm:mt-6 mt-3">${faq.answer}</p>
    </li>
  `;
}

async function fetchFaq() {
  try {
    const res = await fetch('/api/faq');
    const data = await res.json();
    const list = data.data;
    
    if(list?.length > 0) {
      $("#faqList").html("");
      const html = list.map(renderFaq).join("");
      $("#faqList").append(html);
    } else {
      $("#faqList").html(`<li class="error">Chưa có câu hỏi nào được tạo!</li>`);
    }
  } catch (err) {
    console.error("Fetch reminder failed:", err);
    $("#faqList").html(`<li class="error">Lỗi khi tải danh sách câu hỏi!</li>`);
  }
}

if($('#faqList').length) {
  fetchFaq();
}