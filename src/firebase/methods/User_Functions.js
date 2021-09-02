import { db, auth } from '../Firebase';

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
        avatar: "", 
        title: null,
        location: null, 
        phone: null,
        birth: null,
        linkedIn: null,
        website: null,
        resume: null,
        summary: "",
        experience: [{}],
        education: [{}],
    }).then(() => {
        auth.currentUser.sendEmailVerification();
        return true;
    }).catch((error) => {
        return false
    });
}   

const get_user_data = async (user_id) => {
    return await db.collection("users").doc(user_id).get().then(doc => doc.data());
  }
  

const update_my_profile = (user_id, new_info) => {
    try { db.collection("users").doc(user_id).update(new_info); return true }
    catch(error) { return error.message }
}


export {
    register_user, sign_in,
    verify_user_email, change_my_password, reset_password, authenticate_me,
    get_user_data, 
    create_user_profile, update_my_profile
}
