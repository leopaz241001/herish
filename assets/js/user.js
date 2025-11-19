const btnLogout = $('.btn-logout');

async function getProfile() {
  try {
    const access_token = localStorage.getItem('access_token');
    const res = await fetch('https://herish.id.vn/api/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });

    const resAvt = await fetch('https://herish.id.vn/api/user/avatar', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });
    
    if(res.ok) {
      const data = await res.json();

      // avatar
      if(resAvt.ok) {
        const dataAvt = await resAvt.json();
        
        // header
        if(dataAvt.data.avatar_url) {
          $('.header .avatar').attr('src', dataAvt.data.avatar_url).on('error', function () {
            $(this).attr('src', './assets/images/avatar/avatar.jpeg');
          });
        }

        // profile page
        if(dataAvt.data.avatar_url) {
          $('.avatar-block').removeAttr('style');
          $('.avatar-block .user-avatar').attr('src', dataAvt.data.avatar_url).on('error', function () {
            $(this).attr('src', './assets/images/avatar/avatar.jpeg');
          });
          $('.avatar-noimage').hide();
        } else {
          $('.avatar-noimage span').text(data.data.full_name.trim().charAt(0));
        }
      }

      $('.header .select-profile').removeAttr('style');
      $('.header .btn-login').hide();
      if(data.data.full_name) {
        $('.user-name').text(data.data.full_name);
        $('.input-user-name').val(data.data.full_name);
      }
      if(data.data.birth_date) {
        const date = new Date(data.data.birth_date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        $('.user-birthday').text(date);
        $('.input-user-birthday').val(date);
      }
      if(data.data.email) {
        $('.user-email').text(data.data.email);
        $('.input-user-email').val(data.data.email);
      }
      if(data.data.phone) {
        $('.user-phone').text(data.data.phone);
        $('.input-user-phone').val(data.data.phone);
      }

      // show recent product
      if($('.recent-product').length) {
        $('.recent-product').show();
      }
    } else {
      localStorage.getItem('access_token');
      // show recent product
      if($('.recent-product').length) {
        $('.recent-product').hide();
      }
    }
  } catch (err) {
    console.log(err);
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

    const full_name = $('#name').val();
    const dateInput = $('#dateInput').val();
    const [day, month, year] = dateInput.split("/");
    const birth_date = `${year}-${month}-${day}`;
    const email = $('#email').val();
    const phone = $('#phone').val();

    try {
      const access_token = localStorage.getItem('access_token');
      const res = await fetch('https://herish.id.vn/api/user/update-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ full_name, birth_date, email, phone }),
      });
      
      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);

        await fetch('https://herish.id.vn/api/user/avatar', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
          body: formData,
        });
      }

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
    const confirm_password = $('#confirmPassword').val();

    if(new_password !== confirm_password) {
      $('.toastify.error').eq(1).addClass('active');
    } else {
      try {
        const access_token = localStorage.getItem('access_token');
        const res = await fetch('https://herish.id.vn/api/auth/change-password', {
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
    }
  });
}

function logout() {
  btnLogout.on('click', async function (e) {
    e.preventDefault();
    localStorage.removeItem("access_token");
    window.location.href = 'login.html';
  })
}

getProfile();
updateProfile();
logout();