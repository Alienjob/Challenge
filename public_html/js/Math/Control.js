/** @jsx React.DOM */


renderChallenge = function(name, elementID, initData, challengeManager){
    var challenge = challengeManager.addChallenge(name, initData);
       for(var i in challengeManager.challenges) {
            if (!challengeManager.challenges.hasOwnProperty(i)) continue;
        }
    var that = this;
    
    var options = {
      dataType: "script",
      cache: true,
      url: "https://www.google.com/jsapi",
    };
    jQuery.ajax(options).done(function(){
      google.load("visualization", "1", {
        packages:["corechart"],
        callback: function() {
            React.renderComponent(
              <rChallengeContainer data = {challenge}/>,
              document.getElementById(elementID)
            );
        }
      });
    }); 
};
      