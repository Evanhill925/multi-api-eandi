


console.log(sent_messageId)
console.log('freak leash')


async function pressButton(row,column) {
    var data = { channel_id:'1103168663617556571',
                message_id:sent_messageId,
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
















document.getElementById("one").addEventListener("click", ()=> pressButton(0,0));
document.getElementById("two").addEventListener("click", ()=> pressButton(0,1));
document.getElementById("three").addEventListener("click", ()=> pressButton(0,2));
document.getElementById("four").addEventListener("click", ()=> pressButton(0,3));
document.getElementById("five").addEventListener("click", ()=> pressButton(0,4));
document.getElementById("six").addEventListener("click", ()=> pressButton(1,0));
document.getElementById("seven").addEventListener("click", ()=> pressButton(1,1));
document.getElementById("eight").addEventListener("click", ()=> pressButton(1,2));
document.getElementById("nine").addEventListener("click", ()=> pressButton(1,3));

