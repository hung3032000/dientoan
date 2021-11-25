import axios from 'axios';
import { stringify, parse } from 'query-string';
import store from '../store';
// import './interceptor';
const BASE_API = process.env.REACT_APP_BASE_API || '';

const API = async ({
  url,
  params = '',
  method = 'get',
  headers = {},
  data = {},
  cancelTokenSource,
  ...props
}) => {
  const newParams = parse(stringify(params, { arrayFormat: 'comma' }));
  try {
    let updatedHeaders = { ...headers, Authorization: 'Bearer ' + localStorage.getItem("token") };
    const response = await axios({
      method,
      url: `${BASE_API}/api${url}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...updatedHeaders
      },
      ...props,
      params: newParams,
      data,
      cancelToken: cancelTokenSource?.token
    });
    
    if (response.data.code == 403){
      window.location.href = '/login'
      return;
    }
    return response && response.data;
  } catch (error) {
    throw error;
  }
};

export default API;
