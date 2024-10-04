const contentfulManagement = require("contentful-management");

export const createSurname = (
  nameSurnameWordsArray,
  capitalizeFirst = false
) => {
  let surname = "";
  for (let i = 1; i < nameSurnameWordsArray.length; i++) {
    if (capitalizeFirst && i === 1) {
      surname += capitalizeFirstLetter(nameSurnameWordsArray[i]);
    } else surname += nameSurnameWordsArray[i];
  }
  return surname;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseBlogDate = (rawTime) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    rawTime.getDate().toString().padStart(2, "0") +
    " " +
    monthNames[rawTime.getMonth()] +
    " " +
    rawTime.getFullYear()
  );
};

//helper method that calls contentful API
export async function fetchGraphQLContentfulData(query, variables = {}) {
  //with no preview option
  return fetch(
    //process.env dostupni samo prilikom pozivanja na serveru(unutar api) i statickog buildanja koje se isto odvija na serveru
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.errors) {
        throw new Error(response.errors[0].message);
      } else return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export async function createContenfulCMAConnection() {
  const contenfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_CMA_TOKEN,
  });
  const space = await contenfulClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  return { contenfulClient, space, environment };
}
