const {Notification} = require('electron');

exports.show = async (notification_title,notification_main_body) => {    
    new Notification({ title: notification_title, body: notification_main_body }).show()
}