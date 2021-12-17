import { CreateSimulatorDto } from "@dtos/simulators.dto";
import { HttpException } from "@exceptions/HttpException";
import { Simulator } from "@interfaces/simulator.interface";
import { isEmpty } from "@utils/util";
import simulatorModel from "@/models/simulator.model";

class SimulatorService {
  public simulators = simulatorModel;

  public async findAllSimulator(): Promise<Simulator[]> {
    const simulators: Simulator[] = await this.simulators.find();
    return simulators;
  }

  public async findSimulatorById(simulatorId: string): Promise<Simulator> {
    if (isEmpty(simulatorId))
      throw new HttpException(400, "Please send simulatorId as a argument");

    const findSimulator: Simulator = await this.simulators.findOne({
      _id: simulatorId,
    });
    if (!findSimulator)
      throw new HttpException(
        404,
        "We couldn't find any simulator with given Id"
      );

    return findSimulator;
  }

  public async createSimulator(
    simulatorData: CreateSimulatorDto
  ): Promise<Simulator> {
    if (isEmpty(simulatorData))
      throw new HttpException(
        404,
        "We couldn't find any simulator with given Id"
      );

    const createSimulatorData: Simulator = await this.simulators.create(
      simulatorData
    );

    return createSimulatorData;
  }

  public async updateSimulator(
    simulatorId: string,
    simulatorData: CreateSimulatorDto
  ): Promise<Simulator> {
    if (isEmpty(simulatorData))
      throw new HttpException(
        404,
        "We couldn't find any simulator with given Id"
      );

    const updateSimulatorById: Simulator = await this.simulators.findByIdAndUpdate(
      simulatorId,
      { simulatorData }
    );
    if (!updateSimulatorById)
      throw new HttpException(
        404,
        "We couldn't find any simulator with given Id"
      );

    return updateSimulatorById;
  }

  public async deleteSimulator(simulatorId: string): Promise<Simulator> {
    const deleteSimulatorById: Simulator = await this.simulators.findByIdAndDelete(
      simulatorId
    );
    if (!deleteSimulatorById)
      throw new HttpException(
        404,
        "We couldn't find any simulator with given Id"
      );

    return deleteSimulatorById;
  }
}

export default SimulatorService;
