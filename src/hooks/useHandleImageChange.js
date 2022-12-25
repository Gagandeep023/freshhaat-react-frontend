import { PutObjectCommand } from "@aws-sdk/client-s3";
import Config from "../config/Config";
import {s3Client}   from "../digitalOcean/s3Client.js";

const useHandleImageChange = async (e) => {
  if (e.target.files && e.target.files[0]) {
    const blob = e.target.files[0];
    const params = { 
        Body: blob, 
        Bucket: `${Config.bucketName}`, 
        Key: blob.name,
        ACL: 'public-read'
    };
     // Sending the file to the Spaces
    //  s3Client.putObject(params)
    //    .on('build', request => {
    //      request.httpRequest.headers.Host = `${Config.digitalOceanSpaces}`;
    //      request.httpRequest.headers['Content-Length'] = blob.size;
    //      request.httpRequest.headers['Content-Type'] = blob.type;
    //      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    //   })
    //   .send((err) => {
    //     if (err)  console.log(`Error: ${err.message}`);
    //     else {
    //     // If there is no error updating the editor with the imageUrl
    //     const imageUrl = `${Config.digitalOceanSpaces}` + blob.name
    //     console.log(imageUrl, blob.name)
    //     // callback(imageUrl, blob.name)
    //    }
    // });
    try {
    const data = await s3Client.putObject(params).send("File Upload")
       
    console.log(
        "Successfully uploaded object: " +
        params.Bucket +
          "/" +
          params.Key
      );
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  }
};
export default useHandleImageChange;