import AccountService from "../services/accountService.js";
import Account from "../models/Account.js";

const service = new AccountService;
jest.mock("../models/Account.js");

describe('getUser method test', () => {
  it('should return user if found', async () => {
    // MUST! mock method that service used (findOne in this block) 
    Account.findOne.mockResolvedValue({ id: '123', name: 'Test' });

    const result = await service.getUser('123');

    expect(result.success).toBe(true);
    expect(result.object?.name).toBe('Test');
  });

  it('should return message if not found', async() => {
    Account.findOne.mockResolvedValue(null);

    const result = await service.getUser('xxx');
    expect(result.success).toBe(false);
    expect(result.message).toBe('User with id: xxx not found!');
  });
});

