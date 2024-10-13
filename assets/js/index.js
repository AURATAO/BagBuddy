import PocketBase from "pocketbase";
import { getWeatherAdvice } from "./weather";

//login modal
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modalBackdrop = document.getElementById("modalBackdrop");

openModal.addEventListener("click", () => {
  modalBackdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent scrolling
});

closeModal.addEventListener("click", () => {
  modalBackdrop.classList.add("hidden");
  document.body.style.overflow = "";
});

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    modalBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }
}); //Close modal when clicking outside the modal content

//open Menu
const openHam = document.getElementById("openHam");
const closeHam = document.getElementById("closeHam");
const hamBackdrop = document.getElementById("hamBackdrop");
const menuIcon = document.getElementById("menuIcon");

openHam.addEventListener("click", () => {
  hamBackdrop.classList.remove("hidden");
  openHam.classList.add("hidden");
  closeHam.classList.remove("hidden");
});

closeHam.addEventListener("click", () => {
  hamBackdrop.classList.add("hidden");
  openHam.classList.remove("hidden");
  closeHam.classList.add("hidden");
});

//section 1. Create your own pack list btn
document
  .getElementById("scroll-button")
  .addEventListener("click", scrollDownBtn);

//scroll down to get your own pack list section
function scrollDownBtn() {
  document.getElementById("target-section").scrollIntoView({
    behavior: "smooth",
  });
}

//section 2. download pre-made pack list drop down btn

const PremadeListdropDownBtn = document.getElementById(
  "PremadeListdropDownBtn"
);
const premadeListMenu = document.getElementById("premadeListMenu");

PremadeListdropDownBtn.addEventListener("click", () => {
  premadeListMenu.classList.toggle("hidden");
});

//section 3- create your own list

//fetch country data - Fetch countries directly from the external API
async function fetchCountries() {
  console.log("Fetching countries...");
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await res.json();
    const countries = data.data.map((country) => country.country);
    const countrySelect = document.getElementById("country");

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });

    // Add event listener for country change to fetch cities
    countrySelect.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;
      fetchCities(selectedCountry); //Fetch cities for the selected country
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Fetch cities based on selected country directly from the external API

async function fetchCities(country) {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Corrected header property
        },
        body: JSON.stringify({ country }), // Sending the selected country
      }
    );

    const data = await res.json();
    const citySelect = document.getElementById("city");
    citySelect.innerHTML = ""; // clear previous options

    data.data.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}

//fetch country data as nationality
async function fetchNationality() {
  console.log("Fetching Nationality...");
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await res.json();
    const countries = data.data.map((country) => country.country);
    const selectedCountry = document.getElementById("nationality");

    console.log(data);

    // Clear previous options, if needed (optional)
    selectedCountry.innerHTML = "";
    // Add the "Select Nationality" option as the default
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Nationality";
    selectedCountry.appendChild(defaultOption);

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      selectedCountry.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching nationality", error);
  }
}

// Combine both fetches in a single window.onload
// window.onload = function () {
//   fetchCountries(); // Fetch countries and handle cities
//   fetchNationality(); // Fetch nationalities
// };

window.addEventListener("load", fetchCountries);
window.addEventListener("load", fetchNationality);

/**
 * 
 * POST /api/v1/post/packagelist/basic
 * 
 * {
 *  userId: "uuid"
 *  departureDate: "yyyy/mm/dd"
 *  arrivalDate: "yyyy/mm/dd"
 *  destinationCity: "string"
 *  destinationCountry: "string"
 *  airline: "string"
 *  cabinClass: "string"
 *  nationality: "string"
    accomodationType: "yyyy/mm/dd"
 *  gender: ""
    activityLevel: ""
    
 * }

    id = 12

    nodejs 
    express
    pocketbase

    GET /api/v1/get/packagelist/:id
    /api/v1/get/packagelist/12

 * 
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Pocketbase instance
  const pb = new PocketBase("http://127.0.0.1:8090");

  const hotTemperatureThreshold = 25;
  const freshTemperatureThreshold = 15;

  // if (destinationTemperature > hotTemperatureThreshold) {
  //   //suggest hot clothes
  // } else if (
  //   freshTemperatureThreshold <=
  //   destinationTemperature <=
  //   hotTemperatureThreshold
  // ) {
  //   //suggest fresh clothes
  // } else {
  //   //suggest cold clothes
  // }

  // input form data

  // Reference form fields for validation
  const packingListForm = document.getElementById("packingListForm");
  const departDate = document.getElementById("depart");
  const returnDate = document.getElementById("return");
  const country = document.getElementById("country");
  const city = document.getElementById("city");
  const airline = document.getElementById("airline");
  const cabinClass = document.getElementById("cabinClass");
  const nationality = document.getElementById("nationality");
  const accommodation = document.getElementById("accommodation");
  const submitButton = document.getElementById("submit"); //is for change the background color once the form is completed

  const elementToValidate = [
    departDate,
    returnDate,
    country,
    city,
    airline,
    cabinClass,
    nationality,
    accommodation,
  ];

  function validateForm() {
    let isValid = true;

    elementToValidate.forEach((element) => {
      element.style.borderColor = "#219EBC"; //reset color
    });

    const returnDateFormatted = new Date(returnDate.value);
    const departDateFormatted = new Date(departDate.value);

    // Date validation: return date cannot be earlier than departure date
    if (returnDateFormatted < departDateFormatted) {
      isValid = false;
      returnDate.style.borderColor = "red";
      alert("Return date cannot be earlier than the departure date.");
    }

    // Check for empty fields
    elementToValidate.forEach((element) => {
      if (!element.value) {
        isValid = false;
        element.style.borderColor = "red";
      }
    });
    //If form is invalid, prevent submission
    if (isValid) {
      submitButton.style.backgroundColor = "#219EBC";
      submitButton.style.color = "#FFFFFF";
    } else {
      submitButton.style.backgroundColor = "#EEEEEE";
    }

    return isValid; //// Stop the form submission if not valid
  }
  // Add event listeners for input fields to validate on input
  elementToValidate.forEach((element) => {
    element.addEventListener("input", validateForm);
  });

  //submit form data
  packingListForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this); // Get form data
    const data = Object.fromEntries(formData.entries());

    const returnDateFormatted = new Date(returnDate.value);
    const departDateFormatted = new Date(departDate.value);

    const forecastDays =
      returnDateFormatted.getTimezoneOffset() -
      departDateFormatted.getTimezoneOffset();
    console.log("ret: " + returnDateFormatted);
    console.log("dep: " + departDateFormatted);

    console.log("forecastDays: " + forecastDays);

    if (!validateForm()) {
      alert("Please complete all the form before submitting.");
      return; // Stop form submission if invalid
    }

    const pocketbaseRecord = await pb.collection("packingLists").create({
      departure: departDate.value,
      return: returnDate.value,
      destination_country: country.value,
      destination_city: city.value,
      airline: airline.value,
      cabin_class: cabinClass.value,
      nationality: nationality.value,
      accommodation_type: accommodation.value,
    });

    try {
      const res = await fetch("http://localhost:3000/submit-packList", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), //// Send the data as JSON
      });

      const result = await res.json();
      console.log(result);
      alert(result.message);
    } catch (error) {
      console.error("Error submitting from:", error);
      alert("There was an error submitting the form. Please try again.");
    }

    // Combine the country and city into one destination string for the weather API
    const destination = `${city.value}, ${country.value}`;
    const weatherData = await getWeatherAdvice(destination);
    try {
      //1. Get the weather data based on destination
      const { temperature, precip, windSpeed, uvIndex } = weatherData;
      console.log(`Temperature in ${destination}: ${temperature}°C`);

      //2: Fetch clothing advice from Pocketbase based on the temperature
      const clothesAdvice = await getClothesAdvice(
        temperature,
        precip,
        windSpeed,
        uvIndex
      );
      console.log("Clothing advice:", clothesAdvice);
    } catch (error) {
      console.error("Error from the form submission", error);
    }

    // Call the weather fetching function from weather.js
    const weatherAdvice = await getWeatherAdvice(destination);
    // Display the weather advice or append it to the form
    console.log(weatherAdvice);
  });

  //Fetch Items from Pocketbase

  async function getClothesAdvice(temperature, precip, windSpeed, uvIndex) {
    const pb = new PocketBase("http://127.0.0.1:8090");

    try {
      //3. Fetch all clothing items from the PocketBase collection
      const items = await pb.collection("clothingItems_weather").getFullList();

      // 4. Filter and return clothing advice based on the temperature threshold
      const advice = items
        .filter((item) => {
          const tempCheck = temperature >= item.temperature_threshold;
          const rainCheck = precip > 0 ? item.suitable_for_rain : true;
          const uvCheck = uvIndex > 0 ? item.suitable_for_sun : true;
          const windCheck = windSpeed > 15 ? item.suitable_for_wind : true;

          return tempCheck && rainCheck && windCheck && uvCheck;
        })
        .map((item) => item.item);

      // Fetch all clothing items

      return advice;
    } catch (error) {
      console.error("Error fetching clothing advice:", error);
      throw error;
    }
  }
});
