/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var sys;
//Объект группирует необходимые системные функции которые не следует включать в класс упражнений
function sysObject(){
    this.isNumber = function(n) {
      return !isNaN(parseInt(n)) && isFinite(n);
    };
    this.getRandomInt = function (min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    this.extend = function(Child, Parent) {

        var F = function() { };
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;

    };
}
 
function ChallengeManager() {
    
    this.challenges = {};
    this.userdata = {loged : false};
    
    function wsConnect(){
        /*if (!window.WebSocket) {
                document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
        }*/

        // создать подключение
        this.socket = new WebSocket("ws://localhost:8081");
        this.socket.onmessage = function(event) {
            var incomingMessage = event.data;
            beginMessage(incomingMessage); 
        };
    }
    
    function beginMessage(message){
        var pmessage = JSON.parse(message);
        if (pmessage.login !== undefined){
            challengeManager.userdata = pmessage.userdata;
            challengeManager.userdata.loged = true;
            if (pmessage.challenges !== undefined)
                for(var i in pmessage.challenges) {
                    if (!pmessage.challenges.hasOwnProperty(i)) continue;
                    if (challengeManager.challenges[i]){
                        challengeManager.challenges[i].answerVerifed(pmessage.challenges[i].result);
                        challengeManager.challenges[i].initQuestion(pmessage.challenges[i].question); 
                    }
            }

        }
        if (pmessage.challenge !== undefined){
            var id = pmessage.challenge;
            if (pmessage.result !== undefined)
            {
                challengeManager.challenges[id].answerVerifed(pmessage.result);
            }
            if (pmessage.question !== undefined)
            {
                challengeManager.challenges[id].initQuestion(pmessage.question);
            }
            if (pmessage.stat !== undefined)
            {
                challengeManager.challenges[id].stat = pmessage.stat;
            }
        }
        if (pmessage.log !== undefined){
            if (pmessage.challenge !== undefined)
                console.log(pmessage.challenge.toString() + pmessage.log);
            else
                console.log(pmessage.log);
        }
    
    }
    
    function wsSend(message){
        this.socket.send(JSON.stringify(message));
    }
    
    this.addChallenge = function(name){
        var id = Math.random();
        var challenge = new Challenge(name, challengeManager, id);
        
        challengeManager.challenges[id] = challenge;
        return challenge;
    };
    this.ulogin = function(token){
        var result = {};
        for(var i in challengeManager.challenges) {
            if (!challengeManager.challenges.hasOwnProperty(i)) continue;
            result[i] = {challengeID : challengeManager.challenges[i].id, baseUID : challengeManager.challenges[i].baseID};
        }
        var outgoingMessage = {
            token : token,
            challenges : result
        };
        wsSend(outgoingMessage)
    }

    this.saveResult = function(challenge, currentAnswer){
        if (challengeManager.userdata.loged === true){
            
            challenge.waitVerifyAnswer();
            var message = {stat : {
                    delay       : challenge.delay,
                    point       : challenge.bonus,
                    question    : challenge.question,
                    answer      : currentAnswer
                },
                challengeID : challenge.id
                };
            wsSend(message);
        
        }else{
            challenge.offlineVerifyAnswer(challenge.answer);
            challenge.question = challenge.getOfflineQuestion();
        }

    };
    this.refreshStat = function(challenge){
        if (challengeManager.userdata.loged === true){
            
            var message = {
                query :'getStat',
                challengeID : challenge.id
                };
            wsSend(message);
        
        }

    };
    
    wsConnect();
    
};
 
function ChallengeManagerMath() {
    
    ChallengeManagerMath.superclass.constructor.call(this);
    
    function getInitData(typeLimit){
        var firstOperandLimit;
        var secondOperandLimit;
        var operatorLimit;
        var baseID;
        
        if (typeLimit === 'minus789')        {
            baseID = 1;
            firstOperandLimit = ({MIN : 100, MAX : 1000});
            secondOperandLimit = ({MIN : 7, MAX : 9});
            operatorLimit = '-';
        }
        if (typeLimit === 'multiply9')        {
            baseID = 2;
            firstOperandLimit = ({MIN : 10, MAX : 100});
            secondOperandLimit = ({MIN : 9, MAX : 9});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply2')        {
            baseID = 3;
            firstOperandLimit = ({MIN : 100, MAX : 10000});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply4')        {
            baseID = 4;
            firstOperandLimit = ({MIN : 100, MAX : 5000});
            secondOperandLimit = ({MIN : 4, MAX : 4});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply8')        {
            baseID = 5;
            firstOperandLimit = ({MIN : 100, MAX : 1000});
            secondOperandLimit = ({MIN : 8, MAX : 8});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply5')        {
            baseID = 6;
            firstOperandLimit = ({MIN : 100, MAX : 1000, DIVISIBLE : 2});
            secondOperandLimit = ({MIN : 5, MAX : 5});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply25')        {
            baseID = 7;
            firstOperandLimit = ({MIN : 100, MAX : 1000, DIVISIBLE : 4});
            secondOperandLimit = ({MIN : 25, MAX : 25});
            operatorLimit = '*';
        }
        if (typeLimit === 'division2')        {
            baseID = 8;
            firstOperandLimit = ({MIN : 1, MAX : 10000, DIVISIBLE : 2});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '/';
        }
        if (typeLimit === 'division4')        {
            baseID = 9;
            firstOperandLimit = ({MIN : 100, MAX : 5000, DIVISIBLE : 4});
            secondOperandLimit = ({MIN : 4, MAX : 4});
            operatorLimit = '/';
        }
        if (typeLimit === 'division8')        {
            baseID = 10;
            firstOperandLimit = ({MIN : 100, MAX : 1000, DIVISIBLE : 8});
            secondOperandLimit = ({MIN : 8, MAX : 8});
            operatorLimit = '/';
        }
        if (typeLimit === 'multiply19')        {
            baseID = 11;
            firstOperandLimit = ({MIN : 100, MAX : 1000});
            secondOperandLimit = ({MIN : 1, MAX : 9});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiplyXX')        {
            baseID = 12;
            firstOperandLimit = ({MIN : 20, MAX : 100});
            secondOperandLimit = ({MIN : 20, MAX : 100});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply11')        {
            baseID = 13;
            firstOperandLimit = ({MIN : 20, MAX : 100});
            secondOperandLimit = ({MIN : 11, MAX : 11});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiplyXXX11')        {
            baseID = 14;
            firstOperandLimit = ({MIN : 200, MAX : 1000});
            secondOperandLimit = ({MIN : 11, MAX : 11});
            operatorLimit = '*';
        }
        if (typeLimit === 'squareX')        {
            baseID = 15;
            firstOperandLimit = ({MIN : 2, MAX : 9});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        if (typeLimit === 'squareXX')        {
            baseID = 16;
            firstOperandLimit = ({MIN : 10, MAX : 99});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        if (typeLimit === 'squareXXX')        {
            baseID = 17;
            firstOperandLimit = ({MIN : 100, MAX : 999});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        if (typeLimit === 'squareX5')        {
            baseID = 18;
            firstOperandLimit = ({MIN : 1, MAX : 9, SUFFIX : 5});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        return ({firstOperandLimit : firstOperandLimit, secondOperandLimit:secondOperandLimit, operatorLimit:operatorLimit, baseID : baseID});
    }
    
    this.addChallenge = function(name, initData){
        var id = Math.random();
        var challenge = new ChallengeMath(name, challengeManager, id, initData);
        challenge.question = challenge.getOfflineQuestion();
        challengeManager.challenges[id] = challenge;
        return challenge;
    };
    this.InitData = {
    minus789 : getInitData('minus789'),
    multiply9 : getInitData('multiply9'),
    multiply2 : getInitData('multiply2'),
    multiply4 : getInitData('multiply4'),
    multiply8 : getInitData('multiply8'),
    multiply5 : getInitData('multiply5'),
    multiply25 : getInitData('multiply25'),
    division2 : getInitData('division2'),
    division4 : getInitData('division4'),
    multiply19 : getInitData('multiply19'),
    multiplyXX : getInitData('multiplyXX'),
    multiply11 : getInitData('multiply11'),
    multiplyXXX11 : getInitData('multiplyXXX11'),
    squareX : getInitData('squareX'),
    squareXX : getInitData('squareXX'),
    squareXXX : getInitData('squareXXX'),
    squareX5 : getInitData('squareX5')
    };
    
};

function Challenge(name, manager, id) {
    
    this.states = {neytral : "neitral", win : "win", lose:"lose", blocked : "blocked"};
    
    this.id = id;
    this.baseID = 0;
    this.name = name;
    this.manager = manager;
    this.minimize = false;
    this.showhelp = false;
    this.showstat = false;

    this.verifyAnswer = function(currentAnswer){
        
        challengeManager.saveResult(this, currentAnswer);
        
    };
    this.offlineVerifyAnswer = function(currentAnswer){
        
        var currentTime = new Date();
        this.delay = currentTime - this.lastTime;
        
        var rightAnswer = this.question.calculate().toString();
        this.oldQuestion = this.question.toString() + " = " + rightAnswer + ". Ваш ответ: " + currentAnswer;
        
        if (rightAnswer === currentAnswer){
            this.lastTime = currentTime;
            this.state = this.states.win;
            if (this.delay < this.delayLimit)
                this.level += 1;
            else
                this.level = 0;
            this.bonus = 1 + this.level * 2; 
            this.score += this.bonus;

        }else{
            this.lastTime = -1;
            this.state = this.states.lose;
            this.level = 0;
            this.bonus = 0;
        }

        if (this.score >= 100)
            this.state = this.states.blocked;
        
        this.answer = "";
        
    };
    this.waitVerifyAnswer = function(){
        
        this.state = this.states.blocked;
        this.answer = "";
        
    };
    this.answerVerifed = function(result){
        
        if (result.right){
            this.state = this.states.win;
            this.lastTime = new Date();
            this.bonus = result.bonus; 
            this.score = result.score;
        }else{
            this.lastTime = -1;
            this.state = this.states.lose;
            this.level = 0;
            this.bonus = 0; 
        }
        if (result.blocked){
            this.state = this.states.blocked;
        }
        this.oldQuestion = result.oldQuestion;
        this.level = result.level;
        
    };
    this.getOfflineQuestion = function(){
        function expression(){
            this.toString = function(){ return "Введите А"};          
            this.calculate = function(){ return "A"};          
        }
        return new expression();
    };
    this.refreshStat = function(){
        challengeManager.refreshStat(this);
    }
    
    this.state = this.states.neytral;
    this.question = this.getOfflineQuestion();
    this.answer = "";
    this.oldQuestion = "Здесь будет показан предыдущий вопрос";
    this.lastTime = -1;
    this.delayLimit = 30000;
    this.level = 0;
    this.score = 0;
    this.bonus = 0; 
    this.delay = 1000000;
    
    this.stat = [];
    
}

function ChallengeMath(name, manager, id, initData){
    
    this.initData = initData;
    
    ChallengeMath.superclass.constructor.call(this, name, manager, id);

    this.baseID = initData.baseID;

    //древовидная структура мат. выражения
    function expression(inFirstOperand, inSecondOperand, inOperator) {
        this.firstOperand = inFirstOperand;
        this.secondOperand = inSecondOperand;
        this.operator = inOperator;
        
        this.toString = function(){
            
          return this.firstOperand.toString() + ' ' + this.operator + ' ' + this.secondOperand.toString();
          
        };
        this.calculate = function(){
            var o1 = 0;
            var o2 = 0;
            
            if ( sys.isNumber(this.firstOperand))
                o1 = parseInt(this.firstOperand);
            else 
                o1 = this.firstOperand.calculate();
            
            if ( sys.isNumber(this.secondOperand))
                o2 = parseInt(this.secondOperand);
            else 
                o2 = this.secondOperand.calculate();
            
            if (this.operator === '+')
                return o1 + o2;
            if (this.operator === '*')
                return o1 * o2;
            if (this.operator === '-')
                return o1 - o2;
            if (this.operator === '/')
                return Math.floor(o1 / o2);
            if (this.operator === '^')
                return Math.pow(o1, o2);
            
        };
        
    };
    function getPrimitiveQuestion(firstOperandLimit, secondOperandLimit, operatorLimit){
        
        //firstOperandLimit ограничение на первый операнд. Структура из минимального и максимального значения. {MIN: x, MAX: X} 
        //secondOperandLimit ограничение на второй операнд. Структура из минимального и максимального значения. {MIN: x, MAX: X}
        //Можно указать обязательную кратность - DIVISIBLE
        //Можно указать цифры, которые будут дописаны к операнду - SUFFIX
        //operationLimit ограничение на оператор. Строка допустимых операторов "+-*/^!"
        
        var firstOperand = sys.getRandomInt(firstOperandLimit.MIN, firstOperandLimit.MAX);
        var secondOperand = sys.getRandomInt(secondOperandLimit.MIN, secondOperandLimit.MAX);
        var indexOperator = sys.getRandomInt(1, 120)%operatorLimit.length;
        var operator = operatorLimit[indexOperator];
        
        if (firstOperandLimit.DIVISIBLE !== undefined){
            firstOperand = firstOperand - firstOperand % firstOperandLimit.DIVISIBLE;
        }
        if (secondOperandLimit.DIVISIBLE !== undefined){
            secondOperand = secondOperand - secondOperand % secondOperandLimit.DIVISIBLE;
        }

        if (firstOperandLimit.SUFFIX !== undefined){
            firstOperand = +(firstOperand.toString() + firstOperandLimit.SUFFIX.toString());
        }
        if (secondOperandLimit.SUFFIX !== undefined){
            secondOperand = +(secondOperand.toString() + secondOperandLimit.SUFFIX.toString());
        }
        
        return new expression(firstOperand, secondOperand, operator);
        
    };
    this.getOfflineQuestion = function(){
        
        if (this.initData === undefined)
        {
            var firstOperandLimit = ({MIN : 1, MAX : getRandomInt(5, 1000)});
            var secondOperandLimit = ({MIN : 1, MAX : getRandomInt(5, 1000)});
            var operatorLimit = '+-*/';
            
            this.initData = ({firstOperandLimit : firstOperandLimit, secondOperandLimit:secondOperandLimit, operatorLimit:operatorLimit});
        }
        
        return  getPrimitiveQuestion(this.initData.firstOperandLimit, this.initData.secondOperandLimit, this.initData.operatorLimit);
        

    };
    this.initQuestion = function(questionData){
        this.question = new expression(questionData.firstOperand, questionData.secondOperand, questionData.operator);
    }
}

sys = new sysObject();
sys.extend(ChallengeManagerMath, ChallengeManager);
sys.extend(ChallengeMath, Challenge);
