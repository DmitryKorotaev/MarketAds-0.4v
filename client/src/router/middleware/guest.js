export default function guest({ next }) {
  if (localStorage.getItem("login")) {
    return next({
      name: "home",
    });
  }

  return next();
}
