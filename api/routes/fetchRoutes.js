import { BASE_URL } from "..";
export const residential = {
  properties: `${BASE_URL}/residential/Properties/$query`,
  photos: `${BASE_URL}/residentialPhotos/MLS-index.jpeg`,
};

export const commercial = {
  properties: `${BASE_URL}/commercial/Properties/$query`,
  photos: `${BASE_URL}/commercialPhotos/MLS-index.jpeg`,
};
