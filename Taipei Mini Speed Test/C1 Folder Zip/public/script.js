document.getElementById("compressBtn").addEventListener("click", async () => {
  const input = document.getElementById("folderInput");

  if (!input.files.length) {
    alert("Please select a folder");
    return;
  }

  const formData = new FormData();

  for (const file of input.files) {
    formData.append("files", file, file.webkitRelativePath);
  }

  try {
    const response = await fetch("/compress", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Compression failed");
    }

    const blob = await response.blob();

    // Get folder name
    const folderName = input.files[0].webkitRelativePath.split("/")[0];

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${folderName}.zip`;

    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert("Error compressing folder");
  }
});