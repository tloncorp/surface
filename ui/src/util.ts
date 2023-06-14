import { DocketHref } from "@/gear";

export const getQueryParam = (key: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key) as string | null;
};

export const setQueryParam = (key: string, value: string | null) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (value) {
    searchParams.set(key, value);
  } else {
    searchParams.delete(key);
  }
  const url = window.location.pathname + "?" + searchParams.toString();
  // We use `replaceState` so that the browser history doesn't get cluttered
  window.history.replaceState(null, "", url);
};

export function getAppHref(href: DocketHref) {
  return "site" in href ? href.site : `/apps/${href.glob.base}/`;
}

export function normalizeUrbitColor(color: string): string {
  if (color.startsWith("#")) {
    return color;
  }

  const colorString = color.slice(2).replace(".", "").toUpperCase();
  const lengthAdjustedColor = colorString.padStart(6, "0");
  return `#${lengthAdjustedColor}`;
}
