import { rest } from "msw";
import { piecesData, gameTechniquesData } from "./mockData";
import { API_URL } from "../../Utilities/Config/api";

export const handlers = [
  rest.post(`${API_URL.login}`, (req, res, ctx) => {
    const userName = req.body.userName;
    const password = req.body.password;
    if (userName === "" || password === "") {
      return res(ctx.status(401));
    } else {
      return res(ctx.status(200));
    }
  }),
  rest.post(`${API_URL.saveGame}`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.get(`${API_URL.getPieces}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(piecesData));
  }),

  rest.get(`${API_URL.gameTechniques}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(gameTechniquesData));
  }),
];
