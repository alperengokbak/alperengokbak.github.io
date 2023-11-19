function toggleMenu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function displayError(message) {
  var errorContainer = document.getElementById("errorContainer");
  errorContainer.innerHTML += "<p>" + message + "</p>";

  setTimeout(function () {
    errorContainer.style.display = "none";
  }, 4000);
}

function validateForm() {
  // Validate email and other fields
  var email = document.getElementById("email").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    displayError("Please enter a valid email");
    return false;
  }

  // Validate Turkish phone number
  var phoneNumber = document.getElementById("phone").value;
  if (!/^(05\d{9})$/.test(phoneNumber)) {
    displayError("Please enter a valid Turkish phone number");
    return false;
  }

  // Check if departure and destination points are the same
  var departurePoint = document.getElementById("deparaturePoint").value;
  var destinationPoint = document.getElementById("destinationPoint").value;
  if (departurePoint === destinationPoint) {
    displayError("Departure and destination points cannot be the same");
    return false;
  }

  // Validate checkbox
  var agreeCheckbox = document.getElementsByName("agree")[0];
  if (!agreeCheckbox.checked) {
    displayError("Please agree to the Terms and Conditions");
    return false;
  }

  // Validate check-in and check-out dates
  var checkInDate = document.getElementById("checkIn").value;
  var checkOutDate = document.getElementById("checkOut").value;

  var checkInTimestamp = new Date(checkInDate).getTime();
  var checkOutTimestamp = new Date(checkOutDate).getTime();

  if (checkOutTimestamp < checkInTimestamp) {
    displayError("Check-out date cannot be earlier than check-in date");
    return false;
  }

  return true;
}
