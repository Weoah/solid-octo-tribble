import modifyButton from "../globalModules/modifyButton.js";
import loginStatus from "./modules/loginStatus.js";
import ajaxSend from "../globalModules/ajaxSend.js";

// Click Event to Login
$("#login--request").on("click", async function (event) {
  modifyButton.addSpinner("#login--request");

  const login = $("#login--name").val();
  const password = $("#login--password").val();

  const data = {
    user: login,
    pass: password,
  };

  const response = await ajaxSend.post("/login", data);

  console.log(response);

  // Aplica timer de 800 milesegundos para simular a requisição.
  setTimeout(() => {
    if (response.status) {
      console.log("Success");
      loginStatus.successLogin();
    } else {
      loginStatus.errorLogin();
    }
  }, 800);
});

// Set Default Page Login
$(function () {
  loginStatus.preSetPageLogin();
});
