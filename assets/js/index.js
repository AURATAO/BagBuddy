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
