import { DocumentMetaData, NullableType } from '@/types/GenericTypes';

/**
 * Check if an optional field value returned from an api call is empty or null
 */
function handleOptionalData<T>(
  data: NullableType<T>,
  config?: {
    showEmptyString: boolean
  },
): T | 'N/A' | '' {
  if (
    data === ''
    || data === null
    || data === undefined
    || ((typeof data === 'object') && (Object.keys(data).length === 0))) {
    return config?.showEmptyString ? '' : 'N/A';
  }
  return data as T;
}

export function returnDataOrNull<T>(data: NullableType<T>): T | null {
  if (
    data === ''
    || data === null
    || data === undefined
    || ((typeof data === 'object') && (Object.keys(data).length === 0) && !Array.isArray(data))) {
    return null;
  }
  return data as T;
}

export function isDocumentUrlsEmpty(documents_meta_data: DocumentMetaData): boolean {
  return (
    !documents_meta_data // Check if it's null or undefined
    || typeof documents_meta_data !== 'object' // Ensure it's an object
    || Object.keys(documents_meta_data).length === 0 // Check if it's an empty object
    || !Array.isArray(documents_meta_data) // Ensure `urls` exists and is an array
    || documents_meta_data.length === 0 // Check if `urls` array is empty
  );
}

export default handleOptionalData;
