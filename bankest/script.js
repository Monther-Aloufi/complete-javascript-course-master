'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovments = function(movments, sort = false){
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i){
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html)

  });
}



const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};


const creatUsername = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
};

creatUsername(accounts);

const totalDepositSummary = function(movements,interestRate){
  const inCome = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov)
  labelSumIn.textContent = `${inCome}€`

  const out =  movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const intrest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumInterest.textContent = `${intrest}€`
}

const updateUI = function(acc){
  // Display movements
  displayMovments(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  totalDepositSummary(acc.movements, acc.interestRate)
}

//EVENT HANDLER

let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find(
      acc => acc.username === inputLoginUsername.value
    );

  // console.log(currentAccount)

  if(currentAccount.pin === Number(inputLoginPin.value)){

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display UI and message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Update UI
    updateUI(currentAccount);

  }
})

btnTransfer.addEventListener("click", function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = " ";
  inputTransferAmount.blur();

  if(
    amount > 0 && 
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
    ){

      // doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
     
      // Update UI
      updateUI(currentAccount);

      // Clear input fields
      inputTransferAmount = inputTransferTo = " ";
      inputTransferAmount.blur();
    }
  
});


btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    // Add movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

})


btnClose.addEventListener("click", function(e){
  e.preventDefault();
  if(
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ){
   const index = accounts.findIndex(acc => acc.username === currentAccount.username)

   accounts.splice(index, 1);

   containerApp.style.opacity = 0;
   inputCloseUsername.value = inputClosePin.value ="";
   inputClosePin.blur();
  }
  
});

let sorted = false;
btnSort.addEventListener("click", function(e){
  e.preventDefault();

  displayMovments(currentAccount.movements, !sorted); 
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const eruToUsd = 1.1;
