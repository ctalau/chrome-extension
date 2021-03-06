chrome.runtime.onInstalled.addListener(function() {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'github.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "executeScript"},
                                                    function(response) {
            // Nothing
        });
    });

});

chrome.webNavigation.onCompleted.addListener(function(details) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "executeScript"},
                                                    function(response) {
            // Nothing
        });
    });

});

chrome.tabs.onCreated.addListener(function() {

    chrome.tabs.query({url: "*://github.com/*"}, function(tabs) {
        tabs.forEach(function(tab) {
            chrome.tabs.sendMessage(tab.id, {method: "executeScript"},
                                                        function(response) {
                // Nothing
            });
        });


    });

});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status == 'complete' && tab.status == 'complete'
                                            && tab.url != undefined) {

        chrome.tabs.query({url: "*://github.com/*"}, function(tabs) {
            tabs.forEach(function(tab) {
                chrome.tabs.sendMessage(tab.id, {method: "executeScript"},
                                                        function(response) {
                    // Nothing
                });
            });
        });

    }

});