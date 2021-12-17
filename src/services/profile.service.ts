import { CreateProfileDto } from "@dtos/profiles.dto";
import { HttpException } from "@exceptions/HttpException";
import { Profile } from "@interfaces/profile.interface";
import { isEmpty } from "@utils/util";
import profileModel from "@/models/profile.model";

class ProfileService {
  public profiles = profileModel;

  public async findAllProfile(): Promise<Profile[]> {
    
    const profilesList: Profile[] = await this.profiles.find();
    return profilesList;
  }

  public async findProfileById(profileId: string): Promise<Profile> {
    if (isEmpty(profileId))
      throw new HttpException(400, "Please send profileId as a argument");

    const findProfile: Profile = await this.profiles.findOne({
      _id: profileId,
    });
    if (!findProfile)
      throw new HttpException(
        404,
        "We couldn't find any profile with given ID"
      );

    return findProfile;
  }

  public async createProfile(
    profileData: CreateProfileDto
  ): Promise<Profile> {
    if (isEmpty(profileData))
      throw new HttpException(400, "Please send all required poperties");

    const createProfileData: Profile = await this.profiles.create(
      profileData
    );

    return createProfileData;
  }

  public async updateProfile(
    profileId: string,
    profileData: CreateProfileDto
  ): Promise<Profile> {
    const updateProfileById: Profile = await this.profiles.findByIdAndUpdate(
      { _id: profileId },
      profileData,
      { new: true }
    );

    if (!updateProfileById)
      throw new HttpException(
        404,
        "We couldn't find any profile with given ID"
      );

    return updateProfileById;
  }

  public async deleteProfile(profileId: string): Promise<Profile> {
    const deleteProfileById: Profile = await this.profiles.findByIdAndDelete(
      profileId
    );
    if (!deleteProfileById)
      throw new HttpException(
        404,
        "We couldn't find your profile with given ID"
      );

    return deleteProfileById;
  }
}

export default ProfileService;
