import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config/configuration';
import { Response, NextFunction } from 'express';
import { userRepository } from '../../repositories/user/UserRepository';

export default async (request: any, response: Response, next: NextFunction) => {
  try {
    const token = request.header('Authorization');
    const { jwt_secret } = configuration;

    if (token) {
      const decodedToken = jwt.verify(token, jwt_secret);
      const userExists = await userRepository.findOneUser({ id: decodedToken });
      if (!userExists) {
        next({
          error: "not exits",
          message: 'Permission Denied',
          status: 404,
        });
      }
      request.user = decodedToken;
      next();
    } else {
      response.status(200).send({
        message: "Token Not Found",
        status: 404,
      });
    }
  } catch (error) {
    console.log('CATCH BLOCK : AuthMiddleware =>', error);
  }
};
