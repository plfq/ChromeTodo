
var fatherId = chrome.contextMenus.create({"title": "添加到@todo", "contexts": ["all"]});
var selection = chrome.contextMenus.create({"title": "今天", "contexts": ["all"], "onclick": add2today, "parentId": fatherId});
var selection = chrome.contextMenus.create({"title": "明天", "contexts": ["all"], "onclick": add2tomorrow, "parentId": fatherId});
var selection = chrome.contextMenus.create({"title": "本周", "contexts": ["all"], "onclick": add2week, "parentId": fatherId});
var selection = chrome.contextMenus.create({"title": "以后", "contexts": ["all"], "onclick": add2later, "parentId": fatherId});
var selection = chrome.contextMenus.create({"title": "备忘", "contexts": ["all"], "onclick": add2note, "parentId": fatherId});

/*监听右键菜单*/
function add2today(info, tab) {
    addtodo({floder: 'today', content: info.selectionText});
}
function add2tomorrow(info, tab) {
    addtodo({floder: 'tomorrow', content: info.selectionText});
}
function add2week(info, tab) {
    addtodo({floder: 'week', content: info.selectionText});
}
function add2later(info, tab) {
    addtodo({floder: 'later', content: info.selectionText});
}
function add2note(info, tab) {
    addtodo({floder: 'note', content: info.selectionText});
}
getTodayCount();
setInterval(function() {
    getRemind();
    getTodayCount();
}, 300000);




