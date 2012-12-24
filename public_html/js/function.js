function getAjaxReturn(success_function, fail_function)
{
    var bol = false;
    $.ajax({type: "POST", url: "ajax/userexist.aspx", data: "username=" + vusername.value, success: function(msg) {
            if (msg == "ok") {
                showtipex(vusername.id, "<img src='images/ok.gif'/><b><font color='#ffff00'>该用户名可以使用</font></b>", false)
                success_function(msg);
            }
            else
            {
                showtipex(vusername.id, "<img src='images/cancel.gif'/><b><font color='#ffff00'>该用户已被注册</font></b>", false);
                vusername.className = "bigwrong";
                fail_function(msg);
//return false; 
            }
        }
    });
}
function success_function(info)
{
//do what you want do 
    alert(info);
}
function fail_function(info)
{
//do what you want do 
    alert(info);
}

//exlampl end

function send(action, data) {
    if (localStorage.ssid) {
        data = json2one(data, {ssid: localStorage.ssid});
    }

    url = "../json/" + action.obj + '_' + action.action + '.json';
    $.getJSON(url, data, function(json) {
        r = json;
    });
    return r;
}

function modify(data, action) {
    if (action === undefined) {
        action = 'one';
    }
    r = send({obj: 'Modify', action: action}, data);
    return r;
}


/*Old code*/
/*  发送修改的消息 */
function modifySend(data) {

    data = json2one(data, {ssid: localStorage.ssid});
    $.getJSON("http://todoapi.sinaapp.com/index.php/Modify/one", data, function(json) {
        return true;
    });
}

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
