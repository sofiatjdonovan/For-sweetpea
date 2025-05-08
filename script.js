const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
    { minDegree: 0, maxDegree: 59, label: "Big Moose Date" },
    { minDegree: 60, maxDegree: 119, label: "Feeding the Ducks in Roath Park" },
    { minDegree: 120, maxDegree: 179, label: "Writing Silly Poems Together" },
    { minDegree: 180, maxDegree: 239, label: "Crafting" },
    { minDegree: 240, maxDegree: 299, label: "Movie Night" },
    { minDegree: 300, maxDegree: 359, label: "Coffee and a Walk" },
  ];

//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#f873a8",
  "#b63576",
  "#f873a8",
  "#b63576",
  "#f873a8",
  "#b63576",

];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["Big Moose Date", "Feeding the Ducks in Roath Park", "Writing Silly Poems Together", "Crafting", "Movie Night", "Coffee and a Walk"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
        tooltip: false,
        legend: { display: false },
        datalabels: {
          color: "#ffffff",
          formatter: (value, context) => context.chart.data.labels[context.dataIndex],
          font: {
            size: 14, // Adjust as needed
            weight: 'bold',
          },
          anchor: 'center',
          align: 'center',
          clamp: true,
        },
      },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>${i.label}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Good Luck!</p>`;
  
    // Generate a random stopping angle (0-359)
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = 360 * 5 + randomDegree; // 5 full spins plus random stop
    let currentRotation = 0;
  
    let rotationInterval = window.setInterval(() => {
      currentRotation += resultValue;
      myChart.options.rotation = currentRotation % 360;
      myChart.update();
  
      if (currentRotation >= totalRotation) {
        clearInterval(rotationInterval);
  
        // Normalize angle so top slice aligns with pointer
        const finalAngle = (360 - (currentRotation % 360) + 90) % 360;
  
        valueGenerator(finalAngle);
  
        count = 0;
        resultValue = 101;
        spinBtn.disabled = false;
      }
  
      if (resultValue > 5) {
        resultValue -= 1;
      }
    }, 10);
  });