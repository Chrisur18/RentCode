import { Link } from 'react-router-dom';
import { Users, Settings, Fuel, Briefcase } from 'lucide-react';
import type { Vehicle } from '@/types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const imageUrl = vehicle.image_url ?? '';

  return (
    <Link
      to={`/auto/${vehicle.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-charcoal-100 shadow-sm hover:shadow-xl transition-all duration-300 focus-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
        <img
          src={imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-charcoal-700">
            {vehicle.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-charcoal-900">
            {vehicle.brand} {vehicle.model}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
          <Spec icon={<Users className="h-4 w-4" />} label={`${vehicle.seats} posti`} />
          <Spec icon={<Settings className="h-4 w-4" />} label={vehicle.transmission} />
          <Spec icon={<Fuel className="h-4 w-4" />} label={vehicle.fuel} />
          <Spec icon={<Briefcase className="h-4 w-4" />} label={`${vehicle.luggage} bagagli`} />
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-charcoal-100">
          <div>
            <span className="block text-xs text-charcoal-400">A partire da</span>
            <span className="text-2xl font-bold text-charcoal-900">
              €{vehicle.price_per_day}
              <span className="text-sm font-normal text-charcoal-400"> / giorno</span>
            </span>
          </div>
          <span className="inline-flex items-center text-sm font-semibold text-accent-600 group-hover:text-accent-700 transition-colors">
            Scopri l'auto
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-charcoal-600">
      <span className="text-charcoal-400">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
