export async function convertImageToJpeg(file: File): Promise<File | null> {
  try {
    const imageCompression = await import('browser-image-compression').then(
      (m) => m.default,
    );

    let processFile = file;

    if (
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.match(/\.(heic|heif)$/i)
    ) {
      try {
        const { heicTo } = await import('heic-to/csp');
        const convertedBlob = await heicTo({
          blob: file,
          type: 'image/jpeg',
          quality: 0.9,
        });
        processFile = new File(
          [convertedBlob],
          file.name.replace(/\.(heic|heif)$/i, '.jpg'),
          { type: 'image/jpeg' },
        );
      } catch {
        return null;
      }
    }

    const compressedFile = await imageCompression(processFile, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: 0.9,
    });

    return new File(
      [compressedFile],
      processFile.name.replace(/\.[^/.]+$/, '.jpg'),
      { type: 'image/jpeg', lastModified: Date.now() },
    );
  } catch {
    return null;
  }
}
