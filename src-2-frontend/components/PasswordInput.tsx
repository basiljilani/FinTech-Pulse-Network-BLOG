import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface PasswordRequirement {
  text: string;
  regex: RegExp;
}

const passwordRequirements: PasswordRequirement[] = [
  { text: 'At least 8 characters', regex: /.{8,}/ },
  { text: 'Contains uppercase letter', regex: /[A-Z]/ },
  { text: 'Contains lowercase letter', regex: /[a-z]/ },
  { text: 'Contains number', regex: /[0-9]/ },
  { text: 'Contains special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
];

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  showRequirements?: boolean;
  className?: string;
  placeholder?: string;
}

export default function PasswordInput({ 
  value, 
  onChange, 
  showRequirements = false,
  className = '',
  placeholder = 'Enter your password'
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getPasswordStrength = (): { strength: number; color: string; label: string } => {
    let strength = 0;
    passwordRequirements.forEach(req => {
      if (req.regex.test(value)) strength++;
    });
    
    const strengthMap = {
      0: { color: 'bg-gray-600', label: 'Too weak' },
      1: { color: 'bg-password-strength-weak', label: 'Weak' },
      2: { color: 'bg-password-strength-fair', label: 'Fair' },
      3: { color: 'bg-password-strength-good', label: 'Good' },
      4: { color: 'bg-password-strength-strong', label: 'Strong' },
      5: { color: 'bg-password-strength-very-strong', label: 'Very strong' },
    };
    
    return {
      strength,
      ...strengthMap[strength as keyof typeof strengthMap],
    };
  };

  const { strength, color, label } = getPasswordStrength();
  const strengthPercentage = (strength / passwordRequirements.length) * 100;

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 ${className}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Password strength indicator */}
      {value && (
        <div className="space-y-1">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${color}`}
              style={{ width: `${strengthPercentage}%` }}
            />
          </div>
          <p className={`text-xs ${color.replace('bg-', 'text-')}`}>
            {label}
          </p>
        </div>
      )}

      {/* Requirements list */}
      {(showRequirements || isFocused) && value && (
        <div className="mt-2 space-y-2 text-sm">
          {passwordRequirements.map((req, index) => (
            <div key={index} className="flex items-center space-x-2">
              {req.regex.test(value) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
              <span className={req.regex.test(value) ? 'text-green-400' : 'text-gray-400'}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
