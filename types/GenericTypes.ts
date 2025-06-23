
export type DocumentMetaData = {
  name: string
  size: string
  url: string
  uploaded_at?: string
};

export type NullableType<T> = T | null | Record<string, never> | undefined;