import authService from "@/services/authService";

export const authGuard = (to, from, next) => {
  authService.isAuthenticated().then((response) => {
    const isAuthenticated = response.data.isAuthenticated;
    if (isAuthenticated && to.name === "Home") {
      {
        next("/posts");
      }
      next();
    }
    if (isAuthenticated) {
      next();
    } else {
      next("/home");
    }
  });
};
