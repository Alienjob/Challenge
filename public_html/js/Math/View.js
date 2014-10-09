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
    
    //каждую секунду обновляем состояние
    tick: function() {
        if (this.flagTick === true)
        {
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, 1000)
            this.flagTick = false;
        }
        if ((!this.challenge.minimize) && (!this.challenge.showhelp) &&(!this.challenge.showstat))
            this.refs.scoreContainer.refs.comboContainer.initState(this.challenge.lastTime, this.challenge.level);
        this.setState({
            cState: this.challenge
        });
    },
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

            clearInterval(this.interval);
            this.interval = setInterval(this.tick, 200);
            this.flagTick = true;
        }
    },
    minimize: function(){
        this.challenge.minimize = !(this.challenge.minimize);
        this.setState({
            cState: this.challenge
        });
    },
    showhelp: function(){
        if (this.challenge.showhelp){
            this.challenge.showhelp = false;
        }else{
            this.challenge.showhelp = true;
            this.challenge.showstat = false;
        }
        
        this.setState({
            cState: this.challenge
        });
    },
    showstat: function(){
        this.challenge.refreshStat();
        if (this.challenge.showstat){
            this.challenge.showstat = false;
        }else{
            this.challenge.showstat = true;
            this.challenge.showhelp = false;
        }
        
        this.setState({
            cState: this.challenge
        });
    },
    render: function() {
    
    this.challenge = this.props.data;

    clearInterval(this.interval);
    this.interval = setInterval(this.tick, 1000)
    this.flagTick = false;

    var className = "ChallengeContainer";
    if (this.state.cState.state === this.challenge.states.win)
        className = "ChallengeContainerWin";
    if (this.state.cState.state === this.challenge.states.lose)
        className = "ChallengeContainerLose";
    if (this.state.cState.state === this.challenge.states.blocked)
        className = "ChallengeContainerBlocked";
    var scoreData = {minimize : this.state.cState.minimize, lastTime : this.state.cState.lastTime, delayLimit : this.state.cState.delayLimit, level : this.state.cState.level, score : this.state.cState.score};
    if (this.state.cState.showhelp)
        return (
        <panel className={className}>
          <rChallengeHeader data = {{name : this.state.cState.name, loged : challengeManager.userdata.loged}} minimize={this.minimize} showhelp = {this.showhelp} showstat = {this.showstat}/>
            <rChallengeHelpText/>
        </panel>
        );
    if (this.state.cState.showstat) 
    {
        var data =  [['day', 'point']];
        for(var i in this.state.cState.stat) {
            data.push([this.state.cState.stat[i].day + '' ,this.state.cState.stat[i].point]);
        }
        return (
        <panel className={className}>
          <rChallengeHeader data = {{name : this.state.cState.name, loged : challengeManager.userdata.loged}} minimize={this.minimize} showhelp = {this.showhelp} showstat = {this.showstat}/>
            <rChallengeShowStat data = {data} />
        </panel>
        );
    }
    return (
        <panel className={className}>
          <rChallengeHeader data = {{name : this.state.cState.name, loged : challengeManager.userdata.loged}} minimize={this.minimize} showhelp = {this.showhelp} showstat = {this.showstat}/>
          <rChallengeScoreContainer ref = 'scoreContainer' data = {scoreData}/>
          <rChallengeQuestion data = {this.state.cState.question.toString()}/>
          <rChallengeAnswer data = {this.state.cState.answer} onUserInput={this.handleUserInput} onUserKeyPress = {this.onUserKeyPress}/>
          <rChallengeOldQuestion data = {this.state.cState.oldQuestion}/>
        </panel>
    );
  }
  });

//ChallengeHeader
var rChallengeHeader = React.createClass({
  headerClick:function(){
    this.props.minimize();
  },
  render: function() {
    return (
      <Well bsSize="small" className="ChallengeHeader" >
      <ButtonToolbar>
      <rChallengeName data = {this.props.data.name}/>
        <div  className="ChallengeButtonsGroup">
          <ButtonGroup  className="ChallengeButtonsGroup">
            <rChallengeLogin data = {this.props.data.loged} />
            <rChallengeStat data = {this.props.data.loged} onClick = {this.props.showstat}/>
            <rChallengeSocial data = {this.props.data.loged}/>
            <rChallengeMinimize onClick = {this.headerClick}/>
            <rChallengeHelp onClick = {this.props.showhelp}/>
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
    if (!this.props.data.minimize)  
        return (
          <div  className="ChallengeScoreContainer">     
            <rChallengeComboContainer  ref = 'comboContainer' data = {{lastTime : this.props.data.lastTime, delayLimit : this.props.data.delayLimit, level : this.props.data.level}} /> 
            <rChallengeScore data = {this.props.data.score}/>
          </div>
        );
    else
        return (
          <div  className="ChallengeScoreContainer">     
          </div>
        );
        
  }
  });

//ChallengeComboContainer
var rChallengeComboContainer = React.createClass({
  getInitialState: function() {
    return {slevel: 0, stime:100, sLastTime : -1};
  },
  initState : function(lastTime, level){
      var stime = 0;
      var slevel = 0;
      if (lastTime !==  this.state.sLastTime){
          if(lastTime === -1){
            clearInterval(this.interval);
            }
          else{
            stime = 100;
            slevel = level; 
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, 1000)
            } 
        console.log("rChallengeComboContainer : initState " + JSON.stringify(this.state));
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
//ChallengeLogin
var rSocial = React.createClass({
  render: function() {
    
    return this.transferPropsTo(
        <Modal title="Расскажите друзьям:">
          <div className="modal-body">
            <iframe className="plusoframe" src="pluso.html" ></iframe>
         </div>
        </Modal>
      );
  }
});  

var rChallengeLogin = React.createClass({
  render: function() {
    
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
    /*
      if (this.props.data === false)
        return (
            <div className="ChallengeSocial" >
            </div>
              );
    else
    */
        return (
            <div className="ChallengeSocial" >
             <ModalTrigger modal={<rSocial />}> 
              <Button bsSize="xsmall"><Glyphicon glyph="comment" /></Button>
             </ModalTrigger>
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
              <Button bsSize="xsmall" onClick = {this.props.onClick}><Glyphicon glyph="signal" /></Button>
          </div>
        );
  }
  });

var rChallengeMinimize = React.createClass({
  render: function() {
    return (
      <div className="ChallengeMinimize">
        <Button bsSize="xsmall"  onClick = {this.props.onClick} ><Glyphicon glyph="minus" /></Button>
      </div>
    );
  }
 });

//ChallengeHelp
var rChallengeHelp = React.createClass({
  render: function() {
    return (
      <div className="ChallengeHelp">
          <Button bsSize="xsmall" onClick = {this.props.onClick}>?</Button>
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
    var cValue = "Здесь будет показан предыдущий ответ";
    if(this.props.data !== undefined )
        cValue  = this.props.data;
     return (
      <div className="ChallengeOldQuestion">
        {cValue}
      </div>
    );
  }
  });

//ChallengeHelpText
var rChallengeHelpText = React.createClass({
  render: function() {
     return (
      <div className="ChallengeHelpText">
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня.
        Если вам что-то непонятно - спросите меня
      </div>
    );
  }
  });

//ChallengeShowStat
var rChallengeShowStat = React.createClass({
  render: function() {
     
     return (
      <div className="ChallengeShowStat">
        <GoogleLineChart data = {this.props.data} graphName = "graphName"/>
      </div>
    );
  }
  });
var GoogleLineChart = React.createClass({
  render: function(){
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(this.drawChart);
    return React.DOM.div({id: this.props.graphName, style: {height: "500px"}});
  },
  componentDidUpdate: function(){
    this.drawCharts();
  },
  drawCharts: function(){
    var data = google.visualization.arrayToDataTable(this.props.data);
    var options = {
      title: 'ABC',
    };
 
    var chart = new google.visualization.ColumnChart(
        document.getElementById(this.props.graphName)
    );
    chart.draw(data, options);
  }
});

 