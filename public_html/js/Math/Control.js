/** @jsx React.DOM */
var challengeManager = new ChallengeManagerMath();

renderChallenge = function(name, elementID, initData){
    var challenge = challengeManager.addChallenge(name, initData);
    React.renderComponent(
        <rChallengeContainer data = {challenge}/>,
        document.getElementById(elementID)
 );
}
  function callbackUlogin(token){
            challengeManager.ulogin(token);
        }
      