import app from "./server";
import routes from "./routes";

app.use(routes);

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});