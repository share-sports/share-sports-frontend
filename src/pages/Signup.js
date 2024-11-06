import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    general: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'id':
        if (value.length < 6 || value.length > 15) {
          error = '아이디는 6~15자여야 합니다.';
        }
        break;
      case 'password':
        if (value.length < 6 || value.length > 20) {
          error = '비밀번호는 6~20자여야 합니다.';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = '비밀번호가 일치하지 않습니다.';
        }
        break;
      case 'nickname':
        if (value.length < 2 || value.length > 10) {
          error = '닉네임은 2~10자여야 합니다.';
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let hasError = false;

    // 모든 필드를 유효성 검사
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]); // 괄호를 확인하여 수정했습니다.
      if (errors[key]) {
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      // 실제 회원가입 API 호출 로직
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: '회원가입에 실패했습니다. 다시 시도해주세요.' }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 나머지 JSX 코드 */}
    </div>
  );
}
