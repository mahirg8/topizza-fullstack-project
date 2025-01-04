import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
  const data = await req.formData();
  if (data.get('file')) {
    const file = data.get('file');

    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      maxAttempts: 3,
      requestTimeout: 60000, // 60 seconds timeout
      connectionTimeout: 5000, // 5 seconds timeout
    });

    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;
    const bucket = 'topizza';

    // Start the multipart upload
    const createMultipartUploadCommand = new CreateMultipartUploadCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file.type,
    });

    const { UploadId } = await s3Client.send(createMultipartUploadCommand);
    const chunkSize = 5 * 1024 * 1024; // 5 MB per part
    const totalParts = Math.ceil(file.size / chunkSize);
    let partNumber = 1;
    const partETags = [];

    // Upload each part
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
      if (chunks.length * chunkSize >= file.size || chunks.length === totalParts) {
        const buffer = Buffer.concat(chunks);

        const uploadPartCommand = new UploadPartCommand({
          Bucket: bucket,
          Key: newFileName,
          PartNumber: partNumber,
          UploadId,
          Body: buffer,
        });

        const { ETag } = await s3Client.send(uploadPartCommand);
        partETags.push({ ETag, PartNumber: partNumber });
        partNumber++;
      }
    }

    // Complete the multipart upload
    const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: newFileName,
      UploadId,
      MultipartUpload: {
        Parts: partETags,
      },
    });

    await s3Client.send(completeMultipartUploadCommand);

    const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
    return Response.json(link);
  }

  return Response.json(true);
}
