export function createMultipartRequest<T extends Record<string, unknown>>(
  data: T,
  files?: Record<string, File | File[] | undefined>,
): FormData {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify(data)], { type: 'application/json' }),
  );

  if (files) {
    Object.entries(files).forEach(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });
  }

  return formData;
}
