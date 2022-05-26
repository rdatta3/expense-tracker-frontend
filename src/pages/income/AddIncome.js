import React, { useEffect, useState } from "react";
import {useFormik} from "formik";
import {useDispatch,useSelector} from 'react-redux';
import * as Yup from "yup";
import moneySVG from "../../img/money.jpg";
import DisabledButton from "../../components/DisabledButton";
import { createIncomeAction } from "../../redux/slices/income/incomeSlices";
import { useNavigate } from "react-router-dom";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/Loading";

//form validation 
const formSchema=Yup.object({
    title:Yup.string().required("title is required"),
    description:Yup.string().required("description is required"),
    amount:Yup.number().required("amount is require"),
});


const AddIncome = () => {
  const navigate=useNavigate();
  //dispatch
  const dispatch = useDispatch();
  //formik form
const formik = useFormik({
    initialValues:{
        title: "",
        description:"",
        amount:"",
    },
    onSubmit:(values)=>{
        dispatch(createIncomeAction(values));
    },
    validationSchema:formSchema,
});

  //Get expense created from store
  const state = useSelector(state => state.income);
  const { loading, appErr, serverErr, IncomeCreated, isIncomeCreated } = state;

//redirect
useEffect(()=>{
if(isIncomeCreated) navigate('/incomes');
},[isIncomeCreated,dispatch])


  return (
    <>
    {loading?<LoadingComponent/>:
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <a className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="400"
            />
          </a>
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Income</span>
                  <h2 className="mb-4 fw-light">Record New Income</h2>
                  {/* Display income Err */}
                   {serverErr || appErr ? (
                    <ErrorDisplayMessage>
                      {serverErr}{appErr}
                    </ErrorDisplayMessage>
                  ) : null} 
                  <div className="mb-3 input-group">
                    <input
                       value={formik.values.title}
                      onChange={formik.handleChange("title")}
                      onBlur={formik.handleBlur("title")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.description}
                      onChange={formik.handleChange("description")}
                      onBlur={formik.handleBlur("description")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.description && formik.errors.description}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.amount}
                      onChange={formik.handleChange("amount")}
                      onBlur={formik.handleBlur("amount")}
                      className="form-control"
                      type="number"
                      placeholder="Enter Amount"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.amount && formik.errors.amount}
                  </div>
                  {loading? <DisabledButton/>:<button type="submit" className="btn btn-success mb-4 w-100">
                  Record Income
                </button>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
}
    </>
  );
};

export default AddIncome;
