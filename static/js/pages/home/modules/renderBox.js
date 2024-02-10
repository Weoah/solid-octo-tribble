import requestAjax from "../../globalModules/ajaxSend.js";

const renderBox = {
  renderAllBox: function () {
    this.countProcessos();
  },

  countProcessos: async function () {
    const response = await requestAjax.post("/processos/");
    const count = response.recordsFiltered;
    $("#openProcessos").text(count);
    $("#countProcessos").text(count);
  },
};

export default renderBox;
