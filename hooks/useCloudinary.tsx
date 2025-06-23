import { useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

export type UploadInfo = {
  progress: number;
  size: number;
} | null;

type CloudinaryResponse = {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
};

type CloudinaryProp = {
  onError?: VoidFunction;
};

export default function useCloudinaryUpload({ onError }: CloudinaryProp = {}) {
  const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const cloudinaryApiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

  const [uploadInfo, setUploadInfo] = useState<UploadInfo>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<CloudinaryResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const uploadToCloudinary = async (file: File): Promise<CloudinaryResponse | null> => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setUploadInfo(null);

    if (!cloudinaryCloudName || !cloudinaryUploadPreset || !cloudinaryApiKey || !cloudinaryApiSecret) {
      console.error("Cloudinary environment variables are not set. Please check your .env.local file.");
      toast.error('Cloudinary configuration missing. Please contact support.');
      setIsLoading(false);
      const configError = new AxiosError("Cloudinary configuration missing.", "ERR_BAD_CONFIG");
      setError(configError);
      if (onError) { onError(); }
      return null;
    }

    abortController.current = new AbortController();

    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    uploadData.append('cloud_name', cloudinaryCloudName);
    uploadData.append('api_key', cloudinaryApiKey);
    uploadData.append('api_secret', cloudinaryApiSecret);
    uploadData.append('upload_preset', cloudinaryUploadPreset);
    uploadData.append('folder', 'business-consult');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        uploadData,
        {
          onUploadProgress(progressEvent) {
            const percentCompleted = Math.round(((progressEvent.progress || 0) * 100));
            const fileSizeMB = file.size / (1024 * 1024);
            const roundedSize = Math.round(fileSizeMB * 100) / 100;

            setUploadInfo({
              progress: percentCompleted,
              size: roundedSize,
            });
          },
          signal: abortController.current.signal,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setData(response.data);
      setUploadInfo(null);
      toast.success('File uploaded successfully!');
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      setUploadInfo(null);

      if (axios.isCancel(axiosError)) {
        console.log('Upload aborted by user:', axiosError.message);
        toast.info('File upload cancelled.');
      } else {
        console.error("Cloudinary upload failed:", axiosError);
        toast.error('File upload could not be completed');
        if (onError) { onError(); }
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    data,
    error,
    uploadInfo,
    uploadToCloudinary,
    abortController,
  };
}
