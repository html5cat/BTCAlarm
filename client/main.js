Meteor.subscribe("parties");

Template.hello.greeting = function () {
  return "Welcome to BTCAlarm.";
};

Template.hello.messages = function () {
  return Messages.find({});
}

Template.hello.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
});
