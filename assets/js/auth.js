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
        const res = await fetch('http://160.250.5.249:5001/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name, birth_date, email, phone, age, password }),
          // credentials: "include", // gửi và nhận cookie
        });
        const data = await res.json();
        console.log(data);
        
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
      const res = await fetch('http://160.250.5.249:5001/api/auth/login', {
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

if($('#register').length) {
  register();
}

if($('#login').length) {
  login();
}

