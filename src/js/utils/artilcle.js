export const transformContent = (content = "") => {
  return content ? content.slice(0, content.lastIndexOf("[")) : "";
};

export const transformDate = date => {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "";
};
