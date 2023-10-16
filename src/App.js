import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import ReactCrop, { PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ReacrCrop from "./ReacrCrop";

function App() {
  const [file, setFile] = useState("");
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [imagee, setImagee] = useState(null);
  const [result, setResult] = useState(null);

  function onSelectFile(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // console.log(crop, "crop");
  // console.log(imagee, "imagee");

  // function getCroppedImage() {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = pixelCrop.width;
  //   canvas.height = pixelCrop.height;
  //   const ctx = canvas.getContext("2d");

  //   ctx.drawImage(
  //     file,
  //     pixelCrop.x,
  //     pixelCrop.y,
  //     pixelCrop.width,
  //     pixelCrop.height,
  //     0,
  //     0,
  //     pixelCrop.width,
  //     pixelCrop.height
  //   );

  //   // As Base64 string
  //   // const base64Image = canvas.toDataURL('image/jpeg');
  //   const imgg = canvas.toDataURL("image/jpeg");

  //   setResult(imgg);
  // }

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {file && (
        <>
          <ReactCrop crop={crop} onChange={setCrop} onImageLoaded={setImagee}>
            <img src={file} />
          </ReactCrop>
        </>
      )}
      {result && (
        <div>
          <img src={result} />
        </div>
      )}
      <p>reactcrop2</p>
      <ReacrCrop />
    </div>
  );
}

export default App;
