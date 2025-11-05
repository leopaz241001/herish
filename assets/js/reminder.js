const createReminder = function () {
  const formReminder = document.querySelector('#formReminder');
  
  formReminder.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const otherEvt = $('#eventName').val();
    const selectedEvt = $('.modal-reminders .event-list input:checked+label .event-name').text().trim();
    const event_name = otherEvt ? otherEvt : selectedEvt;
    const dateInput = $('#dateInput').val();
    const [day, month, year] = dateInput.split("/");
    const date = `${year}-${month}-${day}`;
    const recipient_name = $('#recipientName').val();
    const event_type = $('#event_type').val();

    const idReminder = $(this).attr('data-id');
    const method = idReminder ? 'PUT' : 'POST';
    const url = idReminder ? `http://160.250.5.249:5001/api/special-days/${idReminder}` : 'http://160.250.5.249:5001/api/special-days';
  
    try {
      const access_token = localStorage.getItem('access_token');
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ event_name, date, recipient_name }),
        // credentials: "include", // gửi và nhận cookie
      });
      const data = await res.json();
      if(res.ok) {
        $(".toastify").removeClass("active").siblings(".success").addClass("active");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        $(".toastify").removeClass("active").siblings(".error").addClass("active");
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      $(".toastify").removeClass("active").siblings(".error").addClass("active");
    }
  });
}

function renderReminder(reminder) {
  const day = new Date(reminder.date).getDate();
  const month = new Date(reminder.date).getMonth() + 1;
  const year = new Date(reminder.date).getFullYear();

  return `
    <li class="reminder-item bg-neutral-ui sm:p-6 p-4 rounded-xl" data-id="${reminder.id}">
      <div class="flex justify-between gap-12">
        <span class="sm:text-body1 text-body3 text-neutral-txt-low">Ngày ${day} tháng ${month} năm ${year}</span>
        <div class="flex gap-6">
          <button type="button" class="btn-open-popup" data-type="modal-reminders" aria-label="Chỉnh sửa lời nhắc">
            <i class="hgi hgi-stroke hgi-edit-02 block text-[24px]"></i>
          </button>
          <button type="button" class="btn-open-popup" data-type="modal-delete-reminders" aria-label="Xóa lời nhắc">
            <i class="hgi hgi-stroke hgi-delete-03 block text-[24px] text-error"></i>
          </button>
        </div>
      </div>
      <strong class="block text-head4 sm:my-12 my-5">${reminder.recipient_name}</strong>
      <span class="block sm:text-head6 text-sm font-semibold text-neutral-txt-low">${reminder.event_name}</span>
    </li>
  `;
}

// Hàm fetch danh sách reminder
async function fetchReminders() {
  try {
    let url = `http://160.250.5.249:5001/api/special-days`;
    const access_token = localStorage.getItem('access_token');
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      // credentials: "include", // gửi và nhận cookie
    });
    const data = await res.json();
    const list = data.data?.items;
    
    if(list?.length > 0) {
      $(".reminders-list").html("");
      const html = list.map(renderReminder).join("");
      $(".reminders-list").append(html);
      $(".reminders-quantity").html(list.length)
    } else {
      $(".reminders-list").html(`<li class="error">Chưa có lời nhắc nào được tạo!</li>`);
    }
  } catch (err) {
    console.error("Fetch reminder failed:", err);
    $(".reminders-list").html(`<li class="error">Lỗi khi tải danh sách lời nhắc!</li>`);
  }
}

async function fetchReminderDetail() {
  $(document).on("click", ".btn-open-popup", async function () {
    const event_id = $(this).closest('.reminder-item').attr("data-id");
    const ariaLabel = $(this).attr('aria-label');
    $(".modal-reminders .modal-header strong").text(ariaLabel);
    $(".modal-reminders .modal-footer button[type='submit']").text(ariaLabel);
    
    if(event_id && ariaLabel === "Chỉnh sửa lời nhắc") {
      $("#formReminder").attr("data-id", event_id);

      try {
        let url = `http://160.250.5.249:5001/api/special-days/${event_id}`;
        const access_token = localStorage.getItem('access_token');
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
          // credentials: "include", // gửi và nhận cookie
        });
        const data = await res.json();
        
        if(data.data) {
          $("#recipientName").val(data.data.recipient_name);
          const date = new Date(data.data.date);
          $("#dateInput").val(date.toLocaleDateString("vi-VN"));
          let matched = false;
          $(".event-name").each(function() {
            if($(this).text() === data.data.event_name) {
              $(this).closest("li").find("input").prop("checked", true);
              matched = true;
              return false;
            }
          })
          if(matched) {
            $(".form-other-date").addClass("hidden");
            $("#eventName").val("");
          } else {
            $(".event-list li input").prop("checked", false);
            $(".form-other-date").removeClass("hidden");
            $("#eventName").val(data.data.event_name);
          }
        }
      } catch (err) {
        console.error("Fetch reminder failed:", err);
      }
    } else if(!event_id && ariaLabel === "Thêm lời nhắc") {
      $("#formReminder").removeAttr("data-id");
      $("#recipientName").val("");
      $(".event-list li input").prop("checked", false);
      $(".form-other-date").addClass("hidden");
      $("#eventName").val("");
      $("#dateInput").val("");
    }
  })
}

if($('#reminders').length) {
  createReminder();
  fetchReminders();
  fetchReminderDetail();
}