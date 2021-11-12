import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}/`,
});

const getSignature = async (meetingId) => { 
  let response = await axiosInstance.get(`zoom/meeting/${meetingId}/signature`);
  return response.data;
}

export default getSignature;