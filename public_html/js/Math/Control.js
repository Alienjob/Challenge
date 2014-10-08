/** @jsx React.DOM */


renderChallenge = function(name, elementID, initData, challengeManager){
    var challenge = challengeManager.addChallenge(name, initData);
       for(var i in challengeManager.challenges) {
            if (!challengeManager.challenges.hasOwnProperty(i)) continue;
        }
    React.renderComponent(
        <rChallengeContainer data = {challenge}/>,
        document.getElementById(elementID)
 );
};
      