
/* 获取数据并处理 */
function data_loading() {
    if (localStorage.ssid) {
        $("#login").hide();
        $(".loading").show();
        $.getJSON("../json/loading.json", {ssid: localStorage.ssid}, function(json) {
            //把标签的信息写入到本地
            localStorage.tags = JSON.stringify(json['tags']);
            eval_loading(json);
            $(".loading").hide();
            $(".main").show();
        });
    }
}

/*处理分配的数据*/

function eval_loading(json) {

    for (i_f in json.list) {
        folder = json.list[i_f];

        for (i_t in folder) {
            todo = folder[i_t];
            if (i_f === "finish") {

                todo_html = '<div class="todo" draggable="true"><span class="tag" id="tag_' + todo.tag + '" ></span><span class="finish_content" >'
                        + todo.content + '</span>'

                        + '</div>';
                $('#' + i_f + '>.todolist').append(todo_html);
            } else {
                todo_html = '<div class="todo" draggable="true"><span class="tag" id="tag_' + todo.tag + '" >' + gettagname(todo.tag) + '</span><span class="content" >'
                        + todo.content + '</span><span class="checked" data-id="' + todo.id + '"></span><div class="modify" ><textarea class="textarea" maxlength="84" rows="4" data-id="' + todo.id + '">'
                        + todo.content + '</textarea><div class="tool"><span class="tagslist" data-id="' + todo.id + '">'//下面是所有的标签
                        + eval_tags(todo.tag, json['tags']) + '</span>'

                        + '<span class="addnote"></span><span class="remind' + isremind(todo.remind) + '" data-id="' + todo.id + '"></span>'
                        + '</div></div></div>';
                $('#' + i_f + '>.todolist').append(todo_html);
            }
        }


    }


}

/*获取标签名字*/
function gettagname(id) {
    var tags = JSON.parse(localStorage.tags);
    if (id > 0) {
        name = tags[id].name;
    } else {
        name = "";
    }

    return name;
}

/*获得所有的标签tag添加到列表中的*/
function eval_tags(tagId, json) {

    var content = '';
    var is_have = false;
    var style_tag = '';
    for (i in json) {

        style_tag = style_tag + '#tag_' + json[i].id + '{background:' + json[i].color + ';}'
        if (json[i].id === tagId) {
            content = content + '<span class="tag" id="tag_' + json[i].id + '" style="display:block">' + json[i].name + '</span>';
            is_have = true;
            continue;
        }
        content = content + '<span class="tag" id="tag_' + json[i].id + '" data-id="' + json[i].id + '">' + json[i].name + '</span>';

    }
    $("style").html(style_tag);
    if (!is_have) {
        content = '<span class="tag" id="tag_0" data-id="0" style="display:block">默认</span>' + content;
    } else {
        content = '<span class="tag" id="tag_0" data-id="0" >默认</span>' + content;
    }
    return content;


}