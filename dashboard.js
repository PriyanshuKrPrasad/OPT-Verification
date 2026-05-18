const BASE_URL =
  "https://app.famunitehealthcare.com";



function showOverview(){

  document.getElementById(
    "overview-section"
  ).style.display = "block";

  document.getElementById(
    "profile-section"
  ).style.display = "none";

}



async function showProfile(){

  document.getElementById(
    "overview-section"
  ).style.display = "none";

  document.getElementById(
    "profile-section"
  ).style.display = "block";



  const token =
    localStorage.getItem("token");



  try{

    const response = await fetch(
      `${BASE_URL}/api/v1/accounts/profile`,
      {

        method:"GET",

        headers:{
          "Authorization":
            `Bearer ${token}`
        }

      }
    );



    const result =
      await response.json();

    console.log(result);



    const user =
      result.data;



    document.getElementById(
      "profile_name"
    ).innerText =
      user.first_name +
      " " +
      user.last_name;



    document.getElementById(
      "profile_email"
    ).innerText =
      user.email;



    document.getElementById(
      "first_name"
    ).innerText =
      user.first_name || "-";



    document.getElementById(
      "last_name"
    ).innerText =
      user.last_name || "-";



    document.getElementById(
      "email"
    ).innerText =
      user.email || "-";



    document.getElementById(
      "phone"
    ).innerText =
      user.phone_number || "-";



    document.getElementById(
      "dob"
    ).innerText =
      user.dob || "-";



    document.getElementById(
      "role"
    ).innerText =
      user.role || "-";



  }catch(error){

    console.log(error);

  }

}



function logout(){

  localStorage.removeItem("token");

  window.location.href =
    "index.html";

}   