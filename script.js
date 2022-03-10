let materialsStock = {
  lettuce: 5,
  pickle: 5,
  sauce: 5,
  onion: 5,
  tomato: 5,
  bread: 5,
  potato: 5,
  cola: 5,
  chicken: 5,
  burger: 5,
};

let cookDegree = Math.floor(Math.random() * 3 + 1); //The degree of cooking by the random method;
let menu = Math.floor(Math.random() * 2 + 1); //Menu selection with random method

//the function to make the menu selection
function menuChoose() {
  //console.log(menu);
  if (menu == 1) {
    materialsStock.chicken--;
    console.log("Chicken cooked");
  } else if (menu == 2) {
    materialsStock.burger--;
    console.log("Meatballs cooked");
  } else if (menu !== 2 && menu !== 1) {
    console.log("wrong choice");
  }
}

//It was prevented from going to the next stage by putting await here.

async function cookChicken() {
  if (cookDegree == 0) {
    await order(() => {
      console.log("cooking chicken");
    }, 3000);
  } else if (cookDegree == 1) {
    await order(() => console.log("undercooked"), 2000);
  } else if (cookDegree == 2) {
    await order(() => console.log("medium cooked"), 3000);
  } else if (cookDegree == 3) {
    await order(() => console.log("overcooked"), 4000);
  }
}

// To print to the console at certain times, a timeout promise is used because it requests an async await promise.
let order = (work, time) => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve(work());
    }, time);
  });
};

let checkStockheck = () => {
  return new Promise((resolve, reject) => {
    if (Object.values(materialsStock).every((e) => e > 0)) {
      setTimeout(() => {
        resolve(console.log("stock control after order"));
      }, 3000);
    } else {
      reject("out of stock");
    }
  });
};

//For those who do not need to work at the same time, await is not used, stock amounts of materials are updated.
async function process() {
  await order(() => {
    console.log("1 order has been taken");
  }, 1000);
  await checkStockheck();
  await order(menuChoose, 1000);
  order(() => {
    materialsStock.potato--, console.log("4 potatoes are ready");
  }, 5000);
  order(() => {
    materialsStock.cola--, console.log("5 drinks are ready");
  }, 2000);
  await cookChicken();
  await order(() => {
    materialsStock.bread--, console.log("3 1 burger ready");
  }, 2000);
  await order(() => {
    materialsStock.sauce--, console.log("6 sauces are ready");
  }, 1000);
  order(() => {
    console.log("7 has been served");
  }, 1000);
}
process();
