import { BACKEND_API_URL } from '../config/api';

/**
 * Submit performance registration to your backend MongoDB database
 * @param {Object} performanceData 
 * @returns {Promise<{success: boolean, data?: any, message?: string}>}
 */
export const submitPerformance = async (performanceData) => {
  const payload = {
    name: performanceData.name?.trim() || '',
    contact: performanceData.contact?.trim() || '',
    year: (performanceData.year || performanceData.academicYear || '').trim(),
    performance: (performanceData.performance || performanceData.category || '').trim(),
    performanceDetails: (performanceData.performanceDetails || performanceData.details || '').trim(),
    teamMembers: performanceData.teamMembers?.trim() || '',
    createdAt: new Date().toISOString()
  };

  // Always save a copy in local backup storage so exports are immediately available
  try {
    const localExisting = JSON.parse(localStorage.getItem('gimt_performances') || '[]');
    localExisting.unshift({ _id: 'rec_' + Date.now(), ...payload });
    localStorage.setItem('gimt_performances', JSON.stringify(localExisting));
  } catch {
    // Ignore private browsing storage issues
  }

  if (!BACKEND_API_URL) {
    return {
      success: true,
      data: payload,
      message: 'Registration submitted successfully!'
    };
  }

  const endpoint = BACKEND_API_URL.trim();
  console.log(`[Frontend] Sending POST request to: ${endpoint}`, payload);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      const serverMessage = responseData?.message || responseData?.error || `Server responded with status ${response.status} (${response.statusText})`;
      console.error('[Frontend] Backend returned error:', serverMessage);
      return {
        success: false,
        message: serverMessage
      };
    }

    console.log('[Frontend] Backend response:', responseData);
    return {
      success: true,
      data: responseData?.data || payload,
      message: responseData?.message || 'Registration successfully saved to database!'
    };
  } catch (error) {
    console.error('[Frontend] Network/Connection Error:', error);
    return {
      success: false,
      message: `Failed to connect to backend at "${endpoint}". Please check your network and make sure your server is running.`
    };
  }
};

/**
 * Fetch all performances for the export list (from backend or local storage)
 * @returns {Promise<Array<Object>>}
 */
export const getPerformancesList = async () => {
  const localList = (() => {
    try {
      return JSON.parse(localStorage.getItem('gimt_performances') || '[]');
    } catch {
      return [];
    }
  })();

  if (!BACKEND_API_URL) {
    return localList;
  }

  try {
    // Try fetching from backend public endpoint
    const baseUrl = BACKEND_API_URL.replace(/\/+$/, '');
    const getEndpoint = baseUrl.endsWith('/participate') 
      ? baseUrl.replace('/participate', '/performances') 
      : `${baseUrl}/performances`;

    const response = await fetch(getEndpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const result = await response.json();
      const serverData = result.data || result.participations || result;
      if (Array.isArray(serverData) && serverData.length > 0) {
        return serverData;
      }
    }
  } catch (err) {
    console.warn('[Frontend] Could not fetch remote list, showing local records:', err.message);
  }

  return localList;
};
