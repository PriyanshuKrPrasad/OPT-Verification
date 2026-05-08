// ===============================
// DJANGO BACKEND BASE URL
// ===============================

const BASE_URL = "https://app.famunitehealthcare.com";


// ===============================
// REGISTER API
// ===============================

async function register() {

  const data = {
  first_name: document.getElementById("first_name").value,
  last_name: document.getElementById("last_name").value,
  dob: document.getElementById("DOB").value,
  gender: "M",
  role: "patient",
  email: document.getElementById("email").value,

  // ADD PHONE NUMBER
  phone_number: document.getElementById("phone").value,

  password: document.getElementById("password").value,
  confirm_password: document.getElementById("password").value
};
  try {

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();
    console.log("REGISTER RESPONSE :", result);

    if(response.ok && result.success){
    
      alert("Registration Successful");
    
    }else{
    
      console.log(result.errors);
    
      alert(JSON.stringify(result.errors));
    }

  } catch (error) {

    console.error("REGISTER ERROR :", error);

    alert("Registration Failed");
  }
}



// ===============================
// VERIFY OTP API
// ===============================

async function verifyOtp() {

  const data = {
    identifier: document.getElementById("otp_email").value,
    otp: document.getElementById("otp").value
  };

  try {

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/verify-otp/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log("OTP RESPONSE :", result);

    if(response.ok && result.success){

        alert("OTP Verified Successfully");
      
      }else{
      
        alert(JSON.stringify(result.errors || result.message));
      }

  } catch (error) {

    console.error("OTP ERROR :", error);

    alert("OTP Verification Failed");
  }
}



// ===============================
// LOGIN API
// ===============================

async function login() {

  const data = {
    identifier: document.getElementById("login_email").value,
    password: document.getElementById("login_password").value
  };

  try {

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log("LOGIN RESPONSE :", result);

    // Save token
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    alert("Login Successful");

  } catch (error) {

    console.error("LOGIN ERROR :", error);

    alert("Login Failed");
  }
}