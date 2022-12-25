// Imports your configured client and any necessary S3 commands.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import Config from "../config/Config";


// Uploads the specified file to the chosen path.
export const UploadFileInBucket = async (e) => {
  if (e.target.files && e.target.files[0]) {
    const blob = e.target.files[0];
    const bucketParams = { 
        Body: blob, 
        Bucket: `${Config.bucketName}`, 
        Key: blob.name,
        ACL: 'public-read'
    };

  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(
      "Successfully uploaded object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
}
export default UploadFileInBucket;
