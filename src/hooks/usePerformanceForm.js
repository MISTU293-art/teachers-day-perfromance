import { useState } from 'react';
import { validateForm, validateName, validateContact, validateYear, validatePerformance } from '../utils/validation';
import { submitPerformance } from '../services/performanceService';

const INITIAL_STATE = {
  name: '',
  contact: '',
  year: '',
  performance: '',
  performanceDetails: '',
  teamMembers: ''
};

export const usePerformanceForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return validateName(value);
      case 'contact':
        return validateContact(value);
      case 'year':
        return validateYear(value);
      case 'performance':
        return validatePerformance(value);
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (submitError) {
      setSubmitError(null);
    }

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    setTouched({
      name: true,
      contact: true,
      year: true,
      performance: true,
      performanceDetails: true,
      teamMembers: true
    });

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) element.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitPerformance(formData);
      if (response.success) {
        setSubmittedData(formData);
        setIsSubmitted(true);
      } else {
        setSubmitError(response.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setSubmitError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setTouched({});
    setErrors({});
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return {
    formData,
    touched,
    errors,
    isSubmitting,
    submitError,
    isSubmitted,
    submittedData,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  };
};
