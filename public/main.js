


console.log(sent_messageId)


async function pressButton(row,column) {
    var data = { channel_id:'1103168663617556571',
                message_id:sent_messageId,
                row_:row,
                columns_ :column
            }
    try{
      post(path="http://localhost:8001/checkmessage",params=data)
    }
   catch (error) {
      console.error("Error:", error);
    }

  }

async function get_image(row,column) {
    var data = { channel_id:'1103168663617556571',
    // HARDCODED FRANKENSTEIN
                message_id:'1117586354545627156',
            }
    try{
      post(path="http://localhost:8001/image",params=data)
    }
   catch (error) {
      console.error("Error:", error);
    }}





  
  function post(path ,params,method='post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
  
        form.appendChild(hiddenField);
      }
    }
  
    document.body.appendChild(form);
    form.submit();
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

document.getElementById("TEST").addEventListener("click", ()=> get_image(1,3));

