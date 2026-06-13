interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Props {
  service: Service;
  onBookNow: (service: Service) => void;
}

export default function ServiceCard({ service, onBookNow }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
          {service.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {service.description}
        </p>

        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {service.price}
          </span>

          <button
            onClick={() => onBookNow(service)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}