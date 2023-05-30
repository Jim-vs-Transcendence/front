import axios from "axios";

interface SendOptions {
  method: string;
  path: string;
  data?: any;
}

const send = async ({ method = '', path = '', data = {} }: SendOptions = {}) => {
  const commonUrl = 'http://43.202.12.31:3000/' //'http://localhost:3000/api';
  const url = commonUrl + path;
  const getToken = localStorage.getItem('authToken'); //로컬스토리지에 저장된 키 값을 헤더에 붙여서 보낸다
  const headers = {
    'Content-Type': 'application/json',
    'X-Auth-Token': getToken,
  };

  const options = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getApi = ({ path = '' }: { path: string }) => {
  return send({ method: 'GET', path });
};
const putApi = ({ path = '', data = {} }: { path: string; data: any }) => {
  return send({ method: 'PUT', path, data });
};
const postApi = ({ path = '', data = {} }: { path: string; data: any }) => {
  return send({ method: 'POST', path, data });
};
const delApi = ({ path = '', data = {} }: { path: string; data: any }) => {
  return send({ method: 'DELETE', path, data });
};

export { getApi, putApi, postApi, delApi };