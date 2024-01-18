import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import UpdateUserAvatarService from '../../typeorm/services/UpdateUserAvatarService';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(instanceToInstance(user));
  }
}
