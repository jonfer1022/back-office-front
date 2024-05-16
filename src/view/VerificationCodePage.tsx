import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import VerificationInput from 'react-verification-input';
import { Error } from '../utils/interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/fetcher';
import { AccountContext } from '../Context/providers/account.provider';

interface IVerificationCodePageProps {
  setError: (error: Error) => void;
  setToken: (token: string) => void;
}

const VerificationCodePage: React.FC<IVerificationCodePageProps> = ({
  setError,
  setToken,
}) => {
  const { setAccount } = useContext(AccountContext);
  const location = useLocation();
  const { email, password, name } = location.state;
  const [code, setCode] = React.useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('auth/confirm-signup', {
        name,
        email,
        password,
        code,
      });
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: response.data.user.name,
          email: response.data.user.email,
          userId: response.data.user.userId,
        }),
      );
      setToken(response.data.accessToken);
      setAccount(response.data.user);
      navigate('/home');
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };
  return (
    <Container
      className="col-5 d-flex justify-content-center mt-5 px-5"
      style={{ minHeight: '80vh', background: '#f7f7f9' }}
    >
      <div className="p-1 mt-5 rounded text-center">
        <h1 className="mb-3 border-bottom pb-5">Enter verification code</h1>
        <span>A verification code has been sent to your email</span>
        <p className="mt-3">
          Please check your inbox and enter the verification code below to
          verify your email address
        </p>
        <div className="d-flex h-50 justify-content-center align-items-center">
          <VerificationInput value={code} length={6} onChange={setCode} />
        </div>
        <Button
          variant="primary"
          className="w-100"
          disabled={code.length !== 6}
          onClick={handleSubmit}
        >
          Verify
        </Button>
      </div>
    </Container>
  );
};

export default VerificationCodePage;
