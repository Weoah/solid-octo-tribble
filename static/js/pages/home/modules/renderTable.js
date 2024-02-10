const columnsTable = [
  {
    data: "nome",
    title: "Nome do Processo",
    name: "Nome do Processo",
    render: function (data, type, row, meta) {
      return data;
    },
  },
  {
    data: "numero",
    title: "Número do Processo",
    name: "Número do Processo",
    render: function (data, type, row, meta) {
      return data;
    },
  },
  {
    data: "prazo",
    title: "Prazo do Processo",
    name: "Prazo do Processo",
    render: function (data, type, row, meta) {
      if (data == "0") return "Sem prazo";

      return formatDate(data);
    },
  },
  {
    width: "10%",
    className: "acoes_box",
    orderable: false,
    data: "id",
    title: "Ações",
    name: "Ações",
    render: function (data, type, row, meta) {
      const url = row.url;
      return `
                <span style="display: flex">
                    <i class="far fa-edit mx-1 p-2 edit_table cursorClick" id="${data}" data-toggle="tooltip" data-placement="top" title="Editar"></i> 
                    <i class="fa-solid fa-eye p-2 mx-1 viewProcess cursorClick" id="${url}" data-toggle="tooltip" data-placement="top" title="Visualizar Processo"></i>
                    <i class="fas fa-trash-alt p-2 mx-1 remove_table cursorClick" id="${data}" data-toggle="tooltip" data-placement="top" title="Deletar"></i>
                </span>
                `;
    },
  },
];

const renderTable = (name) => {
  // begin first table
  const table = $("#tableMain").DataTable({
    destroy: true,
    responsive: true,
    processing: true,
    serverSide: true,
    paging: true,

    language: {
      decimal: "",
      emptyTable: "Nenhum registro encontrado",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      infoEmpty: "Showing 0 to 0 of 0 entries",
      infoFiltered: "(filtered from _MAX_ total entries)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Show _MENU_ entries",
      loadingRecords: "Carregando...",
      processing: "Processando...",
      zeroRecords: "Nenhum registro encontrado",
      paginate: {
        first: "Primeiro",
        last: "Último",
        next: ">",
        previous: "<",
      },
    },
    ajax: {
      url: `/processos/`,
      type: "POST",
      data: {
        name: name,
      },
    },
    createdRow: function (row, data, index) {
      var color = row._DT_RowIndex;

      if (color % 2 == 0) {
        $(row).addClass("bg-adjust");
      }
    },

    dom: "tp",
    columns: columnsTable,
    initComplete: function (settings, json) {
      $("#tableMain").fadeIn();
      $("#tableMain_wrapper").css("width", "100%");
      $("#tableMain_wrapper").addClass("my-4");
      $(".adjust-margin .dtr-title").addClass("mx-5");
      $(".loading-table").fadeOut(1);
    },
    fnPreDrawCallback: function () {
      $(".loading-table").fadeIn();
    },
    drawCallback: function () {
      $(".loading-table").fadeOut(1);
    },
  });

  return table;
};

const formatDate = (data) => {
  var dataFormatada = data.split("-").reverse().join("/");
  return dataFormatada;
};

export default renderTable;
