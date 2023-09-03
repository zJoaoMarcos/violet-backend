import fastify from "fastify";

const app = fastify();

app.get("/", async function handler(request, reply) {
  return { hello: "node.js" };
});

app.listen({ port: 3001 }).then(() => {
  console.log("Server is running... 🚀");
});
