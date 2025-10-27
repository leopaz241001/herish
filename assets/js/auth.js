const register = function () {
  const formPhone = document.querySelector('#formPhone');
  const formVerify = document.querySelector('#formVerify');
  const formInfo = document.querySelector('#formInfo');
  const phoneIpt = document.querySelector('#phone');
  const msg = document.querySelector('#formMessage');
  const formControl = $('.form-control');
  
  formInfo.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const full_name = document.getElementById('name').value;
    const dateInput = document.getElementById('dateInput').value;
    const [day, month, year] = dateInput.split("/");
    const birth_date = `${year}-${month}-${day}`;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const age = Number(document.getElementById('age').value);
  
    try {
      const res = await fetch('http://160.250.5.249:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, birth_date, email, phone, username, age, password }),
        // credentials: "include", // gửi và nhận cookie
      });
      const data = await res.json();
  
      if(res.ok) {
        alert('Đăng ký thành công!');
        window.location.href = 'login.html';
      }
    } catch (err) {
      console.error(err);
    }
  });
}

const login = function () {
  const form = document.querySelector('#formLogin');
  const msg = document.querySelector('#formMessage');
  const formControl = $('.form-control');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://160.250.5.249:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
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

