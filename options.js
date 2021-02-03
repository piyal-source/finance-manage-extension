const inputLimit = document.getElementById("input-limit");

chrome.storage.sync.get(['limit'], function(finance) {
    inputLimit.value = finance.limit;
})

document.getElementById("btn-reset-amt").addEventListener("click", () => {
    chrome.storage.sync.set({'spent': 0});
});

document.getElementById("btn-save-limit").addEventListener("click", () => {
    if(inputLimit.value) {
        chrome.storage.sync.set({'limit': inputLimit.value}, function() {
            close();
        });
    }
});