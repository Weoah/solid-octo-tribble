import AjaxSend from "../globalModules/ajaxSend.js";
import modifyButton from "../globalModules/modifyButton.js";

$("#login--request").on("click", async function (event) {
  event.preventDefault();
  modifyButton.addSpinner("#login--request");
  const login = $("#login--name").val();
  const password = $("#login--password").val();
  console.log(login, password);
//   const response = await AjaxSend("url", "POST", { login, password });
});
