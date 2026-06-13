import axios from "axios";
const API=axios.create({baseURL:"http://localhost:5000/api"
});
export const createBooking=(data:any)=>API.post("/booking/create",data);
export const getAllBookings=()=>API.get("/booking/all");
export const deleteBooking=(id:string)=>API.delete(`/booking/delete/${id}`);
export const adminLogin=(data:any)=>API.post("/admin/login",data);