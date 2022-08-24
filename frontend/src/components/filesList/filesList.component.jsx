import { Link } from 'react-router-dom';

const FilesList = props => {
  const { uploadedFiles } = props;

  const getLocalDateFormat = date => {
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleString('en-US', dateOptions);

    return formattedDate;
  };

  return (
    <>
      {uploadedFiles.map((file, index) => (
        <div className='user-uploaded-file' key={index}>
          <div className='uploaded-file-name'>{file.originalName}</div>
          <div className='upload-date-box'>
            <div className='upload-label'>Uploaded On</div>
            <div className='upload-date'>{getLocalDateFormat(file.createdAt)}</div>
          </div>
          <div className='download-link'>
            <Link to={`${file.filePath}`} className='download-link btn-blue'>
              Download
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default FilesList;
