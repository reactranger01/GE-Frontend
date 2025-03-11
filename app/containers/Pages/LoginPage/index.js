/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { reactIcons } from '@/utils/icons';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Cookies from 'js-cookie';
import { isLoggedIn, postData, setAuthCookie } from '@/utils/apiHandlers';
import { isYupError, parseYupError } from '@/utils/Yup';
import {
  forgotPasswordValidation,
  loginValidation,
  verificationCodeValidation,
} from '@/utils/validation';
import { useDispatch } from 'react-redux';
import { init } from '@/redux/actions';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = useState(false);
  const [isForgot, setForgot] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [credential, setCredential] = useState({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    username: '',
    password: '',
  });
  const [forgotForm, setForgotForm] = useState({
    phoneNumber: '',
  });
  const [forgotFormError, setForgotFormError] = useState({
    phoneNumber: '',
  });
  const [verificationForm, setverificationForm] = useState({
    mobile: forgotForm?.phoneNumber,
    code: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationFormError, setVerificationFormError] = useState({
    mobile: '',
    code: '',
    password: '',
    confirmPassword: '',
  });

  const newData = {
    phoneNumber: forgotForm?.phoneNumber,
    resetToken: verificationForm?.code,
    newPassword: verificationForm?.password,
  };
  // otp verification & new password create on change function
  const handleVerificvationChange = (e) => {
    let { name, value } = e.target;
    setverificationForm({ ...verificationForm, [name]: value });
    setVerificationFormError({
      ...verificationFormError,
      [name]: '',
    });
  };
  // otp sent on change function
  const handleForgotChange = (e) => {
    let { name, value } = e.target;
    setForgotForm({ ...forgotForm, [name]: value });
    setForgotFormError({
      ...forgotFormError,
      [name]: '',
    });
  };
  //login on change function
  const handleLoginChange = (e) => {
    let { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };
  useEffect(() => {
    if (forgotForm?.phoneNumber) {
      setverificationForm({
        ...verificationForm,
        mobile: forgotForm?.phoneNumber,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotForm?.phoneNumber]);

  // otp sent handle change function
  const handleForgotOtpSent = async (e) => {
    e.preventDefault();
    try {
      setForgotFormError({});
      await forgotPasswordValidation.validate(forgotForm, {
        abortEarly: false,
      });
      const response = await postData('/user/forgot-password', forgotForm);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Otp sent successfully');
        setIsSent(true);
        setMinutes(1);
        setSeconds(59);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setForgotFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  // otp verification & new password create handle change function
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      setVerificationFormError({});
      await verificationCodeValidation.validate(verificationForm, {
        abortEarly: false,
      });
      const response = await postData('/user/forgot-resetpassword', newData);
      if (response?.status === 200) {
        toast.success('Password Created Successfully');
        setverificationForm({
          mobile: '',
          code: '',
          password: '',
          confirmPassword: '',
        });
        setForgotForm({
          phoneNumber: '',
        });
        setForgot(false);
        setIsSent(false);
        setMinutes(0);
        setSeconds(0);
      } else {
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setVerificationFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  // for login handle change function
  const handleLoginSubmit = async () => {
    try {
      setFormError({});
      await loginValidation.validate(credential, {
        abortEarly: false,
      });
      if (rememberMe) {
        Cookies.set('username', credential.username, { expires: 30 }); // Expires in 1 day
        Cookies.set('password', credential.password, { expires: 30 }); // Expires in 1 day
      }
      const response = await postData('/user/signin', credential);
      if (response?.status === 200) {
        if (response.data.ut === 'USER') {
          Cookies.set('__user__isLoggedIn', response?.data?.token, {
            expires: 1,
          });
          setAuthCookie();
          dispatch(init());
          toast.success('Login Successfully');
          window.location.href = '/';
        } else {
          toast.error('User not exist');
        }
        // navigate(-1);
      } else {
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };
  //otp timer set
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const login = isLoggedIn();
  useEffect(() => {
    if (login) {
      login && navigate('/');
    }
  }, [login]);

  return (
    <div className=" bg-gradient-to-b from-[#000] to-[#8000FF] h-screen flex-center flex-col gap-5">
      <div>
        <img
          src="/images/logo.png"
          alt="Gold365"
          className=" w-[22vw] object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="bg-white text-black max-w-[350px] w-full overflow-hidden rounded-lg mx-auto p-5 md:mx-0">
        <h1 className="text-center flex items-center justify-center gap-3 text-24 mb-2">
          LOGIN {reactIcons.pointDown}
        </h1>
        <div className="relative">
          <input
            type="text"
            className="bg-gray-50  border border-gray-300 text-black text-md rounded-md outline-none block w-full p-2 font-medium"
            placeholder="Username"
            name="username"
            onChange={handleLoginChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLoginSubmit();
              }
            }}
          />
          <span className="ay-center right-3">{reactIcons.faUser}</span>
        </div>
        {formError.username && (
          <div className="form-eror lg:text-16 text-14">
            {formError.username}
          </div>
        )}
        <div className="mt-3 relative">
          <input
            type={!isPassword ? 'password' : 'text'}
            className="bg-gray-50 border border-gray-300 text-black text-md rounded-md outline-none block w-full p-2 font-medium"
            placeholder="Password"
            name="password"
            onChange={handleLoginChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLoginSubmit();
              }
            }}
          />
          <span className="ay-center right-3">{reactIcons.faKey}</span>
        </div>
        {formError.password && (
          <div className="form-eror lg:text-16 text-14">
            {formError.password}
          </div>
        )}

        <button
          type="button"
          className="w-full bg-black hover:text-gray-900  py-2 mt-5 text-white relative rounded"
          onClick={handleLoginSubmit}
        >
          Login{' '}
          <span className="ay-center right-2">{reactIcons?.faSignin}</span>
        </button>
        <button
          type="button"
          className="w-full bg-black hover:text-gray-900  py-2 mt-1 text-white relative rounded"
          onClick={handleLoginSubmit}
        >
          Login with Demo ID
          <span className="ay-center right-2">{reactIcons?.faSignin}</span>
        </button>

        <p className="text-12 leading-4">
          This site is protected by reCAPTCHA and the Google{' '}
          <span className="text-[#007bff]"> Privacy Policy</span> and{' '}
          <span className="text-[#007bff]"> Terms of Service</span> apply.
        </p>
        <p className="text-[#007bff] text-center text-16 mt-2">
          gold365info@gmail.com
        </p>
        <div className="border-t relative  border-dotted border-black flex items-center justify-center gap-3 py-1 mt-3">
          <div className="flex items-center justify-center gap-3">
            <svg
              _ngcontent-iat-c44=""
              width="30px"
              height="30px"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                _ngcontent-iat-c44=""
                cx="24"
                cy="24"
                r="20"
                fill="#C13584"
              ></circle>
              <path
                _ngcontent-iat-c44=""
                d="M24 14.1622C27.2041 14.1622 27.5837 14.1744 28.849 14.2321C30.019 14.2855 30.6544 14.481 31.0773 14.6453C31.6374 14.863 32.0371 15.123 32.457 15.5429C32.877 15.9629 33.137 16.3626 33.3547 16.9227C33.519 17.3456 33.7145 17.981 33.7679 19.1509C33.8256 20.4163 33.8378 20.7958 33.8378 23.9999C33.8378 27.2041 33.8256 27.5836 33.7679 28.849C33.7145 30.019 33.519 30.6543 33.3547 31.0772C33.137 31.6373 32.877 32.0371 32.4571 32.457C32.0371 32.8769 31.6374 33.1369 31.0773 33.3546C30.6544 33.519 30.019 33.7144 28.849 33.7678C27.5839 33.8255 27.2044 33.8378 24 33.8378C20.7956 33.8378 20.4162 33.8255 19.151 33.7678C17.981 33.7144 17.3456 33.519 16.9227 33.3546C16.3626 33.1369 15.9629 32.8769 15.543 32.457C15.1231 32.0371 14.863 31.6373 14.6453 31.0772C14.481 30.6543 14.2855 30.019 14.2321 28.849C14.1744 27.5836 14.1622 27.2041 14.1622 23.9999C14.1622 20.7958 14.1744 20.4163 14.2321 19.1509C14.2855 17.981 14.481 17.3456 14.6453 16.9227C14.863 16.3626 15.123 15.9629 15.543 15.543C15.9629 15.123 16.3626 14.863 16.9227 14.6453C17.3456 14.481 17.981 14.2855 19.151 14.2321C20.4163 14.1744 20.7959 14.1622 24 14.1622ZM24 12C20.741 12 20.3323 12.0138 19.0524 12.0722C17.7752 12.1305 16.9028 12.3333 16.1395 12.63C15.3504 12.9366 14.6812 13.3469 14.0141 14.0141C13.3469 14.6812 12.9366 15.3504 12.63 16.1395C12.3333 16.9028 12.1305 17.7751 12.0722 19.0524C12.0138 20.3323 12 20.741 12 23.9999C12 27.259 12.0138 27.6676 12.0722 28.9475C12.1305 30.2248 12.3333 31.0971 12.63 31.8604C12.9366 32.6495 13.3469 33.3187 14.0141 33.9859C14.6812 34.653 15.3504 35.0633 16.1395 35.3699C16.9028 35.6666 17.7752 35.8694 19.0524 35.9277C20.3323 35.9861 20.741 35.9999 24 35.9999C27.259 35.9999 27.6677 35.9861 28.9476 35.9277C30.2248 35.8694 31.0972 35.6666 31.8605 35.3699C32.6496 35.0633 33.3188 34.653 33.9859 33.9859C34.653 33.3187 35.0634 32.6495 35.37 31.8604C35.6667 31.0971 35.8695 30.2248 35.9278 28.9475C35.9862 27.6676 36 27.259 36 23.9999C36 20.741 35.9862 20.3323 35.9278 19.0524C35.8695 17.7751 35.6667 16.9028 35.37 16.1395C35.0634 15.3504 34.653 14.6812 33.9859 14.0141C33.3188 13.3469 32.6496 12.9366 31.8605 12.63C31.0972 12.3333 30.2248 12.1305 28.9476 12.0722C27.6677 12.0138 27.259 12 24 12Z"
                fill="white"
              ></path>
              <path
                _ngcontent-iat-c44=""
                d="M24.0059 17.8433C20.6026 17.8433 17.8438 20.6021 17.8438 24.0054C17.8438 27.4087 20.6026 30.1675 24.0059 30.1675C27.4092 30.1675 30.1681 27.4087 30.1681 24.0054C30.1681 20.6021 27.4092 17.8433 24.0059 17.8433ZM24.0059 28.0054C21.7968 28.0054 20.0059 26.2145 20.0059 24.0054C20.0059 21.7963 21.7968 20.0054 24.0059 20.0054C26.2151 20.0054 28.0059 21.7963 28.0059 24.0054C28.0059 26.2145 26.2151 28.0054 24.0059 28.0054Z"
                fill="white"
              ></path>
              <path
                _ngcontent-iat-c44=""
                d="M31.8507 17.5963C31.8507 18.3915 31.206 19.0363 30.4107 19.0363C29.6154 19.0363 28.9707 18.3915 28.9707 17.5963C28.9707 16.801 29.6154 16.1562 30.4107 16.1562C31.206 16.1562 31.8507 16.801 31.8507 17.5963Z"
                fill="white"
              ></path>
            </svg>
            <p className="font-bold text-14">INSTAGRAM</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <svg
              _ngcontent-iat-c44=""
              width="30px"
              height="30px"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                _ngcontent-iat-c44=""
                cx="16"
                cy="16"
                r="14"
                fill="url(#paint0_linear_87_7225)"
              ></circle>
              <path
                _ngcontent-iat-c44=""
                d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z"
                fill="white"
              ></path>
              <defs _ngcontent-iat-c44="">
                <linearGradient
                  _ngcontent-iat-c44=""
                  id="paint0_linear_87_7225"
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop _ngcontent-iat-c44="" stop-color="#37BBFE"></stop>
                  <stop
                    _ngcontent-iat-c44=""
                    offset="1"
                    stop-color="#007DBB"
                  ></stop>
                </linearGradient>
              </defs>
            </svg>
            <p className="font-bold text-14">INSTAGRAM</p>
          </div>
          <img
            src="/images/handRight.png"
            className="slide-right-hand absolute -left-5 w-7 "
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// {isForgot && (
//     <Accordion className="form-accordian" defaultExpanded>
//       <AccordionSummary
//         expandIcon={<div>+</div>}
//         aria-controls="panel1-content"
//         id="panel1-header"
//       >
//         <div className="flex w-full items-center justify-between">
//           <div>
//             <img
//               src="/images/logo.png"
//               alt="Gold365"
//               className="h-[5vw] w-[22vw] object-contain cursor-pointer"
//               onClick={() => navigate('/')}
//             />
//           </div>
//           <div>
//             <p className="mr-3 font-semibold text-white">
//               Click here to{' '}
//               <button
//                 onClick={() => navigate('/signup')}
//                 className="text-[#FFDD2D] underline"
//               >
//                 SIGNUP
//               </button>
//             </p>
//           </div>
//         </div>
//       </AccordionSummary>
//       <AccordionDetails>
//         <div className="flex items-center flex-col lg:flex-row justify-between lg:py-5">
//           <div className="h-[100px] md:h-[135px] lg:h-auto md:-mt-[93px] -mt-[68px] lg:mt-0 mb-[30px] md:mb-[40px] lg:mb-0">
//             <img
//               src="/images/login/password.png"
//               className="rotate-90 lg:rotate-0 w-[55px] md:w-[75px] mx-auto"
//               alt="login"
//             />
//           </div>

//           <div className="w-full lg:w-[80%] p-7">
//             <div className="">
//               <div className="relative">
//                 <input
//                   type="number"
//                   name="phoneNumber"
//                   value={forgotForm?.phoneNumber}
//                   onChange={handleForgotChange}
//                   className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg outline-none block w-full p-2 font-semibold pl-10"
//                   placeholder="Enter mobile number"
//                 />
//                 <span className="absolute top-0 bottom-0 flex items-center justify-center left-0 text-15 text-black bg-[#DBDBDB] p-2 rounded-l-md">
//                   +91
//                 </span>
//                 {!isSent && (
//                   <span
//                     onClick={handleForgotOtpSent}
//                     className="absolute cursor-pointer top-0 bottom-0 flex items-center w-[74px] gap-3 justify-center right-0 text-15 text-black bg-[#DBDBDB] p-2 rounded-tr-md rounded-br-md hover:bg-[#00B507] hover:text-white ease-in duration-300"
//                   >
//                     OTP {reactIcons.arrowRight}
//                   </span>
//                 )}
//                 {isSent && (
//                   <span className="absolute top-0 bottom-0 flex items-center w-[74px] gap-3 justify-center right-0 text-15 text-white bg-[#00B507] p-2 rounded-tr-md rounded-br-md">
//                     SENT{' '}
//                     <img
//                       src="/images/login/message-sent.png"
//                       alt="message-sent"
//                     />
//                   </span>
//                 )}
//               </div>
//               {isSent && (
//                 <>
//                   <p className="text-right text-14 text-red-500 leading-auto mb-2">
//                     Not received OTP?{' '}
//                     {seconds > 0 || minutes > 0 ? (
//                       <span className="text-right text-14 text-white font-semibold leading-auto">
//                         {' '}
//                         {minutes < 10 ? `0${minutes}` : minutes}:
//                         {seconds < 10 ? `0${seconds}` : seconds} Sec
//                       </span>
//                     ) : (
//                       <span
//                         onClick={handleForgotOtpSent}
//                         className="underline text-14 font-semibold text-white cursor-pointer"
//                       >
//                         Resend
//                       </span>
//                     )}
//                   </p>
//                 </>
//               )}
//             </div>
//             {forgotFormError.phoneNumber && (
//               <div className="form-eror lg:text-16 text-14">
//                 {forgotFormError.phoneNumber ===
//                 'phoneNumber must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
//                   ? 'Please enter mobile number'
//                   : forgotFormError.phoneNumber}
//               </div>
//             )}
//             {isSent && (
//               <>
//                 <div className="">
//                   <input
//                     type="text"
//                     className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg outline-none block w-full p-2 font-semibold"
//                     placeholder="Enter OTP"
//                     name="code"
//                     value={verificationForm?.code}
//                     onChange={handleVerificvationChange}
//                   />
//                 </div>
//                 {verificationFormError.code && (
//                   <div className="form-eror lg:text-16 text-14">
//                     {verificationFormError.code}
//                   </div>
//                 )}
//                 <div className="mt-3 ">
//                   <input
//                     type="text"
//                     className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg outline-none block w-full p-2 font-semibold"
//                     value={verificationForm?.password}
//                     name="password"
//                     placeholder="Enter new password*"
//                     onChange={handleVerificvationChange}
//                   />
//                 </div>
//                 {verificationFormError.password && (
//                   <div className="form-eror lg:text-16 text-14">
//                     {verificationFormError.password}
//                   </div>
//                 )}
//                 <div className="mt-3 ">
//                   <input
//                     type="text"
//                     className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg outline-none block w-full p-2 font-semibold"
//                     placeholder="Confirm new password"
//                     value={verificationForm?.confirmPassword}
//                     name="confirmPassword"
//                     onChange={handleVerificvationChange}
//                   />
//                 </div>
//                 {verificationFormError.confirmPassword && (
//                   <div className="form-eror lg:text-16 text-14">
//                     {verificationFormError.confirmPassword}
//                   </div>
//                 )}
//                 <div className="mt-3 ">
//                   <button
//                     onClick={handleVerificationSubmit}
//                     className="w-full bg-[#1C77FF] rounded-md py-2 font-semibold mb-3 mt-1 text-white"
//                   >
//                     Reset Password
//                   </button>
//                 </div>{' '}
//               </>
//             )}
//             <div className="hidden">
//               <p className="text-center text-20 font-semibold text-white">
//                 &quot; Kindly contact the admin for a new password &quot;
//               </p>
//             </div>
//             <div>
//               <p className="text-end mt-3 font-semibold">
//                 <button
//                   onClick={() => setForgot(false)}
//                   className="text-[#FFDD2D] underline"
//                 >
//                   Back
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </AccordionDetails>
//     </Accordion>
//   )}
