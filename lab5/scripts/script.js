const BLUE_ELEM_CLASSNAME = "blue-elem";
const PINK_ELEM_CLASSNAME = "pink-elem";

let addEventListeners = () => {
  document.getElementById("sixth-elem").addEventListener("click", (e) => {
    let elem = document.getElementById("sixth-elem");
    handleClick(elem, BLUE_ELEM_CLASSNAME);
  });

  document
    .querySelector("#sixth-elem ~ ul")
    .firstElementChild.addEventListener("click", (e) => {
      let elem = document.querySelector("#sixth-elem ~ ul").firstElementChild;
      handleClick(elem, PINK_ELEM_CLASSNAME);
    });
};

let handleClick = (elem, className) => {
  if (elem.classList.contains(className)) {
    elem.classList.remove(className);
    return;
  }

  elem.classList.add(className);
};

addEventListeners();
