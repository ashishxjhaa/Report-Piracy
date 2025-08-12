import axios from "axios"
import { useEffect } from "react";


function ProfilePage() {

  useEffect(() => {
    axios.get('http://localhost:3001/api/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }, []);

  return (
    <div>Profile Page</div>
  )
}

export default ProfilePage