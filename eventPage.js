var contextMenuItem = {
    "id": "spendMoney",
    "title": "Spend money",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function intAmount(selectedAmt) {
    let spendAmt = "";
    for (let i of selectedAmt) {
        if(isNaN(i)) {
            return 0;
        }
        spendAmt += i;
    }
    return parseFloat(spendAmt);
}

chrome.contextMenus.onClicked.addListener(function(clickedData) {
    if (clickedData.menuItemId == "spendMoney" && clickedData.selectionText) {
        let spendAmt = intAmount(clickedData.selectionText.split(","));

        if (spendAmt > 0) {
            chrome.storage.sync.get(['spent', 'limit'], function(finance) {
                let totalAmt = 0;
                if (finance.spent) {
                    totalAmt += parseFloat(finance.spent);
                }
                totalAmt += parseFloat(spendAmt);
                chrome.storage.sync.set({'spent': totalAmt}, function() {
                    if(totalAmt > finance.limit) {
                        var limitNotifOptions = {
                            type: "basic",
                            iconUrl: "./icon-48.png",
                            title: "Limit exceeded!",
                            message: "You've spent more than your set limit!"
                        };
                        chrome.notifications.create('limitNotif', limitNotifOptions);
                    }
                });
            });
        }
    }
});