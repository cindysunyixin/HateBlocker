chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab? "from a content script:" + sender.tab.url : "from the extension");
        var storage = chrome.storage.local;
        if (request.greeting == "popup") {
            var wordArray = [];
            storage.get('blackList', function(result) {
                wordArray = result['blackList'];
                wordArray.push(request.content);
                var obj = {};
                var key = 'blackList';
                obj[key] = wordArray;
                storage.set(obj);
                // console.log(wordArray);
                sendResponse({content:wordArray});
            })
        }
        if (request.greeting == "resetPopup") {
            storage.clear(function() {
                console.log("Cleard local storage");
                var wordArray = [];
                var obj = {};
                var key = 'blackList';
                obj[key] = wordArray;
                storage.set(obj);
                sendResponse({content:"Reset Successful"});
            });
        }
        if (request.greeting == "getList") {
            storage.get('blackList', function(result) {
                wordArray = result['blackList'];
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {greeting:"background", content:wordArray}, function(response) {
                        console.log(response.content);
                    });
                });
                sendResponse({content:"Received request for list data"});
            })
        }

});
