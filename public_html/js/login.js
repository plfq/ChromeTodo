


$(document).ready(function() {
    if (localStorage.ssid) {
        data_loading();
    } else {
        //监听登陆按钮
        $("#login_button").click(function() {
            var email_val = $("#email").val();
            var psw_val = $("#password").val();
            $.getJSON("../json/login.json", {email: email_val, password: psw_val}, function(data) {
                if (data.status) {
                    localStorage.ssid = data.ssid;
                    data_loading();
                } else {
                    $(".login_msg").html('登陆失败！');
                }
            });
        });
    }
});
