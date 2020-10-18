const isObject = (item) =>
  item && typeof item === "object" && !Array.isArray(item);

const deepFreeze = (obj) => {
  Object.keys(obj).forEach(
    (key) => key && isObject(obj[key]) && Object.freeze(obj[key])
  );
  return Object.freeze(obj);
};

const toObject = (array) =>
  array.reduce((obj, e, index) => {
    obj[index + 1] = e;
    return obj;
  }, {});

const colors = (prefix, object) =>
  Object.keys(object).reduce((ac, key) => {
    ac[`${prefix}-${key}`] = object[key];
    return ac;
  }, {});

export const theme = deepFreeze({
  global: {
    colors: {
      brand: "#01a982",
      focus: "#ababab",
      background: "#ffffff",
      control: "#000000",
      ...colors("accent", toObject(["#ababab", "#ababab", "#66dde4"])),
      ...colors(
        "neutral",
        toObject(["#425563", "#5F7A76", "#80746E", "#767676"])
      ),
      ...colors("status", {
        critical: "#F04953",
        error: "#F04953",
        warning: "#FFD144",
        ok: "#01a982",
        unknown: "#CCCCCC",
        disabled: "#CCCCCC",
      }),
    },
    font: {
      family: "Raleway, sans-serif",
    },
  },
});
