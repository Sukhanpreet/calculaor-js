console.log('script working')

const calculator=document.querySelector('.calculator')
const keys=document.querySelectorAll('button')
const currentDisplay=document.querySelector('.current-display')
const previousDisplay=document.querySelector('.previous-display')

currentDisplay.innerHTML=0;

for(let i=0;i<keys.length;i++){
    keys[i].addEventListener('click',(event)=>{

        let key= event.target;
        let keyValue=key.textContent;
        let keyType=key.dataset.type;
        
        let display=currentDisplay.textContent;
        let previousKeyType=calculator.dataset.previousKeyType;
        

        for(let i=0;i<keys.length;i++){
            keys[i].classList.remove('op-pressed');
        }

        // number keys
        if(keyType==='number'){
            if(display==='0' || previousKeyType==='operator' || previousKeyType==='equal'){
                currentDisplay.textContent=keyValue;
                
            }else{
                currentDisplay.textContent=display+keyValue;
            }
        }
        // decimal Key
        if(keyType=='decimal'){
            if(display.includes('.')) return
            if(previousKeyType==='operator' ||previousKeyType==='equal'){
                currentDisplay.textContent= '0.' ;
            }else{
            currentDisplay.textContent=display+'.';
            }
        }
        // opertor keys
        if(keyType==='operator'){

            let firstNum=calculator.dataset.firstNumber;
            let operator=calculator.dataset.operator;
            let secondNum=display;

            if(firstNum && operator && secondNum && previousKeyType!='operator' && previousKeyType!=='equal'){
                let result=calculate(firstNum,operator,secondNum);
                currentDisplay.textContent=result;
                console.log(`${firstNum} ${operator} ${secondNum} = ${result}`);
                key.classList.add('op-pressed');
                calculator.dataset.firstNumber=result;
                calculator.dataset.operator=key.dataset.action;
                previousDisplay.innerHTML=result + keyValue;
                
            }

            else{
               key.classList.add('op-pressed');
                calculator.dataset.firstNumber=display;
                calculator.dataset.operator=key.dataset.action;
                previousDisplay.innerHTML=display + keyValue;
                
            }
        }
        // equal key
        if(keyType==='equal'){

            if(!calculator.dataset.firstNumber) return;


            previousDisplay.innerHTML=previousDisplay.innerHTML+ display;

            let firstNum=calculator.dataset.firstNumber;
            let operator=calculator.dataset.operator;
            let secondNum=display;

            let opSymbol;
            if(operator==='add') opSymbol='+';
            if(operator==='minus') opSymbol='-';
            if(operator==='multiply') opSymbol='x';
            if(operator==='divide') opSymbol='/';
            
            if(previousKeyType==='equal'){
                firstNum=display;
                secondNum=calculator.dataset.secondNumber;
                previousDisplay.innerHTML=firstNum + opSymbol +secondNum;
            }

            let result= calculate(firstNum,operator,secondNum);

            currentDisplay.textContent=result;
            calculator.dataset.secondNumber=secondNum;

            console.log(`${firstNum} ${operator} ${secondNum} = ${result}`);
        }
        // all-clear 
        if(keyType==='all-clear'){
            allClear();
        }
        // clear entry 
        if(keyType==='clear-entry'){
            currentDisplay.innerHTML=0;
        }
        // delete
        if(keyType==='delete'){
            if(previousKeyType==='operator') return;
            if(previousKeyType==='equal'){
                allClear();
             }
             else{
                if(currentDisplay.innerHTML.length===1){
                    currentDisplay.innerHTML=0;
                }else{
                    currentDisplay.innerHTML=display.slice(0,-1);
                }
             }
        }
        calculator.dataset.previousKeyType= keyType;
    })
}


function calculate(firstNumber,operator,secondNumber){
    let first=parseFloat(firstNumber);
    let second=parseFloat(secondNumber);
    switch(operator){
        case 'add': return first + second;
        case 'minus': return first - second; 
        case 'multiply': return first * second; 
        case 'divide': return first / second;
    }
}

function allClear(){
    calculator.dataset.firstNumber='';
    calculator.dataset.secondNumber='';
    calculator.dataset.operator='';
    previousDisplay.innerHTML='';
    currentDisplay.innerHTML=0;
}