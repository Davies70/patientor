import axios from 'axios';
import { Patient, PatientFormValues, Entry, RatingAndId } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createEntry = async (entry: unknown, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};

const changeRating = async (object: RatingAndId) => {
  await axios.put(`${apiBaseUrl}/patients/`, object);
};

export default {
  getAll,
  create,
  getOne,
  createEntry,
  changeRating,
};
