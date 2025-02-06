import { FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";

interface FormData {
  fullName: string;
  username: string;
  password: string;
  acceptTerms: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    password: '',
    acceptTerms: false
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!isLogin) {
      // Handle signup
      if (!formData.acceptTerms) {
        alert('Please accept the terms and conditions');
        setIsLoading(false);
        return;
      }
      
      try {
        // Simulate API call
        console.log('Signing up:', formData);
        
        // Show success message
        setSignupSuccess(true);
        
        // Reset form
        setFormData({
          fullName: '',
          username: '',
          password: '',
          acceptTerms: false
        });
        
        // Switch to login page after 2 seconds
        setTimeout(() => {
          setSignupSuccess(false);
          setIsLogin(true);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Signup error:', error);
        setIsLoading(false);
      }
    } else {
      // Handle login
      try {
        // Simulate API login call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Logging in:', formData);
        
        // Navigate to dashboard after successful login
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 bg-white">
          <div className="relative w-full h-full">
            <img 
  src={'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg'}
              alt="Login illustration" 
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full md:w-1/2 p-8">
          <Card className="p-8 space-y-6 relative">
            {/* Success Message */}
            {signupSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10 transition-opacity duration-300">
                <div className="text-center p-4">
                  <div className="text-green-500 text-xl mb-2">✓</div>
                  <h3 className="text-lg font-semibold text-gray-900">Sign Up Successful!</h3>
                  <p className="text-sm text-gray-600">Redirecting to login...</p>
                </div>
              </div>
            )}

            {/* Toggle Buttons */}
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 transition-all duration-300 ease-in-out ${
                  isLogin ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 transition-all duration-300 ease-in-out ${
                  !isLogin ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="text-center transition-opacity duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold">Welcome There! 👋</h2>
              <p className="text-gray-600">
                {isLogin ? 'Login to your account' : 'Create Your Account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name - Animated height transition */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
              }`}>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              {/* Username */}
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter username"
                  required
                />
              </div>

              {/* Password */}
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* Terms and Conditions */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
              }`}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    I accept Terms and Conditions
                  </label>
                </div>
              </div>

              {/* Forgot Password */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="flex items-center justify-between">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  transition-all duration-300 ease-in-out flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Logging in...' : 'Signing up...'}
                  </>
                ) : (
                  isLogin ? 'LOGIN' : 'SIGN UP'
                )}
              </button>

              {/* Divider */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 ease-in-out disabled:opacity-50"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src={'https://img.icons8.com/?size=48&id=17949&format=png'}
                  alt="Google logo"
                />
                Sign {isLogin ? 'in' : 'up'} with Gmail
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;