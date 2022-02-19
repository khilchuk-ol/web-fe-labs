const BLUE_ELEM_CLASSNAME = "blue-elem";
const PINK_ELEM_CLASSNAME = "pink-elem";

const addTextClickListeners = () => {
  document.getElementById("sixth-elem").addEventListener("click", (e) => {
    const elem = document.getElementById("sixth-elem");
    handleClick(elem, BLUE_ELEM_CLASSNAME);
  });

  document
    .querySelector("#sixth-elem ~ ul")
    .firstElementChild.addEventListener("click", (e) => {
      const elem = document.querySelector("#sixth-elem ~ ul").firstElementChild;
      handleClick(elem, PINK_ELEM_CLASSNAME);
    });
};

const handleClick = (elem, className) => {
  if (elem.classList.contains(className)) {
    elem.classList.remove(className);
    return;
  }

  elem.classList.add(className);
};

const addBtnClickListeners = () => {
  const imgElemId = "city-img";
  const imgWrapperElemId = "img-wrapper";
  const containerId = "imgs-container";

  const container = document.getElementById(containerId);

  const zoomDelta = 0.2;

  const getLastImgWrInContainer = () => {
    const imgs = document.querySelectorAll(
      `#${containerId} #${imgWrapperElemId}`
    );

    if (imgs.length === 0) {
      return null;
    }

    return imgs[imgs.length - 1];
  };

  document.getElementById("add-btn").addEventListener("click", (e) => {
    const imgElem = document.createElement("img");
    imgElem.id = imgElemId;
    imgElem.src = "./lviv.jpeg";

    const wrappedImg = document.createElement("div");
    wrappedImg.id = imgWrapperElemId;
    wrappedImg.appendChild(imgElem);

    container.appendChild(wrappedImg);
  });

  document.getElementById("delete-btn").addEventListener("click", (e) => {
    const lastImg = getLastImgWrInContainer();

    if (lastImg === null) {
      return;
    }

    container.removeChild(lastImg);
  });

  document.getElementById("zoom-in-btn").addEventListener("click", (e) => {
    zoomLastImgElem(zoomDelta);
  });

  document.getElementById("zoom-out-btn").addEventListener("click", (e) => {
    zoomLastImgElem(-zoomDelta);
  });

  const zoomLastImgElem = (zoomDifference) => {
    let targetImgWr = getLastImgWrInContainer();
    if (targetImgWr === null) {
      targetImgWr = document.getElementById("link-img-wrapper");
    }

    const imgElem = targetImgWr.querySelector("#city-img");
    const originalStyle = window.getComputedStyle(imgElem);
    const transform = originalStyle.getPropertyValue("transform");

    if (transform === "none") {
      imgElem.style.transform = "matrix(1.2, 0, 0, 1.2, 0, 0)";
      return;
    }

    let paramsStr = transform.match("[\\d\\., ]+")[0];
    let params = paramsStr.split(", ");

    params[0] = parseFloat(params[0]) + zoomDifference;
    params[3] = parseFloat(params[3]) + zoomDifference;

    imgElem.style.transform = `matrix(${params.join(", ")})`;
  };
};

addTextClickListeners();
addBtnClickListeners();
