const BASE_URL =
  "https://app.famunitehealthcare.com";



// REGISTER

async function register(){

  const data = {

    first_name:
      document.getElementById("first_name").value,

    last_name:
      document.getElementById("last_name").value,

    dob:
      document.getElementById("DOB").value,

    gender:"M",

    role:"patient",

    email:
      document.getElementById("email").value,

    phone_number:
      document.getElementById("phone").value,

    password:
      document.getElementById("password").value,

    confirm_password:
      document.getElementById("password").value

  };

  try{

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/register/`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          
        },

        body:JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    if(response.ok && result.success){

      alert("Registration Successful");

      document.getElementById(
        "register-section"
      ).style.display = "none";

      document.getElementById(
        "otp-section"
      ).style.display = "block";

      document.getElementById(
        "otp_email"
      ).value = data.email;

    }else{

      alert(
        JSON.stringify(
          result.errors || result.message
        )
      );

    }

  }catch(error){

    console.log(error);

  }

}



// VERIFY OTP

async function verifyOtp(){

  const data = {

    identifier:
      document.getElementById("otp_email").value,

    otp:
      document.getElementById("otp").value

  };

  try{

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/verify-otp/`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          
        },

        body:JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    if(response.ok && result.success){

      alert("OTP Verified");

      document.getElementById(
        "otp-section"
      ).style.display = "none";

      document.getElementById(
        "login-section"
      ).style.display = "block";

      document.getElementById(
        "login_email"
      ).value = data.identifier;

    }else{

      alert(
        JSON.stringify(
          result.errors || result.message
        )
      );

    }

  }catch(error){

    console.log(error);

  }

}



// RESEND OTP

async function resendOtp(){

  const data = {

    identifier:
      document.getElementById("otp_email").value

  };

  try{

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/resend-otp/`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          
        },

        body:JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    alert(result.message);

  }catch(error){

    console.log(error);

  }

}



// LOGIN

async function login(){

  const data = {

    identifier:
      document.getElementById("login_email").value,

    password:
      document.getElementById("login_password").value

  };

  try{

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/login/`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          
        },

        body:JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    if(response.ok && result.success){

      localStorage.setItem(
        "token",
        result.data.access
      );

      const user = result.data.user;

      document.getElementById(
        "login-section"
      ).style.display = "none";

      localStorage.setItem(
        "token",
        result.data.access
      );
      
      window.location.href =
        "dashboard.html";

      document.getElementById(
        "user_first_name"
      ).innerText = user.first_name || "-";

      document.getElementById(
        "user_last_name"
      ).innerText = user.last_name || "-";

      document.getElementById(
        "user_email"
      ).innerText = user.email || "-";

      document.getElementById(
        "user_phone"
      ).innerText = user.phone_number || "-";

      document.getElementById(
        "user_dob"
      ).innerText = user.dob || "-";

      document.getElementById(
        "user_role"
      ).innerText = user.role || "-";

      alert("Login Successful");

    }else{

      alert(
        JSON.stringify(
          result.errors || result.message
        )
      );

    }

  }catch(error){

    console.log(error);

  }

}






// SHOW FORGOT PASSWORD

function showForgotPassword(){

  document.getElementById(
    "login-section"
  ).style.display = "none";

  document.getElementById(
    "forgot-section"
  ).style.display = "block";

}



// FORGOT PASSWORD

async function forgotPassword(){

  const data = {

    email:
      document.getElementById("forgot_email").value

  };

  try{

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/forgot-password/`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          
        },

        body:JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    if(response.ok){

      alert("OTP Sent");

      document.getElementById(
        "forgot-section"
      ).style.display = "none";

      document.getElementById(
        "reset-section"
      ).style.display = "block";

      document.getElementById(
        "reset_email"
      ).value = data.email;

    }

  }catch(error){

    console.log(error);

  }

}



// RESET PASSWORD

async function resetPassword(){

  const data = {

    email:
      document.getElementById("reset_email").value,

    otp:
      document.getElementById("reset_otp").value,

    new_password:
      document.getElementById("new_password").value,

    confirm_password:
      document.getElementById(
        "confirm_new_password"
      ).value

  };

  try{

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/reset-password/`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          
        },

        body:JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    if(response.ok){

      alert("Password Reset Successful");

      document.getElementById(
        "reset-section"
      ).style.display = "none";

      document.getElementById(
        "login-section"
      ).style.display = "block";

    }

  }catch(error){

    console.log(error);

  }

}



// LOGOUT

function logout(){

  localStorage.removeItem("token");

  location.reload();

}