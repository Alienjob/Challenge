/** @jsx React.DOM */
var states = {neytral : "neitral", win : "win", lose:"lose", blocked : "blocked"}

var defaultData = {
    name : "Упражнение",    //заголовок упражнения
    state:0,                //статус - 0- нейтрально, 1- положительно, 2- отрицательно, 3 - заблокировано
    lastTime : -1,          //время последенго верного ответа. Если <0 то либо ответа не было либо он не верен
    level : 0,              //уровень набранного комбо. от 0 до 10
    score: 0,               //набранные очки
    question:"Вопрос",      //Строка вопроса
    oldQuestion:"Прошлый вопрос", //Строка описывающая предыдущий вопрос
    delayLimit: 30,          //время на ответ до сброса комбо
    answer: ""              //текст ответа пользователя
    
};

//ChallengeContainer
var rChallengeContainer = React.createClass({ 
    
    challenge : {},
    
    getInitialState: function() {
        return {
            cState  :   this.props.data
        };
    },
    handleUserInput: function(answerText) {
        this.challenge.answer = answerText;
        this.setState({
            cState: this.challenge
        });
    },
    onUserKeyPress: function(intKey) {
        if ( intKey === 13 ){
            this.challenge.verifyAnswer(this.challenge.answer);
            this.setState({
                cState: this.challenge
            });
        }
    },
    render: function() {
    this.challenge = this.props.data;
    
    return (
      <div className="ChallengeContainer">
        <rChallengeHeader data = {this.state.cState.name}/>
        <rChallengeScoreContainer data = {{lastTime : this.state.cState.lastTime, level : this.state.cState.level, score : this.state.cState.score}}/>
        <rChallengeQuestion data = {this.state.cState.question.toString()}/>
        <rChallengeAnswer data = {this.state.cState.answer} onUserInput={this.handleUserInput} onUserKeyPress = {this.onUserKeyPress}/>
        <rChallengeOldQuestion data = {this.state.cState.oldQuestion}/>
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
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value            
        );
    },
    getKeyCode: function(e) {
        var intKey = (window.Event) ? e.which : e.keyCode;
        this.props.onUserKeyPress(intKey);
    },
    componentDidMount: function() {
        this
            .getDOMNode()
            .offsetParent
            .addEventListener('keypress', this.getKeyCode);
    },
    
    render: function() {
        var cValue = "";
        if(this.props.data !== undefined )
            cValue  = this.props.data;
        return (
            <div className="ChallengeAnswer">
                <input 
                    type="text" 
                    value = {cValue}

                    ref="filterTextInput" 
                    onChange = {this.handleChange}
                    
                />
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

