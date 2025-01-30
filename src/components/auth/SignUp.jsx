import { useState } from "react";
import { Button, Input, Form, notification } from "antd";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const [form] = Form.useForm();
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const onFinish = (values) => {
    if (!captchaVerified) {
      notification.error({
        message: "CAPTCHA doğrulaması edilməyib",
        description: "Xahiş edirik CAPTCHA-nı tamamlayın.",
      });
      return;
    }

    console.log("Form Data:", values);

    notification.success({
      message: "Qeydiyyat tamamlandı!",
      description: "Siz uğurla qeydiyyatdan keçdiniz.",
    });
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Success:", response);
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Login Failed:", error);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" rules={[{ required: true, message: "Adınızı daxil edin!" }]}>
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
                { pattern: /[!@#$%^&*]/, message: "Şifrədə ən azı bir xüsusi simvol olmalıdır!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_KEY} onChange={handleCaptchaChange} />
            </Form.Item>

            <Form.Item>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
