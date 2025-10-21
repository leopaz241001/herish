const btnLogout = $('.btn-logout');

async function getProfile() {
  try {
    const res = await fetch('https://realhome-be-dpc0.onrender.com/api/profile', {
      method: 'GET',
      credentials: "include",
    });
    
    if(res.ok) {
      const data = await res.json();
      // header
      $('.header .avatar').attr('src', data.user.avatar);
      $('.header .select-profile').removeAttr('style');
      $('.header .btn-login').hide();

      // profile page
      $('.avatar-block').removeAttr('style');
      $('.avatar-block .user-avatar').attr('src', data.user.avatar);
      $('.avatar-noimage').hide();
      if(data.user.name) {
        $('.user-name').text(data.user.name);
        $('.input-user-name').val(data.user.name);
      }
      if(data.user.birthday) {
        $('.user-birthday').text(data.user.birthday);
        $('.input-user-birthday').val(data.user.birthday);
      }
      if(data.user.email) {
        $('.user-email').text(data.user.email);
        $('.input-user-email').val(data.user.email);
      }
      if(data.user.phone) {
        $('.user-phone').text(data.user.phone);
        $('.input-user-phone').val(data.user.phone);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function logout() {
  btnLogout.on('click', async function (e) {
    e.preventDefault();

    try {
      const res = await fetch('https://realhome-be-dpc0.onrender.com/api/logout', {
        method: 'POST',
        credentials: "include",
      });
      
      if(res.ok) {
        $('.header .select-profile').hide();
        $('.header .btn-login').removeAttr('style');
        window.location.href = 'login.html';
      }
    } catch (err) {
      console.error(err);
    }
  })
}

getProfile();
logout();