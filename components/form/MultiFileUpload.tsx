import {
  useState, ChangeEvent, useImperativeHandle, Ref, useMemo, useRef,
} from 'react';
import {
  FieldValues, UseFormSetValue, Path, PathValue,
} from 'react-hook-form';
import { toast } from 'sonner';

import useCloudinaryUpload from '@/hooks/useCloudinary';
import SvgIcons from '@/icons/SvgIcons';
import { exceedsUploadSizeLimit, formatFileSize, getMimeTypeFromUrl } from '@/services/FileServices';
import { Button } from '@/components/ui/button';
import CloseToast from '@/components/global/CloseToast';
import { cn } from '@/lib/utils';
import { DocumentMetaData, NullableType } from '@/types/GenericTypes';
import { returnDataOrNull } from '@/services/emptyDataServices';

export type UploadImperativeRef = {
  resetFiles: () => void
};

type MultiFileUploadProp<T extends FieldValues> = {
  fieldName: Path<T>;
  setValue: UseFormSetValue<T>;
  error?: string
  uploadTitle: string
  uploadDescription: string
  extraContext?: string
  maxSizeInMegaByte: number
  mediaType: 'all' | 'image' | 'video' | 'audio';
  value: NullableType<DocumentMetaData[]>
  className?: string
  maxDocuments: number
  uploadRef: Ref<UploadImperativeRef>
};

type UploadedFileType = {
  file: File;
  progress?: number;
  metadata?: DocumentMetaData;
};

export default function MultiFileUpload<T extends FieldValues>({
  fieldName,
  setValue,
  value = [],
  error,
  uploadTitle,
  uploadDescription,
  extraContext,
  mediaType,
  maxSizeInMegaByte,
  className,
  maxDocuments,
  uploadRef,
}: MultiFileUploadProp<T>) {
  // Convert initial metadata list into uploaded file objects
  const initialFiles = useMemo(() => {
    const verifiedValue = returnDataOrNull(value);
    if (!verifiedValue) {
      return [];
    }

    // Create File objects with empty content for rendering metadata
    return verifiedValue.map((doc: DocumentMetaData) => ({
      file: new File([], doc.name, { type: getMimeTypeFromUrl(doc.url) }),
      metadata: doc,
    }));
  }, [value]);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileType[]>(initialFiles);

  const [reuploadingIndex, setReuploadingIndex] = useState<number | null>(null);

  const {
    uploadToCloudinary,
    isLoading: isPending,
    uploadInfo,
    abortController,
  } = useCloudinaryUpload({
    onError: () => {
      if (reuploadingIndex !== null) {
        // Keep the old file in case of reupload failure
        setReuploadingIndex(null);
      } else {
        setUploadedFiles((prev) => prev.slice(0, -1));
      }
    },
  });

  const handleFileDelete = (fileIndex: number) => {
    if (isPending && abortController.current) {
      abortController.current.abort();
    }

    const newFiles = [...uploadedFiles];
    newFiles.splice(fileIndex, 1);
    setUploadedFiles(newFiles);

    // Update form value with remaining DocumentMetaData
    const updatedDocuments = newFiles
      .filter((file) => file.metadata)
      .map((file) => file.metadata!);

    setValue(fieldName, updatedDocuments as PathValue<T, Path<T>>);
  };

  const { UploadPreview, DocumentUpload, Plus } = SvgIcons;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File, fileIndex?: number) => {
    if (exceedsUploadSizeLimit(file, maxSizeInMegaByte)) {
      toast.error(
        `Maximum file size is ${maxSizeInMegaByte} MB`,
        { action: <CloseToast /> },
      );
      return;
    }

    // Prevent duplicate file Upload (check against actual uploaded files, not existing metadata)
    const existingFileNames = uploadedFiles
      .filter((fileItem) => !fileItem.metadata || fileIndex === uploadedFiles.indexOf(fileItem))
      .map((fileItem) => fileItem.file.name);

    if (existingFileNames.includes(file.name)) {
      toast.error('This file has already been uploaded.', { action: <CloseToast /> });
      return;
    }

    const newFile: UploadedFileType = { file };

    if (typeof (fileIndex) === 'number') {
      // Reupload case
      setReuploadingIndex(fileIndex);
      setUploadedFiles((prev) => prev.map((prevFiles, searchIndex) => (searchIndex === fileIndex
        ? newFile
        : prevFiles)));
    } else {
      // New upload case
      setUploadedFiles((prev) => [...prev, newFile]);
    }

    uploadToCloudinary(file).then((data) => {
      if (!data) {
        return
      }

      const newMetadata: DocumentMetaData = {
        name: file.name,
        size: formatFileSize(file.size),
        url: data.secure_url,
      };

      if (typeof (fileIndex) === 'number') {
        // Update existing file
        setUploadedFiles(
          (prevFiles) => prevFiles.map((fileItem, searchIndex) => (
            searchIndex === fileIndex
              ? { ...fileItem, metadata: newMetadata }
              : fileItem)),
        );

        // Update form value
        const verifiedValue = returnDataOrNull(value) || [];
        const updatedDocuments = verifiedValue.map((existingDoc, docIndex) => (
          docIndex === fileIndex ? newMetadata : existingDoc
        ));
        setValue(fieldName, updatedDocuments as PathValue<T, Path<T>>);

        setReuploadingIndex(null);
      } else {
        // Add new file
        setUploadedFiles((prevFiles) => prevFiles.map((fileItem, searchIndex) => (
          searchIndex === prevFiles.length - 1
            ? { ...fileItem, metadata: newMetadata }
            : fileItem)));

        // Update form value
        const verifiedValue = returnDataOrNull(value) || [];
        const updatedDocuments = [...verifiedValue, newMetadata];
        setValue(fieldName, updatedDocuments as PathValue<T, Path<T>>);
      }
    });
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    handleFileUpload(file, index);
  };

  useImperativeHandle(uploadRef, () => ({
    resetFiles: () => {
      setUploadedFiles([]);
    },
  }));

  // Helper function to get display name and size
  const getFileDisplayInfo = (file: UploadedFileType) => {
    if (file.metadata) {
      return {
        name: file.metadata.name,
        size: file.metadata.size,
      };
    }
    return {
      name: file.file.name,
      size: formatFileSize(file.file.size),
    };
  };

  return (
    <div className="w-full">
      {/* Header with Add More button when files exist */}
      {(uploadedFiles.length > 0) && (uploadedFiles.length < maxDocuments) ? (
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            type="button"
            className="flex items-center gap-2 text-[#2E3192] hover:text-[#2E3192]"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
          >
            <Plus className="h-5 w-5" />
            Add More
          </Button>
        </div>
      ) : null}

      {/* Existing uploaded files */}
      {uploadedFiles.map((file, index) => {
        const displayInfo = getFileDisplayInfo(file);
        return (
          <div key={(index + 1).toString()} className="flex sm:items-center mb-4 max-sm:mt-2 md:col-span-2 gap-4 pb-3 border-b border-b-[#E0E0E0]">
            <UploadPreview className="h-5 w-5 shrink-0" />
            <div className="flex sm:items-center gap-2 sm:justify-between max-sm:flex-col grow">
              <h3 className="font-medium text-[#242634] leading-[16px]">{displayInfo.name}</h3>
              <div className="flex items-center">
                {(!file.metadata || reuploadingIndex === index) && uploadInfo?.progress ? (
                  <span className="mr-3 whitespace-nowrap">
                    {uploadInfo.progress}
                    %
                  </span>
                ) : null}
                <div className="h-[20px] px-2 flex items-center border border-[#CDD3D8]">
                  <span className="text-[11px] text-[#242634]">
                    {displayInfo.size}
                  </span>
                </div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  className="h-6 ml-[68px] cursor-pointer text-[#2E3192]"
                  htmlFor={`${fieldName}-reupload-${index}`}
                  aria-label={`Upload files for ${fieldName}`}
                >
                  Replace
                </label>
                <input
                  id={`${fieldName}-reupload-${index}`}
                  accept={mediaType === 'all' ? '*/*' : `${mediaType}/*`}
                  onChange={(e) => handleUpload(e, index)}
                  type="file"
                  className="hidden"
                  disabled={isPending}
                />
                <Button
                  onClick={() => handleFileDelete(index)}
                  variant="ghost"
                  className="px-6 text-[#B3261E] ml-8 hover:bg-transparent hover:text-[#B3261E]"
                  type="button"
                  disabled={isPending && reuploadingIndex === index}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Initial upload area when no files */}
      {(uploadedFiles.length === 0) ? (
        <label
          htmlFor={fieldName}
          className={cn(
            `${error && 'border-red-500'} flex-col mb-4 h-[170px] border-dashed-line-item border border-dashed relative rounded-[8px] cursor-pointer p-4 flex items-center justify-center mt-3 w-full`,
            className,
          )}
        >
          <DocumentUpload className="shrink-0 mx-auto text-[#434242]" />
          <h3 className="font-medium my-2 text-[#393A4A] text-center">{uploadTitle}</h3>
          <h3 className="text-center">
            <span className="text-[#0050C8] mr-2 leading-[21px]">Click here</span>
            <span className="#393A4A">to upload (PDF, JPG, or PNG, up to 2MB)</span>
          </h3>
          <p className="text-[#6B6C7E] text-xs max-w-[444px] text-center mt-1 mx-auto ">{uploadDescription}</p>
          {extraContext && (
            <p className="text-[#6B6C7E] text-xs mx-auto max-w-[444px] text-center relative top-1">
              {extraContext}
            </p>
          )}
          {error ? (
            <span className="text-red-500 text-sm absolute -bottom-5 left-2">
              {error}
            </span>
          ) : null}
        </label>
      ) : null}

      <input
        accept={mediaType === 'all' ? '*/*' : `${mediaType}/*`}
        onChange={handleUpload}
        id={fieldName}
        ref={inputRef}
        type="file"
        className="hidden"
      />
    </div>
  );
}
