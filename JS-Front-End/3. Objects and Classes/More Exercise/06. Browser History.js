function browseHistory(browser, operationsMade) {
    
    function openSite(browser, website, rawCmd) {
        browser['Open Tabs'].push(website);
        browser['Browser Logs'].push(rawCmd);
    }

    function closeSite(browser, website, rawCmd) {
        const browserSites = browser['Open Tabs'];
        const siteIndex = browserSites.indexOf(website);
        if (siteIndex != -1) {
            browser['Recently Closed'].push(website);
            browser['Open Tabs'].splice(siteIndex, 1);
            browser['Browser Logs'].push(rawCmd);
        }
    }

    function clearCacheAndHistory(browser) {
        browser['Open Tabs'] = [];
        browser['Recently Closed'] = [];
        browser['Browser Logs'] = [];
    }

    function fulfilCommands(browser, operationsMade) {
        let cmdParser = {
            'Open': openSite,
            'Close': closeSite,
            'Clear': clearCacheAndHistory
        }
    
        for (const rawCmd of operationsMade) {
            const [cmd, ...website] = rawCmd.split(' ');
            if (cmd === 'Clear') {
                cmdParser[cmd](browser);
            } else {
                cmdParser[cmd](browser, website[0], rawCmd);
            }
        }
    }

    function printBrowser(browser) {
        let browserInfo = [];
        browserInfo.push(browser["Browser Name"]);
        browserInfo.push(`Open Tabs: ${browser['Open Tabs'].join(', ')}`);
        browserInfo.push(`Recently Closed: ${browser['Recently Closed'].join(', ')}`);
        browserInfo.push(`Browser Logs: ${browser['Browser Logs'].join(', ')}`);
        console.log(browserInfo.join('\n'));
    }   


    fulfilCommands(browser, operationsMade);
    printBrowser(browser);
}

browseHistory({"Browser Name":"Google Chrome",
"Open Tabs":["Facebook","YouTube","Google Translate"],
"Recently Closed":["Yahoo","Gmail"],
"Browser Logs":["Open YouTube","Open Yahoo","Open Google Translate","Close Yahoo","Open Gmail","Close Gmail","Open Facebook"]}
, ["Close Facebook", "Open StackOverFlow", "Open Google"]);

console.log('\n');
browseHistory({"Browser Name":"Mozilla Firefox",
"Open Tabs":["YouTube"],
"Recently Closed":["Gmail", "Dropbox"],
"Browser Logs":["Open Gmail", "Close Gmail", "Open Dropbox", "Open YouTube", "Close Dropbox"]}
,["Open Wikipedia", "Clear History and Cache", "Open Twitter"]);