chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'uploadScreenshot') {
    uploadToMinio(request.screenshot)
      .then(() => sendResponse({ success: true }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});
