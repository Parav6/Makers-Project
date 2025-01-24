
//selectors
const screenShortBtn = document.getElementById("takeScreenshot");
const submitBtn = document.getElementById("submitBtn");
const screenShortInfo = document.getElementById("screenShortInfo");
const screenshotImage = document.getElementById('screenshotImage');
const mainContainer = document.getElementById("mainContainer");
const logContainer = document.getElementById("logContainer");
const pinHolder = document.getElementById("pinHolder");
const pinSubmit = document.getElementById("pinSubmit");
const final = document.getElementById("final");
const finalStatement = document.getElementById("finalStatement");


//function define
const submitPin = ()=>{
  const pin = pinHolder.value;
  mainContainer.style.display = "block";
  logContainer.style.display = "none";
};

const takeScreenShort = async()=>{              //function to take screenshot
  try{
    const [tab] = await chrome.tabs.query(
      {
         active:true,
         currentWindow:true 
        });

    const screenShortUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {format:"png"});

    
    screenshotImage.src = screenShortUrl ;    
  } catch (error) {
    console.log(error)
  }
};


const submitDetails =async ()=>{
  const [tab] = await chrome.tabs.query(
    {
       active:true,
       currentWindow:true 
      });

      final.style.display = "block";
      mainContainer.style.display = "none";

  const screenShortUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {format:"png"});
  const pin = pinHolder.value;

  const url = "http://localhost:7000/api/v1/info/submit"

  const blob = await fetch(screenShortUrl).then((res) => res.blob());
  const file = new File([blob], `screenshot-${Date.now()}.png`, { type: 'image/png' });

  const formData = new FormData();

  formData.append("screenShort",file);
  formData.append("infoAbout",screenShortInfo.value)
  formData.append("color",'red')
  formData.append("pin",pin)

  await fetch(url,{
    method : "POST",
    body :formData,
})
.then(response => response.json())
.then(data => console.log(data))
.then(()=>{
  finalStatement.innerHTML = "Screen Short Saved Successfully"
})
.catch(error => {
  console.error('Error:', error);
  finalStatement.innerHTML = "Failed to save screenshot.You must register before using it";
});
};
//-----------------------------------------------------------------------------------------


//function calls
screenShortBtn.addEventListener("click", takeScreenShort);
submitBtn.addEventListener("click", submitDetails);
pinSubmit.addEventListener("click",submitPin)




  