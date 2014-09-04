/** @jsx React.DOM */




//ChallengeContainer
var RChallengeContainer = React.createClass({ 
  render: function() {
    return (
      <div className="ChallengeContainer">
        <RChallengeHeader/>
        <RChallengeScoreContainer/>
        <RChallengeQuestion/>
        <RChallengeAnswer/>
        <RChallengeOldQuestion/>
      </div>
    );
  }
  });

//ChallengeHeader
var RChallengeHeader = React.createClass({
  render: function() {
    return (
      <div className="ChallengeHeader">
        <RChallengeName/>
        <RChallengeSocial/>
        <RChallengeStat/>
        <RChallengeHelp/>
      </div>
    );
  }
  });

//ChallengeScoreContainer
var RChallengeScoreContainer = React.createClass({
  render: function() {
    return (
      <div className="ChallengeScoreContainer">
        <RChallengeComboContainer/>
        <RChallengeScore/>
      </div>
    );
  }
  });

//ChallengeComboContainer
var RChallengeComboContainer = React.createClass({
  render: function() {
    return (
      <div className="ChallengeComboContainer">
        <RChallengeComboTime/>
        <RChallengeComboLevel/>
      </div>
    );
  }
  });



// ChallengeName
var RChallengeName = React.createClass({
  render: function() {
    return (
      <div className="ChallengeName">
          Name
      </div>
    );
  }
  });
  
//ChallengeSocial
var RChallengeSocial = React.createClass({
  render: function() {
    return (
      <div className="ChallengeSocial">
          Social
      </div>
    );
  }
  });

//ChallengeStat
var RChallengeStat = React.createClass({
  render: function() {
    return (
      <div className="ChallengeStat">
          Stat
      </div>
    );
  }
  });

//ChallengeHelp
var RChallengeHelp = React.createClass({
  render: function() {
    return (
      <div className="ChallengeHelp">
          Help
      </div>
    );
  }
  });



//ChallengeComboTime
var RChallengeComboTime = React.createClass({
  render: function() {
    return (
      <div className="ChallengeComboTime">
          Combo time
      </div>
    );
  }
  });
  
//ChallengeComboLevel
var RChallengeComboLevel = React.createClass({
  render: function() {
    return (
      <div className="ChallengeComboLevel">
          Combo level
      </div>
    );
  }
  });
  
//ChallengeScore
var RChallengeScore = React.createClass({
  render: function() {
    return (
      <div className="ChallengeScore">
          Score
      </div>
    );
  }
  });



//ChallengeQuestion
var RChallengeQuestion = React.createClass({
  render: function() {
    return (
      <div className="ChallengeQuestion">
        Question
      </div>
    );
  }
  });

//ChallengeAnswer
var RChallengeAnswer = React.createClass({
  render: function() {
    return (
      <div className="ChallengeAnswer">
        <input type="text"/>
      </div>
    );
  }
  });

//ChallengeOldQuestion
var RChallengeOldQuestion = React.createClass({
  render: function() {
    return (
      <div className="ChallengeOldQuestion">
        Old question
      </div>
    );
  }
  });

React.renderComponent(
  <RChallengeContainer/>,
  document.getElementById('content')
);
