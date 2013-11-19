Meteor.startup(function () {
  twilio = Twilio(Meteor.settings.Twilio.sid,
                  Meteor.settings.Twilio.auth);

  twilio.listSms({
    // from:'+16042272151'
  }, function (err, responseData) {
    responseData.smsMessages.forEach(function(message) {
        console.log('Message sent on: '+message.dateCreated.toLocaleDateString()+message.from+message.to+message.status);
        console.log(message.body);
    });
  });

  // twilio.sendSms({
  //   to:'+16045052916',
  //   from: '+16042272151',
  //   body: 'BTC is on fire!'
  // }, function(err, responseData) { //this function is executed when a response is received from Twilio
  //   if (!err) { // "err" is an error received during the request, if any
  //     // "responseData" is a JavaScript object containing data received from Twilio.
  //     // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
  //     // http://www.twilio.com/docs/api/rest/sending-sms#example-1
  //     console.log(responseData.from); // outputs "+14506667788"
  //     console.log(responseData.body); // outputs "word to your mother."
  //   }
  // });
});

