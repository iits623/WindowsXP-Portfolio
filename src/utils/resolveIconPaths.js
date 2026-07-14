const ICON_KEYS = ["imgSrc", "iconSrc", "icon", "iconHeader", "bgImage"];

function resolvePath(value) {
  if (typeof value === "string" && value.startsWith("/img/")) {
    return `${import.meta.env.BASE_URL}${value.slice(1)}`;
  }
  return value;
}

export function resolveIconPaths(data) {
  if (Array.isArray(data)) {
    return data.map(resolveIconPaths);
  }
  if (data !== null && typeof data === "object") {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      if (ICON_KEYS.includes(key) && typeof value === "string") {
        result[key] = resolvePath(value);
      } else {
        result[key] = resolveIconPaths(value);
      }
    }
    return result;
  }
  return data;
}
