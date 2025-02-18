import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";



const UserCard = ( {user}) => {
  // console.log(users)
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  // let photoUrl, firstName, lastName, age, gender, about, _id;
  // if (Array.isArray(user)) {
  //   ({ photoUrl, firstName, lastName, age, gender, about, _id } =
  //     user[0]);
  // } else {
  //   ({ photoUrl, firstName, lastName, age, gender, about,_id } = user);
  // }
 

  // console.log(feed.users)
  // const { _id, firstName, lastName, gender,age,photoUrl, about} = feed[0];
  const dispatch = useDispatch();


  const handleSendRequest = async(status,userId)=>{
     try{
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,{},{withCredentials:true});
        console.log(res);
        dispatch(removeUserFromFeed(userId));
     
     }catch(err){
      console.log(err.message);
     }
  }


  return (
          <div className="card bg-base-300 w-96 shadow-xl flex justify-between">
          <figure>
            <img
              src={photoUrl}
              alt="photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            {about && <p>{about}</p>}
            <div className="card-actions justify-center my-4">
              <button className="btn btn-outline btn-error px-6 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition-all mx-4" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
              <button className="btn btn-outline btn-success px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition-all" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
            </div>
          </div>
        </div>
  )
}

export default UserCard;