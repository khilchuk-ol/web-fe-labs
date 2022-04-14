// input form code

const validations = {
  name: {
    regexp: /^[A-ZА-Я][a-zа-я]*\s[A-ZА-Я]\.[A-ZА-Я]\.$/,
    alert: "Ім'я повинне бути у форматі 'Бандера С.А.'",
  },
  group: {
    regexp: /^[A-Z]{2}[-]\d{2}$/,
    alert: "Група повинна бути у форматі 'АА-00'",
  },
  phone: {
    regexp: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    alert: "Номер телефону повинен бути у форматі '(000)-000-00-00'",
  },
  address: {
    regexp: /^м\.\s[А-Я][а-я]+$/,
    alert: "Місто повинне бути у форматі 'м. Київ'",
  },
  email: {
    regexp: /^\w{3,}\@\w{2,}\.com$/,
    alert: "Електронна пошта повинна бути у форматі 'example@mail.com'",
  },
};

const validateInput = (key, elem) => {
  let { regexp, alert } = validations[key];

  if (!regexp.test(elem.value)) {
    setWarning(elem, alert);
    return false;
  }

  return true;
};

const setWarning = (elem, alert) => {
  elem.classList.add("warning");

  if (elem.nextSibling.id === elem.id + "-warning") {
    return;
  }

  alertNode = document.createElement("div");
  alertNode.classList.add("warning-div");
  alertNode.id = elem.id + "-warning";
  alertNode.textContent = alert;

  elem.parentNode.insertBefore(alertNode, elem.nextSibling);
};

const removeWarning = (elem) => {
  elem.classList.remove("warning");

  const alertNode = document.getElementById(elem.id + "-warning");
  if (alertNode) {
    alertNode.remove();
  }
};

const displayFormInfo = () => {
  const div = document.getElementById("results");
  div.classList.remove("hidden");
};

const hideFormInfo = () => {
  const div = document.getElementById("results");
  div.classList.add("hidden");
};

const addFormEventHandlers = () => {
  for (let key in validations) {
    const elem = document.getElementById(key);

    elem.addEventListener("focus", (e) => {
      removeWarning(e.target);
      hideFormInfo();
    });

    elem.addEventListener("focusout", (e) => {
      validateInput(key, e.target);
    });
  }

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener("click", () => {
    let isValid = true;

    for (let key in validations) {
      const elem = document.getElementById(key);

      isValid = isValid && validateInput(key, elem);

      const res = document.querySelector(`#results #${key}-div`);
      res.innerHTML = `<b>${capitalize(key)}:</b> ${elem.value}`;
    }

    if (isValid) {
      displayFormInfo();
      return;
    }

    hideFormInfo();
  });
};

const capitalize = (str = "") => {
  str.trim();
  return str[0].toUpperCase() + str.slice(1);
};

// colorful table code

const randomColor = () => {
  const random = () => Math.floor(Math.random() * 255);

  return {
    r: random(),
    g: random(),
    b: random(),
  };
};

const blackOrWhiteHex = (color) => {
  return color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 186
    ? "#000000"
    : "#FFFFFF";
};

const hexToRGBColor = (hex) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }

  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  let r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);

  return {
    r,
    g,
    b,
  };
};

const addTableEventHandlers = () => {
  const special = document.getElementById("special");
  const initialBckgColor = special.style.backgroundColor;
  const initialTextColor = special.style.color;

  const colorPicker = document.getElementById("color-picker");

  special.addEventListener("mouseover", (e) => {
    const color = randomColor();
    e.target.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    e.target.style.color = blackOrWhiteHex(color);
  });

  special.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = initialBckgColor;
    e.target.style.color = initialTextColor;
  });

  special.addEventListener("click", (e) => {
    e.target.style.backgroundColor = colorPicker.value;
    e.target.style.color = blackOrWhiteHex(hexToRGBColor(colorPicker.value));
  });

  special.addEventListener("dblclick", (e) => {
    for (let cell of document.querySelectorAll("#table6x6 td")) {
      cell.style.backgroundColor = colorPicker.value;
      cell.style.color = blackOrWhiteHex(hexToRGBColor(colorPicker.value));
    }

    e.target.style.backgroundColor = initialBckgColor;
    e.target.style.color = initialTextColor;
  });
};

// adding event handlers

addFormEventHandlers();
addTableEventHandlers();
