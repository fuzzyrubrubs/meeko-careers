import { storage , storageRef } from '../Firebase';


const upload_avatar = async (file, userId) => {
    const imageRef = storage.ref('avatars/' + userId);
    const task = await imageRef.put(file).then(snapshot => { return snapshot });
    return task.state === "success" ? true : false;
};

const get_avatar = async (userId) => {
    let userPhoto;
    const avatarRef = storageRef.child('avatars/' + userId);
    await avatarRef.getDownloadURL().then((url) => { userPhoto = url});
    return userPhoto;
};

const upload_resume = async (file, userId) => {
  console.log(file)
  var metadata = {contentType: file.type};
    const imageRef = storage.ref('resumes/' + userId);
    const task = await imageRef.put(file, metadata).then(snapshot => { return snapshot });
    return task.state === "success" ? true : false;
};

const get_resume = async (userId) => {
  let user_resume;
  const resumeRef = storageRef.child('resumes/' + userId);
  await resumeRef.getDownloadURL().then((url) => { user_resume = url});
  return user_resume;
};


  
  

export { upload_avatar, get_avatar, upload_resume, get_resume }