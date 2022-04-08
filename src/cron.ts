require("dotenv").config();
import slack from "./clients/slack";
import listeners from "./listeners";
import sheets from "./sheets";

(async () => {
  sheets();
})();
