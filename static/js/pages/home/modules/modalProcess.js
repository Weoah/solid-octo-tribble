import modifyButton from "../../globalModules/modifyButton.js";

const modalProcess = {
  // Abre Modal Processo;
  preSetModal: function () {
    $("#modalProcess input").val("");
    $("#modalProcess input[type='checkbox']").prop("checked", false);
    $(".renderDateProcess").fadeOut(1);
    $(".errorInputs").fadeOut(1);
    modifyButton.defaultButton("#saveProcess", "Salvar");
    $("#numberProcess").mask("0000000-00.0000.0.00.0000");
  },

  // Pega dados do modal para envio;
  getData: function () {
    return new Promise((resolve, reject) => {
      var data = {};

      if ($("#numberProcess").val().trim() === "") {
        let message = "O Número do Processo deve estar preenchido!";
        errorInput("#numberProcess", message);
        return;
      }

      if (
        $("#disableTimerProcess").prop("checked") === true &&
        $("#dateProcess").val() === ""
      ) {
        let message =
          "O Campo deve estar preenchido ou desabilite o Prazo do Processo!";
        errorInput("#dateProcess", message);
        return;
      }

      data.name = $("#nameProcess").val();
      data.number = $("#numberProcess").val();
      data.time = 0;

      if ($("#disableTimerProcess").prop("checked") === true)
        data.time = $("#dateProcess").val();

      resolve(data);
    });
  },

  setData: function (data) {
    $("#codeProcess").val(data.id);
    $("#nameProcess").val(data.nome);
    $("#numberProcess").val(data.numero);
    if (Number(data.prazo) != 0) {
      $("#disableTimerProcess").prop("checked", true);
      $(".renderDateProcess").fadeIn();
      $("#dateProcess").val(data.prazo);
    }
  },

  successModal: function (response) {
    modifyButton.successButton("#saveProcess");

    setTimeout(() => {
      $("#modalProcess").modal("hide");
    }, 600);
  },

  errorModal: function (response) {
    modifyButton.errorButton("#saveProcess");

    setTimeout(() => {
      modifyButton.defaultButton("#saveProcess", "Salvar");
    }, 600);
  },
};

const errorInput = (className, message) => {
  $(".errorInputs").text(message);
  $(".errorInputs").fadeIn();
  modifyButton.errorButton("#saveProcess");

  setTimeout(() => {
    $(".errorInputs").fadeOut();
    modifyButton.defaultButton("#saveProcess", "Salvar");
  }, 2500);
};

export default modalProcess;
