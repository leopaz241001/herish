async function getProfile() {
  try {
    const res = await fetch('https://realhome-be-dpc0.onrender.com/api/profile', {
      method: 'GET',
      credentials: "include",
    });
    
    if(res.ok) {
      const data = await res.json();
      $('.header .select-profile img').attr('src', data.user.avatar);
      $('.header .select-profile').removeAttr('style');
      $('.header .btn-login').hide();
    }
  } catch (err) {
    console.error(err);
  }
}

getProfile();