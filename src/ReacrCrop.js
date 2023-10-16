import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPercentCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "./useDebounceEffect";
import { canvasPreview } from "./canvasPreview";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
const ReacrCrop = () => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  function onSelectFile(e) {
    // setImgSrc(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  // const TO_RADIANS = Math.PI / 180;
  // function getCrop() {
  //   if (
  //     completedCrop?.width &&
  //     completedCrop?.height &&
  //     imgRef.current &&
  //     previewCanvasRef.current
  //   ) {
  //     // We use canvasPreview as it's much faster than imgPreview.
  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");
  //     if (!ctx) {
  //       throw new Error("No 2d context");
  //     }

  //     const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
  //     const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
  //     const pixelRatio = window.devicePixelRatio;

  //     canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  //     canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  //     ctx.scale(pixelRatio, pixelRatio);
  //     ctx.imageSmoothingQuality = "high";

  //     const cropX = crop.x * scaleX;
  //     const cropY = crop.y * scaleY;

  //     const rotateRads = rotate * TO_RADIANS;
  //     const centerX = imgRef.current.naturalWidth / 2;
  //     const centerY = imgRef.current.naturalHeight / 2;

  //     ctx.save();
  //     // 5) Move the crop origin to the canvas origin (0,0)
  //     ctx.translate(-cropX, -cropY);
  //     // 4) Move the origin to the center of the original position
  //     ctx.translate(centerX, centerY);
  //     // 3) Rotate around the origin
  //     ctx.rotate(rotateRads);
  //     // 2) Scale the image
  //     ctx.scale(scale, scale);
  //     // 1) Move the center of the image to the origin (0,0)
  //     ctx.translate(-centerX, -centerY);
  //     ctx.drawImage(
  //       imgRef.current,
  //       0,
  //       0,
  //       imgRef.current.naturalWidth,
  //       imgRef.current.naturalHeight,
  //       0,
  //       0,
  //       imgRef.current.naturalWidth,
  //       imgRef.current.naturalHeight
  //     );
  //     const base64Image = canvas.toDataURL("image/jpeg");
  //     console.log(base64Image, "base");
  //     setImage(base64Image);
  //     ctx.restore();
  //   }
  // }

  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     getCrop.apply(undefined, [...[completedCrop, scale, rotate]]);
  //   }, 100);

  //   return () => {
  //     clearTimeout(t);
  //   };
  // }, [completedCrop, scale, rotate, crop]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div>
      <p>jgds</p>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {imgSrc && (
        <>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              onLoad={onImageLoad}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            />
          </ReactCrop>
        </>
      )}
      <>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </>
    </div>
  );
};

export default ReacrCrop;
