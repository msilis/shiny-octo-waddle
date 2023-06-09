import { rest } from "msw";
import { piecesData, gameTechniquesData } from "./mockData";

export const handlers = [
  rest.post(
    "https://group-class-backend.onrender.com/login",
    (req, res, ctx) => {
      const userName = req.body.userName;
      const password = req.body.password;
      if (userName === "" || password === "") {
        return res(ctx.status(401));
      } else {
        return res(ctx.status(200));
      }
    }
  ),
  rest.post(
    "https://group-class-backend.onrender.com/saveGame",
    (req, res, ctx) => {
      return res(ctx.status(201));
    }
  ),

  rest.get(
    "https://group-class-backend.onrender.com/getPieces",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(piecesData));
    }
  ),

  rest.get(
    "https://group-class-backend.onrender.com/getGameTechniques",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(gameTechniquesData));
    }
  ),
];
