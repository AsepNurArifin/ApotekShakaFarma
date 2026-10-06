/**
 * Client-side image compression utility.
 * Compresses images before uploading to avoid Vercel serverless timeout.
 * Uses Canvas API — works on all mobile browsers.
 */

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1600;
const QUALITY = 0.82;
const MAX_FILE_SIZE = 800 * 1024; // Target: under 800KB

export async function compressImage(file: File): Promise<File> {
  // If already small enough, skip compression
  if (file.size <= MAX_FILE_SIZE) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;

      // Scale down if too large
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      // Try WebP first (best compression), fallback to JPEG
      const outputType = "image/webp";
      
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Gagal mengompres gambar"));
            return;
          }

          // Generate filename with proper extension
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const ext = outputType === "image/webp" ? "webp" : "jpg";
          const compressedFile = new File([blob], `${baseName}.${ext}`, {
            type: outputType,
            lastModified: Date.now(),
          });

          resolve(compressedFile);
        },
        outputType,
        QUALITY
      );
    };

    img.onerror = () => reject(new Error("Gagal memuat gambar untuk kompresi"));

    // Read file as data URL for Image element
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Gagal membaca file gambar"));
    reader.readAsDataURL(file);
  });
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
