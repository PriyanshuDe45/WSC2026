function downloadImage(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const bg = document.getElementById("bg");
    const fg = document.getElementById("fg");

    canvas.width = bg.width;
    canvas.height = bg.height;


    ctx.drawImage(bg,0,0,canvas.width, canvas.height);

    const tempCanvas = document.createElement("canvas");
    const tctx = tempCanvas.getContext("2d");

    tempCanvas.width = fg.width;
    tempCanvas.height = fg.height;

    tctx.drawImage(fg,0,0);

    let imgData = tctx.getImageData(0,0, tempCanvas.width, tempCanvas.height);
    let d = imgData.data;

    for( let i=0 ; i< d.length; i +=4){
        let gray = 0.3 * d[i] +0.59 * d[i+1] + 0.11 * d[i+2];

        d[i] = d[i+1] = d[i+2] = gray;

        if(gray > 200) d[i+3] =0;
    }

    tctx.putImageData(imgData,0,0);

    ctx.drawImage(tempCanvas,50,50, fg.width, fg.height)

    const link = document.createElement("a");
    link.download = "02_A1.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
}