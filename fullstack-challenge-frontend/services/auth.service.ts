import axios from 'axios';
import { UserInterface } from '@/types';

const API_URL = 'http://localhost:3030/';

class AuthService {
  authenticate(user: UserInterface) {
    return axios
      .post(API_URL + 'authentication', {...user, strategy: 'local'})
      .then(response => {
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user: UserInterface) {
    return axios.post(API_URL + 'users', user);
  }
}

export default new AuthService();
