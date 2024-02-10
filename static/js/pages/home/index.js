import modifyButton from "../globalModules/modifyButton.js";
import modalProcess from "./modules/modalProcess.js";
import ajaxSend from "../globalModules/ajaxSend.js";
import renderTable from "./modules/renderTable.js";

var tableProcesso;

const typeRoutes = {
  add: "/processos/create",
  edit: "/processos/update",
  delete: "/processos/delete",
  logout: "/login/logout",
};

$("#userDropdown").on("click", function () {
  if ($(".teste").hasClass("active")) {
    $(".teste").removeClass("active").fadeOut();
  } else {
    $(".teste").addClass("active").fadeIn();
  }
});

// Abre Modal Processo;
$(document).on("click", "#addNewProcess, .edit_table", async function () {
  const id = $(this).attr("id");

  $(".spinnerModal").css("display", "none");

  $("#modalProcess").modal("show");
  modalProcess.preSetModal();

  if (id === "addNewProcess") {
    $(".changeTitleModal").text("Adicionar Processo");
    $("#saveProcess").attr("data-type", "add");
  } else {
    $(".spinnerModal").fadeIn(1);
    $(".changeTitleModal").text("Editar Processo");
    $("#saveProcess").attr("data-type", "edit");
    const data = {
      processo_id: id,
    };
    const response = await ajaxSend.get("/processos/get", data);

    if (response.status) {
      const data = response.data;
      modalProcess.setData(data);
      $(".spinnerModal").fadeOut();
    }
  }
});

// Fecha Modal Processo;
$(".closeModalProcess").on("click", function () {
  $("#modalProcess").modal("hide");
});

$("#saveProcess").on("click", async function () {
  const type = $(this).attr("data-type");
  modifyButton.addSpinner("#saveProcess");

  var data = await modalProcess.getData();

  type === "edit" && (data.processo_id = $("#codeProcess").val());
  const url = typeRoutes[type];

  const response = await ajaxSend.post(url, data);

  setTimeout(() => {
    response.status
      ? modalProcess.successModal(response)
      : modalProcess.errorModal(response);

    tableProcesso.ajax.reload();
  }, 1000);
});

// Abre Url TJ.
$("#tableMain").on("click", ".viewProcess", function () {
  const url = $(this).attr("id");
  window.open(url, "_blank");
});

// Mostra Modal Deletar.
$("#tableMain").on("click", ".remove_table", async function () {
  $("#modalDelete").modal("show");
  $("#error_delete").hide();
  const id = $(this).attr("id");
  $(".delete_confirm").attr("data-id", id);
});

// Fecha Modal Deletar.
$(".close_modal").on("click", function () {
  $("#modalDelete").modal("hide");
});

// Deleta Processo - Confirmado.
$(".delete_confirm").on("click", async function () {
  const id = $(this).attr("data-id");
  console.log(id);
  const data = {
    processo_id: id,
  };

  modifyButton.addSpinner(".delete_confirm");

  setTimeout(async () => {
    const response = await ajaxSend.get(typeRoutes["delete"], data);
    if (response.status) {
      modifyButton.successButton(".delete_confirm");
      setTimeout(() => {
        $("#modalDelete").modal("hide");
        tableProcesso.ajax.reload();
      }, 600);
    } else {
      $("#error_delete").fadeIn();
      $("#error_delete").text(
        "Um erro foi encontrado para deletar, tente novamente. Se necessário contate um Administrador."
      );
    }
  }, 800);
});

// Mostra ou não input de data
$("#disableTimerProcess").on("change", function () {
  if ($(this).is(":checked")) {
    $(".renderDateProcess").fadeIn();
  } else {
    $(".renderDateProcess").fadeOut();
  }
});

$(".quitUser").on("click", function () {
  ajaxSend.get(typeRoutes["logout"]);

  setTimeout(() => {
    window.location.reload();
  }, 200);
});

// Set Default Page Home
$(function () {
  tableProcesso = renderTable();
  $("body").tooltip({ selector: "[data-toggle=tooltip]" });
});
