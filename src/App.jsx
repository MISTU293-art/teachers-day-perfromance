import { useState } from 'react';
import Header from './components/Header';
import PerformanceForm from './components/PerformanceForm';
import SuccessMessage from './components/SuccessMessage';

import Footer from './components/Footer';
import { usePerformanceForm } from './hooks/usePerformanceForm';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form' | 'list'

  const {
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
  } = usePerformanceForm();

  const handleResetAndStay = () => {
    handleReset();
    setCurrentView('form');
  };

  return (
    <div className="app-layout">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="main-content">
        <div className="registration-container">
          {currentView === 'list' ? (
            <PerformanceList onBackToForm={() => setCurrentView('form')} />
          ) : isSubmitted ? (
            <SuccessMessage 
              submittedData={submittedData} 
              onReset={handleResetAndStay}
              onViewList={() => setCurrentView('list')}
            />
          ) : (
            <PerformanceForm
              formData={formData}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
              submitError={submitError}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
