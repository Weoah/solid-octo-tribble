import AjaxSend from "../globalModules/ajaxSend.js";
import modifyButton from "../globalModules/modifyButton.js";
import loginStatus from "./modules/loginStatus.js";

// Click Event to Login
$("#login--request").on("click", async function (event) {
  modifyButton.addSpinner("#login--request");

  const login = $("#login--name").val();
  const password = $("#login--password").val();

  //   const response = await AjaxSend("url", "POST", { login, password });

  // Aplica timer de 800 milesegundos para simular a requisição.
  setTimeout(() => {
    if (true) {
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
