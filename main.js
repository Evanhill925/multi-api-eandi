


async function pressButton(row,column) {
    var data = { channel_id:'1103168663617556571',
                message_id:'1112514876636676208',
                row_:row,
                columns_ :column
            }




    try {
      const response = await fetch("http://localhost:8001/checkmessage", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response;
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  



  
// fetch(url)


async function fetchDataFromApi() {
  const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
  const json = await res.json();
  console.log(json.joke);
}















document.getElementById("one").addEventListener("click", ()=> pressButton(0,0));
// document.getElementById("two").addEventListener("click",);
// document.getElementById("three").addEventListener("click",);
// document.getElementById("four").addEventListener("click",);
// document.getElementById("five").addEventListener("click",);
document.getElementById("six").addEventListener("click", ()=> pressButton(1,0));
// document.getElementById("seven").addEventListener("click",);
// document.getElementById("eight").addEventListener("click",);
// document.getElementById("nine").addEventListener("click",);

