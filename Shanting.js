var operators = [
  {
    id: "*",
    calc: function (a, b) {
      return a * b;
    }
  },
  {
    id: "/",
    calc: function (a, b) {
      return a / b;
    }
  },
  {
    id: "+",
    calc: function (a, b) {
      return a + b;
    }
  },
  {
    id: "-",
    calc: function (a, b) {
      return a - b;
    }
  }
];

function getOperator(opID) {
  for (var i = 0; i < operators.length; i++) {
    if (operators[i].id === opID) {
      return operators[i];
    }
  }
  return undefined;
}

function getOpPrecedence(opID) {
  for (var i = 0; i < operators.length; i++) {
    if (operators[i].id === opID) {
      return i;
    }
  }

  return 1000;
}

function hasPrecedence(op1, op2) {
  if (getOperator(op1) != undefined) {
    return getOpPrecedence(op1) <= getOpPrecedence(op2);
  }
}

function applyOperator(operator, vals) {
  var valA = vals[0];
  var valB = vals[1];
  return operator.calc(+valB, +valA);
}

var tokenList = [];

function calculate() {
  var valStack = [];
  var opStack = [];

  for (var i = 0; i < tokenList.length; i++) {
    if (!isNaN(tokenList[i])) {
      valStack.push(tokenList[i]);
    } else if (tokenList[i] === "(") {
      opStack.push(tokenList[i]);
    } else if (tokenList[i] === ")") {
      while (opStack[opStack.length - 1] !== "(") {
        valStack.push(applyOperator(getOperator(opStack.pop()), [valStack.pop(), valStack.pop()]));
      }
      opStack.pop();
    } else {
      while (opStack.length > 0 && hasPrecedence(opStack[opStack.length - 1], tokenList[i])) {
        valStack.push(applyOperator(getOperator(opStack.pop()), [valStack.pop(), valStack.pop()]));
      }
      opStack.push(tokenList[i]);
    }
  }

  while (opStack.length > 0) {
    valStack.push(applyOperator(getOperator(opStack.pop()), [valStack.pop(), valStack.pop()]));
  }

  // Output the calculated result and the original expression
  return valStack[0];
}

function getd(strs) {
  tokenList = strs.match(/\d+|[+*/()-]/g);

  return calculate();
}

console.log(getd("6/3-1"));