async function fetchContact() {
  try {
    const res = await fetch('http://herish.id.vn/api/contact');
    const data = await res.json();
    console.log(data);
    
    $(".contact-phone").text("Hotline: " + data.data.hotline);
    $(".contact-phone").attr("href", `tel:${data.data.hotline}`);
    $(".contact-email").text("Email: " + data.data.email);
    $(".contact-email").attr("href", `mailto:${data.data.email}`);
  } catch (err) {
    console.error("Fetch reminder failed:", err);
    $("#faqList").html(`<li class="error">Lỗi khi tải danh sách câu hỏi!</li>`);
  }
}

if($('#contactList').length) {
  fetchContact();
}