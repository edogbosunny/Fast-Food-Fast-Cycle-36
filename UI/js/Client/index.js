const token = localStorage.getItem("x-auth-token");
const gridContainer = document.querySelector(".gridcontainer");
const baseURL = "https://fast-food-fast-app.herokuapp.com/api/v1/menu";

if (token) {
  console.log("====>", "token found");
  fetch(baseURL, {
    method: "GET",
    headers: {
      "x-access-token": token
    }
  })
    .then(response => {
      if (!response.ok) {
        console.log("error===> page not found");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
}
