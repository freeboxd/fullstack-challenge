import axios from 'axios';
import authHeader from './auth-header';
import { ParticipationInterface } from '~/types';

const API_URL = 'http://localhost:3030/participations/';

class ParticipationsService {
  async addParticipation(participation: ParticipationInterface) {
    return axios.post(API_URL, participation, {
      headers: authHeader(),
    });
  }

  getParticipations(params: { $skip?: number, $limit?: number }) {
    return axios.get(API_URL, {
      headers: authHeader(),
      params,
    });
  }
}

export default new ParticipationsService();
