import { useContext, useState, useEffect } from 'react';
import { getCurrentUserFiles } from '../../api/user';
import FilesList from '../../components/filesList/filesList.component';
import UserContext from '../../context/user.context';

import './profile.styles.css';

const ProfilePage = () => {
  const { userInfo } = useContext(UserContext);

  const [userFilesDetails, setUserFilesDetails] = useState([]);

  useEffect(() => {
    getCurrentUserFiles().then(({ data }) => setUserFilesDetails(data.data.user.files));
  }, []);

  return (
    <div className='user-profile-page'>
      <h2>Profile</h2>
      <div className='user-details'>
        <p className='user-name'>
          <b>Name:</b> &nbsp; <span className='user-detail-text'>{userInfo.name}</span>
        </p>
        <p className='user-email'>
          <b>Email:</b> &nbsp; <span className='user-detail-text'>{userInfo.email}</span>
        </p>
      </div>

      <hr />

      <div className='user-uploads'>
        <h2 className='uploads-heading'>Uploaded Files</h2>

        {userFilesDetails && userFilesDetails.length ? (
          <FilesList uploadedFiles={userFilesDetails} />
        ) : (
          <h2>No files uploaded yet.</h2>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
