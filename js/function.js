


/*Old code*/
/*  发送修改的消息 */
function modifySend(data) {

    data = json2one(data, {ssid: localStorage.ssid});
    $.getJSON("http://todoapi.sinaapp.com/index.php/Modify/one", data, function(json) {
        return true;
    });
}



/*添加到目录和Ajax操作*/
function addtodo(data) {
    data = json2one(data, {ssid: localStorage.ssid});
    $.getJSON("http://todoapi.sinaapp.com/index.php/Modify/add", data, function(json) {

        if (data.istmpl) {
            todo_html = '<div class="todo" draggable="true"><span class="tag" id="tag_0" ></span><span class="content" >'
                    + data.content + '</span><span class="checked"></span><div class="modify" ><textarea class="textarea" maxlength="84" rows="4" data-id="' + json.id + '">'
                    + data.content + '</textarea><div class="tool"><span class="tagslist">'//下面是所有的标签
                    + eval_tags(0, JSON.parse(localStorage.tags)) + '</span>'
                    + '<span class="addnote"></span><span class="remind" data-id="' + json.id + '"></span>'
                    + '</div></div</div>';
            $('#' + data.folder + '>.todolist').append(todo_html);
        }

        return json;
    });
}

/*检查是否设置了提醒*/
function isremind(data) {
    if (data > 1) {
        return ' remind_true';
    } else {
        return '';
    }
}
/*修改标签*/
function modifytag(data) {

    data = {ssid: localStorage.ssid, tags: data};
    $.getJSON("http://todoapi.sinaapp.com/index.php/Modify/modifyTag", data, function(json) {
        return json;
    });
}
/*合并两个json*/
function json2one(des, src, override) {
    if (src instanceof Array) {
        for (var i = 0, len = src.length; i < len; i++)
            json2one(des, src[i], override);
    }
    for (var i in src) {
        if (override || !(i in des)) {
            des[i] = src[i];
        }
    }
    return des;
}


/*检查今天的头都数目，后台使用*/
function getTodayCount() {
    data = {ssid: localStorage.ssid};
    $.getJSON("http://todoapi.sinaapp.com/index.php/GetList/getTodayCount", data, function(json) {
        if (json.status) {
            chrome.browserAction.setBadgeText({
                text: json.count
            });
        }
    });
}

/*检查是否有提醒到时*/
function getRemind() {
    data = {ssid: localStorage.ssid};
    $.getJSON("http://todoapi.sinaapp.com/index.php/GetList/getRemind", data, function(json) {
        if (json.status) {
            for (i in json.data) {
                notification = webkitNotifications.createNotification(
                        'http://www.sikcc.com/logo.png',
                        '您有Todo提醒',
                        json.data[i].content
                        );
                notification.show();
            }
        }
    });
}
