const key = "38591999-3a3263841ca7ccefc6db81cd2";
const inputelement = document.getElementById("search");
const form = document.querySelector("form");
const showmore = document.getElementById("showmore");
const searchresults = document.querySelector(".image_element");

let inputdata = "";
let pageno = 1;

async function searchImage() {
  inputdata = inputelement.value;
  const url = `https://pixabay.com/api/?key=38591999-3a3263841ca7ccefc6db81cd2&q=${inputdata}&image_type=photo&pretty=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.hits; 

    if (pageno === 1) {
      searchresults.innerHTML = "";
    }

    results.map((result) => {
      const immageWrapper = document.createElement("div");
      immageWrapper.classList.add("search_results");
      const image = document.createElement("img");
      image.src = result.webformatURL;
      image.alt = result.tags;

      const a = document.createElement("a");
      a.href = result.pageURL;
      a.target = "_blank";
      a.textContent = result.tags;
      image.addEventListener("click",()=>{
        window.open(a.href,"_blank");
      });
      immageWrapper.appendChild(image);
      immageWrapper.appendChild(a);
      searchresults.appendChild(immageWrapper);
    });
    pageno++;
    if (pageno > 1) {
      showmore.style.display = "block";
    }
  } catch (error) {
    console.log("Error is: ", error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  pageno = 1;
  searchImage();
});

showmore.addEventListener("click", () => {
  searchImage();
});

const nav = document.querySelector(".nav");

const menu = document.querySelector(".nav-option");
const container = document.querySelector(".image_element");
nav.addEventListener("click",()=>
{
  if(menu.style.display==="flex")
  {
  menu.style.display = "none";
  container.style.marginLeft="0px"; 
  }
  else
  {
  menu.style.display = "flex";
  container.style.marginLeft="200px"; 
  }

});