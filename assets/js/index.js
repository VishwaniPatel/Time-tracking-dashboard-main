const options = document.getElementsByClassName("option");
const current = document.getElementsByClassName("current");
const previous = document.getElementsByClassName("previous");
let dailyData = document.getElementById("daily");
let weeklyData = document.getElementById("weekly");
let monthlyData = document.getElementById("monthly");

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", loadData);
  console.log("It works");
}

function loadData(event) {
  let id_target = event.target.id;
  data().then(function (r) {
    for (let i = 0; i < r.length; i++) {
      //   Show daily data
      if (id_target == "daily") {
        dailyData.classList.add("active");
        weeklyData.classList.remove("active");
        monthlyData.classList.remove("active");
        current[i].innerText = r[i].timeframes.daily.current + " hrs";
        previous[i].innerText =
          "Last day " + r[i].timeframes.daily.previous + " hrs";
      }
      // Show weekly data
      else if (id_target == "weekly") {
        dailyData.classList.remove("active");
        weeklyData.classList.add("active");
        monthlyData.classList.remove("active");
        current[i].innerText = r[i].timeframes.weekly.current + " hrs";
        previous[i].innerText =
          "Last Week " + r[i].timeframes.weekly.previous + " hrs";
      }
      //   Show monthly data
      else if (id_target == "monthly") {
        dailyData.classList.remove("active");
        weeklyData.classList.remove("active");
        monthlyData.classList.add("active");
        current[i].innerText = r[i].timeframes.monthly.current + " hrs";
        previous[i].innerText =
          "Last month " + r[i].timeframes.monthly.previous + " hrs";
      }
    }
  });
}

// load data when window loaded
window.addEventListener("DOMContentLoaded", () => {
  data().then(function (r) {
    for (let i = 0; i < r.length; i++) {
      dailyData.classList.remove("active");
      weeklyData.classList.add("active");
      monthlyData.classList.remove("active");
      current[i].innerText = r[i].timeframes.weekly.current + " hrs";
      previous[i].innerText =
        "Last Week " + r[i].timeframes.weekly.previous + " hrs";
    }
  });
});

// retriving data from json
async function data() {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}
