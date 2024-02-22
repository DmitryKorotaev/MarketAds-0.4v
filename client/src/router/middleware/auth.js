export default function auth({ next }) {
  if (!localStorage.getItem("Login")) {
    return next({
      path: "/Login",
    });
  }
  return next();
}
