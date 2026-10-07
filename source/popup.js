"use strict";
addButtonHandler("clear-browsing-data", async () => {
  await browser.browsingData.remove({}, { history: true, downloads: true, cache: true, formData: true });
  return { success: true };
});
addButtonHandler("clear-clipboard", async () => {
  await navigator.clipboard.writeText("");
  return { success: true };
});
function addButtonHandler(buttonId, callback) {
  const button = document.querySelector(`#${buttonId}`);
  button.dataset.title = button.textContent;
  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "Clearing...";
    let result;
    try {
      result = await callback();
    } catch (error) {
      console.error(error);
      result = { message: error.message };
    }
    if (result.message) button.textContent = result.message;
    else if (result.success) button.textContent = "Cleared!";
    else button.textContent = "Failed!";
    setTimeout(() => {
      button.textContent = button.dataset.title;
      button.disabled = false;
    }, 2e3);
  });
}
//# sourceMappingURL=popup.js.map
