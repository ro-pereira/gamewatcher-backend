import app from "./server";
import routes from "./routes";

app.use(routes);

app.listen(3001);
