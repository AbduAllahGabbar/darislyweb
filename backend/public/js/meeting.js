(function () {
  const meetingConfig = JSON.parse(
    document.currentScript.getAttribute("meetingConfig")
  );
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  function beginJoin(signature) {
    ZoomMtg.init({
      leaveUrl: "https://zoom.us/",
      meetingInfo: [],
      disableInvite: true,
      disableRecord: true,
      showMeetingHeader: false,
      success: function () {
        $.i18n.reload("en-US");
        ZoomMtg.join({
          meetingNumber: window.atob(meetingConfig.browserVersion),
          userName: meetingConfig.userName,
          signature: window.atob(signature),
          apiKey: meetingConfig.apiKey,
          userEmail: meetingConfig.userEmail,
          passWord: window.atob(meetingConfig.audioEncoding),
          error: function (res) {
            console.log(res);
          },
        });
      },
      error: function (res) {
        console.log(res);
      },
    });
  }

  beginJoin(meetingConfig.signature);
})();
