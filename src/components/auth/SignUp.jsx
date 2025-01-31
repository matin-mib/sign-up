import { useState } from "react";
import { Button, Input, Form, notification } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import ReCAPTCHA from "react-google-recaptcha";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { useLocation } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

const SignUp = () => {
  const [form] = Form.useForm();
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const location = useLocation();
  const { data } = location.state || {};

  console.log(data);


  const onFinish = (values) => {
    if (!captchaVerified) {
      notification.error({
        message: "CAPTCHA doğrulaması edilməyib",
        description: "Xahiş edirik CAPTCHA-nı tamamlayın.",
      });
      return;
    }

    form.resetFields();
    console.log("Form Data:", values);

    notification.success({
      message: "Qeydiyyat tamamlandı!",
      description: "Siz uğurla qeydiyyatdan keçdiniz.",
    });
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Success:", response);
    notification.success({
      message: "Qeydiyyat tamamlandı!",
      description: "Siz uğurla qeydiyyatdan keçdiniz.",
    });
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Login Failed:", error);
  };



  const handleLinkedInSuccess = (response) => {
    console.log("LinkedIn Success:", response);
    notification.success({
      message: "Qeydiyyat tamamlandı!",
      description: "Siz uğurla qeydiyyatdan keçdiniz.",
    });
  };

  const handleLinkedInFailure = (error) => {
    console.log("LinkedIn Login Failed:", error);
  };


  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"

            rules={[{ required: true, message: "Adınızı daxil edin!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item name="surname" rules={[{ required: true, message: "Soyadınızı daxil edin!" }]}>
            <Input placeholder="Surname" />
          </Form.Item>

          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Düzgün e-poçt adresi daxil edin!" }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Şifrənizi daxil edin!" },
              { min: 8, message: "Şifrə minimum 8 simvol olmalıdır!" },
              { pattern: /[A-Z]/, message: "Şifrədə ən azı bir böyük hərf olmalıdır!" },
              { pattern: /\d/, message: "Şifrədə ən azı bir rəqəm olmalıdır!" },
              { pattern: /[!@#$%^&*№]/, message: "Şifrədə ən azı bir xüsusi simvol olmalıdır!" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item className="w-100 overflow-hidden">
            <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_KEY} onChange={handleCaptchaChange} />
          </Form.Item>

          <Form.Item>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              ux_mode="popup"
            />
          </Form.Item>

          <Form.Item>
            <LinkedIn
              clientId={import.meta.env.VITE_LINKEDIN_CLIENT_ID}
              redirectUri={import.meta.env.VITE_LINKEDIN_REDIRECT_URI}
              onSuccess={handleLinkedInSuccess}
              onFailure={handleLinkedInFailure}
              redirect={false}
               scope="r_liteprofile r_emailaddress"
            >
              {({ linkedInLogin }) => (
                <Button
                  icon={<FaLinkedin className="text-white" />}
                  size="large" onClick={linkedInLogin}
                  className="w-full bg-blue-600 text-white"
                >
                  Sign in with LinkedIn
                </Button>
              )}
            </LinkedIn>
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={!captchaVerified}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
