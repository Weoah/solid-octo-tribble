const requestAjax = {
  get: function (url, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        data: (data),
      }).done(function (response) {
        resolve(response);
      });
    });
  },

  post: function (url, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
      }).done(function (response) {
        resolve(response);
      });
    });
  },
};

export default requestAjax;
