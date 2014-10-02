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


var panel = ReactBootstrap.Panel;
var ProgressBar = ReactBootstrap.ProgressBar;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Input = ReactBootstrap.Input;
var Well  = ReactBootstrap.Well;
var OverlayTrigger  = ReactBootstrap.OverlayTrigger;
var Modal  = ReactBootstrap.Modal;
var ModalTrigger  = ReactBootstrap.ModalTrigger;

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
            this.refs.scoreContainer.refs.comboContainer.initState(this.challenge.lastTime);
        }
    },
    render: function() {
    this.challenge = this.props.data;
    var className = "ChallengeContainer";
    if (this.state.cState.state === this.challenge.states.win)
        className = "ChallengeContainerWin";
    if (this.state.cState.state === this.challenge.states.lose)
        className = "ChallengeContainerLose";
    if (this.state.cState.state === this.challenge.states.blocked)
        className = "ChallengeContainerBlocked";
    return (
        <panel className={className}>
          <rChallengeHeader data = {{name : this.state.cState.name, loged : challengeManager.userdata.loged}}/>
          <rChallengeScoreContainer ref = 'scoreContainer' data = {{lastTime : this.state.cState.lastTime, delayLimit : this.state.cState.delayLimit, level : this.state.cState.level, score : this.state.cState.score}}/>
          <rChallengeQuestion data = {this.state.cState.question.toString()}/>
          <rChallengeAnswer data = {this.state.cState.answer} onUserInput={this.handleUserInput} onUserKeyPress = {this.onUserKeyPress}/>
          <rChallengeOldQuestion data = {this.state.cState.oldQuestion}/>
        </panel>
    );
  }
  });

//ChallengeHeader
var rChallengeHeader = React.createClass({
  render: function() {
    return (
      <Well bsSize="small" className="ChallengeHeader">
      <ButtonToolbar>
      <rChallengeName data = {this.props.data.name}/>
        <div  className="ChallengeButtonsGroup">
          <ButtonGroup  className="ChallengeButtonsGroup">
            <rChallengeLogin data = {this.props.data.loged} />
            <rChallengeSocial data = {this.props.data.loged}/>
            <rChallengeStat data = {this.props.data.loged}/>
            <rChallengeHelp/>
        </ButtonGroup>
        </div>
      </ButtonToolbar>
      </Well>
    );
  }
  });

//ChallengeScoreContainer
var rChallengeScoreContainer = React.createClass({
  render: function() {
    return (
      <div  className="ChallengeScoreContainer">     
        <rChallengeComboContainer  ref = 'comboContainer' data = {{lastTime : this.props.data.lastTime, delayLimit : this.props.data.delayLimit, level : this.props.data.level}} /> 
        <rChallengeScore data = {this.props.data.score}/>
      </div>
    );
  }
  });

//ChallengeComboContainer
var rChallengeComboContainer = React.createClass({
  getInitialState: function() {
    return {slevel: 0, stime:100, sLastTime : -1};
  },
  initState : function(lastTime){
      var stime = 0;
      var slevel = 0;
      if (lastTime !==  this.state.sLastTime){
          if(lastTime === -1){
            clearInterval(this.interval);
            }
          else{
            stime = 100;
            slevel = this.props.data.level; 
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, 1000)
            } 
        this.setState({slevel: slevel, stime : stime, sLastTime : lastTime});
      }
  },
  tick: function() {
    var stime = this.state.stime;
    var slevel = this.state.slevel;
    if (stime > 0) {
        stime -= 1000 * 100/this.props.data.delayLimit;
    }else{
        stime  = 0;
        slevel = 0;
        clearInterval(this.interval);
    }
    this.setState({stime: stime, slevel : slevel, sLastTime : this.state.sLastTime});
  },
  render: function() {
    return (
      <div className="ChallengeComboContainer">
        <rChallengeComboTime data = {this.state.stime}/>
        <rChallengeComboLevel data = {this.state.slevel}/>
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

//ChallengeLogin
var rLogin = React.createClass({
  render: function() {
    return this.transferPropsTo(
        <Modal title="Выберите способ входа:">
          <div className="modal-body">
            <p><div id="uLogin" data-ulogin="display=panel;fields=first_name,last_name;providers=vkontakte,odnoklassniki,mailru,facebook;hidden=other;redirect_uri=''; callback=callbackUlogin"></div></p>
          </div>
        </Modal>
      );
  }
});  

var rChallengeLogin = React.createClass({
  render: function() {
      console.log(this.props.data);
    if (this.props.data === true)
        return (
          <div className="ChallengeLogin">
          </div>
            );
    else
        return (
          <div className="ChallengeLogin">
             <ModalTrigger modal={<rLogin />}> 
                <Button bsStyle="default" bsSize="xsmall"><Glyphicon glyph="user" /></Button>
             </ModalTrigger>
          </div>
        );
  }
  });
  
//ChallengeSocial
var rChallengeSocial = React.createClass({
  render: function() {
    if (this.props.data === false)
        return (
            <div className="ChallengeSocial" >
            </div>
              );
    else
        return (
            <div className="ChallengeSocial" >
              <Button bsSize="xsmall"><Glyphicon glyph="comment" /></Button>
          </div>
        );
  }
  });

//ChallengeStat
var rChallengeStat = React.createClass({
  render: function() {
    if (this.props.data === false)
        return (
          <div className="ChallengeStat" >
          </div>
            );
    else
        return (
          <div className="ChallengeStat" >
              <Button bsSize="xsmall"><Glyphicon glyph="signal" /></Button>
          </div>
        );
  }
  });

//ChallengeHelp
var rChallengeHelp = React.createClass({
  render: function() {
    return (
      <div className="ChallengeHelp">
          <Button bsSize="xsmall">?</Button>
      </div>
    );
  }
  });



//ChallengeComboTime
var rChallengeComboTime = React.createClass({
  render: function() {
   var cValue = 0;
    if(this.props.data !== undefined )
    {
        cValue =   this.props.data;
    }

     return (
      <div className="ChallengeComboTime">
        <ProgressBar bsStyle="info" now={cValue} />
      </div>
    );
  }
  });
  
//ChallengeComboLevel
var rChallengeComboLevel = React.createClass({
  render: function() {
   var cValue = 0;
    if(this.props.data !== undefined )
        cValue  = this.props.data;
    return (
      <div className="ChallengeComboLevel">
        <ProgressBar bsStyle="success" now={10*cValue} />
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
        <h3>{cValue}</h3>
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

