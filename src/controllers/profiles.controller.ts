import { NextFunction, Request, Response } from "express";
import { Profile } from "@interfaces/profile.interface";
import { CreateProfileDto } from "@dtos/profiles.dto";
import ProfileService from "@/services/profile.service";

class ProfileController {
  public profileService = new ProfileService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileData: CreateProfileDto = req.body;
      const createProfile: Profile =
        await this.profileService.createProfile(profileData);

      res.set(
        "Location",
        `${process.env.BASE_URL} + /profiles/${createProfile._id}`
      );
      res.status(201).json({
        data: createProfile,
        message: "Profile has been created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profiles: Profile[] =
        await this.profileService.findAllProfile();

      res.status(200).json({
        data: profiles,
        message: "All profiles has been retrieved successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileId: string = req.params.id;
      const profile: Profile = await this.profileService.findProfileById(
        profileId
      );
      if (!profile) {
        res.status(404).json({ data: [], message: "No found :(" });
      }
      res.status(200).json({
        data: profile,
        message: "Your profile has been retrieved successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileData: CreateProfileDto = req.body;
      const profileId: string = req.params.id;

      const updatedProfile: Profile =
        await this.profileService.updateProfile(profileId, profileData);

      if (!updatedProfile) {
        res.status(404).json({ data: [], message: "No found :(" });
      }
      res.status(200).json({
        data: updatedProfile,
        message: "Your profile has been updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileId: string = req.params.id;
      const deletedProfile: Profile =
        await this.profileService.deleteProfile(profileId);

      if (!deletedProfile) {
        res.status(404).json({ data: {}, message: "No found :(" });
      }
      res.status(204).json({
        data: {},
        message: "Your profile has been deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
