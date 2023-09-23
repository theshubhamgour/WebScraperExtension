function scrapeWebsite(url, callback) {
    chrome.tabs.create({ url: url, active: false }, function(tab) {
        let tabId = tab.id;
        chrome.tabs.executeScript(tabId, { file: "content.js" }, function(results) {
            chrome.tabs.remove(tabId);
            callback(results[0]);
        });
    });
}

function scrapeWebsites(websites, callback) {
    let results = [];
    function next() {
        let website = websites.shift();
        if (website) {
            scrapeWebsite(website, result => {
                results.push(result);
                next();
            });
        } else {
            callback(results);
        }
    }
    next();
}

window.scrapeWebsites = scrapeWebsites;
