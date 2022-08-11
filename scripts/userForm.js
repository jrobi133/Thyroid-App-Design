// add text value to the password field
function addValueToPassword(button) {
  var password = $("#passcode").val();
  if (button == "bksp") {
    $("#passcode").val(password.substring(0, password.length - 1));
  } else {
    $("#passcode").val(password.concat(button));
  }
}

// enter password to continue
function enterPassword() {
  var password = getPassword();
  if (document.getElementById("passcode").value == password) {
    if (localStorage.getItem("password") == null) {
      $("#btnEnter").attr("href", "#pageThree").button();
    } else {
      $("#btnEnter").attr("href", "#pageThree").button();
    }
  }
}

// get password from local storage
function getPassword() {
  if (typeof Storage == "undefined") {
    alert("Sorry, your browser does not support web storage...");
  } else if (localStorage.getItem("password") !== null) {
    return JSON.parse(localStorage.getItem("password")).NewPassword;
  } else {
    return "2345";
  }
}

function submitUserForm() {
  saveUserForm();
  return true;
}
// save password to local storage
function saveUserForm() {
  var password = $("#passcode").val();
  var user = {
    NewPassword: $("#editPasscode").val(),
  };
  localStorage.setItem("password", JSON.stringify(user));
}

// check for info in local storage and set form fields
function checkUserForm() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate =
    year + "/" + month + "/" + (("" + date).length < 2 ? "0" : "") + date;
  if (
    $("#txtBoilerID").val() != "" &&
    $("#purchaseDate").val() != "" &&
    $("#purchaseDate").val() <= currentDate &&
    $("#slcBoilerRange option:selected").val() != "Select Boiler Range"
  ) {
    return true;
  } else {
    return false;
  }
}

// get boiler info from local storage
function getBoilerInfo() {
  if (typeof Storage == "undefined") {
    alert("Sorry, your browser does not support web storage...");
  } else if (localStorage.getItem("user") !== null) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return null;
  }
}

// save user form info to local storage
function saveBoilerInfo() {
  if (checkUserForm()) {
    var boiler = {
      //   NewPassword: $("#editPasscode").val(),
      BoilerID: $("#txtBoilerID").val(),
      PurchaseDate: $("#purchaseDate").val(),
      BoilerRange: $("#slcBoilerRange option:selected").val(),
    };
    try {
      localStorage.setItem("boiler", JSON.stringify(boiler));
      alert("Boiler form saved");
      $.mobile.changePage("#pageThree");
    } catch (e) {
      if (window.navigator.vender === "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Local Storage Quota Exceeded");
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Local Storage limit exceeds");
      }
      console.log(e);
    }
  } else {
    alert("Please fill in all fields");
  }
}

function submitTempPress() {
  saveTempPress();
  return true;
}
// save data temperature and pressure to local storage
function saveTempPress() {
  var tempPress = {
    Temperature: $("#txtTemp").val(),
    Pressure: $("#txtPressure").val(),
  };
  try {
    localStorage.setItem("tempPress", JSON.stringify(tempPress));
    alert("Temperature and Pressure saved");
    $.mobile.changePage("#pageThree");
  } catch (e) {
    if (window.navigator.vender === "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Local Storage Quota Exceeded");
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Local Storage limit exceeds");
    }
    console.log(e);
  }
}

function showBoilerInfo() {
  // get showBoilerInfo id and display boiler info
  var boiler = JSON.parse(localStorage.getItem("boiler"));
  if (boiler != null) {
    $("#showBoilerInfo").empty();
    $("#txtBoilerID").val(boiler.BoilerID);
    $("#purchaseDate").val(boiler.PurchaseDate);
    $("#slcBoilerRange").val(boiler.BoilerRange);
  }
  // display info from local storage if it exists

  $("#showBoilerInfo").append(
    "<p>Boiler ID: " +
      boiler.BoilerID +
      "</p><p>Purchase Date: " +
      boiler.PurchaseDate +
      "</p><p>Boiler Range: " +
      boiler.BoilerRange +
      "</p>"
  );
}

// when pageTwo is loaded, get boiler info from local storage and display it
$(document).on("pageshow", "#pageTwo", function () {
  if ($(".ui-page-active").attr("id") === "pageTwo") {
    showBoilerInfo();
  } else if ($(".ui-page-active").attr("id") === "body") {
    $("#showBoilerInfo").empty();
  }
});
