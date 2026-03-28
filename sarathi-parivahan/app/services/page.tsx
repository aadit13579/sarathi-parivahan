'use client';

import { useEffect, useState } from 'react';
import Header from "../components/Header";

interface Service {
  service_id: number;
  service_name: string;
  service_category: string;
  description: string;
  fields: Array<any>;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/services.json');
        const data: Service[] = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'Informational Services': '📋',
      'Online Services': '🌐',
      'Vehicle Services': '🚗',
      'Other Services': '⚙️'
    };
    return icons[category] || '📄';
  };

  const groupedServices = services.reduce((acc, service) => {
    const category = service.service_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <section className="mb-6 rounded-xl bg-white/90 p-6 shadow-lg shadow-black/15 backdrop-blur">
          <h2 className="mb-2 text-3xl font-bold text-[#111]">Our Services</h2>
          <p className="text-gray-600">Select a service below to apply or get more information</p>
        </section>

        {loading ? (
          <div className="rounded-xl bg-white/90 p-12 text-center shadow-lg shadow-black/15 backdrop-blur">
            <p className="text-lg font-semibold text-[#111]">Loading services...</p>
          </div>
        ) : (
          <>
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <section key={category} className="mb-8 rounded-xl bg-white/90 p-6 shadow-lg shadow-black/15 backdrop-blur">
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-3xl">{getCategoryIcon(category)}</span>
                  <h3 className="text-2xl font-semibold text-[#333]">{category}</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {categoryServices.map(service => (
                    <a
                      key={service.service_id}
                      href={`/services/${service.service_id}`}
                      className="group rounded-lg border-2 border-[#ccc] bg-gradient-to-br from-[#fafafa] to-white p-4 text-left transition-all duration-200 hover:border-[#a47f30] hover:shadow-lg hover:shadow-black/10"
                    >
                      <h4 className="mb-2 font-semibold text-[#111] group-hover:text-[#a47f30] transition">
                        {service.service_name}
                      </h4>
                      <p className="mb-3 text-xs text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#a47f30]">
                        Apply Now
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}

            {/* Summary */}
            <section className="rounded-xl bg-[#a47f30] px-6 py-8 text-center shadow-lg shadow-black/15">
              <h3 className="text-2xl font-bold text-white mb-2">
                {services.length} Services Available
              </h3>
              <p className="text-white/80">
                Start your application today. All services are available online.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}