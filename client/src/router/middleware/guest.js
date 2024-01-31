export default function guest({ next }) {
  if (localStorage.getItem("Login")) {
    return next({
      name: "/",
    });
  }

  return next();
}
