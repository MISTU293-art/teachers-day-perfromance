/**
 * Cultural Performance Categories for Teachers' Day Celebration
 */
export const PERFORMANCE_TYPES = [
  { id: 'Dance', label: 'Dance', icon: '💃' },
  { id: 'Singing', label: 'Singing', icon: '🎤' },
  { id: 'Mimicry', label: 'Mimicry', icon: '🎙️' },
  { id: 'Skit', label: 'Drama / Skit', icon: '🎭' },
  { id: 'Standup Comedy', label: 'Standup Comedy', icon: '😄' },
  { id: 'Poetry', label: 'Poetry', icon: '📜' },
  { id: 'Instrumental', label: 'Instrumental', icon: '🎸' },
  { id: 'Speech', label: 'Speech / Tribute', icon: '🗣️' },
  { id: 'Other', label: 'Other Talent', icon: '✨' }
];

export const ACADEMIC_YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year'
];

export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return 'Full name is required.';
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters.';
  }
  if (trimmed.length > 100) {
    return 'Name cannot exceed 100 characters.';
  }
  return null;
};

export const validateContact = (contact) => {
  if (!contact || typeof contact !== 'string') {
    return 'Contact number is required.';
  }
  const trimmed = contact.trim();
  if (trimmed.length < 6) {
    return 'Please enter a valid phone or WhatsApp number.';
  }
  return null;
};

export const validateYear = (year) => {
  if (!year || typeof year !== 'string' || !year.trim()) {
    return 'Please select your academic year.';
  }
  if (!ACADEMIC_YEARS.includes(year.trim())) {
    return 'Please select a valid academic year.';
  }
  return null;
};

export const validatePerformance = (performance) => {
  if (!performance || typeof performance !== 'string' || !performance.trim()) {
    return 'Please select a performance act.';
  }
  const validTypes = PERFORMANCE_TYPES.map(t => t.id);
  if (!validTypes.includes(performance.trim())) {
    return 'Please select a valid performance type.';
  }
  return null;
};

export const validateForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const contactError = validateContact(formData.contact);
  if (contactError) errors.contact = contactError;

  const yearError = validateYear(formData.year);
  if (yearError) errors.year = yearError;

  const perfError = validatePerformance(formData.performance);
  if (perfError) errors.performance = perfError;

  return errors;
};
