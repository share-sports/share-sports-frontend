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
      validateField(key, formData[key]);
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
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <button onClick={() => navigate('/')} className="text-2xl font-bold">
              Share Sports
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8">회원가입</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                아이디
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id"
                type="text"
                name="id"
                placeholder="아이디 (6~15자)"
                value={formData.id}
                onChange={handleChange}
              />
              {errors.id && <p className="text-red-500 text-xs italic">{errors.id}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                비밀번호
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="비밀번호 (6~20자)"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-6 w-6 text-gray-700" /> : <Eye className="h-6 w-6 text-gray-700" />}
              </button>
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                비밀번호 확인
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickname">
                닉네임
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nickname"
                type="text"
                name="nickname"
                placeholder="닉네임 (2~10자)"
                value={formData.nickname}
                onChange={handleChange}
              />
              {errors.nickname && <p className="text-red-500 text-xs italic">{errors.nickname}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-xs italic mb-4">{errors.general}</p>}
            <div className="flex items-center justify-between">
              <button
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                회원가입
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-dark"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                이미 계정이 있으신가요?
              </a>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2023 풋살 매치. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
