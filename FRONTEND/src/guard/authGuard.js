import authService from "@/services/authService";

export const authGuard = async (to, from, next) => {
  try {
    const response = await authService.isAuthenticated();
    const isAuthenticated = response.data.isAuthenticated;

    if (isAuthenticated) {
      if (to.name === "home") {
        next({ name: "profile" });
      } else {
        next();
      }
    } else if (to.name === "home") {
      next();
    } else {
      next({ name: "home" });
    }
  } catch (error) {
    console.error("Error in authGuard:", error);
    next({ name: "connectionError" });
  }
};
