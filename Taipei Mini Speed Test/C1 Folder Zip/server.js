const express = require("express");
const multer = require("multer");
const archiver = require("archiver");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/compress", upload.any(), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send("No folder uploaded");
    }

    // Get folder name from first file path
    const firstPath = files[0].originalname;
    const folderName = firstPath.split("/")[0];

    const zipPath = path.join(__dirname, "zips", `${folderName}.zip`);

    // Ensure zips directory exists
    if (!fs.existsSync("zips")) {
      fs.mkdirSync("zips");
    }

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      res.download(zipPath, `${folderName}.zip`, () => {
        // Cleanup uploaded temp files
        files.forEach((file) => {
          fs.unlinkSync(file.path);
        });

        // Delete zip after download
        fs.unlinkSync(zipPath);
      });
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add files only (empty folders ignored automatically)
    files.forEach((file) => {
      archive.file(file.path, {
        name: file.originalname,
      });
    });

    await archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).send("Compression failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});