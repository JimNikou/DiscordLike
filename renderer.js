const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
/*
const func = async () => {
    const response = await window.versions.showNotification()
    new Notification({ title: "notification_title", body: "notification_main_body" }).show()
    console.log("response")
  }
  
  func()*/