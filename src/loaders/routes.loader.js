import router from "../modules/index.js";
import ApiResponse from "../utils/ApiResponse.js";

export default function routesLoader(app) {
  // Base health check
  app.get("/", (req, res) => {
    ApiResponse.success(res, 200, "API is running", true);
  });

  // API Versioning
  app.use("/api", router);
}
