import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";


const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status,_id)=>{
     try{
      // const res = await axios.post(BASE_URL + "/request/review/" + status +"/" + _id,{},{withCredentials:true});
      await axios.post(BASE_URL + "/request/review/" + status +"/" + _id,{},{withCredentials:true});
      dispatch(removeRequest(_id));
     }catch(err){
       console.log(err.message);
     }
  }

  const fetchRequests = async() =>{
          const res = await axios.get(BASE_URL + "/user/requests/received",{withCredentials : true});
          dispatch(addRequests(res.data.data));
  }

  useEffect(()=>{
    fetchRequests();
  },[])
  if(!requests){return;}

  if(requests.length === 0){
     return <h1 className="flex justify-center my-10">No Connection Requests Found</h1>
  }
  return (
   //  <div className="text-center my-10">
   //        <h1 className="text-bold text-white text-3xl">Connections Requests</h1>
   //        {requests.map((request) => {
   //           const { _id, firstName,lastName,photoUrl, age,gender,about} = request.fromUserId;
   //           return (
   //              <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto" key={_id}>
   //                  <div>
   //                      <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
   //                  </div>
   //                  <div className="text-left mx-4">
   //                        <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
   //                        { age && gender && <p>{age + ", " + gender}</p>}
   //                        <p>{about}</p>  
   //                  </div>
   //                  <div className="flex justify-between">
   //                     <button className="btn btn-active btn-primary mx-2 my-2" onClick={()=> reviewRequest("rejected",request._id)}>Reject</button>
   //                     <button className="btn btn-active btn-secondary mx-2 my-2" onClick={()=> reviewRequest("accepted",request._id)}>Accept</button>
   //                  </div>
   //              </div>
   //           )
   //        })}
   //  </div>


   <div className="text-center my-10 px-4 flex justify-center">
   <div className="w-full max-w-4xl flex flex-col items-center">
     <h1 className="text-gray-400 text-4xl mb-6">Connection Requests</h1>
     <div className="flex flex-col items-center w-full">
       {requests.map((request) => {
         const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
         return (
           <div
             key={_id}
             className="flex flex-col md:flex-row items-center bg-base-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 w-full md:w-2/3 mx-auto mb-6 border border-gray-600"
           >
             <img
               alt="photo"
               className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
               src={photoUrl}
             />
             <div className="text-center md:text-left mx-6 flex-1">
               <h2 className="font-bold text-2xl text-gray-300">{firstName + " " + lastName}</h2>
               {age && gender && (
                 <p className="text-gray-300 text-sm mt-1">{age + ", " + gender}</p>
               )}
               <p className="text-gray-400 mt-3 text-sm leading-relaxed">{about}</p>
             </div>
             <div className="flex flex-col md:flex-row justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0 gap-3">
               <button
                 className="btn btn-outline btn-error px-6 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition-all"
                 onClick={() => reviewRequest("rejected", request._id)}
               >
                 Reject
               </button>
               <button
                 className="btn btn-outline btn-success px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition-all"
                 onClick={() => reviewRequest("accepted", request._id)}
               >
                 Accept
               </button>
             </div>
           </div>
         );
       })}
     </div>
   </div>
 </div>
  )
}

export default Requests