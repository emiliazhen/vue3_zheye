interface CheckCondition {
  format?: string[];
  size?: number;
}
export function beforeUploadCheck (file: File, condition: CheckCondition) {
  const { format, size } = condition
  if (format && !format.includes(file.type)) {
    return 'format'
  }
  if (size && file.size / 1024 / 1024 > size) {
    return 'size'
  }
  return ''
}
