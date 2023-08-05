"use strict";
addButtonHandler("clear-browsing-data", async () => {
  await chrome.browsingData.remove({}, { history: true, downloads: true, cache: true, formData: true });
  return { success: true };
});
addButtonHandler("clear-clipboard", async () => {
  await navigator.clipboard.writeText("");
  return { success: true };
});
addButtonHandler("clear-cookies", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab)
    return { message: "No active tab found!" };
  if (!tab.url)
    return { message: "No active tab URL found!" };
  const cookies = await chrome.cookies.getAll({ url: tab.url });
  if (cookies.length === 0)
    return { message: "No cookies found!" };
  await Promise.all(cookies.map((cookie) => chrome.cookies.remove({ url: `http${cookie.secure ? "s" : ""}://${cookie.domain}${cookie.path}`, name: cookie.name, storeId: cookie.storeId })));
  return { message: `Cleared ${cookies.length} cookies!` };
});
function addButtonHandler(buttonId, callback) {
  const button = document.querySelector(`#${buttonId}`);
  button.dataset.title = button.textContent;
  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "Clearing...";
    const result = await callback().catch((error) => {
      console.error(error);
      return { message: error.message };
    });
    if (result.message)
      button.textContent = result.message;
    else if (result.success)
      button.textContent = "Cleared!";
    else
      button.textContent = "Failed!";
    setTimeout(() => {
      button.textContent = button.dataset.title;
      button.disabled = false;
    }, 2e3);
  });
}
//# sourceMappingURL=popup.js.map
