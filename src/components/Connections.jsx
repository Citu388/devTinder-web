import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";


const Connections = () => {
  const connections = useSelector((store)=>store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async()=>{
          try{
              const res = await axios.get(BASE_URL + "/user/connections",{withCredentials:true});
              dispatch(addConnections(res.data.data));
          }catch(err){
              console.log(err);
          }
  };

  useEffect(()=>{
     fetchConnections();
  },[]);

  if(!connections){return;}

  if(connections.length === 0){
     return <h1>No Connections Found</h1>
  }
  return (
    // <div className="text-center my-10">
    //       <h1 className="text-bold text-white text-3xl">Connections</h1>
    //       {connections.map((connection) => {
    //          const { firstName,lastName,photoUrl, age,gender,about} = connection;
    //          return (
    //             <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" key={connection._id}>
    //                 <div>
    //                     <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
    //                 </div>
    //                 <div className="text-left mx-4">
    //                       <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
    //                       { age && gender && <p>{age + ", " + gender}</p>}
    //                       <p>{about}</p>  
    //                 </div>
    //             </div>
    //          )
    //       })}
    // </div>

    <div className="text-center my-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <h1 className="font-bold text-gray-400 text-4xl mb-6">Connections</h1>
        <div className="flex flex-col items-center w-full">
          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;
            return (
              <div
                key={_id}
                className="flex flex-col items-center bg-base-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 w-2/3 mx-auto mb-6"
              >
                <img
                  alt="photo"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  src={photoUrl}
                />
                <div className="text-center mt-4">
                  <h2 className="font-bold text-xl text-gray-300">{firstName + " " + lastName}</h2>
                  {age && gender && (
                    <p className="text-gray-300 text-sm">{age + ", " + gender}</p>
                  )}
                  <p className="text-gray-400 mt-2 text-sm">{about}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Connections