const inputLimit = document.getElementById("input-limit");

chrome.storage.sync.get(['limit'], function(finance) {
    inputLimit.value = finance.limit;
})

document.getElementById("btn-reset-amt").addEventListener("click", () => {
    chrome.storage.sync.set({'spent': 0}, function() {
        var notificationOptions = {
            type: "basic",
            iconUrl: "./icon-48.png",
            title: "Amount reset successfully",
            message: "You've reset your expenses. So, you can have a fresh start!"
        };
        chrome.notifications.create("resetNotification", notificationOptions);
    });
});

document.getElementById("btn-save-limit").addEventListener("click", () => {
    if(inputLimit.value) {
        chrome.storage.sync.set({'limit': inputLimit.value}, function() {
            close();
        });
    }
});