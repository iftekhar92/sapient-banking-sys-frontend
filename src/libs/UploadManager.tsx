const UploadManager = (inputField: any, getSize = false) =>
  new Promise((resolve, reject) => {
    if (inputField.files.length <= 0) {
      reject(new Error("No files provided"));
    }
    const reader = new FileReader(); // create new file reader
    reader.addEventListener("loadend", (r: any) => {
      // when image ready
      if (getSize) {
        const image = new Image();
        image.onload = () =>
          resolve({
            photo: r.target.result,
            height: image.height,
            width: image.width,
          });
        image.src = r.target.result;
      } else {
        resolve(r.target.result);
      }
    });
    reader.addEventListener("onerror", (err: any) => {
      reject(new Error(err.message));
    });
    reader.readAsDataURL(inputField.files[0]); // read uploaded file
  });

export default UploadManager;
