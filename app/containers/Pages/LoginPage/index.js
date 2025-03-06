/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { reactIcons } from '@/utils/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
          className="h-[5vw] w-[22vw] object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="bg-white text-black max-w-lg w-full overflow-hidden rounded-lg mx-auto p-5 md:mx-0">
        <h1 className="text-center">Login</h1>
        <div className="">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg outline-none block w-full p-2 font-semibold"
            placeholder="Login ID"
            name="username"
            onChange={handleLoginChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLoginSubmit();
              }
            }}
          />
        </div>
        {formError.username && (
          <div className="form-eror lg:text-16 text-14">
            {formError.username}
          </div>
        )}
        <div className="mt-3 relative">
          <input
            type={!isPassword ? 'password' : 'text'}
            className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg outline-none block w-full p-2 font-semibold"
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
          <span
            className="absolute top-[10px] right-[10px] text-22 text-black cursor-pointer"
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
          </span>
        </div>
        {formError.password && (
          <div className="form-eror lg:text-16 text-14">
            {formError.password}
          </div>
        )}

        <button
          type="button"
          className="w-full bg-[#1C77FF] rounded-md py-2 font-semibold mb-3 mt-1 text-white"
          onClick={handleLoginSubmit}
        >
          Login
        </button>
        <button
          type="button"
          className="w-full bg-[#1C77FF] rounded-md py-2 font-semibold mb-3 mt-1 text-white"
          onClick={handleLoginSubmit}
        >
          Login with Demo ID
        </button>
        <p>
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
        <p className="text-center">gold365info@gmail.com</p>
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
