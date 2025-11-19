async function fetchContact() {
  try {
    const res = await fetch('https://herish.id.vn/api/contact');
    const data = await res.json();
    
    $(".contact-phone").text("Hotline: " + data.data.hotline);
    $(".contact-phone").attr("href", `tel:${data.data.hotline}`);
    $(".contact-email").text("Email: " + data.data.email);
    $(".contact-email").attr("href", `mailto:${data.data.email}`);
    $(".contact-time").text(data.data.availability);
  } catch (err) {
    console.error("Fetch reminder failed:", err);
    $("#faqList").html(`<li class="error">Lỗi khi tải danh sách câu hỏi!</li>`);
  }
}

if($('#contactList').length) {
  fetchContact();
}