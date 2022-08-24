import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadFile } from '../../api/file';
import './download.styles.css';

const DownloadFile = () => {
  const { fileId } = useParams();
  const [filePassword, setFilePassword] = useState('');

  // Not currently in use - maybe will use it in the future
  const downloadHandler = async e => {
    e.preventDefault();

    await downloadFile(fileId, filePassword);
  };

  return (
    <div className='download-page'>
      <div className='download-box'>
        <h1 className='download-heading'>Download File</h1>

        <form action={`${import.meta.env.VITE_API_BASE_URL}/file/${fileId}`} method='post'>
          <p className='file-name'>File: {fileId}</p>
          <input
            type='password'
            className='file-password'
            name='filePassword'
            placeholder='Password'
            value={filePassword}
            onChange={e => setFilePassword(e.target.value)}
          />

          <button type='submit' className='btn-blue'>
            Download
          </button>
        </form>
      </div>
    </div>
  );
};

export default DownloadFile;
