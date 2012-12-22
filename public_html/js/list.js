$(document).ready(function() {
	
	
	/*监听完成按钮*/
	
	$(".checked").live('click',function(){
		
		r = modifySend({
            todoId: $(this).attr("data-id"),
            key: 'finish',
            value: '1'
        });
		$(this).parent().remove();
	});
	
	/*切换到已完成列表*/
	
	$(".finish_list_button").click(function(){
		$('.listbox').hide();
		$('.finish_list').show();
		
	});
	
	$(".todo_list").click(function(){
		$('.listbox').show();
		$('.finish_list').hide();
	});
	
	/* 监听切换到setting目录 */
	$(".user_center").click(function(){
	
		if($(".settag").nextAll(".setone-check").length <1){
		
			var json = JSON.parse(localStorage.tags);
			
			var html_tmpl= "";
			for (i in json) {
				html_tmpl = html_tmpl+'<div class="setone setone-check">标签：<input type="text" data-type="name" data-value="'+json[i].name+'" data-id="'+json[i].id+'" value="'+json[i].name+'" class="tagname"/> 颜色代码：<input type="text" data-type="color" data-value="'+json[i].color+'" data-id="'+json[i].id+'" value="'+json[i].color+'" class="tagcolor"/></div>'
				
			}
			$(".settag").after(html_tmpl);
		}
		$(".main").hide();
		$(".seting").show();
	
	});
	
	$(".setone [type=button]").click(function(){
		if($(this).attr("id")=="setsubmit"){
			var data={};
			for(i=0; i<= $(".setone-check input").length;i++){

				if($(".setone-check input:eq("+i+")").attr("data-value") !=$(".setone-check input:eq("+i+")").val()){
					data[i] = {id:$(".setone-check input:eq("+i+")").attr("data-id"),key:$(".setone-check input:eq("+i+")").attr("data-type"),value:$(".setone-check input:eq("+i+")").val()};
				}
			}
			
		
		
		modifytag(data);
		}
		
		$(".main").show();
		$(".seting").hide();
	});
	
    /* 监听标题的 */
    $(".title :not(.addtodo)").click(function() {
        $(this).parent().next().fadeToggle("normal");
    });
	
	/*添加新todo*/
	$(".addtodo").click(function(){
		var folder = $(this).parent().parent().attr("id");
		$(".main").hide();
		$("#newtodo").show();
	});
	/*监听对文件夹的选择*/
	$("#newtodo .folder .folderone").click(function(){
		$(this).siblings().removeAttr('id');
		$(this).attr("id",'folderchecked');
	
	});
	/*监听新增保存或者取消按钮的事件*/
	$("#newtodo .input input").click(function(){
		if($(this).attr("data-type")=="add"){
			var todo_folder = $(this).parent().prev('.folder').children("#folderchecked").attr("data-id");
			var todo_content = $(this).parent().prevAll('textarea').val();
			data={content:todo_content,folder:todo_folder,istmpl:1};
			var json = addtodo(data);
			
		}
		$("#newtodo .folder .folderone").removeAttr('id');
		$(".main").show();
		$("#newtodo").hide();
	
	});

	
    /* 监听单击打开编辑页面 */
    $(".todo .content").live('click',
    function() {

        /* 处理其他的编辑页面 */

        $(".modify:visible").siblings('span[class!=checked]').slideDown();
        $('span.checked').removeAttr('style');
        $(".modify:visible").parent().css({
            'background': "transparent",
            'height': "40px"
        });
        $(".modify:visible").slideUp();

        /* 处理这个编辑的页面 */
        $(this).parent().css({
            'background': "#EEEEEE",
            'height': "auto"
        });
        $(this).siblings('.modify').slideDown();
        $(this).hide();
        $(this).siblings('span').slideUp();
    });

    /* 监听编辑todo的enter保存 */
    $(".textarea").live('keydown',
    function() {

        if (event.keyCode == 13) {

            new_content = $(this).val();

            $(this).parent().siblings(".content").html(new_content);
            r = modifySend({
                todoId: $(this).attr("data-id"),
                key: 'content',
                value: new_content
            });
            //不管是否Ajax成功也这么处理
            $(".modify:visible").siblings('span[class!=checked]').slideDown();
            //一处标签的style属性
            $('span.checked').removeAttr('style');
            $(".modify:visible").parent().css({
                'background': "transparent",
                'height': "40px"
            });
            $(".modify:visible").slideUp();
            return false;
        }

    });

    /* 监听标签修改 */
    $(".modify .tool .tagslist .tag").live('click',
    function() {
        var tagId = $(this).attr('data-id');

        r = modifySend({
            todoId: $(this).parent().attr('data-id'),
            key: 'tag',
            value: tagId
        });
        $(this).parent().children().hide().removeAttr('style');;
        $(this).show();

    });

    /* 监听提醒设置 */
    $(".remind").live('click',
    function() {
        $(".main").hide();
		$("#set_remind").attr("data-id",$(this).attr("data-id"));
        $(".remindbox").show();
		
        //初始化日期插件
        $('#datepicker').datepicker({
            minDate: -0,
            //可以选择的最小日期,
            Datepicker: true,
            altField: '#date_day',
            showOn: 'both',
            buttonText: '选择日期',
            dateFormat: 'yy-mm-dd',
            clearText: '清除',
            closeText: '关闭',
            prevText: '前一月',
            nextText: '后一月',
            currentText: ' ',
            monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        });

    });
	
	/*监听设置提醒时间*/
	$("#set_remind").live('click',
    function() {
		var date_day = $("#date_day").val();
		var date_hour = $("#date_hour").val();
		var date_min = $("#date_min").val();
		r = modifySend({todoId:$(this).attr("data-id"),key:'remind',value:date_day+' '+date_hour+':'+date_min});
		$(".remindbox").hide();
		$(".main").show();
	
	});
	
	/*监听返回按钮*/
	$("#remindback").live('click',
    function() {
		$(".remindbox").hide();
		$(".main").show();
	});


});