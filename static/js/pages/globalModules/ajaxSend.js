const ajaxSend = (url, type = "GET", data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `ajax/${url}`,
      type: type,
      dataType: "json",
      data: data,
    }).done(function (response) {
      resolve(response);
    });
  });
};

export default ajaxSend;
