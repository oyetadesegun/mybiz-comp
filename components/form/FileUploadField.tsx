import { useState, ChangeEvent, useMemo } from 'react';
import {
  FieldValues, Path, PathValue,
  UseFormSetValue,
} from 'react-hook-form';
import { toast } from 'sonner';

import useCloudinaryUpload from '@/hooks/useCloudinary';
import SvgIcons from '@/icons/SvgIcons';
import { exceedsUploadSizeLimit, formatFileSize, getMimeTypeFromUrl } from '@/services/FileServices';
import { Button } from '@/components/ui/button';
import CloseToast from '@/components/global/CloseToast';
import { cn } from '@/lib/utils';
import RequiredLabel, { FormLabel } from '@/components/global/RequiredLabel';
import { DocumentMetaData, NullableType } from '@/types/GenericTypes';
import { returnDataOrNull } from '@/services/emptyDataServices';

type FileUploadFieldProp<T extends FieldValues, K extends Path<T> = Path<T>> = {
  fieldName: K;
  setValue: UseFormSetValue<T>;
  error?: string;
  uploadTitle: string;
  uploadDescription: string;
  extraContext?: string;
  maxSizeInMegaByte: number;
  mediaType: 'all' | 'image' | 'video' | 'audio' | 'application'
  uploadButtonType?: 'inline' | 'box';
  isRequired?: boolean
  value: NullableType<DocumentMetaData>;
  className?: string;
};

type FileType = {
  file: File;
  metadata?: DocumentMetaData
};

export default function FileUploadField<T extends FieldValues>({
  fieldName,
  setValue,
  value,
  error,
  uploadTitle,
  uploadDescription,
  extraContext,
  mediaType,
  maxSizeInMegaByte,
  className,
  uploadButtonType = 'box',
  isRequired = true,
}: FileUploadFieldProp<T>) {
  const initialFile = useMemo(() => {
    const verifiedValue = returnDataOrNull(value);
    if (!verifiedValue) {
      return null;
    }

    return ({
      file: new File([], verifiedValue.name, { type: getMimeTypeFromUrl(verifiedValue.url) }),
      metadata: verifiedValue,
    });
  }, [value]);

  const [uploadedFile, setUploadedFile] = useState<FileType | null>(initialFile);

  const [isReuploading, setIsReUploading] = useState(false);

  const {
    uploadToCloudinary,
    isLoading: isPending,
    uploadInfo,
    abortController,
  } = useCloudinaryUpload({
    onError: () => {
      setUploadedFile(null);
      setValue(fieldName, '' as PathValue<T, Path<T>>);
    },
  });

  const handleImageDelete = () => {
    setUploadedFile(null);
    if (isPending && abortController.current) {
      abortController.current.abort();
    }
    setValue(fieldName, null as PathValue<T, Path<T>>);
  };
  const { UploadPreview, DocumentUpload, Upload } = SvgIcons;

  const handleUpload = (e: ChangeEvent<HTMLInputElement>, isReupload?: boolean) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    if (exceedsUploadSizeLimit(file, maxSizeInMegaByte)) {
      toast.error(
        `Maximum file size is ${maxSizeInMegaByte} MB`,
        {
          action: <CloseToast />,
        },
      );
      return;
    }

    setUploadedFile({ file });
    if (isReupload) {
      setIsReUploading(true);
    }
    setTimeout(() => {
      uploadToCloudinary(file).then((data) => {
        if (!data) {
          return
        }
        const metadata: DocumentMetaData = {
          name: data.original_filename,
          size: formatFileSize(data.bytes),
          url: data.secure_url,
        };
        setValue(fieldName, metadata as PathValue<T, Path<T>>);
        setIsReUploading(false);
      });
    });
  };

  const shouldShowFile = isPending !== !!value;
  if (uploadedFile && (shouldShowFile || isReuploading)) {
    return (
      <div className="flex sm:items-center mb-4 max-sm:mt-2 md:col-span-2 gap-4 pb-3 border-b border-b-[#E0E0E0]">
        <UploadPreview className="h-5 w-5 shrink-0" />
        <div className="flex sm:items-center gap-2 sm:justify-between max-sm:flex-col grow">
          <h3 className="font-medium text-[#242634] leading-[16px]">{uploadedFile.file.name}</h3>
          <div className="flex items-center">
            {
              uploadInfo?.progress
                ? (
                  <span
                    className="mr-3 whitespace-nowrap"
                  >
                    {uploadInfo?.progress}
                    {' '}
                    %
                  </span>
                )
                : null
            }
            <div className="h-[20px] px-2 flex items-center items-center  border border-[#CDD3D8]">
              <span className="text-[11px] text-[#242634]">
                {uploadedFile.metadata?.size || formatFileSize(uploadedFile.file.size)}
              </span>
            </div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className="h-6 ml-[68px] cursor-pointer text-[#2E3192]"
              htmlFor={fieldName}
              aria-label={`Upload files for ${fieldName}`}
            >
              Replace
            </label>
            <input
              accept={mediaType === 'all' ? '*/*' : `${mediaType}/*`}
              onChange={(e) => { handleUpload(e, true); }}
              disabled={isPending}
              id={fieldName}
              type="file"
              data-testid="input-file"
              className="hidden"
            />
            <Button
              onClick={handleImageDelete}
              variant="ghost"
              className="px-6 text-[#B3261E] ml-8 hover:bg-transparent hover:text-[#B3261E]"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {
        uploadButtonType === 'box' && (
          <label
            htmlFor={fieldName}
            className={cn(`${error && 'border-red-500'} mb-4 h-[165px] border-dashed-line-item relative rounded-[8px] cursor-pointer p-4 flex items-center flex-col justify-center mt-3 w-full`, className)}
          >
            <DocumentUpload className="shrink-0 text-[#434242]" />
            <h3 className="font-medium my-2 text-[#393A4A] text-center">{uploadTitle}</h3>
            <h3 className="text-center">
              <span className="text-[#0050C8] mr-2 leading-[21px]">Click here</span>
              <span className="#393A4A">to upload</span>
            </h3>
            <p className="text-[#6B6C7E] text-xs max-w-[444px] text-center">{uploadDescription}</p>
            {extraContext ? <p className="text-[#6B6C7E] text-xs max-w-[444px] text-center relative top-1">{extraContext}</p> : null}
            <input
              accept={mediaType === 'all' ? '*/*' : `${mediaType}/*`}
              onChange={handleUpload}
              data-testid="input-file"
              id={fieldName}
              type="file"
              className="hidden"
            />
            {error ? (
              <span className="text-red-500 text-sm absolute -bottom-5 left-2">
                {error}
              </span>
            ) : null}
          </label>
        )
      }
      {
        uploadButtonType === 'inline' && (
          <label
            htmlFor={fieldName}
            className={cn(`${error && ' relative border-red-500'} cursor-pointer mb-4 border border-gray-900 rounded-md flex justify-between px-4 items-center h-[56px]`, className)}
          >
            {
              isRequired
                ? (
                  <RequiredLabel
                    className="relative top-1 max-sm:text-[9px] leading-[16px]"
                    asterisksClassName="max-sm:text-[9px] mr-2"
                  >
                    {uploadTitle}
                  </RequiredLabel>
                )
                : (
                  <FormLabel
                    className="relative top-1 max-sm:text-[9px] leading-[16px]"
                    asterisksClassName="max-sm:text-[9px] mr-2"
                  >
                    {uploadTitle}
                  </FormLabel>
                )
            }
            <Upload className="shrink-0 max-sm:scale-[60%]" />
            <input
              accept={mediaType === 'all' ? '*/*' : `${mediaType}/*`}
              onChange={handleUpload}
              id={fieldName}
              type="file"
              className="hidden"
            />
            {error ? (
              <span className="text-red-500 text-sm absolute -bottom-5 left-2">
                {error}
              </span>
            ) : null}
          </label>
        )
      }
    </>
  );
}
