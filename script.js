fetch("./data.json")
  .then(response => {
    if(!response.ok){
      return console.log("error in fetching file");
    }
    return response.json();
  }).then(dataSet => {
    function setData(name,timeframe,text){
      const sections = document.querySelectorAll(`.${name}`);
      sections.forEach(section => {
        const article = section.closest("article");
        const title = article.dataset.title;
        const data = dataSet.find(item => item.title === title);
        section.querySelector(".current").textContent = `${data.timeframes[timeframe].current}hrs`;
        section.querySelector(".previous").textContent = `Last ${text} - ${data.timeframes[timeframe].previous}hrs`;
      })
    }
    setData("week-section","weekly","Week");
    setData("day-section","daily","Day");
    setData("month-section","monthly","Month");
  })

const buttons = document.querySelectorAll("nav li"); 
const cards = document.querySelectorAll(".card");
buttons.forEach(button => {
  button.addEventListener("click" , () => {
    if(button.classList.contains("active")){return}
    buttons.forEach(button => button.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll(".day-section, .week-section, .month-section").forEach(section => section.classList.add("hidden"));
    document.querySelectorAll(`.${button.id}-section`).forEach(section => section.classList.remove("hidden"));
  })
})
cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    if(e.target.tagName !== "IMG"){
      card.style.backgroundColor = "hsl(235, 45%, 33%)";
    }
    else{
      card.style.backgroundColor = "hsl(235, 46%, 20%)";
    }
  })
  card.addEventListener("mouseleave", () => {
    card.style.backgroundColor = "hsl(235, 46%, 20%)";
  })
})