export function ntpserver(rule, value, callback) {
    console.log('rule',rule)
    console.log('value',value)
    callback(new Error('请输入密码'));
    /*
    if(ntp_server1 != '') {
        if(!check_domain(ntp_server1)) {
            var rstr = language('js check domain','Invalid domain or IP address.');
            return false;
        }
    }*/

}