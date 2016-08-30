document.getElementById("submitButton").addEventListener("click", function(){
    sendToContent();
});
document.getElementById("resetButton").addEventListener("click", function(){
    resetToContent();
})

function sendToContent() {
    console.log("Send to Content Script!");
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     console.log(tabs);
    //     chrome.tabs.sendMessage(tabs[0].id, {greeting:"hello", content:document.getElementById("number").value}, function(response) {
    //         console.log(response.content);
    //     });
    // });
    chrome.runtime.sendMessage({greeting:"popup", content:document.getElementById("number").value}, function(response) {
        console.log(response.content);
    });
}

function resetToContent() {
    chrome.runtime.sendMessage({greeting:"resetPopup"}, function(response) {
        console.log(response.content);
    });
}
