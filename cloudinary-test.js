const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'jki1ap2a',
  api_key: '518899171651765',
  api_secret: 'LODRbCXPNJMJTE9ZlAqSDj2UwFI'
});

async function run() {
  // 1. Upload a sample image from Cloudinary's demo domain
  const result = await cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    { public_id: 'onboarding-sample' }
  );
  console.log('Uploaded — secure URL:', result.secure_url);
  console.log('Public ID:', result.public_id);
  console.log('');

  // 2. Fetch and print metadata
  const meta = await cloudinary.api.resource(result.public_id);
  console.log('Image details:');
  console.log('  Width:', meta.width);
  console.log('  Height:', meta.height);
  console.log('  Format:', meta.format);
  console.log('  File size (bytes):', meta.bytes);
  console.log('');

  // 3. Generate a transformed URL
  // f_auto = lets Cloudinary pick the best format (WebP, AVIF, etc.) for the browser
  // q_auto = lets Cloudinary pick the optimal quality level balancing file size and visual quality
  const transformed = cloudinary.url(result.public_id, {
    f_auto: true,
    q_auto: 'auto',
    width: 800,
    crop: 'scale'
  });
  console.log('Done! Click link below to see optimized version of the image.');
  console.log('Check the size and the format.');
  console.log(transformed);
}

run().catch(err => console.error(err));
