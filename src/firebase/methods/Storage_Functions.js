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
  
  const upload_logo = async (file, groupId) => {
    const imageRef = storage.ref('groups/' + groupId + '/logo');
    const task = await imageRef.put(file).then(snapshot => { return snapshot });
    return task.state === "success" ? true : false;
  };
  
  
  const get_logo = async (groupId) => {
    let userPhoto;
    const logoRef = storageRef.child('groups/' + groupId + '/logo');
    await logoRef.getDownloadURL().then(url => userPhoto = url);
    return userPhoto;
  };
  
 const upload_event_image = async (file, groupId, eventId) => {
    const imageRef = storage.ref('groups/' + groupId + '/' + eventId);
    const task = await imageRef.put(file).then(snapshot => { return snapshot });
    return task.state === "success" ? true : false;
  };
  
  
  const get_event_image = async (groupId, eventId) => {
    let userPhoto;
    const eventImageRef = storageRef.child('groups/' + groupId + '/' + eventId);
    await eventImageRef.getDownloadURL().then(url => userPhoto = url);
    return userPhoto;
  };

  export { upload_avatar, get_avatar, upload_logo, get_logo, upload_event_image, get_event_image }