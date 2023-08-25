// Grabbing the needed elements
const dropArea = document.getElementById('drop-area');
const imageForm = document.getElementsByClassName('my-form')[0];
const dimForm = document.getElementsByClassName('dimForm')[0];
const widthInput = document.getElementById('width');
const image = document.getElementById('uploaded-img');
const heightInput = document.getElementById('height');
const forceAspectRatio = document.getElementById('AR');
let biggerDim;


;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })
  
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  ;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  })
  
  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  })
  
  function highlight(e) {
    dropArea.classList.add('highlight')
  }
  
  function unhighlight(e) {
    dropArea.classList.remove('highlight')
  }

  dropArea.addEventListener('drop', handleDrop, false)

  function handleDrop(e) {
    const dt = e.dataTransfer
    const file = dt.files
  
    uploadFile(file)
  }
  
function uploadFile(file) {
  imageForm.submit()
}

function previewImg(){
  console.log("Preview");
  if(widthInput.value && heightInput.value){
  const imgName = dimForm.getAttribute("action")
  dimForm.setAttribute("action", `/preview/${imgName}`)
  dimForm.submit()
}
}

function downloadImg(){
  const imgName = dimForm.getAttribute("action")
  dimForm.setAttribute("action", `/download/${imgName}?width=${widthInput.value}&height=${heightInput.value}`)
  dimForm.submit()
}

function previewDownload(n, e,  w, h){
  dimForm.setAttribute("action", `/download/${n}.${e}?width=${w}&height=${h}`)
  dimForm.submit()
}

function getAspectRatio(image) {

  const w = image.naturalWidth;
  const h = image.naturalHeight;

  let aspectRatio;

  if (w > h) {
      biggerDim = 'width'
      aspectRatio = w / h;
  } else {
      biggerDim = 'height'
      aspectRatio = h / w;
  }

  return aspectRatio;

};

function ARHeight(v){
  console.log("hereH");
  if (forceAspectRatio.checked){
    const ar = getAspectRatio(image);
    biggerDim === 'width' ?  widthInput.value = Math.floor(v * ar) : widthInput.value = Math.floor(v / ar);
  }
}

function ARWidth(v){
  if (forceAspectRatio.checked){
    const ar = getAspectRatio(image);
    biggerDim === 'width' ?  heightInput.value = Math.floor(v / ar) : heightInput.value = Math.floor(ar * v);
  }
}