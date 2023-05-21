import { rest } from "msw";
import { piecesData, gameTechniquesData } from "./mockData";

export const handlers = [
  rest.post("http://localhost:8080/login", (req, res, ctx) => {
    const userName = req.body.userName;
    const password = req.body.password;
    if (userName === "" || password === "") {
      return res(ctx.status(401));
    } else {
      return res(ctx.status(200));
    }
  }),
  rest.post("http://localhost:8080/saveGame", (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.get("http://localhost:8080/getPieces", (req, res, ctx)=>{
    return res(ctx.status(200),
    ctx.json(piecesData))
  }),

  rest.get("http://localhost:8080/getGameTechniques", (req, res, ctx)=>{
    return res(ctx.status(200),
    ctx.json(gameTechniquesData))
  })
];
