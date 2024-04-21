import { AboutVBDModule } from './about-vbd.module';

describe('AboutVBDModule', () => {
  let aboutVBDModule: AboutVBDModule;

  beforeEach(() => {
    aboutVBDModule = new AboutVBDModule();
  });

  it('should create an instance', () => {
    expect(aboutVBDModule).toBeTruthy();
  });
});
