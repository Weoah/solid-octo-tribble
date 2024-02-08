import modifyButton from "../../globalModules/modifyButton.js";

const loginStatus = {
  // Set Default Page Login
  preSetPageLogin: function () {
    $("#sendLogin input").val("");
    modifyButton.defaultButton("#login--request", "Login");
    $(".messageError").addClass("d-none");
  },

  // Set Success Login
  successLogin: function (response) {
    console.log(response);
    console.log("Success Login");

    modifyButton.successButton("#login--request");

    setTimeout(() => {
      window.location.href = "/index";
      setTimeout(() => {
        this.preSetPageLogin();
      }, 1);
    }, 800);
  },

  // Set Error Login
  errorLogin: function () {
    const $errorElement = $(".messageError");

    $errorElement.removeClass("d-none").hide().fadeIn();

    modifyButton.errorButton("#login--request");
    setTimeout(() => {
      $errorElement.fadeOut("slow", function () {
        $errorElement.addClass("d-none");
      });
      modifyButton.defaultButton("#login--request", "Login");
    }, 2500);
  },
};

export default loginStatus;
