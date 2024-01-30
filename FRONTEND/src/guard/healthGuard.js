import dataService from "@/services/dataService";

export const healthGuard = async (to, from, next) => {
  try {
    const response = await dataService.healthCheck();
    if (response.status === 200) {
      next();
    } else {
      next({ name: "connectionError" });
    }
  } catch (error) {
    console.error("Error in healthGuard:", error);
    next({ name: "connectionError" });
  }
};
