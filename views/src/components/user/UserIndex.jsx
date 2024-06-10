import { Route, Routes } from 'react-router-dom';
import Profile from './Profile';


function UserIndex() {
  return (
    <Routes>
    <Route path='/profile'  element={<Profile/>}/>
   </Routes>
  )
}

export default UserIndex