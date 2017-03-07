
const notify = () => {
    const notification = new Notification('TITLE OF NOTIFICATION', {
      icon: 'http://carnes.cc/jsnuggets_avatar.jpg',
      body: "Hey! You are on notice!",
    });

    notification.onclick = function () {
      window.open("http://jasenpan.com");      
    };
    
    setTimeout(notification.close.bind(notification), 7000); 
}

const notifyMe = () => {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    }
    else if (Notification.permission === "granted") {
        notify();
    }
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                notify();
            }
        });
    }
}

export default notifyMe;