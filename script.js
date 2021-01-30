
let leftCurrency = 'RUB';
let rightCurrency ='USD';
let leftBlock = document.querySelector('.mainBlock__currencyListLeft');
let rightBlock = document.querySelector('.mainBlock__currencyListRight');
let leftInput = document.querySelector('.inputzone__left');
let rightInput = document.querySelector('.inputzone__right');
const leftText = document.querySelector('.inputzone-extra__left');
const rightText = document.querySelector('.inputzone-extra__right');
let leftCourse = 1;
let rightCourse = 0.0131;
let overbody = document.querySelector('.overbody');
let swapButton = document.querySelector('.mainBlock__arrowSign img');
const buttonsRight = document.querySelectorAll('.mainBlock__currencyListRight .money'); 
const buttonsLeft = document.querySelectorAll('.mainBlock__currencyListLeft .money');   
getActualCourse('RUB', 'USD');    

buttonsLeft.forEach((item) => {
    item.addEventListener('click', () => {
        let exButtonLeft = document.querySelector('.mainBlock__currencyListLeft .active');
        if(exButtonLeft) {
            exButtonLeft.classList.remove('active');
        }
        item.classList.add('active');
        if(item.tagName == 'BUTTON') {
            leftCurrency = item.innerHTML;
        } else {
            leftCurrency = item.value;
        }
        getActualCourse(leftCurrency, rightCurrency)
        });
});    

buttonsRight.forEach((item) => {
    item.addEventListener('click', () => {
        let exButtonRight = document.querySelector('.mainBlock__currencyListRight .active');
        if(exButtonRight) {
            exButtonRight.classList.remove('active');
            }
        item.classList.add('active');
        if(item.tagName == 'BUTTON') {
            rightCurrency = item.innerHTML;
        } else {
            rightCurrency = item.value;
        }
        getActualCourse(leftCurrency, rightCurrency)
    })
});    
function getActualCourse(leftCurrency, rightCurrency) {
    if (leftCurrency != rightCurrency) {
        fetch(`https://api.ratesapi.io/api/latest?base=${leftCurrency}&symbols=${rightCurrency}`)
        .then(response => response.json())
        .then((data) => {            
            let left = data.rates[`${rightCurrency}`];
            rightCourse = left;
            rightInput.value = `${(leftInput.value * left).toFixed(4)}`;
            leftText.textContent = `1 ${leftCurrency} = ${left} ${rightCurrency}`;            
        })
        .catch((error) => {
            overbody.style.zIndex = '3';
            alert(`Упс! Что-то пошло не так ${error.message}`)
        })        
        fetch(`https://api.ratesapi.io/api/latest?base=${rightCurrency}&symbols=${leftCurrency}`)
        .then(response => response.json())
        .then((data) => {
            let right = data.rates[`${leftCurrency}`];
            leftCourse = right;
            rightText.textContent = `1 ${rightCurrency} = ${right} ${leftCurrency}`;
        })
        
    }   else {
        leftText.textContent = `1 ${leftCurrency} = 1 ${rightCurrency}`;
        rightText.textContent = `1 ${rightCurrency} = 1 ${leftCurrency}`;
        rightInput.value = leftInput.value;
        leftCourse = 1;
        rightCourse = 1;
    }    
}    
    leftInput.addEventListener('input', () => {
        rightInput.value = leftInput.value * rightCourse;
    });   
    rightInput.addEventListener('input', () => {
        leftInput.value = rightInput.value * leftCourse;            
    });
        
swapButton.addEventListener('click', () => {    
    let tempVariable;
    let tempCurrency;
    let tempText;

    tempVariable = leftInput.value;
    leftInput.value = rightInput.value;
    rightInput.value = tempVariable;

    tempCurrency = leftCurrency;
    leftCurrency = rightCurrency;
    rightCurrency =  tempCurrency;
        
    tempText = leftText.textContent;
    leftText.textContent = rightText.textContent;
    rightText.textContent = tempText;
    
    let actButtonLeft = leftBlock.querySelector('.active');
    let actButtonRight = rightBlock.querySelector('.active');
    actButtonLeft.classList.remove('active');
    actButtonRight.classList.remove('active');

    if(actButtonLeft.tagName == 'BUTTON' && actButtonRight.tagName == 'BUTTON') {
        buttonsLeft.forEach((item) => {
            if(item.textContent == actButtonRight.textContent){
                item.classList.add('active');
            }
        });
        buttonsRight.forEach((item) => {
            if(item.textContent == actButtonLeft.textContent) {
                item.classList.add('active');
            }
        });
    }
    if(actButtonLeft.tagName == 'SELECT' && actButtonRight.tagName == 'SELECT') {
        actButtonLeft.classList.add('active');
        actButtonRight.classList.add('active');
        let randomValue = actButtonRight.value;
        actButtonRight.value = actButtonLeft.value;
        actButtonLeft.value = randomValue;
    }
    if(actButtonLeft.tagName == 'BUTTON' && actButtonRight.tagName == 'SELECT') {
        buttonsLeft[4].classList.add('active');
        buttonsLeft[4].value = actButtonRight.value;
        buttonsRight.forEach((item) => {
            if(item.textContent == actButtonLeft.textContent) {
                item.classList.add('active');
            }
        })
    }
    if(actButtonLeft.tagName == 'SELECT' && actButtonRight.tagName == 'BUTTON') {
        buttonsRight[4].classList.add('active');
        buttonsRight[4].value = actButtonLeft.value;
        buttonsLeft.forEach((item) => {
            if(item.textContent == actButtonRight.textContent) {
                item.classList.add('active');
            }
        })
    }    
})