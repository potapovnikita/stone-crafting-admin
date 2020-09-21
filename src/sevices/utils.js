import { base64StringToBlob } from 'blob-util'

export const getFilesFromData = (data) => {
  let files = [];

  data.forEach((file) => {
    files.push(dataURLtoFile(arrayBufferToBase64(file.data, file.type), file.name));
  });

  return files;
};

export const arrayBufferToBase64 = (buffer, type = '') => {
  return `data:${type ? type : 'image/png'};base64,` + buffer
};

export const  dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => resolve({
      data: btoa(event.target.result),
      type: file.type,
      name: file.name,
      dt: file.lastModifiedDate,
    });
    reader.onerror = error => reject(error);
  });
};

export const downloadFile = (file) => {
  const fileUrl = (URL || webkitURL).createObjectURL(base64StringToBlob(file.data, file.type));
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', fileUrl);
  downloadLink.setAttribute('download', file.name);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const isObject = (obj) => {
  return obj === Object(obj);
};

export const copyObject= (obj) => {
  return JSON.parse(JSON.stringify(obj));
}