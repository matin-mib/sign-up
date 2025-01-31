import { useState, useEffect } from "react";
import { Button, Input, Form, notification, Checkbox, Modal } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import ReCAPTCHA from "react-google-recaptcha";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { FaLinkedin } from "react-icons/fa";
import emailjs from "emailjs-com";

const SignUp = () => {
  const [form] = Form.useForm();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [savedPassword, setSavedPassword] = useState("");
  const [isTwoFactorVisible, setIsTwoFactorVisible] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(180);
  const [codeSent, setCodeSent] = useState(false);

 

  //! Checkbox save password function
  useEffect(() => {
    const storedPassword = localStorage.getItem("savedPassword");
    if (storedPassword) {
      setSavedPassword(storedPassword);
      form.setFieldsValue({ password: storedPassword });
      setRememberPassword(true);
    }
  }, [form]);

  // Function to generate a random 6-digit verification code
  // const generateVerificationCode = () => {
  //   const code = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  //   setVerificationCode(code.toString());
  // };



//! Start time in modal
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          notification.error({
            message: "Time expired!",
            description: "The verification code has expired. Please request a new one.",
          });
          setCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };


  const sendVerificationCode = (email) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setVerificationCode(code.toString());
    setCodeSent(true);
    startTimer();

    const templateParams = {
      to_email: email,
      verification_code: code,
    };

    emailjs.send(
      "service_ivzwxdf",
      "template_cf1zz6c",
      templateParams,
      "NAIq-jSHdVtlaD6IX"
    )
      .then((response) => {
        console.log("Email sent successfully", response);
      })
      .catch((error) => {
        console.error("Error sending email", error);
        notification.error({
          message: "E-mail göndərmə xətası",
          description: "Zəhmət olmasa e-mailinizi yoxlayın və yenidən cəhd edin.",
        });
      });

    setIsTwoFactorVisible(true);
    notification.success({
      message: "Verification code sent!",
      description: "Please check your email for the verification code.",
    });
  };


  const onFinish = (values) => {
    if (!captchaVerified) {
      notification.error({
        message: "CAPTCHA doğrulaması edilməyib",
        description: "Xahiş edirik CAPTCHA-nı tamamlayın.",
      });
      return;
    }

    sendVerificationCode(values.email);
  };

  const handleTwoFactorSubmit = () => {
    if (twoFactorCode === verificationCode) {
      notification.success({
        message: "Qeydiyyat tamamlandı!",
        description: "Siz uğurla qeydiyyatdan keçdiniz.",
      });
      setIsTwoFactorVisible(false);
      form.resetFields();
      setRememberPassword(false);
    } else {
      notification.error({
        message: "Yanlış doğrulama kodu",
        description: "Zəhmət olmasa düzgün doğrulama kodunu daxil edin.",
      });
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
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
              { pattern: /[!@#$%^&*№]/, message: "Şifrədə ən azı bir xüsusi simvol olmalıdır!" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Checkbox checked={rememberPassword} onChange={(e) => setRememberPassword(e.target.checked)}>
              Şifrəmi yadda saxla
            </Checkbox>
          </Form.Item>

          <Form.Item className="w-100 overflow-hidden">
            <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_KEY} onChange={handleCaptchaChange} />
          </Form.Item>

          <Form.Item>
            <GoogleLogin onSuccess={() => notification.success({ message: "Google ilə qeydiyyat uğurla tamamlandı!" })} onError={() => notification.error({ message: "Google login xətası" })} ux_mode="popup" />
          </Form.Item>

          <Form.Item>
            <LinkedIn
              clientId={import.meta.env.VITE_LINKEDIN_CLIENT_ID}
              redirectUri={import.meta.env.VITE_LINKEDIN_REDIRECT_URI}
              onSuccess={() => notification.success({ message: "LinkedIn ilə qeydiyyat uğurla tamamlandı!" })}
              onFailure={() => notification.error({ message: "LinkedIn login xətası" })}
              redirect={false}
              scope="r_liteprofile r_emailaddress"
            >
              {({ linkedInLogin }) => (
                <Button icon={<FaLinkedin className="text-white" />} size="large" onClick={linkedInLogin} className="w-full bg-blue-600 text-white">
                  Sign in with LinkedIn
                </Button>
              )}
            </LinkedIn>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" className="w-full" disabled={!captchaVerified}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Two-Factor Authentication"
        visible={isTwoFactorVisible}
        onOk={handleTwoFactorSubmit}
        // onCancel={() => setIsTwoFactorVisible(false)}
        okText="Verify"
      >
        <p>Doğrulama kodunu daxil edin:</p>
        <Input
          type="text"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          placeholder="Enter your verification code"
        />
        <p>{`Remaining time: ${Math.floor(timer / 60)}:${timer % 60}`}</p>
      </Modal>
    </div>
  );
};

export default SignUp;


