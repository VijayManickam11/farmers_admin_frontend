

const instance = "DEV";
let BASE_URL;

if(instance == "LOCAL") {
  BASE_URL = "http://localhost:8083"; 
} else if(instance == "DEV") {
  BASE_URL = "https://dev-services-app-inspection-com.azurewebsites.net";    
} else if(instance == "UAT") {
  BASE_URL = "https://inspection-uat-api-ctemd9b2aeg8hmd8.uaenorth-01.azurewebsites.net";
}

let WEB_URL;

if(instance == "LOCAL") {
  WEB_URL = "http://localhost:8083"; 
} else if(instance == "DEV") {
  WEB_URL = "https://icy-flower-0c748ae0f.5.azurestaticapps.net";    
} else if(instance == "UAT") {
  WEB_URL = "https://nice-wave-05de65000.5.azurestaticapps.net";
}

export const apiConfig = {
  API_VERSION_1: "",
  API_ROOT_URL: "http://localhost:8081",
  STATIC_SESSION: "202320232023202320232023",
  WEB_URL: WEB_URL
};        