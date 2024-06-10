import { AxiosClientAuth } from "../lib/axiosClient";



export  async function updatePRofilePicture(data){
    return await AxiosClientAuth.post("/api/user/update-profile-picture",data)

}