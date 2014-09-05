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
    
    // возвращает cookie с именем name, если есть, если нет, то undefined
    this.getCookie = function(name) {
      var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    
    /* устанавливает для куки с именем name значение value
    setCookie(Header, Score, 20*60*60*1000); // сохраняеn результат на 20 часов,  
     */
    this.setCookie = function (name, value, options) {
      options = options || {};

      var expires = options.expires;

      if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
      }
      if (expires && expires.toUTCString) { 
            options.expires = expires.toUTCString();
      }

      value = encodeURIComponent(value);

      var updatedCookie = name + "=" + value;

      for(var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];    
        if (propValue !== true) { 
          updatedCookie += "=" + propValue;
         }
      }

      document.cookie = updatedCookie;
    }

    this.extend = function(Child, Parent) {

        var F = function() { };
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;

    };
}
 
function ChallengeManager() {
    
    this.challenges = [];
    
    this.addChallenge = function(name){
        var challenge = new Challenge(name, this);
        this.challenges[name] = challenge;
        return challenge;
    };

    this.saveResult = function(challenge){
        setCookie(challenge.name, challenge.score, 20*60*60*1000);
    };
    
};
 

function ChallengeManagerMath() {
    
    ChallengeManagerMath.superclass.constructor.call(this);
    
    function getInitData(typeLimit){
        var firstOperandLimit;
        var secondOperandLimit;
        var operatorLimit;
        
        if (typeLimit === 'minus789')        {
            firstOperandLimit = ({MIN : 100, MAX : 1000});
            secondOperandLimit = ({MIN : 7, MAX : 9});
            operatorLimit = '-';
        }
        if (typeLimit === 'multiply9')        {
            firstOperandLimit = ({MIN : 10, MAX : 100});
            secondOperandLimit = ({MIN : 9, MAX : 9});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply2')        {
            firstOperandLimit = ({MIN : 100, MAX : 10000});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply4')        {
            firstOperandLimit = ({MIN : 100, MAX : 5000});
            secondOperandLimit = ({MIN : 4, MAX : 4});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply8')        {
            firstOperandLimit = ({MIN : 100, MAX : 1000});
            secondOperandLimit = ({MIN : 8, MAX : 8});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply5')        {
            firstOperandLimit = ({MIN : 100, MAX : 1000, DIVISIBLE : 2});
            secondOperandLimit = ({MIN : 5, MAX : 5});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply25')        {
            firstOperandLimit = ({MIN : 100, MAX : 1000, DIVISIBLE : 4});
            secondOperandLimit = ({MIN : 25, MAX : 25});
            operatorLimit = '*';
        }
        if (typeLimit === 'division2')        {
            var firstOperandLimit = ({MIN : 1, MAX : 10000, DIVISIBLE : 2});
            var secondOperandLimit = ({MIN : 2, MAX : 2});
            var operatorLimit = '/';
            
        }
        if (typeLimit === 'division4')        {
            firstOperandLimit = ({MIN : 100, MAX : 5000, DIVISIBLE : 4});
            secondOperandLimit = ({MIN : 4, MAX : 4});
            operatorLimit = '/';
        }
        if (typeLimit === 'division8')        {
            firstOperandLimit = ({MIN : 100, MAX : 1000, DIVISIBLE : 8});
            secondOperandLimit = ({MIN : 8, MAX : 8});
            operatorLimit = '/';
        }
        if (typeLimit === 'multiply19')        {
            firstOperandLimit = ({MIN : 100, MAX : 1000});
            secondOperandLimit = ({MIN : 1, MAX : 9});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiplyXX')        {
            firstOperandLimit = ({MIN : 20, MAX : 100});
            secondOperandLimit = ({MIN : 20, MAX : 100});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiply11')        {
            firstOperandLimit = ({MIN : 20, MAX : 100});
            secondOperandLimit = ({MIN : 11, MAX : 11});
            operatorLimit = '*';
        }
        if (typeLimit === 'multiplyXXX11')        {
            firstOperandLimit = ({MIN : 200, MAX : 1000});
            secondOperandLimit = ({MIN : 11, MAX : 11});
            operatorLimit = '*';
        }
        if (typeLimit === 'squareX')        {
            firstOperandLimit = ({MIN : 2, MAX : 9});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        if (typeLimit === 'squareXX')        {
            firstOperandLimit = ({MIN : 10, MAX : 99});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        if (typeLimit === 'squareXXX')        {
            firstOperandLimit = ({MIN : 100, MAX : 999});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        if (typeLimit === 'squareX5')        {
            firstOperandLimit = ({MIN : 1, MAX : 9, SUFFIX : 5});
            secondOperandLimit = ({MIN : 2, MAX : 2});
            operatorLimit = '^';
        }
        return ({firstOperandLimit : firstOperandLimit, secondOperandLimit:secondOperandLimit, operatorLimit:operatorLimit});
    }
    
    this.addChallenge = function(name, initData){
        var challenge = new ChallengeMath(name, this, initData);
        this.challenges[name] = challenge;
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

//протокласс
function Challenge(name, manager) {
    
    this.states = {neytral : "neitral", win : "win", lose:"lose", blocked : "blocked"};
    
    this.manager = manager;
    this.name = name;

    this.state = this.states.neytral;
    this.question;
    this.lastTime;
    this.delayLimit;
    this.level;
    this.score;

    this.verifyAnswer = function(currentAnswer){
        
        var currentTime = new Date();
        var delay = currentTime - this.lastTime;
        var bonus;
        
        this.lastTime = currentTime;
        
        var rightAnswer = this.question.calculate();
                
        if (rightAnswer === currentAnswer){
            this.state = this.states.win;
            if (delay < this.delayLimit)
                this.level += 1;
            else
                this.level = 0;
            bonus = 1 + this.level * 2; 
            this.score += bonus;

        }else{
            this.state = this.states.lose;
            this.level = 0;
            bonus = 0;
        }

        if (this.score >= 100)
            this.state = this.states.blocked;
        
        manager.saveResult(this);
        
    };
    this.getOfflineQuestion = function(){
        return new {text:"Введите А", calculate: function() {return "A";} };
    };
    
}

function ChallengeMath(name, manager, initData){
    
    this.initData = initData;
    ChallengeMath.superclass.constructor.call(this);

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
            
            if ( isNumber(this.firstOperand))
                o1 = parseInt(this.firstOperand);
            else 
                o1 = this.firstOperand.calculate();
            
            if ( isNumber(this.secondOperand))
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
    
}

sys = new sysObject();
sys.extend(ChallengeManagerMath, ChallengeManager);
sys.extend(ChallengeMath, Challenge);
