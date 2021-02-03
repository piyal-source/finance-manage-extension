const amtSpent = document.getElementById("amount-spent");
const newAmt = document.getElementById("input-amt");
const totalLimit = document.getElementById("total-limit");
const rem = document.getElementById("remaining");

chrome.storage.sync.get(['spent', 'limit'], function(finance) {
    amtSpent.textContent = finance.spent;
    totalLimit.textContent = finance.limit;
    if(finance.limit) {
        rem.textContent = parseInt(finance.limit) - parseInt(finance.spent); 
    }
});

document.getElementById("btn-spend").addEventListener("click", () => {
    chrome.storage.sync.get(['spent', 'limit'], function(finance) {
        let total = 0;

        if(finance.spent) {
            total += parseInt(finance.spent);
        }

        if(newAmt.value) {
            total += parseInt(newAmt.value);
        }

        chrome.storage.sync.set({'spent': total}, function() {
            if(newAmt && total > finance.limit) {
                var notificationOptions = {
                    type: "basic",
                    iconUrl: "./icon-48.png",
                    title: "Limit exceeded!",
                    message: "You've spent more than your budget! It is time to start saving."
                };
                chrome.notifications.create('limitNotification', notificationOptions);
            }
        });

        amtSpent.textContent = total;
        if(finance.limit) {
            rem.textContent = parseInt(finance.limit) - total;
        }
       newAmt.value = '';
    });
});