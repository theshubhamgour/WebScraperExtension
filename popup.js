document.getElementById('scrapeFile').addEventListener('click', function() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function(evt) {
            let websites = evt.target.result.split('\n').filter(Boolean); // Filter out empty lines
            chrome.runtime.getBackgroundPage(backgroundPage => {
                backgroundPage.scrapeWebsites(websites, results => {
                    let blob = new Blob([JSON.stringify(results, null, 2)], { type: 'text/plain' });
                    let url = URL.createObjectURL(blob);
                    let downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = url;
                    downloadLink.style.display = 'block';
                });
            });
        };
        reader.onerror = function(evt) {
            console.error("Error reading file");
        };
    }
});

document.getElementById('startScrape').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let currentTab = tabs[0];
        chrome.runtime.getBackgroundPage(backgroundPage => {
            backgroundPage.scrapeWebsite(currentTab.url, results => {
                let blob = new Blob([JSON.stringify(results, null, 2)], { type: 'text/plain' });
                let url = URL.createObjectURL(blob);
                let downloadLink = document.getElementById('downloadLink');
                downloadLink.href = url;
                downloadLink.style.display = 'block';
            });
        });
    });
});
