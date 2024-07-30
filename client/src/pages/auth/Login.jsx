import { useRef } from 'react';
import { useLogin } from '../../hooks/AuthHooks';
import CustomInput from '../../components/CustomInput';
import { Link } from 'react-router-dom';


const Login = () => {
  const formRef = useRef(null); 

  const { login, loading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email');
      const password = formData.get('password');
      login({ email, password });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
       <div className='border p-8 rounded-md w-96'>
      <h1 className="text-center text-xl text-[#d3d5d5] sm:text-3xl font-semibold">Login Your Account</h1>
      <div className="w-full mt-8">
        <form onSubmit={handleSubmit} ref={formRef} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
          <CustomInput
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            disabled={loading}
          >
            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            <span className="ml-3">{loading ? 'Loading...' : 'Login'}</span>
          </button>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <p className="mt-6 text-xs text-gray-600 text-center">
            Didn’t Register?{' '}
            <Link to="/">
              <span className="text-[#E9522C] font-semibold">Register</span>
            </Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
