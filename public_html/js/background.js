
var fatherId = chrome.contextMenus.create({"title": "添加到@todo","contexts":["all"]}); 
var selection = chrome.contextMenus.create({"title": "今天","contexts":["all"],"onclick":add2today,"parentId":fatherId}); 
var selection = chrome.contextMenus.create({"title": "明天","contexts":["all"],"onclick":add2tomorrow,"parentId":fatherId}); 
var selection = chrome.contextMenus.create({"title": "本周","contexts":["all"],"onclick":add2week,"parentId":fatherId}); 
var selection = chrome.contextMenus.create({"title": "以后","contexts":["all"],"onclick":add2later,"parentId":fatherId}); 
var selection = chrome.contextMenus.create({"title": "备忘","contexts":["all"],"onclick":add2note,"parentId":fatherId});
  

getTodayCount();
setInterval(function(){
	getRemind();
	getTodayCount();
},300000);
	
	


