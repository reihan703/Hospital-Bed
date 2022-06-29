// CREATE DROPDOWN FROM JSON
// PROVINCES DROPDOWN
var provinceID, cityID, typeID;
// CONNECT TO TABLE BODY
let tbody = document.getElementById("tableBody");

// CONNECT TO PROVINCE DROPDOWN
let dropdown = document.getElementById("selectedProvince");
dropdown.length = 0;

// FIRST DROPDOWN VALUE
let defaultOption = document.createElement("option");
defaultOption.text = "Choose Province";
defaultOption.disabled = true;

// ADD OPTION TO THE DROPDOWN
dropdown.add(defaultOption);
dropdown.selectedIndex = 0;
// END PROVINCES DROPDOWN

// CITIES DROPDOWN
let dropdownCity = document.getElementById("selectedCity");
dropdownCity.length = 0;

// CREATE VALUE TO THE DROPDOWN
let defaultOption2 = document.createElement("option");
defaultOption2.text = "Choose City";
defaultOption2.disabled = true;

// CREATE VALUE TO THE DROPDOWN
dropdownCity.add(defaultOption2);
dropdownCity.selectedIndex = 0;
// END CITIES

// INSERT PROVINCES DATA TO SELECT
const url = " https://rs-bed-covid-api.vercel.app/api/get-provinces";
async function getProvince() {
    const res = await fetch(url);
    // CONVERT RESULT TO JSON
    const data = await res.json();
    const provinces = data.provinces;
    let option;
    provinces.forEach((province) => {
        try {
            // ADD THE OPTIONS
            option = document.createElement("option");
            option.text = province.name;
            option.value = province.id;
            dropdown.add(option);
        } catch (err) {
            console.log(err);
        }
    });
}
// CALL THE FUNCTION
getProvince();
//  END DROPDOWN

// GET PROVINCE ID ON CLICK
const selectedProvince = document.getElementById("selectedProvince");
selectedProvince.addEventListener("click", () => {
    dropdownCity.length = 0;
    // ASSIGN VALUE FROM SELECTED DROPDOWN
    provinceID = dropdown.options[dropdown.selectedIndex].value;
    let province = provinceID;

    // FETCH THE API BASED ON SELECETED ID
    async function getCity() {
        const url = `https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${province}`;
        const res = await fetch(url);
        const data = await res.json();
        const cities = data.cities;
        let option;
        cities.forEach((city) => {
            try {
                // ADD THE OPTIONS
                option = document.createElement("option");
                option.text = city.name;
                option.value = city.id;
                dropdownCity.add(option);
            } catch (err) {
                console.log(err);
            }
        });
    }
    getCity();
});

const selectedCity = document.getElementById("selectedCity");
selectedCity.addEventListener("click", () => {
    cityID = dropdownCity.options[dropdownCity.selectedIndex].value;
    let city = cityID;
    // GET PROVINCE ID AGAIN.... 
    provinceID = dropdown.options[dropdown.selectedIndex].value;
    let province = provinceID;

    // FETCH HOSPITALS BASED ON SELECETED PROVINCE ID AND CITY ID
    async function getHospitals() {
        const url = `https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${province}&cityid=${city}&type=1`;
        const res = await fetch(url);
        const data = await res.json();
        const hospitals = data.hospitals;
        let option;
        tbody.innerHTML = "";
        console.log(data.hospitals);
        hospitals.forEach((hospital) => {
            try {
                // INSERT DATA TO TABLE
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                // CREATE BUTTON
                let td3 = document.createElement("button");
                td.innerHTML = hospital.name;
                td2.innerHTML = hospital.bed_availability;
                td3.innerHTML = "Select";
                // SET BUTTON ID TO THE CORRESPONDING HOSPITAL ID
                td3.setAttribute("id", hospital.id);
                td3.setAttribute("value", hospital.id);
                // INSERT ALL TABLE DATA TO A SINGLE TABLE ROW
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                // INSERT THE TABLE ROW TO THE BODY OF TABLE
                tbody.appendChild(tr);

                // CONNECT TO TD3
                const btn = document.getElementById(hospital.id);
                btn.addEventListener("click", () => {
                    async function getDetails() {
                        const idHospital = hospital.id
                        const url = `https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${idHospital}&type=1`
                        const res = await fetch(url);
                        const data = await res.json();
                        console.log(data)
                    }
                    getDetails()
                });

            } catch (err) {
                console.log(err);
            }
        });
    }
    getHospitals();
});