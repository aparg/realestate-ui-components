import { saleLease } from "@/constant";

export const generateURL = ({
  cityVal = null,
  houseTypeVal = null,
  saleLeaseVal = null,
  listingIDVal = null,
  embeddedSite = false,
} = {}) => {
  const city = cityVal?.toLowerCase() || null;
  const houseType = houseTypeVal?.toLowerCase() || null;
  const saleLeaseType =
    Object.keys(saleLease).find((key) => key == saleLeaseVal) ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].value == saleLeaseVal)
      ?.toLowerCase() ||
    null;
  if (listingIDVal && city)
    return `${
      embeddedSite ? "/embedded-site" : ""
    }/ontario/${city}/listings/${listingIDVal}`;
  if (city) {
    if (houseType) {
      if (saleLeaseType) {
        return `${
          embeddedSite ? "/embedded-site" : ""
        }/ontario/${city}/${houseType}/${saleLeaseType}`;
      }
      return `${
        embeddedSite ? "/embedded-site" : ""
      }/ontario/${city}/${houseType}`;
    }
    if (saleLeaseType) {
      return `${
        embeddedSite ? "/embedded-site" : ""
      }/ontario/${city}/${saleLeaseType}`;
    }
    return `${embeddedSite ? "/embedded-site" : ""}/ontario/${city}`;
  }
  if (houseType) {
    if (saleLeaseType) {
      return `${
        embeddedSite ? "/embedded-site" : ""
      }/ontario/filter/${houseType}/${saleLeaseType}`;
    }
    return `${
      embeddedSite ? "/embedded-site" : ""
    }/ontario/filter/${houseType}`;
  }
  if (saleLeaseType) {
    return `${
      embeddedSite ? "/embedded-site" : ""
    }/ontario/filter/${saleLeaseType}`;
  }

  return `${embeddedSite ? "/embedded-site" : ""}/ontario`;
};
