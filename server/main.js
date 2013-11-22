Meteor.startup(function () {
  twilio = Twilio(Meteor.settings.Twilio.sid,
                  Meteor.settings.Twilio.auth);

  firebase = new Firebase('https://publicdata-bitcoin.firebaseio.com/');

  firebase.child("last").on("value", showPrice);
  // firebase.child("ask").on("value", showPrice);

  var previous,
      msg,
      delta,
      eps = 0.5;

  function showPrice(snapshot) {
    if (previous === undefined) {
      previous = snapshot;
    }

    delta = previous.val() - snapshot.val();

    if (Math.abs(delta) >= eps) {
      msg = 'BTC is now ' + snapshot.val() + ', ' + (delta > 0 ? 'down from ':'up from ') + previous.val();

      sendSMS(msg);
      previous = snapshot;
    }

    // Messages.insert({value: snapshot.name() + ": " + snapshot.val()})
    console.log(snapshot.name() + ": " + snapshot.val());
  }

  function sendSMS(msg) {
    // Messages.insert({value: 'SMS: ' + msg.toString()});
    console.log('SMS: ' + msg);

    // twilio.sendSms({
    //   to: '+16045052916',
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
  }

});

Meteor.publish("messages", function () {
  return Messages.find();
});
