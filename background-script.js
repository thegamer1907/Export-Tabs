browser.runtime.onMessage.addListener(notify);

function notify(message) {
    var myblob = new Blob([message], {
        type: 'text/plain'
    });
    var myurl = URL.createObjectURL(myblob);
    console.log(message);
    browser.downloads.download({
        url : myurl,
        filename : "ExportedTabs.txt",
        saveAs : true
    });
}