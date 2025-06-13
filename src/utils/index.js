export function createPageUrl(pageName) {
  switch (pageName) {
    case "Dashboard":
      return "/Dashboard";
    case "Exercises":
      return "/Exercises";
    case "Games":
      return "/Games";
    case "Progress":
      return "/Progress";
    case "Home":
      return "/";
    case "Setup":
      return "/setup";
    default:
      return "/";
  }
}
