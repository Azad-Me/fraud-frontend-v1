const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs-extra");
const path = require("path");
const mime = require("mime-types");
require("dotenv").config();
// CONFIGURE THESE
const BUCKET_NAME = process.env.BUCKET_NAME;
const BUILD_DIR = path.resolve("./build"); // or './dist'
const REGION = "ap-south-1"; // change if needed
const UPLOAD_PREFIX = ""; // optional, e.g. "frontend/"
const AWS_ACCESS_KEY_ID=process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({ region: REGION,credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  }, });

async function uploadDirectory(dir, bucket, prefix = "") {
  const files = await fs.readdir(dir);

  for (const fileName of files) {
    const filePath = path.join(dir, fileName);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await uploadDirectory(filePath, bucket, `${prefix}${fileName}/`);
    } else {
      const fileContent = await fs.readFile(filePath);
      const contentType = mime.lookup(filePath) || "application/octet-stream";

      const params = {
        Bucket: bucket,
        Key: `${prefix}${fileName}`,
        Body: fileContent,
        ContentType: contentType,
      };

      try {
        await s3.send(new PutObjectCommand(params));
        console.log(`✅ Uploaded: ${prefix}${fileName}`);
      } catch (err) {
        console.error(`❌ Failed: ${prefix}${fileName}`, err);
      }
    }
  }
}

(async () => {
  console.log(`🚀 Starting upload of ${BUILD_DIR} to s3://${BUCKET_NAME}/${UPLOAD_PREFIX}`);
  await uploadDirectory(BUILD_DIR, BUCKET_NAME, UPLOAD_PREFIX);
  console.log("🎉 Upload complete!");
})();
