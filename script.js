var stack = [];
var topp = -1;

// Push function ----->
let push = (e) => {
  topp++;
  stack[topp] = e;
};

// Pop function ------>
let pop = () => {
  if (topp == -1) return 0;
  else {
    var popped_ele = stack[topp];
    topp--;
    return popped_ele;
  }
};

//Function for checking Priority ----->
let operator = (op) => {
  if (
    op == "+" ||
    op == "-" ||
    op == "^" ||
    op == "*" ||
    op == "/" ||
    op == "(" ||
    op == ")"
  ) {
    return true;
  } else return false;
};

//Function for checking Precedency ----->
let precedency = (pre) => {
  if (pre == "@" || pre == "(" || pre == ")") {
    return 1;
  } else if (pre == "+" || pre == "-") {
    return 2;
  } else if (pre == "/" || pre == "*") {
    return 3;
  } else if (pre == "^") {
    return 4;
  } else return 0;
};

// Main Driver Code ----->
function convertor() {
  var postfix_answer = [];
  var temp = 0;
  push("#");
  infixval = document.getElementById("i1").value;

  if (infixval == "" || infixval == " ") {
    swal({
      title: "WRONG!!",
      text: "Input can not be Blank!",
      icon: "error",
    });
  }

  for (var i = 0; i < infixval.length; i++) {
    var el = infixval[i];

    // Checking whether operator or not
    if (operator(el)) {
      if (el == ")") {
        while (stack[topp] != "(") {
          postfix_answer[temp++] = pop();
        }
        pop();
      } else if (el == "(") {
        push(el);
      } else if (precedency(el) > precedency(stack[topp])) {
        push(el);
      } else {
        while (precedency(el) <= precedency(stack[topp]) && topp > -1) {
          postfix_answer[temp++] = pop();
        }
        push(el);
      }
    } else {
      postfix_answer[temp++] = el;
    }
  }

  // Adding character until stack[topp] is #
  while (stack[topp] != "#") {
    postfix_answer[temp++] = pop();
  }

  var st = "";
  for (var i = 0; i < postfix_answer.length; i++) st += postfix_answer[i];

  document.getElementById("i2").value = st;
}
