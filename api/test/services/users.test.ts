import app from '../../src/app';

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');
    expect(service).toBeTruthy();
  });

  it('creates a new user, encrypts password', async () => {
    const user = await app.service('users').create({
      strategy: 'local',
      email: Date.now() + '@example.com',
      password: 'secret'
    });

    expect(user.password).not.toBe('secret');
  });
});
