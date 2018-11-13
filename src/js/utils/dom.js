const setElementDisplay = value => node => {
  try {
    node.style.display = value;
  } catch (e) {
    console.log(`Error was occured: ${e}`);
  }
};

export const hideElement = setElementDisplay("none");

export const showElement = setElementDisplay;

export const hideElements = nodes => nodes.forEach(hideElement);

export const showElements = value => nodes => nodes.forEach(showElement(value));
