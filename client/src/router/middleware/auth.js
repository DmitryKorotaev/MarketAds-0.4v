export default function auth({ next }) {
  if (!localStorage.getItem("login")) {
    return next({
      name: "login",
    });
  }
  return next();
}
