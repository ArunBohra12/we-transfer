import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { uploadFile } from '../../api/file';
import plusCircle from '../../assets/plus-circle.svg';
import { getFileData } from '../../utils/file';
import UploadedFilesList from './uploadedFilesList.component';
import showAlert from '../../utils/alert';

const UploadFile = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const fileInput = useRef();

  const setFileData = e => {
    const fileData = getFileData(e);

    // Currently can hold only one file data
    setFiles([fileData]);
  };

  const removeUploadedFile = () => {
    fileInput.current.value = '';
    setFiles([]);
  };

  const formSubmitHandler = async e => {
    e.preventDefault();

    if (fileInput.current.files.length === 0) return showAlert('error', 'Please select a file.');

    const formData = new FormData();

    formData.append('file', fileInput.current.files[0]);

    const response = await uploadFile(formData);

    if (response.data?.file) {
      const uploadedFileUrl = response.data.file.fileName;

      setUploadedFileUrl(`${import.meta.env.VITE_API_BASE_URL}/${uploadedFileUrl}`);
      removeUploadedFile();
    }
  };

  return (
    <>
      {console.log(uploadedFileUrl)}
      {uploadedFileUrl ? (
        <div className='uploaded-file-link'>
          <p className='success'>File uploaded successfully</p>
          <p>
            Link:
            <a href={uploadedFileUrl} target='_blank'>
              {uploadedFileUrl}
            </a>
          </p>
        </div>
      ) : null}
      <form className='file-form'>
        <h2 className='file-form-heading'>Send</h2>
        <label htmlFor='upload-file' className='upload-file-label'>
          <img src={plusCircle} alt='Upload File' />
          <span>Upload File</span>
        </label>
        <input id='upload-file' type='file' multiple={false} hidden onChange={setFileData} ref={fileInput} />

        {files.length !== 0 && (
          <div className='uploaded-file-details-box'>
            {files.map((file, index) => (
              <UploadedFilesList key={index} file={file} removeUploadedFile={removeUploadedFile} />
            ))}
          </div>
        )}

        <button type='submit' className='upload-button' onClick={formSubmitHandler}>
          Upload
        </button>
      </form>
    </>
  );
};

export default UploadFile;
