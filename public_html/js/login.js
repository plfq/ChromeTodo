


$(document).ready(function() {
    if (localStorage.ssid) {
        data_loading();
    } else {
        //监听登陆按钮
        $("#login_button").click(function() {
            
            var email_val = $("#email").val();
            var psw_val = $("#password").val();
            r = send({obj: 'login', action: 'index'}, {email: email_val, password: psw_val});
            
            if (r.status) {
                localStorage.ssid = r.ssid;
                data_loading();
            } else {
                $(".login_msg").html('登陆失败！');
            }
        });
    }
});
