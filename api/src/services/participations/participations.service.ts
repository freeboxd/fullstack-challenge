// Initializes the `participations` service on path `/participations`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Participations } from './participations.class';
import createModel from '../../models/participations.model';
import hooks from './participations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'participations': Participations & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/participations', new Participations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('participations');

  service.hooks(hooks);
}
