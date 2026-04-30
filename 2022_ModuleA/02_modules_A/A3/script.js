function downloadImage() {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const bison = document.getElementById("bison");
  const snow = document.getElementById("snow");

  canvas.width = bison.naturalWidth;
  canvas.height = bison.naturalHeight;

  // 1. Draw background image (bison)
  ctx.drawImage(bison, 0, 0, canvas.width, canvas.height);

  // 2. Create temp canvas for snow overlay
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");

  temp.width = canvas.width;
  temp.height = canvas.height;

  tctx.drawImage(snow, 0, 0, temp.width, temp.height);

  let imgData = tctx.getImageData(0, 0, temp.width, temp.height);
  let data = imgData.data;

  // 3. Make snow grayscale (important for exposure effect)
  for (let i = 0; i < data.length; i += 4) {
    let gray = 0.3 * data[i] + 0.59 * data[i+1] + 0.11 * data[i+2];

    data[i] = data[i+1] = data[i+2] = gray;
  }

  tctx.putImageData(imgData, 0, 0);

  // 4. Blend overlay onto main canvas
  ctx.globalAlpha = 0.7;
  ctx.globalCompositeOperation = "multiply";

  ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);

  // reset
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";

  // 5. Download
  const link = document.createElement("a");
  link.download = "double-exposure.jpg";
  link.href = canvas.toDataURL("image/jpeg");
  link.click();
}