import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { Request } from 'express';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    logOut: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:5173'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login', async () => {
      const mockDto = { email: 'test@example.com', password: 'password' };
      const mockReq = {} as unknown as Request;
      const mockResult = { id: 'user-id', email: 'test@example.com' };

      mockAuthService.login.mockResolvedValue(mockResult);

      const result = await controller.login(mockReq, mockDto);

      expect(mockAuthService.login).toHaveBeenCalledWith(mockReq, mockDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('logout', () => {
    it('should call authService.logOut', async () => {
      const mockReq = {} as unknown as Request;
      const mockResult = { message: 'Logged out successfully' };

      mockAuthService.logOut.mockResolvedValue(mockResult);

      const result = await controller.logout(mockReq);

      expect(mockAuthService.logOut).toHaveBeenCalledWith(mockReq);
      expect(result).toEqual(mockResult);
    });
  });
});
