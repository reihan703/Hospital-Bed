const container = document.getElementById("covidData");
let newI
const getCovidData = async () => {
  
	const url = "https://data.covid19.go.id/public/api/update.json";
	const res = await fetch(url);
	const data = await res.json();
  let penambahan = data.update.penambahan;
  for(var i in penambahan){
    if(i != 'created'){
      let html = ''
      if(i == 'jumlah_positif' || i == 'jumlah_meninggal' || i == 'jumlah_sembuh' || i == 'jumlah_dirawat'){
        newI = i.replace('_', ' ')
      }else{
        newI = 'Update Tanggal'
      }
      html += `<div class="card w-25 m-2">
                  <div class="card-body">
                    <h5 class="card-title data">${newI}</h5>
                    <p class="card-text">${penambahan[i]}</p>
                  </div>
                </div>`;
      container.insertAdjacentHTML("beforeend", html)
    }
  }
};

const useGetCovidData = () => {
	return { getCovidData };
};

export { useGetCovidData };
