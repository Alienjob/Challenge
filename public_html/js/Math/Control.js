/** @jsx React.DOM */
var manager = new ChallengeManagerMath();

renderChallenge = function(name, elementID, initData){
    var challenge = manager.addChallenge(name, initData);
    React.renderComponent(
        <rChallengeContainer data = {challenge}/>,
        document.getElementById(elementID)
 );
}
