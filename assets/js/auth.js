const register = function () {
  const formInfo = document.querySelector('#formInfo');
  
  formInfo.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const full_name = $('#name').val();
    const dateInput = $('#dateInput').val();
    const phone = $('#phone').val();
    const [day, month, year] = dateInput.split("/");
    const birth_date = `${year}-${month}-${day}`;
    const email = $('#email').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const age = Number($('#age').val());
  
    if(password !== confirmPassword) {
      $(".form-info .form-control-repass").addClass("error");
      $(".form-info .btn-control").addClass("disabled");
    } else {
      try {
        const res = await fetch('https://herish.id.vn/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name, birth_date, email, phone, age, password }),
          // credentials: "include", // gửi và nhận cookie
        });
        const data = await res.json();
        
        if(res.ok) {
          alert('Đăng ký thành công!');
          window.location.href = 'login.html';
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  });
}

const login = function () {
  const form = document.querySelector('#formLogin');
  const msg = document.querySelector('#formMessage');
  const formControl = $('.form-control');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const identifier = $('#identifier').val();
    const password = $('#password').val();
  
    try {
      const res = await fetch('https://herish.id.vn/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
        // credentials: "include", // gửi và nhận cookie
      });
      const data = await res.json();
      localStorage.setItem('access_token', data.data.access_token);
  
      if(res.ok) {
        alert('Đăng nhập thành công!');
        window.location.href = '/';
      } else {
        formControl.addClass('error');
        msg.classList.remove('hidden');
      }
    } catch (err) {
      formControl.addClass('error');
      msg.classList.remove('hidden');
    }
  });
}

const sendEmail = async function () {
  const email = $('#email').val() || localStorage.getItem('email');
  
  try {
    const res = await fetch('https://herish.id.vn/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      // credentials: 'include', // gửi và nhận cookie
    });
    const data = await res.json();
    
    if(res.ok) {
      localStorage.setItem('email', email);
      $('.toastify').removeClass('active').siblings('.success').addClass('active');
      $('.toastify.success .toastify-title').text(data.message);
      const after15 = new Date(new Date().getTime() + 15 * 60 * 1000);
      const hours = String(after15.getHours()).padStart(2, '0');
      const minutes = String(after15.getMinutes()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;
      $('#formResetPassword .text-guide .time').text(timeStr);
      setTimeout(() => {
        $('#formEmail').hide();
        $('#formResetPassword').show();
      }, 1000);
    } else {
      $('.toastify').removeClass('active').siblings('.error').addClass('active');
      $('.toastify.error .toastify-title').text(data.message);
    }
  } catch (err) {
    console.error(err);
  }
}

const resetPassword = async function () {
  const formResetPassword = document.querySelector('#formResetPassword');
  
  formResetPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    const code = $('#code').val();
    const new_password = $('#password').val();

    try {
      const res = await fetch('https://herish.id.vn/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, new_password }),
        // credentials: 'include', // gửi và nhận cookie
      });
      const data = await res.json();
      
      if(res.ok) {
        localStorage.removeItem('email');
        $(".form-control-input").hide().siblings(".form-success").removeAttr("style");
        $(".text-heading").html("Khôi phục mật khẩu");
      } else {
        $('.toastify').removeClass('active').siblings('.error').addClass('active');
        $('.toastify.error .toastify-title').text(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  });
}

if($('#register').length) {
  register();
}

if($('#login').length) {
  login();
}

if($('#forgot-password').length) {  
  $('#formEmail').on('submit', async (e) => {
    e.preventDefault();
    $('.btn-control-email').prop('disabled', true)

    await sendEmail();

    setTimeout(() => {
      $('.btn-control-email').prop('disabled', false);
    }, 2000);
  });

  $('.btn-resend-code').on('click', async () => {
    $('.btn-resend-code').prop('disabled', true);
    await sendEmail();

    setTimeout(() => {
      $('.btn-resend-code').prop('disabled', false);
    }, 2000);
  });

  resetPassword();
}

