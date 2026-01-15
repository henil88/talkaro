import { Request, Response } from "express";

class ActivateController {
  activate(req: Request, res: Response) {
    //activated logic goes here
    res.json({ message: "all ok" });
  }
}

export default new ActivateController();
