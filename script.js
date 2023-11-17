function toggleMenu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
function validateForm() {
  // Validate email and other fields
  var email = document.getElementById("email").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email");
    return false;
  }

  // Validate Turkish phone number
  var phoneNumber = document.getElementById("phone").value;
  if (!/^(05\d{9})$/.test(phoneNumber)) {
    alert("Please enter a valid Turkish phone number");
    return false;
  }
  return true;
}
