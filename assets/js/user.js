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
      if(data.user.avatar) {
        $('.header .avatar').attr('src', data.user.avatar).on('error', function () {
          $(this).attr('src', './assets/images/avatar/avatar.jpeg');
        });
      }
      $('.header .select-profile').removeAttr('style');
      $('.header .btn-login').hide();

      // profile page
      if(data.user.avatar) {
        $('.avatar-block').removeAttr('style');
        $('.avatar-block .user-avatar').attr('src', data.user.avatar).on('error', function () {
          $(this).attr('src', './assets/images/avatar/avatar.jpeg');
        });
        $('.avatar-noimage').hide();
      } else {
        $('.avatar-noimage span').text(data.user.name.trim().charAt(0));
      }
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

      // show recent product
      if($('.recent-product').length) {
        $('.recent-product').show();
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function updateProfile() {
  const formUpdate = $('#formUpdateProfile');
  const formChangePassword = $('#formChangePassword');
  const inputAvatar = $('#avatar');
  const imgPreview = $('#formUpdateProfile .user-avatar');
  const btnDeleteAvatar = $('.btn-delete-avatar');

  let avatarFile = null;

  // Preview ảnh khi chọn
  inputAvatar.on('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgPreview.attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
      avatarFile = file;
    }
  });

  // Xóa avatar (set về mặc định)
  btnDeleteAvatar.on('click', function (e) {
    e.preventDefault();
    imgPreview.attr('src', './assets/images/avatar/avatar.jpeg');
    inputAvatar.val('');
    avatarFile = null;
  });

  // Gửi form cập nhật user
  formUpdate.on('submit', async function (e) {
    e.preventDefault();

    const full_name = document.getElementById('name').value;
    const dateInput = document.getElementById('dateInput').value;
    const [day, month, year] = dateInput.split("/");
    const birth_date = `${year}-${month}-${day}`;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // const formData = new FormData();
    // formData.append('full_name', $('#name').val());
    
    // const dateInput = $('#dateInput').val();
    // const [day, month, year] = dateInput.split("/");
    // const birth_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    // formData.append('birth_date', birth_date);

    // formData.append('email', $('#email').val());
    // formData.append('phone', $('#phone').val());

    // if (avatarFile) {
    //   formData.append('avatar', avatarFile);
    // }

    try {
      const access_token = localStorage.getItem('access_token');
      const res = await fetch('http://160.250.5.249:5001/api/user/update-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ full_name, birth_date, email, phone }),
        // body: formData,
        // credentials: 'include'
      });

      if (res.ok) {
        $('.toastify.success').eq(0).addClass('active');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        $('.toastify.error').eq(0).addClass('active');
      }
    } catch (err) {
      console.error(err);
      $('.toastify.error').eq(0).addClass('active');
    }
  });

  // Gửi form cập nhật user
  formChangePassword.on('submit', async function (e) {
    e.preventDefault();

    const old_password = $('#currentPassword').val();
    const new_password = $('#newPassword').val();
    const confirmPassword = $('#confirmPassword').val();

    try {
      const access_token = localStorage.getItem('access_token');
      const res = await fetch('http://160.250.5.249:5001/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ old_password, new_password }),
        // credentials: 'include'
      });

      if (res.ok) {
        $('.toastify.success').eq(1).addClass('active');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        $('.toastify.error').eq(1).addClass('active');
      }
    } catch (err) {
      console.error(err);
      $('.toastify.error').eq(1).addClass('active');
    }
  });
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
updateProfile();
logout();