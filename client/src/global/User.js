import { useEffect, useState } from 'react';
import apiToken from "../api/apiToken";

export default function useUser(){
    
    const [user,setUser] = useState(null);
    
    useEffect(() => {
        
        const fetchUser = async () => {
          try {
            const response = await apiToken.post('user');
            // Update the user state with the fetched user data
            if(response.status == 401){
              setUser(null);
            }
            else if(response.status == 200 ){
              setUser(response.data);
            }  
          } catch (error) {
            console.error('Error fetching user:', error);
            
          }
        };
    
        fetchUser();
      },[]);
return user;
}


