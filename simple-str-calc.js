const hasPrecedence = (op1, op2) => {
  if(op1 !== undefined && op2 !== undefined){
    if(op1 === '*' || op1 === '/')
      return true
    else return false
  }
}

const applyOperator = (op, val1, val2) => {
  const valA = Number(val1)
  const valB = Number(val2)
  switch(op){
    case '*': return (valB * valA)
    case '/': return (valB / valA)
    case '+': return (valB + valA)
    case '-': return (valB - valA)
  }
}

const calculate = (tokenList) => {
  let valStack = []
  let opStack = []

  for (let i = 0; i < tokenList.length; i++ ){
    if(!isNaN(tokenList[i])){
      valStack.push(tokenList[i])
    } else if (tokenList[i] === '(') {
      opStack.push('(')
    } else if (tokenList[i] === ')') {
      while(opStack[opStack.length - 1] !== '(') {
        valStack.push(applyOperator(opStack.pop(), valStack.pop(), valStack.pop()))
      }
      opStack.pop()
    } else {
      while(opStack.length > 0 && hasPrecedence(opStack[opStack.length - 1], tokenList[i])){
        valStack.push(applyOperator(opStack.pop(), valStack.pop(), valStack.pop()))
      }
      opStack.push(tokenList[i])
    }
  }

  while(opStack.length > 0) {
    valStack.push(applyOperator(opStack.pop(), valStack.pop(), valStack.pop()))
  }
  return valStack[0]
}

function getd(strs) {
  const nstr = strs.replace(/[^0-9*\/()\-+]/g,'')
  const ustr = nstr.replace(')(', ')*(')
  const tokenList = ustr.match(/\d+|[+*/()-]/g);

  return calculate(tokenList);
}

console.log(getd('6/3-1'));