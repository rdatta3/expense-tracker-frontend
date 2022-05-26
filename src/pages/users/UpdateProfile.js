import { useFormik } from "formik";
import React, { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import * as Yup from "yup";
import { updateProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import DisabledButton from "../../components/DisabledButton";



//form validation 
const formSchema=Yup.object({
    email:Yup.string().required("E-mail is required"),
    firstname:Yup.string().required("first name is require"),
    lastname:Yup.string().required("last name is require"),
});

const UpdateProfile = () => {
const navigate = useNavigate();
const location = useLocation();
//dispatch
const dispatch = useDispatch();

//get data from store
const user =useSelector((state)=>state?.users);
const {AppErr,ServerErr,Loading,userAuth,isEdited} = user;

//formik form
const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
        email: location?.state?.user?.email,
        firstname:location?.state?.user?.firstname,
        lastname:location?.state?.user?.lastname,
    },
    onSubmit:(values)=>{
        dispatch(updateProfileAction(values));
    },
    validationSchema:formSchema,
});

  useEffect(()=>{
    if(isEdited){
        navigate('/profile');
      }
  },[dispatch,isEdited]);

  return (
    <>
      {AppErr||ServerErr? <ErrorDisplayMessage>
      {AppErr} {ServerErr}</ErrorDisplayMessage>:
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Update Profile</span>
                  {/* <h4 className="mb-4 fw-light">
                    Hi, {data?.data?.firstname} Do you want to update your
                    profile
                  </h4> */}

                  {/* Display income Err */}
                  {/* {userAppErr || userServerErr ? (
                    <ErrorDisplayMessage
                      error={{
                        userAppErr,
                        userServerErr,
                      }}
                    />
                  ) : null} */}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.firstname}
                      onBlur={formik.handleBlur("firstname")}
                      onChange={formik.handleChange("firstname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter firstname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div> 
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.lastname}
                      onBlur={formik.handleBlur("lastname")}
                      onChange={formik.handleChange("lastname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter lastname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div> 
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                      className="form-control"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div> 

                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    {Loading?<DisabledButton/>:<button type="submit" class="btn btn-warning">
                      Update
                    </button>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </>
  );
};

export default UpdateProfile;