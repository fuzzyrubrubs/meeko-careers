import { db, auth } from '../Firebase';
import { get_group_events } from './Group_Functions';


//////////////////////// DELETE USER /////////////////////

const delete_account = async (user_id, user_admin) => {
    if(user_admin){ user_admin.forEach(group => { delete_group(group) }) }
    return removeUsersRequests(user_id)
    .then(removeUsersMemberships(user_id))
    .then(removeUsersJoins(user_id))
    .then(removeUsersInvites(user_id))
    .then(removeUsersUpcoming(user_id))
    .then(removeUsersNotifications(user_id))
    .then(() => { db.collection("users").doc(user_id).delete()})
    .then(() => { auth.currentUser.delete()})  
}

  
  async function removeUsersMemberships(user_id){
    await db.collectionGroup("members").where("user_id", "==", user_id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
  }
  async function removeUsersJoins(user_id){
    await db.collectionGroup("joiners").where("user_id", "==", user_id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
  }
  async function removeUsersRequests(user_id){
    await db.collectionGroup("requests").where("user_id", "==", user_id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
  }
  
  async function removeUsersInvites(user_id){
    await db.collection("users").doc(user_id).collection("invites").get().then(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete())
    })
  }
  async function removeUsersUpcoming(user_id){
    await db.collection("users").doc(user_id).collection("upcoming").get().then(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete())
    })
  }
  async function removeUsersNotifications(user_id){
    await db.collection("users").doc(user_id).collection("notifications").get().then(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete())
    })
  }

  const delete_created_events = async (user_id) => {
    const created_events = await db.collection("events").where("creatorId", "==", user_id).get().then(async (querySnapshot) => {
      return querySnapshot.docs.map(async (doc) => doc.data())    
    });
    created_events.forEach(async (event) => await delete_event(event.id));
}

  ////////////////////////////////////////////// GROUP 


  
const delete_group = async (group_id) => {
    return await get_group_events(group_id)
    .then(events => { events.forEach(async (event) => await delete_event(event.id))})
    .then(() => { delete_group_members(group_id) })
    .then(() => { delete_group_requests(group_id) })
    .then(() => { delete_group_messages(group_id) })
    .then(() => db.collection("groups").doc(group_id).delete())
    .then(() => { return true })
    .catch((error) => { return error.message })  
}

  
  async function delete_group_members(group_id){
    await db.collection("groups").doc(group_id).collection("members").get().then(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete());
    })
  }
  async function delete_group_requests(group_id){
    await db.collection("groups").doc(group_id).collection("requests").get().then(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete());
    })
  }
  async function delete_group_messages(group_id){
    await db.collection("groups").doc(group_id).collection("messages").get().then(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete());
    })
  }

  //////////////////////////////////////


  

async function delete_event(event_id){
    return removeEventsUpcomingNotes(event_id)
    .then(removeEventsInviteNotes(event_id))
    .then(removeEventsMembers(event_id))
    .then(removeEventsRequests(event_id))
    .then(removeEventsComments(event_id))
    .then(db.collection("events").doc(event_id).delete())
    .then(() => { return true })
    .catch(() => { return false })   
}

async function removeEventsMembers(event_id){
  await db.collection("events").doc(event_id).collection("joiners").get().then(querySnapshot => {
    querySnapshot.forEach(doc => doc.ref.delete());
  })
}

async function removeEventsRequests(event_id){
  await db.collection("events").doc(event_id).collection("requests").get().then(querySnapshot => {
    querySnapshot.forEach(doc => doc.ref.delete());
  }) 
}
async function removeEventsComments(event_id){
  await db.collection("events").doc(event_id).collection("comments").get().then(querySnapshot => {
    querySnapshot.forEach(doc => doc.ref.delete());
  }) 
}

async function removeEventsUpcomingNotes(event_id){
  await db.collectionGroup("upcoming").where("event_id", "==", event_id).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.ref.delete();
    });
  })
}
async function removeEventsInviteNotes(event_id){
  await db.collectionGroup("invites").where("event_id", "==", event_id).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.ref.delete();
    });
  })
}


export { delete_account, delete_group, delete_event }