import { Navigate } from "react-router-dom"
import { useUserStore } from "../../stores/userStore"
function Public({children}) {
    const [user]=useUserStore((state)=>[state.user])



  return (
    <div>{user == null  ? children : <Navigate to="/" />}</div>
  )
}

export default Public