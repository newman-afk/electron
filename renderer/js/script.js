const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

img.addEventListener("change", loadImage);
form.addEventListener("submit", sendImage);
function loadImage(e) {
  const file = e.target.files[0];
  if (!isFileImage(file)) {
    alertError("Please select a image file");
    return;
  }

  //   Get oroginal dimensions
  const image = new Image();
  image.src = URL.createObjectURL(file);

  image.onload = function () {
    heightInput.value = this.height;
    widthInput.value = this.width;
  };

  form.style.display = "block";
  filename.innerText = file.name;
  outputPath.innerText = path.join(os.homedir(), "imageresizer");
}

function sendImage(e) {
  e.preventDefault();

  const width = widthInput.value;
  const height = heightInput.value;
  const imgPath = img.files[0].path;

  if (!img.files[0]) {
    alertError("Please upload an image");
    return;
  }

  if (width === "" || height === "") {
    alertError("Please fill in a height and width");
    return;
  }

  ipcRenderer.send("image:resize", {
    imgPath,
    width,
    height,
  });
}
// make sure the file is image data
function isFileImage(file) {
  const acceptedImageTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
  ];
  return file && acceptedImageTypes.includes(file.type);
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 3000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}
function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 3000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}

ipcRenderer.on("image:donw", () => {
  alertSuccess(`Image resized to ${widthInput.value} x ${heightInput.value}`);
});
