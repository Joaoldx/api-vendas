import { Request, Response } from 'express';
import ShowProfileService from '../typeorm/services/ShowProfileService';
import UpdateProfileService from '../typeorm/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response) {
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response) {
    const updateProfile = new UpdateProfileService();
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
