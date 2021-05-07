/* YTSubtitleLoader v2.3 (Userscript) by RomanHue
(C) 2021 RomanHue. All rights reserved.
Licensed under the MIT License - https://github.com/rhrhrhrhrhrh/YTSubtitleLoader/blob/master/LICENSE */

// ==UserScript==
// @name        YTSubtitleLoader
// @namespace   https://ytsubtitleloader.tk/
// @description Load custom subtitles / closed captions to YouTube
// @version     2.3
// @downloadURL https://2.ytsubtitleloader.tk/ytsl.user.js
// @updateURL   https://2.ytsubtitleloader.tk/ytsl.user.js
// @include     *://*.youtube.com/*
// @author      RomanHue
// @connect     ytsubtitleloader.tk
// @connect     ytsubs.org
// @grant       none
// @run-at      document-end
// @noframes
// ==/UserScript==

// Define strings
var stlServerUrl = "https://www.ytsubs.org",
    stlAssRendererUrl = "https://2.ytsubtitleloader.tk/AssRenderer/";

var stlStrings = {
    Unsupported: "Run this script in YouTube video page. (desktop / mobile - iframe, embed, etc are not supported)",
    SelectVttFile: "Select a file",
    SubtitleLoaded: "Subtitle loaded",
    EnterSubtAddr: "Enter URL",
    Load: "Load",
    Apply: "Apply",
    EmptyAddrAlert: "Enter a valid URL",
    EnterFontSize: "Change font size",
    EnterFontSizeDialog: "Enter desired font size (Default unit: px)",
    FontSizeChanged: "Font size changed",
    Loading: "Loading...",
    Refresh: "Refresh",
    Unload: "Unload",
    Unloaded: "Subtitle unloaded",
    NoSubt: "No subtitles",
    ServErr: "Server error",
    ReqTimeout: "Request timed out",
    ReqErr: "Request error",
    NotSelected: "Not selected",
    NoSubtLoaded: "No subtitle was loaded",
    InvalidUrl: "Invalid subtitle URL",
    AddSubt: "Add subtitle",
    InvalidSubtFormat: "Invalid subtitle format",
    Cancel: "Cancel",
    Canceled: "Canceled",
    ConfirmJs: "Do you want this subtitle to run JavaScript?\nThis allows the text to be styled, but it also poses security risks.",
    SecondJsAlert: "JavaScripted subtitle was once loaded.\nTo use another JavaScripted subtitle properly, refresh the page.",
    Notice: "Userscript version of YTSubtitleLoader which automatically loads to YouTube was released. Click OK to learn more.",
    Menu: "Menu",
    AutoLoadDb: "Auto load DB",
    ClearSettings: "Clear YTSL settings",
    Close: "Close",
    AssLoadFail: "Failed to load ASS renderer",
    FontSizeUnchangeable: "This feature is currently unavailable for ASS/SSA subtitles.",
    SrtConvFail: "Failed to load SRT converter",
    PrivPolicy: "Privacy Policy",
    OpenSrcLicense: "Open Source License",
    SubtInfo: "About subtitle...",
    SubtAuthor: "Subtitle author",
    SubtAuthorComment: "Subtitle author's comment",
    DownloadSubt: "Download subtitle",
    SubtFormat: "Subtitle format",
    NoInfo: "N/A",
    SubtSrc: "Subtitle source",
    File: "Local file",
    External: "External",
    Done: "Done",
    Ok: "OK",
    MobilePageAlert: "The support for the YouTube mobile page is currently incomplete. Would you like to switch to the desktop page?",
    AssRenderLoaded: "ASS/SSA renderer loaded (further loading required)",
    YtslJsDeprecated: "YTSLJS support has been dropped because of security and performance issues.",
    TermsOfUse: "Terms of Use"
}

// Localizations
var userLang = new URL(location.href).searchParams.get("stlLangOverride") || navigator.language || navigator.userLanguage;
if (userLang.includes("ko")) {
    stlStrings = {
        Unsupported: "유튜브 동영상 페이지(데스크탑/모바일)에서 실행하세요. (iframe, embed 등 미지원)",
        SelectVttFile: "파일 선택",
        SubtitleLoaded: "자막 로드됨",
        EnterSubtAddr: "주소 입력",
        Load: "불러오기",
        Apply: "적용",
        EmptyAddrAlert: "주소를 입력하세요.",
        EnterFontSize: "글자 크기 변경",
        EnterFontSizeDialog: "글자 크기 입력 (기본 단위: px)",
        FontSizeChanged: "글자 크기 변경됨",
        Loading: "로딩 중...",
        Refresh: "새로고침",
        Unload: "자막 제거",
        Unloaded: "자막 제거됨",
        NoSubt: "자막 없음",
        ServErr: "서버 오류",
        ReqTimeout: "요청 시간 초과",
        ReqErr: "요청 오류",
        NotSelected: "선택 안함",
        NoSubtLoaded: "로드된 자막이 없습니다.",
        InvalidUrl: "잘못된 자막 URL",
        AddSubt: "자막 추가",
        InvalidSubtFormat: "올바르지 않은 자막 형식",
        Cancel: "취소",
        Canceled: "취소됨",
        ConfirmJs: "이 자막이 자바스크립트를 실행하도록 허용하시겠습니까?\n이는 텍스트에 스타일을 적용할 수 있게 해주지만, 보안 문제를 야기할 수 있습니다.",
        SecondJsAlert: "자바스크립트 사용 자막이 한번 로드되었습니다.\n다른 자바스크립트 사용 자막을 문제 없이 사용하려면, 페이지를 새로고침 하십시오.",
        Notice: "유튜브에 자동으로 로드되는 YTSubtitleLoader의 유저스크립트 버전이 출시되었습니다. 자세히 알아보려면 확인 버튼을 누르세요.",
        Menu: "메뉴",
        AutoLoadDb: "DB 자동 로드",
        ClearSettings: "YTSL 설정값 초기화",
        Close: "닫기",
        AssLoadFail: "ASS 렌더러 로딩 실패",
        FontSizeUnchangeable: "현재 ASS/SSA 자막에서는 사용할 수 없는 기능입니다.",
        SrtConvFail: "SRT 컨버터 로딩 실패",
        PrivPolicy: "개인정보 처리방침",
        OpenSrcLicense: "오픈소스 라이선스",
        SubtInfo: "자막 정보",
        SubtAuthor: "자막 제작자",
        SubtAuthorComment: "자막 제작자의 말",
        DownloadSubt: "자막 다운로드",
        SubtFormat: "자막 형식",
        NoInfo: "없음",
        SubtSrc: "자막 출처",
        File: "로컬 파일",
        External: "외부",
        Done: "완료",
        Ok: "확인",
        MobilePageAlert: "현재 유튜브 모바일 페이지 지원은 불완전합니다. 데스크탑 페이지로 전환하시겠습니까?",
        AssRenderLoaded: "ASS 렌더러 로드됨 (추가 로딩 필요)",
        YtslJsDeprecated: "보안 및 성능 문제로 인해 YTSLJS는 지원 중단되었습니다.",
        TermsOfUse: "이용 약관"
    }
}

// Define variables
var videoSubtitle = document.createElement("track");
videoSubtitle.label = "YTSubtitleLoader";
videoSubtitle.default = true;
videoSubtitle.src = "data:text/vtt,";

var stlMessage = document.createElement("p"), stlMessageTimer;

var video;
var titleContainer, origTitle;
var titleContainerFs, origTitleFs;
var stlCustomVideoTitle = document.createElement("p"), stlCustomVideoTitleFs;
var ytSubtBtn;

var stlDbSelect = document.createElement("select");
var stlDbSelectPrevSelect = 0;

var stlRanJsSubtOnce = false;

var stlLoop;
var stlMessageBoxBackground, stlMessageBoxText;

var prevUrl = location.href, prevVidId, prevFontSize;

var stlVttLoaded = false;
var stlAssRendererLoaded = false;
var stlAssLoaded = false;
var stlSrtLoaded = false;
var workerUrl, legacyWorkerUrl, stlAssInstance;
var stlSubtFormat;

var stlMinimized = localStorage.stlMinimized == "true", stlHidden = false;
var stlAutoLoadDb = localStorage.stlDisableAutoLoadDb != "true";

var stlVersion = "2.3", stlType = "u";

var stlAllowJsSubt = false;

// Initialize the main UI
stlInitUi();

function stlInitUi() {
    // If in the non-video YT page - detection by URL
    if (window.location.href.includes("youtube.com") && parseVideoId() === null) {
        stlLoop = setInterval(stlWaitForVideoPage, 500);
        console.log("YTSubtitleLoader: Video page not found... waiting for video page")
        return;
    }

    // Look for the YT video element
    var playerContainer = document.getElementsByClassName("ytd-player")[0];
    var playerType = "desktop";
    if (!playerContainer) {
        playerContainer = document.getElementsByTagName("ytm-app")[0];
        playerType = "mobile";
        if (playerContainer) {
            // Ask user to switch to more-compatible desktop page
            if (confirm(stlStrings.MobilePageAlert)) {
                location.href = location.href + "&app=desktop&persist_app=1";
            }
        } else {
            // If in the non-video YT page - detection by video element presence
            if (window.location.href.includes("youtube.com")) {
                stlLoop = setInterval(stlWaitForVideoPage, 500);
                console.log("YTSubtitleLoader: Video not found... waiting for video page");
            } else {
                // Abort if the script was loaded in webpages other than YT
                alert(stlStrings.Unsupported);
            }
            return;
        };
    };

    video = document.getElementsByTagName("video")[0];
    video.appendChild(videoSubtitle);

    // Defind YTSL CSS style
    var stlStyle = document.createElement("style");
    stlStyle.innerHTML =
    '.stlLabel { \
        float: left; \
        font-size: 16px; \
        margin-left: 2px; \
        margin-right: 2px; \
        color: var(--ytd-video-primary-info-renderer-title-color, var(--yt-spec-text-primary)); \
    }\
    .stlLink {\
        color: inherit; \
        text-decoration: none !important; \
    }\
    .stlButton {\
        background: none !important; \
        border: none; \
        padding: 0 !important; \
        margin-top: 0 !important; \
        margin-bottom: 0 !important; \
        cursor: pointer; \
    }\
    ::cue {\
        white-space: pre-wrap; \
        background: rgba(8, 8, 8, 0.75) none repeat scroll 0% 0%; \
        font-size: 33.0222px; \
        color: #ffffff; \
        fill: #ffffff; \
        font-family: "YouTube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif; \
    }\
    .stlMenuItem {\
        width: 150px; \
        text-align: left; \
    }\
    .stlSubtInfoItem {\
        width: 350px; \
    }\
    .stlWndBg {\
        display: none; \
        position: fixed; \
        top: 0; \
        left: 0; \
        height: 100vh; \
        width: 100vw; \
        background: rgba(0, 0, 0, 0.5); \
        z-index: 5000; \
    }\
    .stlWnd {\
        background: var(--yt-spec-general-background-a, white); \
        position: absolute; \
        top: 50%; \
        left: 50%; \
        padding: 12px; \
        transform: translate(-50%, -50%); \
    }';
    // Hack for Korean-English font difference
    if (userLang.includes("ko")) {
        stlStyle.innerHTML += ".stlLabelEngOnly { margin-top: 1px; }";
    }
    document.head.appendChild(stlStyle);

    // CSS style for setting sub styles
    var videoSubtitleStyle = document.createElement("style");
    videoSubtitleStyle.innerHTML = "::cue {  }";
    document.head.appendChild(videoSubtitleStyle);

    // CSS style for setting sub font size
    var videoSubtitleStyleForFontSize = document.createElement("style");
    videoSubtitleStyleForFontSize.innerHTML = localStorage.stlFontSize || "::cue {  }";
    document.head.appendChild(videoSubtitleStyleForFontSize);

    // Create the YTSL UI
    var stlContainer = document.createElement("div");
    stlContainer.style.display = "block";
    if (!stlMinimized) playerContainer.appendChild(stlContainer);

    var stlMenuBackground = document.createElement("div");
    stlMenuBackground.className = "stlWndBg";
    stlMenuBackground.onclick = function () {
        fadeOut(this);
    }
    document.body.appendChild(stlMenuBackground);

    var stlMenu = document.createElement("div");
    stlMenu.className = "stlWnd";
    stlMenu.style = "height: 210px; width: 150px;";
    stlMenu.onclick = function (event) {
        event.stopPropagation();
    }
    stlMenuBackground.appendChild(stlMenu);

    var stlMenuCloseBtn = document.createElement("button");
    stlMenuCloseBtn.textContent = "X";
    stlMenuCloseBtn.className = "stlLabel stlButton stlMenuItem";
    stlMenuCloseBtn.style = "float: right; width: auto; text-align: right; font-weight: bold;"
    stlMenuCloseBtn.title = stlStrings.Close;
    stlMenuCloseBtn.onclick = function () {
        fadeOut(stlMenuBackground);
    };
    stlMenu.appendChild(stlMenuCloseBtn);

    var stlMenuTitle = document.createElement("p");
    stlMenuTitle.textContent = stlStrings.Menu;
    stlMenuTitle.className = "stlLabel stlMenuItem";
    stlMenuTitle.style = "font-size: 20px; font-weight: bold; width: 80px !important;";
    stlMenu.appendChild(stlMenuTitle);

    var stlFontSizeInputBtn = document.createElement("button");
    stlFontSizeInputBtn.textContent = stlStrings.EnterFontSize;
    stlFontSizeInputBtn.className = "stlLabel stlButton stlMenuItem";
    stlFontSizeInputBtn.onclick = function () {
        if (stlAssLoaded) {
            stlAlert(stlStrings.FontSizeUnchangeable);
            return;
        }
        
        var str = prompt(stlStrings.EnterFontSizeDialog);
        if (str == null) return;
        videoSubtitleStyleForFontSize.innerHTML = "::cue { font-size: " + (isNaN(str) ? str : str + "px") + "; }";
        localStorage.setItem("stlFontSize", videoSubtitleStyleForFontSize.innerHTML);
        fadeOut(stlMenuBackground);
        stlShowMessage(stlStrings.FontSizeChanged);
    };
    stlMenu.appendChild(stlFontSizeInputBtn);

    var stlAutoLoadDbLabel = document.createElement("label");
    stlAutoLoadDbLabel.className = "stlLabel stlMenuItem";
    stlAutoLoadDbLabel.textContent = stlStrings.AutoLoadDb;
    stlAutoLoadDbLabel.htmlFor = "stlAutoLoadDbChkBox";
    stlAutoLoadDbLabel.style.cursor = "pointer";
    stlMenu.appendChild(stlAutoLoadDbLabel);

    var stlAutoLoadDbChkBox = document.createElement("input");
    stlAutoLoadDbChkBox.type = "checkbox";
    stlAutoLoadDbChkBox.id = "stlAutoLoadDbChkBox";
    stlAutoLoadDbChkBox.style.cursor = "pointer";
    stlAutoLoadDbChkBox.onchange = function () {
        stlAutoLoadDb = this.checked;
        localStorage.setItem("stlDisableAutoLoadDb", !this.checked);
    };
    stlAutoLoadDbChkBox.checked = stlAutoLoadDb;
    stlAutoLoadDbLabel.appendChild(stlAutoLoadDbChkBox);

    var stlClearSettingsBtn = document.createElement("button");
    stlClearSettingsBtn.textContent = stlStrings.ClearSettings;
    stlClearSettingsBtn.className = "stlLabel stlButton stlMenuItem";
    stlClearSettingsBtn.onclick = function () {
        localStorage.removeItem("stlNoticeIgnore");
        localStorage.removeItem("stlDisableAutoLoadDb");
        localStorage.removeItem("stlMinimized");
        localStorage.removeItem("stlFontSize");
        fadeOut(stlMenuBackground);
        stlAlert(stlStrings.Done);
    };
    stlMenu.appendChild(stlClearSettingsBtn);

    var stlGitHubBtn = document.createElement("button");
    stlGitHubBtn.textContent = "GitHub";
    stlGitHubBtn.className = "stlLabel stlButton stlMenuItem";
    stlGitHubBtn.onclick = function () {
        window.open("https://github.com/rhrhrhrhrhrh/YTSubtitleLoader");
        fadeOut(stlMenuBackground);
    };
    stlMenu.appendChild(stlGitHubBtn);

    var stlToUBtn = document.createElement("button");
    stlToUBtn.textContent = stlStrings.TermsOfUse;
    stlToUBtn.className = "stlLabel stlButton stlMenuItem";
    stlToUBtn.onclick = function () {
        window.open(stlServerUrl + "/termsofuse.php");
        fadeOut(stlMenuBackground);
    };
    stlMenu.appendChild(stlToUBtn);

    var stlPrivPolBtn = document.createElement("button");
    stlPrivPolBtn.textContent = stlStrings.PrivPolicy;
    stlPrivPolBtn.className = "stlLabel stlButton stlMenuItem";
    stlPrivPolBtn.onclick = function () {
        window.open(stlServerUrl + "/privacypolicy.php");
        fadeOut(stlMenuBackground);
    };
    stlMenu.appendChild(stlPrivPolBtn);

    var stlOpenSrcBtn = document.createElement("button");
    stlOpenSrcBtn.textContent = stlStrings.OpenSrcLicense;
    stlOpenSrcBtn.className = "stlLabel stlButton stlMenuItem";
    stlOpenSrcBtn.onclick = function () {
        window.open(stlServerUrl + "/opensource.php");
        fadeOut(stlMenuBackground);
    };
    stlMenu.appendChild(stlOpenSrcBtn);

    var stlInfoText = document.createElement("p");
    stlInfoText.textContent = "YTSubtitleLoader " + stlVersion + " (" + stlType.toUpperCase() + ")";
    stlInfoText.className = "stlLabel stlMenuItem";
    stlInfoText.style = "color: gray; font-size: 12px; position: absolute; left: 12px; bottom: 12px;";
    stlMenu.appendChild(stlInfoText);

    var stlSubtInfoBackground = document.createElement("div");
    stlSubtInfoBackground.className = "stlWndBg";
    stlSubtInfoBackground.onclick = function () {
        fadeOut(this);
    }
    document.body.appendChild(stlSubtInfoBackground);

    var stlSubtInfoWindow = document.createElement("div");
    stlSubtInfoWindow.className = "stlWnd";
    stlSubtInfoWindow.style = "height: 250px; width: 350px;";
    stlSubtInfoWindow.onclick = function (event) {
        event.stopPropagation();
    }
    stlSubtInfoBackground.appendChild(stlSubtInfoWindow);

    var stlSubtInfoCloseBtn = document.createElement("button");
    stlSubtInfoCloseBtn.textContent = "X";
    stlSubtInfoCloseBtn.className = "stlLabel stlButton stlMenuItem stlSubtInfoItem";
    stlSubtInfoCloseBtn.style = "float: right; width: auto; text-align: right; font-weight: bold;"
    stlSubtInfoCloseBtn.title = stlStrings.Close;
    stlSubtInfoCloseBtn.onclick = function () {
        fadeOut(stlSubtInfoBackground);
    };
    stlSubtInfoWindow.appendChild(stlSubtInfoCloseBtn);

    var stlSubtInfoTitle = document.createElement("p");
    stlSubtInfoTitle.textContent = stlStrings.SubtInfo;
    stlSubtInfoTitle.className = "stlLabel stlMenuItem stlSubtInfoItem";
    stlSubtInfoTitle.style = "font-size: 20px; font-weight: bold; width: 200px !important;";
    stlSubtInfoWindow.appendChild(stlSubtInfoTitle);

    var stlSubtSrcText = document.createElement("p");
    stlSubtSrcText.className = "stlLabel stlMenuItem stlSubtInfoItem";
    stlSubtInfoWindow.appendChild(stlSubtSrcText);

    var stlSubtFormatText = document.createElement("p");
    stlSubtFormatText.className = "stlLabel stlMenuItem stlSubtInfoItem";
    stlSubtInfoWindow.appendChild(stlSubtFormatText);

    var stlSubtAuthorText = document.createElement("p");
    stlSubtAuthorText.className = "stlLabel stlMenuItem stlSubtInfoItem";
    stlSubtAuthorText.style.display = "none";
    stlSubtInfoWindow.appendChild(stlSubtAuthorText);

    var stlSubtAuthorCommentText = document.createElement("p");
    stlSubtAuthorCommentText.className = "stlLabel stlMenuItem stlSubtInfoItem";
    stlSubtAuthorCommentText.style = "display: none; word-wrap: break-word;";
    stlSubtInfoWindow.appendChild(stlSubtAuthorCommentText);

    var stlSubtDownloadBtn = document.createElement("buttton");
    stlSubtDownloadBtn.textContent = stlStrings.DownloadSubt;
    stlSubtDownloadBtn.className = "stlLabel stlButton stlMenuItem stlSubtInfoItem";
    stlSubtDownloadBtn.style = "display: none; text-align: center; position: absolute; left: 12px; bottom: 12px;";
    stlSubtDownloadBtn.onclick = function () {
        window.open(stlDbSubtitles[stlDbSelect.selectedIndex - 1].url + "&dl");
    };
    stlSubtInfoWindow.appendChild(stlSubtDownloadBtn);

    stlMessageBoxBackground = document.createElement("div");
    stlMessageBoxBackground.className = "stlWndBg";
    stlMessageBoxBackground.style = "z-index: 5001;";
    stlMessageBoxBackground.onclick = function () {
        fadeOut(this);
    }
    document.body.appendChild(stlMessageBoxBackground);

    var stlMessageBox = document.createElement("div");
    stlMessageBox.className = "stlWnd";
    stlMessageBox.style = "height: 100px; width: 300px; margin-top: -50px; margin-left: -150px;";
    stlMessageBox.onclick = function (event) {
        event.stopPropagation();
    }
    stlMessageBoxBackground.appendChild(stlMessageBox);

    var stlMessageBoxCloseBtn = document.createElement("button");
    stlMessageBoxCloseBtn.textContent = "X";
    stlMessageBoxCloseBtn.className = "stlLabel stlButton stlMenuItem";
    stlMessageBoxCloseBtn.style = "float: right; width: auto; text-align: right; font-weight: bold;"
    stlMessageBoxCloseBtn.title = stlStrings.Close;
    stlMessageBoxCloseBtn.onclick = function () {
        fadeOut(stlMessageBoxBackground);
    };
    stlMessageBox.appendChild(stlMessageBoxCloseBtn);

    stlMessageBoxText = document.createElement("p");
    stlMessageBoxText.className = "stlLabel";
    stlMessageBoxText.style = "width: 300px; height: 55px; text-align: center; display: table-cell; vertical-align: middle; word-wrap: break-word;";
    stlMessageBox.appendChild(stlMessageBoxText);

    var stlMessageBoxOkBtn = document.createElement("buttton");
    stlMessageBoxOkBtn.textContent = stlStrings.Ok;
    stlMessageBoxOkBtn.className = "stlLabel stlButton stlMenuItem";
    stlMessageBoxOkBtn.style = "text-align: center; width: 300px; position: absolute; left: 12px; bottom: 12px;";
    stlMessageBoxOkBtn.onclick = function () {
        fadeOut(stlMessageBoxBackground);
    };
    stlMessageBox.appendChild(stlMessageBoxOkBtn);

    var stlRestoreBtn = document.createElement("p");
    stlRestoreBtn.className = "stlLabel";
    stlRestoreBtn.style.cursor = "pointer";
    stlRestoreBtn.innerHTML = "<b>YTSL ></b>";
    stlRestoreBtn.onclick = stlRestore;
    if (stlMinimized) playerContainer.appendChild(stlRestoreBtn);

    var stlLabel = document.createElement("p");
    stlLabel.className = "stlLabel";
    stlLabel.innerHTML = "<b><a href='" + stlServerUrl + "' class='stlLink' target='_blank'>YTSubtitleLoader</a></b> |";
    stlContainer.appendChild(stlLabel);

    var stlFileInput = document.createElement("input");
    stlFileInput.id = "stlFileInput";
    stlFileInput.type = "file";
    stlFileInput.accept = ".vtt,.ass,.ssa,.srt";
    stlFileInput.style.display = "none";
    stlFileInput.onchange = function () { // Load the opened subtitle
        var reader = new FileReader();
        reader.onload = function () {
            if (reader.result.includes("WEBVTT")) { // If VTT
                // Load it as data URI
                stlShowSubtitle("data:text/vtt," + encodeURIComponent(reader.result.split("YTSLJS")[0]), true);
                // Deprecated YTSLJS (considered insecure and useless)
                if (typeof reader.result.split("YTSLJS")[1] !== 'undefined') {
                    if (stlRanJsSubtOnce) alert(stlStrings.SecondJsAlert);
                    if (stlAllowJsSubt) {
                        if (confirm(stlStrings.ConfirmJs)) {
                            eval(reader.result.split("YTSLJS")[1]);
                            stlRanJsSubtOnce = true;
                        }
                    } else {
                        stlAlert(stlStrings.YtslJsDeprecated);
                        setVideoSubtitleStyle("");
                    }
                } else {
                    setVideoSubtitleStyle("");
                }
                stlSubtSrcText.textContent = stlStrings.SubtSrc + ": " + stlStrings.File;
            } else if (reader.result.includes("[Script Info]")) { // If SSA/ASS
                stlLoadAssSubtitle("data:text/plain," + encodeURIComponent(reader.result), true);
                stlSubtSrcText.textContent = stlStrings.SubtSrc + ": " + stlStrings.File;
            } else if (reader.result.includes(" --> ")) { // If SRT
                stlSrtLoaded = true;
                stlShowSubtitle("data:text/vtt," + encodeURIComponent(srt2webvtt(reader.result)), true);
                setVideoSubtitleStyle("");
                stlSubtSrcText.textContent = stlStrings.SubtSrc + ": " + stlStrings.File;
            } else { // Invalid subtitle
                stlShowMessage(stlStrings.InvalidSubtFormat);
            }
        };
        reader.readAsText(this.files[0]);
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    }
    stlContainer.appendChild(stlFileInput);

    var stlFileInputBtn = document.createElement("label");
    stlFileInputBtn.textContent = stlStrings.SelectVttFile;
    stlFileInputBtn.htmlFor = "stlFileInput";
    stlFileInputBtn.className = "stlLabel";
    stlFileInputBtn.style.cursor = "pointer";
    stlFileInputBtn.style.float = "left";
    stlContainer.appendChild(stlFileInputBtn);

    var stlSeparator = document.createElement("p");
    stlSeparator.className = "stlLabel";
    stlSeparator.innerHTML = "|";
    stlContainer.appendChild(stlSeparator);

    var stlUrlInputBtn = document.createElement("button");
    stlUrlInputBtn.textContent = stlStrings.EnterSubtAddr;
    stlUrlInputBtn.className = "stlLabel stlButton";
    stlUrlInputBtn.onclick = function () {
        var str = prompt(stlStrings.EnterSubtAddr);
        if (!str) {
            if (str == "") stlShowMessage(stlStrings.EmptyAddrAlert);
            return;
        };
        // Hidden feature: load any YTSL DB subtitles easily without having to type the full URL
        if (!str.includes("http://") && !str.includes("https://")) {
            str = stlServerUrl + "/db/" + parseVideoId() + "/" + str;
            stlSubtSrcText.textContent = stlStrings.SubtSrc + ": YTSubtitleLoader DB";
        } else {
            stlSubtSrcText.textContent = stlStrings.SubtSrc + ": " + stlStrings.External;
        }
        stlLoadSubtitleFromUrl(str, true);
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    };
    stlContainer.appendChild(stlUrlInputBtn);

    var stlSeparator2 = stlSeparator.cloneNode(true);
    stlContainer.appendChild(stlSeparator2);

    var stlDbLabel = document.createElement("p");
    stlDbLabel.className = "stlLabel stlLabelEngOnly";
    stlDbLabel.innerHTML = "<a href='" + stlServerUrl + "/db' class='stlLink' target='_blank'>YTSL DB</a>:";
    stlContainer.appendChild(stlDbLabel);

    stlDbSelect.style.float = "left";
    stlDbSelect.disabled = true;
    stlDbSelect.onchange = function () {
        if (stlDbSelect.selectedIndex + 1 == stlDbSelect.length) {
            window.open(stlServerUrl + "/db?video=" + parseVideoId(), "_blank");
            stlDbSelect.selectedIndex = stlDbSelectPrevSelect;
        } else {
            stlLoadSubtitleFromDb();
        }
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    };
    stlContainer.appendChild(stlDbSelect);

    var stlDbSelectPlaceholder = document.createElement("option");
    stlDbSelectPlaceholder.text = stlStrings.Loading;
    stlDbSelectPlaceholder.disabled = true;
    stlDbSelect.appendChild(stlDbSelectPlaceholder);
    stlDbSelect.selectedIndex = 0;

    var stlDbSelectAddBtn = document.createElement("option");
    stlDbSelectAddBtn.text = stlStrings.AddSubt;

    var stlDbRefreshBtn = document.createElement("button");
    stlDbRefreshBtn.textContent = stlStrings.Refresh;
    stlDbRefreshBtn.className = "stlLabel stlButton";
    stlDbRefreshBtn.onclick = stlDbRefresh;
    stlContainer.appendChild(stlDbRefreshBtn);

    var stlDbSubtInfoBtn = document.createElement("button");
    stlDbSubtInfoBtn.textContent = " ⓘ ";
    stlDbSubtInfoBtn.className = "stlLabel stlButton";
    stlDbSubtInfoBtn.onclick = function () { // Generate these info when opening this window
        if (stlDbSelect.selectedIndex != 0) {
            switch (stlDbSubtitles[stlDbSelect.selectedIndex - 1].type) {
                case "ass":
                    stlSubtFormat = "Advanced SubStation Alpha";
                    break;
                case "ssa":
                    stlSubtFormat = "SubStation Alpha";
                    break;
                case "vtt":
                    stlSubtFormat = "WebVTT";
                    break;
                case "srt":
                    stlSubtFormat = "SubRip Text";
            }
            stlSubtSrcText.textContent = stlStrings.SubtSrc + ": YTSubtitleLoader DB";
            var stlSubtAuthor = stlDbSubtitles[stlDbSelect.selectedIndex - 1].author;
            stlSubtAuthorText.textContent = stlStrings.SubtAuthor + ": " + (stlSubtAuthor ? stlSubtAuthor : "N/A");
            stlSubtAuthorText.style.display = "block";
            var stlSubtAuthorComment = stlDbSubtitles[stlDbSelect.selectedIndex - 1].authorComment;
            stlSubtAuthorCommentText.textContent = stlStrings.SubtAuthorComment + ": " + (stlSubtAuthorComment ? stlSubtAuthorComment : stlStrings.NoInfo);
            stlSubtAuthorCommentText.style.display = "block";
            stlSubtDownloadBtn.style.display = "block";
        } else {
            if (stlAssLoaded) stlSubtFormat = "(Advanced) SubStation Alpha";
            else if (stlVttLoaded) stlSubtFormat = "WebVTT";
            else if (stlSrtLoaded) stlSubtFormat = "SubRip Text";
            stlSubtAuthorText.style.display = "none";
            stlSubtAuthorCommentText.style.display = "none";
            stlSubtDownloadBtn.style.display = "none";
        }
        if ((stlAssLoaded || stlVttLoaded || stlSrtLoaded) && typeof stlSubtFormat !== 'undefined') {
            stlSubtFormatText.textContent = stlStrings.SubtFormat + ": " + stlSubtFormat;
        } else {
            stlSubtSrcText.textContent = stlStrings.NoSubtLoaded;
            stlSubtFormatText.textContent = "";
        }
        fadeIn(stlSubtInfoBackground);
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    };
    stlContainer.appendChild(stlDbSubtInfoBtn);

    var stlSeparator3 = stlSeparator.cloneNode(true);
    stlContainer.appendChild(stlSeparator3);

    var stlUnloadBtn = document.createElement("button");
    stlUnloadBtn.textContent = stlStrings.Unload;
    stlUnloadBtn.className = "stlLabel stlButton";
    stlUnloadBtn.onclick = function () { // Clear loaded subtitle
        if (stlAssLoaded) {
            document.getElementsByClassName("libassjs-canvas-parent")[0].remove();
            stlAssLoaded = false;
            changeYtVidTitle();
        } else if (stlVttLoaded || stlSrtLoaded) {
            stlClearTrack();
            stlVttLoaded = false;
            stlSrtLoaded = false;
            changeYtVidTitle();
        } else {
            stlShowMessage(stlStrings.NoSubtLoaded);
            return;
        }
        stlShowMessage(stlStrings.Unloaded);
        stlDbSelect.selectedIndex = 0;
        stlDbSelectPrevSelect = stlDbSelect.selectedIndex;
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    };
    stlContainer.appendChild(stlUnloadBtn);
    
    var stlSeparator4 = stlSeparator.cloneNode(true);
    stlContainer.appendChild(stlSeparator4);

    var stlMenuBtn = document.createElement("button");
    stlMenuBtn.textContent = stlStrings.Menu;
    stlMenuBtn.className = "stlLabel stlButton";
    stlMenuBtn.onclick = function () {
        fadeIn(stlMenuBackground);
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    };
    stlMenuBtn.onmouseup = function (event) {
        if (event.button == 1) {
            stlDbg();
        }
        return false;
    }
    stlContainer.appendChild(stlMenuBtn);
    
    // Currently nothing to notify
    var stlNotice = document.createElement("button");
    stlNotice.className = "stlButton stlLabel stlLabelEngOnly";
    stlNotice.style = "color: white; background: blue !important; border-radius: 50%; width: 20px; height: 20px;";
    stlNotice.textContent = "!";
    stlNotice.onclick = function () {
        if (confirm(stlStrings.Notice)) {
            window.open(stlServerUrl);
        } else {
            localStorage.setItem("stlNoticeIgnore", "1");
        }
        stlNotice.remove();
    };
    //if (!(parseInt(localStorage.stlNoticeIgnore, 10) >= 1)) stlContainer.appendChild(stlNotice);

    stlMessage.className = "stlLabel";
    stlMessage.style.display = "none";
    stlContainer.appendChild(stlMessage);

    var stlMinimizeBtn = document.createElement("p");
    stlMinimizeBtn.className = "stlLabel stlButton";
    stlMinimizeBtn.innerHTML = "<b><</b>";
    stlMinimizeBtn.style.marginLeft = "2px"
    stlMinimizeBtn.onclick = stlMinimize;
    stlContainer.appendChild(stlMinimizeBtn); // UI creation complete!

    // Automatically load subtitles from YTSL DB if configured to do so
    if (stlAutoLoadDb) {
        stlLoadDb();
    } else {
        stlDbSelectPlaceholder.text = stlStrings.NotSelected;
        stlDbRefreshBtn.textContent = stlStrings.Load;
    }

    // Detect YT URL change with interval loop, as I couldn't find a way to listen AJAX URL changes (without modifying the original page script)
    stlLoop = setInterval(stlDetectUrlChange, 200);
    setInterval(function () {
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    }, playerType == "mobile" ? 10000 : 25000);

    console.log("YTSubtitleLoader: Initialization complete"); // Done!

    // Function to get the list of subtitles from YTSL DB
    function stlLoadDb() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", stlServerUrl + "/db/" + parseVideoId() + "&t=" + stlType + stlVersion, true);
        //xhr.timeout = 25000; // Disabled as old servers tended to be so slow
        xhr.send();
        stlDbRefreshBtn.textContent = stlStrings.Cancel;
        stlDbRefreshBtn.onclick = function () {
            xhr.abort();
            stlDbSelectPlaceholder.text = stlStrings.Canceled;
            stlDbRefreshBtn.textContent = stlStrings.Refresh;
            stlDbRefreshBtn.onclick = stlDbRefresh;
        };
        xhr.onload = function () {
            stlDbRefreshBtn.textContent = stlStrings.Refresh;
            stlDbRefreshBtn.onclick = stlDbRefresh;
            if (xhr.status == 200) {
                stlDbSelect.disabled = false;
                stlDbSelectPlaceholder.text = stlStrings.NotSelected;
                stlDbSubtitles = JSON.parse(xhr.response);
                var predefined = false, fullMatched = false;
                for (var i = 0; i < stlDbSubtitles.length; i++) { // Automatically select and load a subtitle based on the priority below
                    var def = false;
                    if (stlDbSubtitles[i].default) { // Server admin defined priority
                        def = true;
                        predefined = true;
                    } else {
                        if (stlDbSubtitles[i].langCode.toLowerCase() == userLang.toLowerCase() && !predefined) { // Full match e.g. ko-KR - ko-KR
                            def = true;
                            fullMatched = true;
                        } else {
                            if (stlDbSubtitles[i].langCode.substring(0, 2).toLowerCase() == userLang.substring(0, 2).toLowerCase() && !predefined && !fullMatched) { // Partial match e.g. ko-KR - ko
                                def = true;
                            }
                        }
                    }
                    stlDbSelect[stlDbSelect.options.length] = new Option(stlDbSubtitles[i].langStr, null, def, def);
                }
                stlDbSelect.appendChild(stlDbSelectAddBtn);
                stlLoadSubtitleFromDb();
            } else if (xhr.status == 404) {
                stlDbSelect.disabled = false;
                stlDbSelectPlaceholder.text = stlStrings.NoSubt;
                stlDbSelect.appendChild(stlDbSelectAddBtn);
            } else {
                stlDbSelectPlaceholder.text = stlStrings.ServErr;
            };
        };
        xhr.ontimeout = function (e) {
            console.log("YTSubtitleLoader: " + e.message);
            stlDbSelectPlaceholder.text = stlStrings.ReqTimeout;
            stlDbRefreshBtn.textContent = stlStrings.Refresh;
            stlDbRefreshBtn.onclick = stlDbRefresh;
        };
        xhr.onerror = function (e) {
            console.log("YTSubtitleLoader: " + e.message);
            stlDbSelectPlaceholder.text = stlStrings.ReqErr;
            stlDbRefreshBtn.textContent = stlStrings.Refresh;
            stlDbRefreshBtn.onclick = stlDbRefresh;
        };
    };

    // From https://stackoverflow.com/a/3452617
    function parseVideoId() {
        try {
            var video_id = window.location.search.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if (ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
            }
            return video_id;
        } catch {
            return null;
        }
    }

    // Function to load a subtitle from the loaded DB
    function stlLoadSubtitleFromDb() {
        if (stlDbSelect.selectedIndex != 0) {
            videoSubtitle.srclang = stlDbSubtitles[stlDbSelect.selectedIndex - 1].langCode;
            stlLoadSubtitleFromUrl(stlDbSubtitles[stlDbSelect.selectedIndex - 1].url, false);
            if (stlDbSubtitles[stlDbSelect.selectedIndex - 1].title) {
                changeYtVidTitle(stlDbSubtitles[stlDbSelect.selectedIndex - 1].title);
            } else {
                changeYtVidTitle();
            }
        }
        stlDbSelectPrevSelect = stlDbSelect.selectedIndex;
    };

    function stlDbRefresh() {
        stlDbSelect.innerHTML = "";
        stlDbSelectPlaceholder.text = stlStrings.Loading;
        stlDbSelect.disabled = true;
        stlDbSelect.appendChild(stlDbSelectPlaceholder);
        stlDbSelect.selectedIndex = 0;
        stlDbSelectPrevSelect = stlDbSelect.selectedIndex;
        stlDbSelectAddBtn.selected = false;
        stlLoadDb();
        if (stlMinimized && !stlHidden) playerContainer.appendChild(stlRestoreBtn);
        else if (!stlHidden) playerContainer.appendChild(stlContainer);
    }

    // Detect YT AJAX URL change with a interval loop
    function stlDetectUrlChange() {
        if (prevUrl != window.location.href) {
            setTimeout(function () {
                video = document.getElementsByTagName("video")[0];
                if (parseVideoId() !== null) {
                    videoSubtitleStyleForFontSize.innerHTML = prevFontSize;
                    if (stlMinimized) playerContainer.appendChild(stlRestoreBtn);
                    else playerContainer.appendChild(stlContainer);
                    if (!stlHidden) {
                        stlClearTrack();
                        if (stlAutoLoadDb) {
                            stlDbRefresh();
                        } else {
                            stlDbSelect.innerHTML = "";
                            stlDbSelectPlaceholder.text = stlStrings.NotSelected;
                            stlDbSelect.disabled = true;
                            stlDbSelect.appendChild(stlDbSelectPlaceholder);
                            stlDbSelect.selectedIndex = 0;
                            stlDbSelectPrevSelect = stlDbSelect.selectedIndex;
                            stlDbSelectAddBtn.selected = false;
                            stlDbRefreshBtn.textContent = stlStrings.Load;
                        }
                    }
                    stlHidden = false;
                } else {
                    stlHidden = true;
                    stlContainer.remove();
                    stlRestoreBtn.remove();
                    prevFontSize = videoSubtitleStyleForFontSize.innerHTML;
                    videoSubtitleStyleForFontSize.innerHTML = "::cue { font-size: 18px; }";
                }
            }, 2000);
            prevUrl = window.location.href;
            stlCustomVideoTitle.remove();
            stlCustomVideoTitleFs.remove();
            origTitle.style.display = "";
            origTitleFs.style.display = "";
        }
    }

    // Start YTSL initialization upon loading a video page
    function stlWaitForVideoPage() {
        if ((document.getElementsByClassName("ytd-player")[0] || document.getElementsByTagName("ytm-app")[0]) && parseVideoId() !== null && document.getElementsByTagName("video")[0]) {
            setTimeout(stlInitUi, 2000);
            clearInterval(stlLoop);
            prevUrl = window.location.href;
        }
    }

    // YTSL UI minimization with animation
    function stlMinimize() {
        stlMinimized = true;
        localStorage.setItem("stlMinimized", true);
        var tempContainer = stlContainer.cloneNode(true);
        stlContainer.remove();
        tempContainer.getElementsByTagName("select")[0].selectedIndex = stlDbSelect.selectedIndex;
        playerContainer.appendChild(tempContainer);
        stlRestoreBtn.style.display = "none";

        var interval = setInterval(function () {
            var lastItem = tempContainer.childNodes[tempContainer.childElementCount - 2];

            if (tempContainer.childElementCount == 2) {
                if (lastItem.textContent.length > 11) lastItem.innerHTML = "<b>" + lastItem.textContent.substring(0, lastItem.textContent.length - 1) + "</b>";
                else if (lastItem.textContent.length <= 11 && lastItem.textContent.length > 4) lastItem.innerHTML = "<b>" + lastItem.textContent.substring(0, lastItem.textContent.length - 2) + "L</b>";
                else {
                    clearInterval(interval);
                    clearTimeout(failSafeTimer);
                    tempContainer.remove();
                    stlRestoreBtn.style.display = "block";
                    playerContainer.appendChild(stlRestoreBtn);
                }
                return;
            }

            if (lastItem.tagName == "SELECT") {
                if (lastItem.length != 0) {
                    for (var i = 0; i < lastItem.length; i++) {
                        var opt = lastItem.options[i];
                        opt.textContent = opt.textContent.substring(0, opt.textContent.length - 1);
                        if (opt.textContent.length == 0) opt.remove();
                    }
                } else {
                    lastItem.remove();
                }
            } else {
                if (lastItem.textContent.length != 0) {
                    lastItem.textContent = lastItem.textContent.substring(0, lastItem.textContent.length - 1);
                    if (lastItem.textContent.length == 0) lastItem.remove();
                } else {
                    lastItem.remove();
                }
            }
        }, 2);
        var failSafeTimer = setTimeout(function() { // Fail safe for laggy moments (e.g. right after the page load)
            clearInterval(interval);
            tempContainer.remove();
            stlRestoreBtn.style.display = "block";
            playerContainer.appendChild(stlRestoreBtn);
        }, 2500);
    }

    function stlRestore() {
        stlMinimized = false;
        localStorage.setItem("stlMinimized", false);
        stlRestoreBtn.remove();
        stlContainer.style.display = "none";
        playerContainer.appendChild(stlContainer);
        fadeIn(stlContainer);
    }

    // Middle-click the menu button to activate this
    function stlDbg(fn) {
        if (typeof fn !== 'undefined') {
            fn();
        } else {
            eval(prompt("Enter JavaScript code to run inside stlInitUi function."));
        }
    }

    // Run this function from the above debug function if you need
    function stlReInit() {
        stlContainer.remove();
        stlInitUi();
    }
} // End of stlInitUi function
// The below functions were located out of this function to provide API for embedding YTSL with YT iframe - which is currently not a supported feature

// This was a function for use in YTSLJS...
function setVideoSubtitleStyle(style) {
    videoSubtitleStyle.innerText = "::cue { " + style + " };"
}

function stlLoadSubtitleFromUrl(url, unselectDbSelect) {
    stlShowMessage(stlStrings.Loading);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.timeout = 25000;
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // See stlFileInput.onchange for comments
            if (xhr.response.includes("WEBVTT")) {
                stlShowSubtitle("data:text/vtt," + encodeURIComponent(xhr.response.split("YTSLJS")[0]), unselectDbSelect)
                if (typeof xhr.response.split("YTSLJS")[1] !== 'undefined') {
                    if (stlRanJsSubtOnce) alert(stlStrings.SecondJsAlert);
                    if (stlAllowJsSubt) {
                        if (confirm(stlStrings.ConfirmJs)) {
                            eval(xhr.response.split("YTSLJS")[1]);
                            stlRanJsSubtOnce = true;
                        }
                    } else {
                        stlAlert(stlStrings.YtslJsDeprecated);
                        setVideoSubtitleStyle("");
                    }
                } else {
                    setVideoSubtitleStyle("");
                }
            } else if (xhr.response.includes("[Script Info]")) {
                stlLoadAssSubtitle("data:text/plain," + encodeURIComponent(xhr.response), unselectDbSelect);
            } else if (xhr.response.includes(" --> ")) {
                stlSrtLoaded = true;
                stlShowSubtitle("data:text/vtt," + encodeURIComponent(srt2webvtt(xhr.response)), unselectDbSelect);
                setVideoSubtitleStyle("");
            } else {
                stlShowMessage(stlStrings.InvalidSubtFormat);
            }
        } else if (xhr.status == 404) {
            stlShowMessage(stlStrings.InvalidUrl);
        } else {
            stlShowMessage(stlStrings.ServErr);
        };
    };
    xhr.ontimeout = function (e) {
        console.log("YTSubtitleLoader: " + e.message);
        stlShowMessage(stlStrings.ReqTimeout);
    };
    xhr.onerror = function (e) {
        console.log("YTSubtitleLoader: " + e.message);
        stlShowMessage(stlStrings.ReqErr);
    };
};

// Load JavascriptSubtitlesOctopus for ASS rendering
function stlLoadAssSubtitle(src, unselectDbSelect) {
    ytSubtBtn = document.getElementsByClassName("ytp-subtitles-button ytp-button")[0];
    if (ytSubtBtn) {
        if (ytSubtBtn.getAttribute("aria-pressed") == "true") ytSubtBtn.click();
    }
    stlClearTrack();
    stlVttLoaded = false;
    stlSrtLoaded = false;
    if (stlAssLoaded) {
        document.getElementsByClassName("libassjs-canvas-parent")[0].remove();
        stlAssLoaded = false;
    }
    if (!stlAssRendererLoaded) {
        workerUrl = stlAssRendererUrl + 'subtitles-octopus-worker.js';
        legacyWorkerUrl = stlAssRendererUrl + 'subtitles-octopus-worker-legacy.js';
        var script = document.createElement('script');
        script.onload = function () {
            var options = {
                video: video, // HTML5 video element
                subUrl: src, // Link to subtitles
                fonts: ['https://2.ytsubtitleloader.tk/AssRenderer/assets/fonts/NanumBarunGothic.ttf', 'https://2.ytsubtitleloader.tk/AssRenderer/assets/fonts/NanumBarunGothicBold.ttf', 'https://2.ytsubtitleloader.tk/AssRenderer/assets/fonts/NanumBarunGothicUltraLight.ttf'],
                workerUrl: workerUrl, // Link to WebAssembly-based file "libassjs-worker.js"
                legacyWorkerUrl: legacyWorkerUrl // Link to non-WebAssembly worker
            };
            stlAssInstance = new SubtitlesOctopus(options);
            stlAssRendererLoaded = true;
            stlAssLoaded = true;
        };
        script.src = stlAssRendererUrl + "subtitles-octopus.js";
        document.head.appendChild(script);
    } else {
        var options = {
            video: video, // HTML5 video element
            subUrl: src, // Link to subtitles
            fonts: ['https://2.ytsubtitleloader.tk/AssRenderer/assets/fonts/NanumBarunGothic.ttf', 'https://2.ytsubtitleloader.tk/AssRenderer/assets/fonts/NanumBarunGothicBold.ttf', 'https://2.ytsubtitleloader.tk/AssRenderer/assets/fonts/NanumBarunGothicUltraLight.ttf'],
            workerUrl: workerUrl, // Link to WebAssembly-based file "libassjs-worker.js"
            legacyWorkerUrl: legacyWorkerUrl // Link to non-WebAssembly worker
        };
        stlAssInstance = new SubtitlesOctopus(options);
        stlAssLoaded = true;
    }
    stlShowMessage(stlStrings.AssRenderLoaded);
    if (unselectDbSelect || typeof unselectDbSelect === 'undefined') {
        stlDbSelect.selectedIndex = 0;
        stlDbSelectPrevSelect = stlDbSelect.selectedIndex;
        changeYtVidTitle();
    }
}

// Function to load subtitles to the YT video
function stlShowSubtitle(src, unselectDbSelect) {
    ytSubtBtn = document.getElementsByClassName("ytp-subtitles-button ytp-button")[0];
    if (ytSubtBtn) {
        if (ytSubtBtn.getAttribute("aria-pressed") == "true") ytSubtBtn.click();
    }
    var srclang;
    if (stlAssLoaded) {
        document.getElementsByClassName("libassjs-canvas-parent")[0].remove();
        stlAssLoaded = false;
    }
    if (videoSubtitle.srclang) srclang = videoSubtitle.srclang;
    videoSubtitle.remove();
    videoSubtitle = document.createElement("track");
    videoSubtitle.label = "YTSubtitleLoader";
    videoSubtitle.default = true;
    videoSubtitle.src = src;
    if (srclang) videoSubtitle.srclang = srclang;
    video.appendChild(videoSubtitle);
    stlShowMessage(stlStrings.SubtitleLoaded);
    videoSubtitle.track.mode = "showing";
    if (unselectDbSelect || typeof unselectDbSelect === 'undefined') {
        stlDbSelect.selectedIndex = 0;
        stlDbSelectPrevSelect = stlDbSelect.selectedIndex;
        changeYtVidTitle();
    }
    if (stlSrtLoaded) stlVttLoaded = false;
    else stlVttLoaded = true, stlSrtLoaded = false;
};

// Function to show simple messages next to the STL UI
function stlShowMessage(str) {
    fadeIn(stlMessage);
    stlMessage.innerHTML = "| " + str;
    console.log("YTSubtitleLoader: " + str);
    clearTimeout(stlMessageTimer);
    stlMessageTimer = setTimeout(function () {
        fadeOut(stlMessage);
    }, 5000);
};

// Function to show a non-blocking modal alert
function stlAlert(str) {
    stlMessageBoxText.textContent = str;
    fadeIn(stlMessageBoxBackground);
}

// Functions to perform a fade-in/out animations for elements 
function fadeIn(elem) {
    var i = 0.1;
    elem.style.opacity = i;
    elem.style.filter = "alpha(opacity=" + i * 100 + ")";
    elem.style.display = "block";
    var interval = setInterval(function () {
        if (i >= 1){
            clearInterval(interval);
        }
        elem.style.opacity = i;
        elem.style.filter = "alpha(opacity=" + i * 100 + ")";
        i += i * 0.1;
    }, 5);
    setTimeout(function() {
        clearInterval(interval);
        elem.style.opacity = 1;
        elem.style.filter = "alpha(opacity=" + 100 + ")";
    }, 500);
}

function fadeOut(elem) {
    var i = 1; 
    var interval = setInterval(function () {
        if (i <= 0.1){
            clearInterval(interval);
            elem.style.display = "none";
        }
        elem.style.opacity = i;
        elem.style.filter = "alpha(opacity=" + i * 100 + ")";
        i -= i * 0.1;
    }, 5);
    setTimeout(function() {
        clearInterval(interval);
        elem.style.display = "none";
    }, 500);
}

// Change the YT video's title - currently a YTSL DB-only feature
function changeYtVidTitle(str) {
    if (typeof str !== 'undefined') {
        titleContainer = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0];
        if (!titleContainer) {
            var interval = setInterval(function () {
                clearInterval(interval);
                changeYtVidTitle(str);
            }, 300);
            return;
        }
        origTitle = titleContainer.childNodes[0];
        titleContainerFs = document.getElementsByClassName("ytp-title-text")[0];
        origTitleFs = titleContainerFs.childNodes[0];

        stlCustomVideoTitle.textContent = str;
        titleContainer.appendChild(stlCustomVideoTitle);
        origTitle.style.display = "none";

        stlCustomVideoTitleFs = origTitleFs.cloneNode(true);
        stlCustomVideoTitleFs.textContent = str;
        titleContainerFs.appendChild(stlCustomVideoTitleFs);
        origTitleFs.style.display = "none";

        document.title = str + " - YouTube";
    } else {
        try {
            stlCustomVideoTitle.remove();
            stlCustomVideoTitleFs.style.display = "none";
            stlCustomVideoTitleFs.remove();
            origTitle.style.display = "";
            origTitleFs.style.display = "";
            document.title = origTitleFs.textContent + " - YouTube";
        } catch (e) {
            console.log(e);
        }
    }
}

// Unload the subtitle - have to do this long to support many browsers
function stlClearTrack() {
    videoSubtitle.track.mode = "disabled";
    videoSubtitle.remove();
    videoSubtitle = document.createElement("track");
    videoSubtitle.label = "YTSubtitleLoader";
    videoSubtitle.default = true;
    videoSubtitle.src = "data:text/vtt,";
    video.appendChild(videoSubtitle);
}

// From https://github.com/silviapfeiffer/silviapfeiffer.github.io/blob/master/index.html - convert SRT data to VTT
function srt2webvtt(data) {
    // remove dos newlines
    var srt = data.replace(/\r+/g, '');
    // trim white space start and end
    srt = srt.replace(/^\s+|\s+$/g, '');
    // get cues
    var cuelist = srt.split('\n\n');
    var result = "";
    if (cuelist.length > 0) {
        result += "WEBVTT\n\n";
        for (var i = 0; i < cuelist.length; i=i+1) {
            result += convertSrtCue(cuelist[i]);
        }
    }
    return result;
}

function convertSrtCue(caption) {
    // remove all html tags for security reasons
    //srt = srt.replace(/<[a-zA-Z\/][^>]*>/g, '');
    var cue = "";
    var s = caption.split(/\n/);
    // concatenate muilt-line string separated in array into one
    while (s.length > 3) {
        for (var i = 3; i < s.length; i++) {
            s[2] += "\n" + s[i]
        }
        s.splice(3, s.length - 3);
    }
    var line = 0;
    // detect identifier
    if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
        cue += s[0].match(/\w+/) + "\n";
        line += 1;
    }
    // get time strings
    if (s[line].match(/\d+:\d+:\d+/)) {
        // convert time string
        var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
        if (m) {
            cue += m[1]+":"+m[2]+":"+m[3]+"."+m[4]+" --> "
                +m[5]+":"+m[6]+":"+m[7]+"."+m[8]+"\n";
            line += 1;
        } else {
            // Unrecognized timestring
            return "";
        }
    } else {
        // file format error or comment lines
        return "";
    }
    // get cue text
    if (s[line]) {
        cue += s[line] + "\n\n";
    }
    return cue;
}
