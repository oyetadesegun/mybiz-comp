
export type DocumentMetaData = {
  name: string
  size: string
  url: string
  uploaded_at?: string
};

export type NullableType<T> = T | null | Record<string, never> | undefined;


export type ServerActionState<T> = Partial<Record<keyof T, string[]>> & {
  message?: string;
  success?: boolean;
}

