import { NextFunction, Request, Response } from "express";
import { Simulator } from "@interfaces/simulator.interface";
import { CreateSimulatorDto } from "@dtos/simulators.dto";
import SimulatorService from "@/services/simulator.service";

class SimulatorController {
  public simulatorService = new SimulatorService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const simulatorData: CreateSimulatorDto = req.body;
      const createSimulator: Simulator =
        await this.simulatorService.createSimulator(simulatorData);

      res.set(
        "Location",
        `${process.env.BASE_URL} + /simulators/${createSimulator._id}`
      );
      res.status(201).json({
        data: createSimulator,
        message: "Simulator has been created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const simulators: Simulator[] =
        await this.simulatorService.findAllSimulator();

      res.status(200).json({
        data: simulators,
        message: "All simulators has been retrieved successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const simulatorId: string = req.params.id;
      const simulator: Simulator = await this.simulatorService.findSimulatorById(
        simulatorId
      );
      if (!simulator) {
        res.status(404).json({ data: [], message: "No found :(" });
      }
      res.status(200).json({
        data: simulator,
        message: "Your simulator has been retrieved successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const simulatorData: CreateSimulatorDto = req.body;
      const simulatorId: string = req.params.id;

      const updatedSimulator: Simulator =
        await this.simulatorService.updateSimulator(simulatorId, simulatorData);

      if (!updatedSimulator) {
        res.status(404).json({ data: [], message: "No found :(" });
      }
      res.status(200).json({
        data: updatedSimulator,
        message: "Your simulator has been updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const simulatorId: string = req.params.id;
      const deletedSimulator: Simulator =
        await this.simulatorService.deleteSimulator(simulatorId);

      if (!deletedSimulator) {
        res.status(404).json({ data: {}, message: "No found :(" });
      }
      res.status(204).json({
        data: {},
        message: "Your simulator has been deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SimulatorController;
