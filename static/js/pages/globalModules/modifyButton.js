const modifyButton = {
  addSpinner: function (classname, small = true) {
    const button = $(classname);

    button.attr("disabled", true);
    button.html(`
            <div class="spinner-border ${
            small ? "spinner-border-sm" : ""
            } " role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `);
  },
};

export default modifyButton;
