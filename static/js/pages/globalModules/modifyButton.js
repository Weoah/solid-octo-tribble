const modifyButton = {
  // Add spinner to button
  addSpinner: function (classname, small = true) {
    const button = $(classname);

    button.attr("disabled", true);
    button.html(`
            <div class="spinner-border margin-3px-spinner ${
              small ? "spinner-border-sm" : ""
            } " role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `);
  },

  // Remove spinner from button and add Text Default.
  defaultButton: function (classname, text = "Login") {
    const button = $(classname);

    button.attr("disabled", false);
    button.html(text);
  },

  // Add Icon Success Button
  successButton: function (className) {
    const button = $(className);
    button.attr("disabled", true);
    button.html(`
      <i class="fa-solid fa-check font-25"></i>
    `);
  },

  // Add Icon Error Button
  errorButton: function (className) {
    const button = $(className);
    button.attr("disabled", true);
    button.html(`
      <i class="fa-solid fa-x font-20"></i>
    `);
  },
};

export default modifyButton;
