import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { UserService } from '@modules/user/user.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findUserByEmail: jest.fn(),
    findUserByEmailForAuth: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return user and save session if validation succeeds', async () => {
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        passwordHash: 'hashed',
      };
      const mockSession = {
        save: jest.fn((callback) => callback(null)),
      };
      const mockRequest = {
        session: mockSession,
      } as unknown as Request;

      mockUserService.findUserByEmailForAuth.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(mockRequest, {
        email: 'test@example.com',
        password: 'password',
      });

      expect(mockUserService.findUserByEmailForAuth).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashed'); // Note: Service compares password against itself in current code?
      expect(mockSession.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should throw InternalServerErrorException if user not found', async () => {
      mockUserService.findUserByEmailForAuth.mockResolvedValue(null);
      const mockRequest = { session: {} } as unknown as Request;

      await expect(
        service.login(mockRequest, {
          email: 'wrong@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException if password invalid', async () => {
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        passwordHash: 'hashed',
      };
      mockUserService.findUserByEmailForAuth.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const mockRequest = { session: {} } as unknown as Request;

      await expect(
        service.login(mockRequest, {
          email: 'test@example.com',
          password: 'wrong',
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('logOut', () => {
    it('should destroy session successfully', async () => {
      const mockSession = {
        destroy: jest.fn((callback) => callback(null)),
      };
      const mockRequest = {
        session: mockSession,
      } as unknown as Request;

      const result = await service.logOut(mockRequest);

      expect(mockSession.destroy).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Logged out successfully' });
    });

    it('should throw InternalServerErrorException if destroy fails', async () => {
      const mockSession = {
        destroy: jest.fn((callback) => callback(new Error('Session error'))),
      };
      const mockRequest = {
        session: mockSession,
      } as unknown as Request;

      await expect(service.logOut(mockRequest)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockSession.destroy).toHaveBeenCalled();
    });
  });
});
