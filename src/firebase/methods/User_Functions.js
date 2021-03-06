import { firebase, db, auth } from '../Firebase';
import { get_company } from './Company_Functions';

const register_user = (main, profile) => {
    var status = async () => {
        try {
            await auth.createUserWithEmailAndPassword(main.email, main.password).then(user => {
                return user.user.uid
                }).then((result) => {
                    create_user_profile(result, {...profile, email: main.email})
                })
            return true
        } catch (error) {
            return error.message
        }
    }
    return status();
}

const sign_in = ({email, password}) => {
    var status = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            return true
        } catch (error) {
            return error.message
        }
    }
    return status();
}

const sign_out = () => auth.signOut();


////// AUTH FUNCTIONS

const verify_user_email = () => auth.currentUser.sendEmailVerification();

const change_my_password = async (new_password) => {
    return auth.currentUser.updatePassword(new_password);   
};
    
const reset_password = async (email) => {
    return auth.sendPasswordResetEmail(email);
};
    
const authenticate_me = async (password) => {
    const user = auth.currentUser;
    const credential = auth.EmailAuthProvider.credential(user.email, password); 
    return auth.currentUser.reauthenticateWithCredential(credential);
};


//// USER FUNCTIONS

const create_user_profile = async (user_id, user_info) => {
    return db.collection("users").doc(user_id).set({
        id: user_id,
        email: user_info.email,
        name: user_info.name,
        avatar: "https://firebasestorage.googleapis.com/v0/b/meeko-careers.appspot.com/o/avatars%2Fuser-icon-grey.png?alt=media&token=02790319-4309-435f-a1d8-8793b9edd8c4", 
        title: null,
        location: null, 
        phone: null,
        birth: null,
        linkedIn: null,
        website: null,
        resume: null,
        summary: "",
        experience: [],
        education: [],
        account_type: user_info.type,
        last_seen: null,
        tasks: [],
        job: null
    }).then(() => {
        auth.currentUser.sendEmailVerification();
        return true;
    }).catch((error) => {
        return false
    });
}  

const get_user_tasks = async (user_id) => {
    return await db.collection("users").doc(user_id).collection("task").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}
const get_user_messages = async (user_id) => {
    return await db.collection("users").doc(user_id).collection("messages").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}

const get_user_data = async (user_id) => {
    return await db.collection("users").doc(user_id).get().then(async (doc) => {
        const data = doc.data();
        const tasks = await get_user_tasks(user_id);
        const messages = await get_user_messages(user_id);
        return {...data, tasks, messages}
    });
};

const get_user_manager = async (user_id) => {
    return await db.collectionGroup("managers").where("user_id", "==", user_id).get().then(async (querySnapshot) => {
        return querySnapshot.docs.map(doc => doc.data().company_id);
    })
};

const get_user_recruiter = async (user_id) => {
    return await db.collectionGroup("recruiters").where("user_id", "==", user_id).get().then(async (querySnapshot) => {
        return querySnapshot.docs.map(doc => doc.data().post_id);
    })
};
  

const update_my_profile = (user_id, new_info) => {
    db.collection("users").doc(user_id).update(new_info); 
}

const delete_portfolio_entry = (user_id, entry, type) => {
    db.collection("users").doc(user_id).update({[type]: firebase.firestore.FieldValue.arrayRemove(entry)})
}


const query_user_email = async (email) => {
    return await db.collection("users").where("email", ">=", email).where('email', '<=', email+ '\uf8ff').get().then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
    });
  }

const create_user_message = async (user_id, chat_id, post_id, manager_id, anonymous, content) => {
    return db.collection("users").doc(user_id).collection("messages").doc(post_id).set({
        chat_id: chat_id,
        user_id: user_id,
        post_id: post_id,
        manager_id: manager_id,
        anonymous: anonymous,
        content: content,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  const get_messages = async (user_id) => {
    return await db.collection("users").doc(user_id).collection("messages").get().then(querySnapshot => {
       return querySnapshot.docs.map(doc => doc.data());
    });
};

  const create_task = async (user_id, task_id, task, expire) => {
    return db.collection("users").doc(user_id).collection("tasks").doc(task_id).set({
        user_id: user_id,
        task_id: task_id,
        task: task,
        opened: false,
        completed: false,
        expire: expire,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

const get_tasks = async (user_id) => {
    return await db.collection("users").doc(user_id).collection("tasks").get().then(querySnapshot => {
       return querySnapshot.docs.map(doc => doc.data());
    });
};

const get_all_tasks = async (ids) => {
    return await db.collectionGroup("tasks").where("id", "in", ids).orderBy('timestamp', 'desc').get().then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
    });
};

const get_all_messages = async (ids) => {
    return await db.collectionGroup("messages").where("id", "in", ids).orderBy('timestamp', 'desc').get().then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
    });
};
const get_all_notifications = async (ids) => {
    return await db.collectionGroup("notifications").where("id", "in", ids).orderBy('timestamp', 'desc').get().then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
    });
};



export {
    register_user, sign_in, sign_out,
    verify_user_email, change_my_password, reset_password, authenticate_me,
    get_user_data, query_user_email,
    create_user_profile, update_my_profile, delete_portfolio_entry,
    get_tasks, get_all_tasks, create_task,
    get_messages, get_all_messages,
    get_all_notifications,
    get_user_manager, get_user_recruiter
}
