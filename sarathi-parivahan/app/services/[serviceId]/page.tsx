'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';

interface Field {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface Service {
  service_id: number;
  service_name: string;
  service_category: string;
  description: string;
  fields: Field[];
}

interface User {
  userId: string;
  username: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;
  
  const [service, setService] = useState<Service | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Check if user is logged in
        const userJson = localStorage.getItem('user');
        if (userJson) {
          try {
            const userData = JSON.parse(userJson);
            setUser(userData);
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }

        // Fetch service
        const response = await fetch('/services.json');
        const services: Service[] = await response.json();
        const foundService = services.find(s => s.service_id === parseInt(serviceId));
        
        if (foundService) {
          setService(foundService);
          // Initialize form data with empty strings
          const initialData: Record<string, string> = {};
          foundService.fields.forEach(field => {
            initialData[field.id] = '';
          });
          setFormData(initialData);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      // Check if user is logged in
      if (!user) {
        setMessage('❌ Please login first to submit an application.');
        setSubmitting(false);
        setTimeout(() => {
          router.push('/auth');
        }, 1500);
        return;
      }

      // Validate required fields
      const missingFields = service?.fields.filter(
        field => field.required && !formData[field.id]
      );

      if (missingFields && missingFields.length > 0) {
        setMessage(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
        setSubmitting(false);
        return;
      }

      // Submit to API
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          serviceId: service?.service_id,
          serviceName: service?.service_name,
          serviceCategory: service?.service_category,
          description: service?.description,
          formData: formData
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`❌ ${data.error || 'Error submitting application'}`);
        return;
      }

      setMessage('✅ Application submitted successfully! We will contact you soon.');
      
      // Reset form
      const resetData: Record<string, string> = {};
      service?.fields.forEach(field => {
        resetData[field.id] = '';
      });
      setFormData(resetData);

      // Redirect after success
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      setMessage('❌ Error submitting application. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
          <div className="flex items-center justify-center py-20">
            <p className="text-lg font-semibold">Loading service details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
          <div className="rounded-xl bg-red-100 p-6 text-center">
            <h2 className="text-xl font-bold text-red-700 mb-2">Service Not Found</h2>
            <p className="text-red-600 mb-4">The service you're looking for doesn't exist.</p>
            <a href="/services" className="inline-block rounded-lg bg-[#a47f30] px-6 py-2 text-white font-semibold hover:opacity-90 transition">
              Back to Services
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
      <Header />

      <main className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <a href="/" className="text-[#333] hover:underline">Home</a>
          <span>/</span>
          <a href="/services" className="text-[#333] hover:underline">Services</a>
          <span>/</span>
          <span className="font-semibold text-[#111]">{service.service_name}</span>
        </div>

        {/* Service Header */}
        <div className="mb-8 rounded-xl bg-white/90 p-6 shadow-lg shadow-black/15 backdrop-blur">
          <div className="mb-4 inline-block rounded-full bg-[#f2b630] px-4 py-1 text-xs font-semibold text-[#111]">
            {service.service_category}
          </div>
          <h1 className="text-3xl font-bold text-[#111] mb-2">{service.service_name}</h1>
          <p className="text-gray-600">{service.description}</p>
          {user && (
            <p className="text-sm text-[#a47f30] font-semibold mt-4">
              📋 Submitting as: <span className="text-[#111]">{user.username}</span>
            </p>
          )}
        </div>

        {/* Form Container */}
        <div className="rounded-xl bg-white/90 p-6 shadow-lg shadow-black/15 backdrop-blur">
          <h2 className="text-2xl font-bold text-[#111] mb-6">Application Form</h2>

          {message && (
            <div className={`mb-6 rounded-lg p-4 ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {!user && (
            <div className="mb-6 rounded-lg bg-yellow-100 p-4 text-yellow-700">
              <p className="font-semibold mb-2">⚠️ Login Required</p>
              <p className="text-sm mb-3">You need to be logged in to submit this application.</p>
              <a href="/auth" className="inline-block rounded-lg bg-[#a47f30] px-4 py-2 text-white text-sm font-semibold hover:opacity-90 transition">
                Login Now
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {service.fields.map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-semibold text-[#333] mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={submitting || !user}
                    rows={4}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#111] placeholder-gray-500 focus:border-[#a47f30] focus:outline-none focus:ring-2 focus:ring-[#f2b630]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    disabled={submitting || !user}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#111] focus:border-[#a47f30] focus:outline-none focus:ring-2 focus:ring-[#f2b630]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">{field.placeholder || 'Select an option'}</option>
                    {field.options?.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    name={field.id}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={submitting || !user}
                    className="w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#111] placeholder-gray-500 focus:border-[#a47f30] focus:outline-none focus:ring-2 focus:ring-[#f2b630]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-[#ddd]">
              <button
                type="submit"
                disabled={submitting || !user}
                className="flex-1 rounded-lg bg-[#a47f30] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <a
                href="/services"
                className="flex-1 rounded-lg border-2 border-[#a47f30] bg-white px-6 py-3 font-semibold text-[#a47f30] text-center transition hover:bg-[#a47f30]/5"
              >
                Back to Services
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
