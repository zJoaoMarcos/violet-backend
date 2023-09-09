import { app } from "./app";

app.listen({ host: "0.0.0.0", port: 3001 }).then(() => {
  console.log("Server is running... 🚀");
});
