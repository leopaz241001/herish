const form = document.querySelector('#formLogin');
const msg = document.querySelector('#formMessage');
const formControl = $('.form-control');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://realhome-be-dpc0.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: "include", // gửi và nhận cookie
    });

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
