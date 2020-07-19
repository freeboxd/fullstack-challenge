import app from '../../src/app';

describe('\'participations\' service', () => {
  it('registered the service', () => {
    const service = app.service('participations');
    expect(service).toBeTruthy();
  });
});
