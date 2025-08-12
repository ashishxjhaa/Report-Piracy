import axios from "axios"

axios.get("http://localhost:3001/api/dashboard", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})


const DashboardPage = () => {
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage