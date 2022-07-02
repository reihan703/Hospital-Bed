import { useShowPosts } from "./showPosts.js";
import { useAddPost } from "./addPost.js";

const {addPost} = useAddPost();
const {showPosts} = useShowPosts();
// CONNECT TO THE 'DETAIL RS' NAV
const detailNav = document.getElementById('detailRS')

// CREATE DROPDOWN FROM JSON
// PROVINCES DROPDOWN
var provinceID, cityID, typeID;
// CONNECT TO TABLE BODY
let tbody = document.getElementById("tableBody");

// CONNECT TO PROVINCE DROPDOWN
let dropdown = document.getElementById("selectedProvince");
dropdown.length = 0;

const album = document.getElementById("album");
function erase(){
    album.innerHTML = ''
}

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
selectedProvince.addEventListener("change", () => {
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
selectedCity.addEventListener("change", () => {
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
        tbody.innerHTML = "";
        if(hospitals == 0){
            alert("No hospital available")
            return
        }
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
                // STYLE THE BUTTON
                td3.classList.add("btn", "btn-outline-primary", "btn-sm");
                // INSERT ALL TABLE DATA TO A SINGLE TABLE ROW
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                // INSERT THE TABLE ROW TO THE BODY OF TABLE
                tbody.appendChild(tr);

                // CONNECT TO TD3
                const btn = document.getElementById(hospital.id);
                btn.addEventListener("click", (e) => {
                    // DISPLAYING THE 'DETAIL RS' ON NAVBAR
                    e.preventDefault()
                    detailNav.classList.remove('d-none')
                    async function getDetails() {
                        document.getElementById("submitPost").remove()
                        const idHospital = hospital.id
                        addPost(idHospital);
                        showPosts(idHospital);
                        const url = `https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${idHospital}&type=1`
                        const res = await fetch(url);
                        const data = await res.json();
                        const details = data.data;
                        console.log(details)
                        let section = document.getElementById("details")
                        let name = document.getElementById('namaRS')
                        let address = document.getElementById('alamat')
                        let phone = document.getElementById('telefon')
                        name.innerHTML = details.name
                        address.innerHTML = details.address + ",\u00A0";
                        phone.innerHTML = details.phone;
                        section.classList.remove("d-none")

                        // CLEARING THE ALBUM SECTION
                        erase();
                        const bedDetails = details.bedDetail
                        let counter = 1;
                        bedDetails.forEach((bedDetail)=>{
                            // CREATING CARDS FOR EACH BED DETAIL
                            let html = '';
                            html += '<div class="col">';
                            html += '<div class="card shadow-sm card-color" style="min-height:170px;">';
                            html += '<div class="card-body">';
                            html += '<p class="card-text" id="bedTitle'+counter+'" style="font-weight:bold;">'+bedDetail.stats.title+'</p>'
                            html += '<p class="card-text text-nowrap" id="bedEmpty'+counter+'">Ruangan yang tersedia: '+bedDetail.stats.bed_empty+'</p>'
                            html += '<div class="d-flex justify-content-between align-items-center">'
                            html += '<small class="text-muted" id="time">'+bedDetail.time+'</small>'
                            html += "</div> </div> </div> </div>";

                            counter++;
                            album.insertAdjacentHTML("beforeend", html)
                        })
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