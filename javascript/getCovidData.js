const container = document.getElementById("covidData");
let newI;
const getCovidData = async () => {
	const url =
		// "http://www.whateverorigin.org/get?url=https://data.covid19.go.id/public/api/update.json" +
		// "&callback=?";
    `https://api.allorigins.win/get?url=${encodeURIComponent(
			"https://data.covid19.go.id/public/api/update.json"
		)}`;
	const res = await fetch(url);
	const data = await res.json();
  // console.log(data.contents)
  const data2 = data.contents;
	const data3 = JSON.parse(data2)
  console.log(data3.update.penambahan)
	let penambahan = data3.update.penambahan;
	for (var i in penambahan) {
		if (i != "created") {
			let html = "";
			if (
				i == "jumlah_positif" ||
				i == "jumlah_meninggal" ||
				i == "jumlah_sembuh" ||
				i == "jumlah_dirawat"
			) {
				newI = i.replace("_", " ");
			} else {
				newI = "Update Tanggal";
			}
			html += `<div class="col-sm-12 col-lg card w-auto m-2 text-nowrap">
                  <div class="card-body">
                    <h5 class="card-title data">${newI}</h5>
                    <p class="card-text">${penambahan[i]}</p>
                  </div>
                </div>`;
			container.insertAdjacentHTML("beforeend", html);
		}
	}
};

const useGetCovidData = () => {
	return { getCovidData };
};

export { useGetCovidData };
