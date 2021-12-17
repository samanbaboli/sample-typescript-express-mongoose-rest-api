import { Router } from "express";
import SimulatorsController from "@controllers/simulators.controller";
import { CreateSimulatorDto } from "@dtos/simulators.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class SimulatorsRoute implements Routes {
  public path = "/simulators";
  public router = Router();
  public simulatorsController = new SimulatorsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.simulatorsController.find);
    this.router.get(`${this.path}/:id`, this.simulatorsController.findOne);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateSimulatorDto, "body"),
      this.simulatorsController.create
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateSimulatorDto, "body", true),
      this.simulatorsController.update
    );
    this.router.delete(`${this.path}/:id`, this.simulatorsController.delete);
  }
}

export default SimulatorsRoute;
