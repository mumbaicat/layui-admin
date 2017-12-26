const NotificationInstance = Notification || window.Notification;

function makeMassage(title,paramData){
    if (!!NotificationInstance) {
        const permissionNow = NotificationInstance.permission;
        if (permissionNow === 'granted') {//允许通知
            CreatNotification();
        } else if (permissionNow === 'denied') {
            console.log('用户拒绝了你!!!');
        } else {
            setPermission();
        }

        function setPermission(){
          //请求获取通知权限
          NotificationInstance.requestPermission(function (PERMISSION) {
            if (PERMISSION === 'granted') {
              CreatNotification();
            } else {
              console.log('用户无情残忍的拒绝了你!!!');
            }
          });
        }

        function CreatNotification() {
            const n = new NotificationInstance(title, paramData);
            n.onshow = function () {
                console.log('通知显示了！');
            }
            n.onclick = function (e) {
                //可以直接通过实例的方式获取data内自定义的数据
                //也可以通过访问回调参数e来获取data的数据
                window.open(n.data.url, '_blank');
                n.close();
            }
            n.onclose = function () {
                console.log('你墙壁了我！！！');
            }
            n.onerror = function (err) {
                console.log('出错了，小伙子在检查一下吧');
                throw err;
            }
            setTimeout(() => {
                n.close();
            }, 2000);
        }
    }
}

// makeMassage('标题咯',{
//     body: paramData.body,
//     tag: '2ue',
//     icon: 'https://2ue.github.io/images/common/avatar.png',
//     data: {
//         url: 'https://2ue.github.io'
//     }
// });
