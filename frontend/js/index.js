// Grabbing the needed elements
const dropArea = document.getElementById('drop-area')
const imageForm = document.getElementsByClassName('my-form')[0]
const previewArea = document.getElementsByClassName('preview')[0]
// const img = document.getElementById("uploaded-img")
// let imgFile;

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
  console.log("I'm here");
  imageForm.submit()
  dropArea.classList.add("hidden")
  previewArea.classList.remove("hidden")
  
  // Handling the image preview stuff
  // img.setAttribute("src", imgFile)
  
  }

