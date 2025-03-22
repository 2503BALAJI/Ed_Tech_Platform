import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data));

    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

// Update profile --> Additional details schema 
export function updateProfile(token, formData) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      };


      //#####################################################################################
      // there is one issue while Updating the UseImage in DB In Fronted it show the Warning 


      // const userImage = response.data.updatedUserDetails.image
      //   ? response.data.updatedUserDetails.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed="${response.data.updatedUserDetails.firstName}"  "${response.data.updatedUserDetails.lastName}"`

      // dispatch(
      //   setUser({ ...response.data.updatedUserDetails, image: userImage })
      // )

      //const userDetails = response.data.updatedUserDetails;

      // if (!userDetails) {
      //   throw new Error("User details not found in API response");
      // }

      // erroro occure below dicebear api 
      setTimeout(()=>{
        toast.success("Profile Updated Successfully");

      },1000)

      // const userImage = userDetails.image
      //   ? userDetails.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${userDetails.firstName} ${userDetails.lastName}`;

      // dispatch(setUser({ ...userDetails, image: userImage }));

      // success msg
      //toast.success("Profile Updated Successfully");

    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    };

    toast.dismiss(toastId);
  }
}

// function for changing passwoord 
export async function changePassword(token, formData) {

  const toastId = toast.loading("Loading...");
  
  try {
    const response = await apiConnector("PUT", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

// delete User 
export function deleteProfile(token, navigate) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...")

    try {

      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,

      })
      console.log()
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
 
      toast.success("Profile Deleted Successfully")
  
     // toast.success("Profile Deleted Successfully")
     setTimeout(() => {
       dispatch(logout(navigate));
     }, 2000);

    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}