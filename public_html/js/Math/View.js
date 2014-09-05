/** @jsx React.DOM */

var defaultData = {
    name : "Упражнение",    //заголовок упражнения
    state:0,                //статус - 0- нейтрально, 1- положительно, 2- отрицательно, 3 - заблокировано
    lastTime : -1,          //время последенго верного ответа. Если <0 то либо ответа не было либо он не верен
    level : 0,              //уровень набранного комбо. от 0 до 10
    score: 0,               //набранные очки
    question:"Вопрос",      //Строка вопроса
    oldQuestion:"Прошлый вопрос" //Строка описывающая предыдущий вопрос
};


//ChallengeContainer
var rChallengeContainer = React.createClass({ 
    
  render: function() {
    return (
      <div className="ChallengeContainer">
        <rChallengeHeader data = {this.props.data.name}/>
        <rChallengeScoreContainer data = {{lastTime : this.props.data.lastTime, level : this.props.data.level, score : this.props.data.score}}/>
        <rChallengeQuestion data = {this.props.data.question}/>
        <rChallengeAnswer/>
        <rChallengeOldQuestion data = {this.props.data.oldQuestion}/>
      </div>
    );
  }
  });

//ChallengeHeader
var rChallengeHeader = React.createClass({
  render: function() {
    return (
      <div className="ChallengeHeader">
        <rChallengeName data = {this.props.data}/>
        <div  className="ChallengeButtonsGroup">
            <rChallengeSocial/>
            <rChallengeStat/>
            <rChallengeHelp/>
        </div>
      </div>
    );
  }
  });

//ChallengeScoreContainer
var rChallengeScoreContainer = React.createClass({
  render: function() {
    return (
      <div className="ChallengeScoreContainer">
        <rChallengeComboContainer   data = {{lastTime : this.props.data.lastTime, level : this.props.data.level}} />
        <rChallengeScore            data = {this.props.data.score}/>
      </div>
    );
  }
  });

//ChallengeComboContainer
var rChallengeComboContainer = React.createClass({
  render: function() {
    return (
      <div className="ChallengeComboContainer">
        <rChallengeComboTime data = {this.props.data.lastTime}/>
        <rChallengeComboLevel data = {this.props.data.level}/>
      </div>
    );
  }
  });



// ChallengeName
var rChallengeName = React.createClass({
  render: function() {
    var cValue = "Name";
    if(this.props.data !== undefined )
        cValue  = this.props.data;
    return (
      <div className="ChallengeName">
            {cValue}
      </div>
    );
  }
  });
  
//ChallengeSocial
var rChallengeSocial = React.createClass({
  render: function() {
    return (
      <div className="ChallengeSocial">
          Social
      </div>
    );
  }
  });

//ChallengeStat
var rChallengeStat = React.createClass({
  render: function() {
    return (
      <div className="ChallengeStat">
          Stat
      </div>
    );
  }
  });

//ChallengeHelp
var rChallengeHelp = React.createClass({
  render: function() {
    return (
      <div className="ChallengeHelp">
          Help
      </div>
    );
  }
  });



//ChallengeComboTime
var rChallengeComboTime = React.createClass({
  render: function() {
   var cValue = "Combo time : ";
    if(this.props.data !== undefined )
        cValue  += this.props.data;
     return (
      <div className="ChallengeComboTime">
          {cValue}
      </div>
    );
  }
  });
  
//ChallengeComboLevel
var rChallengeComboLevel = React.createClass({
  render: function() {
   var cValue = "Combo level : ";
    if(this.props.data !== undefined )
        cValue  += this.props.data;
    return (
      <div className="ChallengeComboLevel">
          {cValue}
      </div>
    );
  }
  });
  
//ChallengeScore
var rChallengeScore = React.createClass({
  render: function() {
  var cValue = "Score : ";
    if(this.props.data !== undefined )
        cValue  += this.props.data;
     return (
      <div className="ChallengeScore">
          {cValue}
      </div>
    );
  }
  });



//ChallengeQuestion
var rChallengeQuestion = React.createClass({
  render: function() {
    var cValue = "Question";
    if(this.props.data !== undefined )
        cValue  = this.props.data;
    return (
      <div className="ChallengeQuestion">
        {cValue}
      </div>
    );
  }
  });

//ChallengeAnswer
var rChallengeAnswer = React.createClass({
  render: function() {
    return (
      <div className="ChallengeAnswer">
        <input type="text"/>
      </div>
    );
  }
  });

//ChallengeOldQuestion
var rChallengeOldQuestion = React.createClass({
  render: function() {
    var cValue = "Old question";
    if(this.props.data !== undefined )
        cValue  = this.props.data;
     return (
      <div className="ChallengeOldQuestion">
        {cValue}
      </div>
    );
  }
  });

