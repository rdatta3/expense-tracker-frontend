import React,{ useEffect } from "react";
import {useFormik} from "formik";
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import * as Yup from "yup";
import { registerUserAction } from "../../redux/slices/users/usersSlices";
import DisabledButton from "../../components/DisabledButton";

//form validation 
const formSchema=Yup.object({
    email:Yup.string().required("E-mail is required"),
    password:Yup.string().required("Password is required"),
    firstname:Yup.string().required("first name is require"),
    lastname:Yup.string().required("last name is require"),
});

const Register = () => {
//history
const navigate =useNavigate();
//dispatch
const dispatch = useDispatch();

//get data from store
const user =useSelector((state)=>state?.users);
const {userAppErr,userServerErr,userLoading,isRegistered} = user;

//formik form
const formik = useFormik({
    initialValues:{
        email: "",
        firstname:"",
        lastname:"",
        password: "",
    },
    onSubmit:(values)=>{
        dispatch(registerUserAction(values));
    },
    validationSchema:formSchema,
});
//redirect
  useEffect(()=>{
  if(isRegistered) {
      navigate("/profile");
    }
  },[isRegistered]);
  return (
    <section className="position-relative py-5 overflow-hidden vh-100">
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                Keep Track of your income and expenses flow
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">New User</span>
                <h3 className="fw-bold mb-5">Register</h3>

                {/* Display err here */}
                {userAppErr || userServerErr ? (
                  <div class="alert alert-danger" role="alert">
                    {userServerErr} {userAppErr}
                  </div>
                ) : null} 
                <input
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  className="form-control mb-2"
                  type="text"
                  placeholder="First Name"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <input
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Last Name"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.lastname && formik.errors.lastname} 
                </div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  className="form-control mb-2"
                  type="email"
                  placeholder="Email"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email} 
                </div>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                   {formik.touched.password && formik.errors.password} 
                </div>

                {userLoading?(
                    <DisabledButton />
                  ):(
                  <button
                    type="submit"
                    className="btn btn-primary py-2 w-100 mb-4"
                  >
                    Register
                  </button>
                  )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;