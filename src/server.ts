process.env["NODE_CONFIG_DIR"] = __dirname + "/configs";

import "dotenv/config";
import App from "@/app";
import FavoritesRoute from "@routes/favorite.route";
import ProfilesRoute from "@routes/profiles.route";
import SimulatorsRoute from "@routes/simulators.route";
import IndexRoute from "@routes/index.route";
import validateEnv from "@utils/validateEnv";

validateEnv();

const app = new App([
  new FavoritesRoute(),
  new ProfilesRoute(),
  new SimulatorsRoute(),
  new IndexRoute()
]);

app.listen();
