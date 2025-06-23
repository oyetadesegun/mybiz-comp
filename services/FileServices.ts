export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = bytes;

  // Convert the size to the appropriate unit by dividing by 1024 until the size is less than 1024
  // or the highest unit (TB) is reached. Increment the unit index accordingly.
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(2)}${units[unitIndex]}`;
}

export function exceedsUploadSizeLimit(file: File | undefined, maxSizeInMegaByte: number): boolean {
  if (file === undefined) return false;

  // The size of 1MB in bytes
  const mbInBytes = 1048576;

  // Convert the filesize from bytes to MB
  const fileSizeMB = file.size / mbInBytes;

  // Check if the file size is not more that 5MB
  return fileSizeMB > maxSizeInMegaByte;
}

export function getMimeTypeFromUrl(url: string): string {
  const ext = url.split('.').pop()?.toLowerCase();
  const mimeMap: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    txt: 'text/plain',
  };
  return mimeMap[ext || ''] || 'application/octet-stream';
}
