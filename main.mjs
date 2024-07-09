import fs from "node:fs";
import express from "express";
import { PrismaClient } from "@prisma/client";
import escapeHTML from "escape-html";
import { emojify } from "node-emoji";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
const prisma = new PrismaClient();

const template = fs.readFileSync("./template.html", "utf-8");
app.get("/", async (request, response) => {
  const posts = await prisma.post.findMany();
  const html = template.replace(
    "<!-- posts -->",
    posts.map((post) => `
    <li>${escapeHTML(post.message)}</li> 
      <form method="post" action="/delete">
      <button type="submit">削除</button>
      <input hidden name=deleteNumber value=${post.id}>
      </form>
      <form method="post" action="/edit">
      <button type="submit">編集</button>
      <input hidden name=editNumber value=${post.id}>
      </form>
      <!-- edit -->`).join(""),
  );
  response.send(html);
});

app.post("/send", async (request, response) => {
  await prisma.post.create({
    data: { message: emojify(request.body.message) },
  });
  response.redirect("/");
});

app.post("/delete", async (request, response) => {
  await prisma.post.delete({
    where: {id : parseInt(request.body.deleteNumber)},
  });
  response.redirect("/");
});

app.post("/edit", async (request, response) => {
  //未完成部分
  await prisma.post.update({
    data: {message: request.body.message},
    where: {id : parseInt(request.body.editNumber)},
  });
  response.redirect("/");
});

app.listen(3000);
