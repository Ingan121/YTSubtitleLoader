/* YTSubtitleLoader v2.3.1 (Extension Injector) by RomanHue
(C) 2021 RomanHue. All rights reserved.
Licensed under the MIT License - https://github.com/rhrhrhrhrhrh/YTSubtitleLoader/blob/master/LICENSE

This script injects the main YTSL script to the page instead of running it as content script.
This is because it is hard to communicate with SubtitlesOctopus running as injected script and YTSL running as content script.

Running SubtitlsOctopus as content script crashes the browser tab when putImageData is called.
I don't know why, but it just crashes on FF 88 on Ubuntu 20.10. */

// Send the extension URL to the page script, as it is impossible to call chrome.* in there.
var stlAssRenderUrlSender = document.createElement('script');
stlAssRenderUrlSender.textContent = "var stlAssRendererUrl = '" + chrome.runtime.getURL('JavascriptSubtitlesOctopus/') + "';";
document.body.appendChild(stlAssRenderUrlSender);

var stlLoader = document.createElement('script');
stlLoader.src = chrome.runtime.getURL('ytsl.js');
document.body.appendChild(stlLoader);
