import { useState, useEffect } from "react";
import { Button, Input, Form, notification, Checkbox, Modal } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import ReCAPTCHA from "react-google-recaptcha";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { FaLinkedin } from "react-icons/fa";
import emailjs from "emailjs-com";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [savedPassword, setSavedPassword] = useState("");
  const [isTwoFactorVisible, setIsTwoFactorVisible] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(180);
  const [codeSent, setCodeSent] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");


  //! Strength  password function
  const checkPasswordStrength = (password) => {
    let strength = "weak";

    if (password.length >= 8) {
      if (/[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*№]/.test(password)) {
        strength = "strong";
      } else if (/[A-Z]/.test(password) || /\d/.test(password) || /[!@#$%^&*№]/.test(password)) {
        strength = "medium";
      }
    }
    setPasswordStrength(strength);
  };


  //! Strong password function
  const isStrongPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*№]/.test(password);

    return minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };



  //! Checkbox save password function
  useEffect(() => {
    const storedPassword = localStorage.getItem("savedPassword");
    if (storedPassword) {
      setSavedPassword(storedPassword);
      setRememberPassword(true);

      setTimeout(() => {
        form.setFieldsValue({ password: storedPassword });
      }, 0);
    }
  }, [form]);


  //! Start time in modal
  const startTimer = () => {
    setTimer(180);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          notification.error({
            message: "Time expired!",
            description: "The verification code has expired. Please request a new one.",
          });
          setIsTwoFactorVisible(false);
          setTwoFactorCode("");
          form.resetFields();
          setCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };


  //! sendVerificationCode function
  const sendVerificationCode = () => {
    const email = form.getFieldValue("email");

    if (!email) {
      notification.error({
        message: "E-poçt ünvanı daxil edilməyib!",
        description: "Kod göndərmək üçün zəhmət olmasa e-poçt ünvanınızı daxil edin.",
      });
      return;
    }

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
      description: `Kod ${email} ünvanına göndərildi.`,
    });
  };




  //! form onFinish function
  const onFinish = (values) => {
    if (!captchaVerified) {
      notification.error({
        message: "CAPTCHA doğrulaması edilməyib",
        description: "Xahiş edirik CAPTCHA-nı tamamlayın.",
      });
      return;
    }

    if (!isStrongPassword(values.password)) {
      notification.error({
        message: "Zəif şifrə!",
        description: "Şifrə minimum 8 simvol olmalıdır! Şifrədə ən azı bir böyük hərf, bir rəqəm və bir xüsusi simvol olmalıdır!",
      });
      return;
    }

    sendVerificationCode(values.email);

    const path = window.location.pathname;
    const lastSegment = path.substring(path.lastIndexOf("/") + 1);

    localStorage.setItem(
      "signUpData",
      JSON.stringify({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        role: lastSegment,
      })
    );


    if (rememberPassword) {
      localStorage.setItem("savedPassword", values.password);
    } else {
      localStorage.removeItem("savedPassword");
    }
  };



  //! handleTwoFactorSubmit function
  const handleTwoFactorSubmit = () => {
    if (twoFactorCode === verificationCode) {
      notification.success({
        message: "Qeydiyyat tamamlandı!",
        description: "Siz uğurla qeydiyyatdan keçdiniz.",
      });

      setIsTwoFactorVisible(false);
      form.resetFields();
      setRememberPassword(false);


      const signUpData = JSON.parse(localStorage.getItem("signUpData"));
      console.log("Qeydiyyat məlumatları:", signUpData);
      localStorage.removeItem("signUpData");

    } else {
      notification.error({
        message: "Yanlış doğrulama kodu",
        description: "Zəhmət olmasa düzgün doğrulama kodunu daxil edin.",
      });
    }
  };




  //! handleCaptchaChange 
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };


  return (
    <div className="flex justify-center items-center h-full sign-up pt-32 overflow-hidden">
      <div className="w-full max-w-md  p-8 rounded-t-full py-24 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">{t('form.title')}</h2>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            className="my-8"
            name="name"
            rules={[
              { required: true, message: t('form.nameError') },
              { whitespace: true, message: t('form.nameErrorWhitespace') },
            ]}
          >
            <Input placeholder={t('form.name')} className="sign-up-input" />
          </Form.Item>

          <Form.Item
            className="my-8"
            name="surname"
            rules={[
              { required: true, message: t('form.surnameError') },
              { whitespace: true, message: t('form.surnameErrorWhitespace') },
            ]}
          >
            <Input placeholder={t('form.surname')} className="sign-up-input" />
          </Form.Item>

          <Form.Item
            className="my-8"
            name="email"
            rules={[
              { required: true, type: "email", message: t('form.emailError') },
              { whitespace: true, message: t('form.emailErrorWhitespace') }, // Boşluq daxil edilməsini əngəlləyir
            ]}
          >
            <Input placeholder={t('form.email')} className="sign-up-input" />
          </Form.Item>

          <Form.Item className="mt-8" name="password">
            <Input.Password
              placeholder={t('form.password')}
              onChange={(e) => checkPasswordStrength(e.target.value)}
              className={classNames("sign-up-input", {
                "border-red-500 bg-red-100": passwordStrength === "weak",
                "border-yellow-500 bg-yellow-100": passwordStrength === "medium",
                "border-green-500 bg-green-100": passwordStrength === "strong",
              })}
            />
          </Form.Item>

          <div className="w-full h-2 rounded-lg z-30 relative">
            <div
              className={classNames("h-full transition-all duration-300", {
                "bg-red-500 w-1/4": passwordStrength === "weak",
                "bg-yellow-500 w-2/4": passwordStrength === "medium",
                "bg-green-500 w-full": passwordStrength === "strong",
              })}
            ></div>
          </div>

          <Form.Item>
            <Checkbox
              checked={rememberPassword}
              onChange={(e) => {
                setRememberPassword(e.target.checked);
                if (e.target.checked) {
                  const password = form.getFieldValue("password");
                  if (password) {
                    localStorage.setItem("savedPassword", password);
                  }
                } else {
                  localStorage.removeItem("savedPassword");
                }
              }}
            >
              {t('form.rememberPassword')}
            </Checkbox>
          </Form.Item>


          <Form.Item className="w-100 overflow-hidden">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
              onChange={handleCaptchaChange}
            />
          </Form.Item>

          <Form.Item>
            <GoogleLogin
              onSuccess={() => {
                if (captchaVerified) {
                  notification.success({ message: t('form.googleLogin') });
                } else {
                  notification.error({
                    message: t('form.captchaError'),
                    description: t('form.captchaMessage'),
                  });
                }
              }}
              onError={() => notification.error({ message: t('form.googleLoginError') })}
              ux_mode="popup"
              disabled={!captchaVerified}
            />
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
                <Button
                  icon={<FaLinkedin className="text-white" />}
                  size="large" onClick={linkedInLogin}
                  className="w-full bg-blue-600 text-white"
                  disabled={!captchaVerified}
                >
                  {t('form.linkedinLogin')}
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
              {t('form.submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>


      <Modal
        title={t('form.twoFactorTitle')}
        open={isTwoFactorVisible}
        onOk={handleTwoFactorSubmit}
        onCancel={() => setIsTwoFactorVisible(false)}
        okText={t('form.verify')}
      >
        <p>{t('form.enterVerificationCode')}</p>
        <Input
          type="text"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          placeholder="Enter your verification code"
          className="my-3"
        />
        <p>{`Remaining time: ${Math.floor(timer / 60)}:${timer % 60}`}</p>
      </Modal>
    </div>
  );
};

export default SignUp;


