const amtSpentElement = document.getElementById("amountSpent");
const newAmt = document.getElementById("input-amt");

chrome.storage.sync.get(['spent'], function(finance) {
    amtSpentElement.textContent = finance.spent;
});

document.getElementById("btn-spend").addEventListener("click", () => {
    chrome.storage.sync.get(['spent'], function(finance) {
        let total = 0;

        if(finance.spent) {
            total += parseInt(finance.spent);
        }

        if(newAmt.value) {
            total += parseInt(newAmt.value);
        }

        chrome.storage.sync.set({'spent': total});
        amtSpentElement.textContent = total;
        newAmt.value = '';
    });
});