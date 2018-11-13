export const hideElement = node => {
  try {
    node.style.display = "none";
  } catch (e) {
    console.log(`Error was occured: ${e}`);
  }
};

export const hideElements = nodes => 
  nodes.forEach(hideElement);