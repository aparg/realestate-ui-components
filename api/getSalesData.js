"use server";
import { commercial, residential } from "./routes/fetchRoutes";
import { houseType } from "@/constant";

export const getSalesData = async (offset, limit, city, listingType) => {
  try {
    let selectQuery = `${
      city && `Municipality=${city || ""},`
    }SaleLease='Sale'`;
    const url = residential.properties.replace(
      "$query",
      `?$select=${selectQuery}&$skip=${offset}&$limit=${limit}`
    );
    const options = {
      method: "GET",
      cache: "no-store",
    };

    if (listingType) {
      selectQuery += `,TypeOwnSrch=${listingType}`;
    }

    console.log("fetch url");
    console.log(url);
    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    throw new Error(`An error happened in getSalesData: ${error}`);
  }
};

// export const getFilteredRetsData = async (queryParams) => {
//   try {
//     //all the necessary queries possible
//     let selectQuery = `${
//       queryParams.city ? `Municipality=${queryParams.city}` : ""
//     }${
//       queryParams.saleLease
//         ? `${queryParams.city ? "," : ""}SaleLease=${queryParams.saleLease}`
//         : ""
//     }${
//       queryParams.bed
//         ? `${queryParams.bed ? "," : ""}Bedrooms=${queryParams.bed}`
//         : ""
//     }`;
//     const skipQuery = `${queryParams.offset}`;
//     const limitQuery = `${queryParams.limit}`;
//     let rangeQuery = `minListPrice=${queryParams.minListPrice},minWashrooms=${queryParams.washroom}`;
//     let selectOrQuery = "";

//     if (queryParams.houseType) {
//       const houseTypeQuery = `,TypeOwnSrch='value'`;
//       queryParams.houseType.forEach((param, index) => {
//         if (param === houseType.condo.value) {
//           selectQuery += `,PropertyType='${param}'`;
//         } else selectQuery += houseTypeQuery.replace("value", param);

//         if (index !== queryParams.houseType.length - 1) {
//           selectQuery += ",";
//         }
//       });
//     }

//     if (queryParams.hasBasement) {
//       selectQuery += `,Basement1=Apartment`;
//     }

//     if (queryParams.sepEntrance) {
//       selectQuery += `,Basement2=Sep Entrance`;
//     }
//     if (queryParams.maxListPrice > queryParams.minListPrice) {
//       rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
//     }

//     if (queryParams.priceDecreased) {
//       selectQuery += `,PriceDecreased=true`;
//     }
//     const url = residential.properties.replace(
//       "$query",
//       `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}&$selectOr=${selectOrQuery}`
//     );

//     // console.log(url);
//     const options = {
//       method: "GET",
//       cache: "no-store",
//     };
//     const res = await fetch(url, options);
//     const data = await res.json();
//     return data.results;
//   } catch (error) {
//     throw new Error(`An error happened: ${error}`);
//   }
// };

//for portfolio
export const getFilteredRetsData = async (queryParams) => {
  try {
    //all the necessary queries possible
    let selectQuery = `${
      queryParams.city ? `Municipality=${queryParams.city}` : ""
    }${
      queryParams.saleLease
        ? `${queryParams.city ? "," : ""}SaleLease=${queryParams.saleLease}`
        : ""
    }${
      queryParams.bed
        ? `${queryParams.bed ? "," : ""}Bedrooms=${queryParams.bed}`
        : ""
    }`;
    const skipQuery = `${queryParams.offset}`;
    const limitQuery = `${queryParams.limit}`;
    let rangeQuery =
      queryParams.minListPrice || queryParams.washroom
        ? `minListPrice=${queryParams.minListPrice},minWashrooms=${queryParams.washroom}`
        : "";
    let selectOrQuery = "";

    if (queryParams.houseType) {
      const houseTypeQuery = `,TypeOwnSrch='value'`;
      queryParams.houseType.forEach((param, index) => {
        if (param === houseType.condo.value) {
          selectQuery += `,PropertyType='${param}'`;
        } else selectQuery += houseTypeQuery.replace("value", param);

        if (index !== queryParams.houseType.length - 1) {
          selectQuery += ",";
        }
      });
    }

    if (queryParams.hasBasement) {
      selectQuery += `,Basement1=Apartment`;
    }

    if (queryParams.sepEntrance) {
      selectQuery += `,Basement2=Sep Entrance`;
    }
    if (queryParams.maxListPrice > queryParams.minListPrice) {
      rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
    }

    if (queryParams.priceDecreased) {
      selectQuery += `,PriceDecreased=true`;
    }
    let url = "";
    if (queryParams.propertyType == "commercial") {
      url = commercial.properties.replace(
        "$query",
        `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}&$selectOr=${selectOrQuery}`
      );
    } else {
      url = residential.properties.replace(
        "$query",
        `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}&$selectOr=${selectOrQuery}`
      );
    }
    const options = {
      method: "GET",
      // cache: "no-store",
    };
    console.log(url);
    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(`An error happened in getFilteredRetsData: ${error}`);
  }
};

export const fetchDataFromMLS = async (listingID) => {
  const options = {
    method: "GET",
  };
  const urlToFetchMLSDetail = residential.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );
  console.log(urlToFetchMLSDetail);
  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();

  return data.results[0];
};
