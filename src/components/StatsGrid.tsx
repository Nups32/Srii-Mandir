import { Briefcase, Globe, Star, Users } from "lucide-react";

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

export default function StatsGrid() {
    const stats: StatCard[] = [
    {
      icon: <Users className="w-12 h-12 text-white" />,
      title: "30M+ Devotees",
      value: "30M+",
      description: "Trusted by over 30 Million devotees worldwide",
    },
    {
      icon: <Star className="w-12 h-12 text-white" />,
      title: "4.4 star rating",
      value: "4.4",
      description: "Average rating from 1 Million+ reviews on Play Store",
    },
    {
      icon: <Globe className="w-12 h-12 text-white" />,
      title: "35+ Countries",
      value: "35+",
      description:
        "We help devotees globally perform pujas and rituals in India",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-white" />,
      title: "33K+ Services",
      value: "33K+",
      description:
        "Millions of devotees trust our personalized puja services every year",
    },
  ];
  return (
    <>
      {/* blue div */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <p className="text-blue-300 text-sm uppercase tracking-wider mb-3">
              Trusted by Over 30 Million Devotees
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              India's Largest Devotional Platform
            </h2>
            <p className="text-blue-200 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              We are committed to booking the most trusted destination that
              offers the devotional rituals of millions of devotees to our
              platform bringing religious and traditional beliefs together
              across the world.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-opacity-5 backdrop-blur-sm hover:bg-opacity-10 transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-700 bg-opacity-40 backdrop-blur-sm">
                    {stat.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {stat.title}
                </h3>

                {/* Description */}
                <p className="text-blue-200 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
