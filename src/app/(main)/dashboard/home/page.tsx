import { TeamOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

import ContainerHome from '@/components/dashboard/ContainerHome';

const HomePage = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your team efficiently</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 mb-1">
                <ClockCircleOutlined className="text-gray-600 text-lg" />
                <div className="text-2xl font-semibold text-gray-600">{formattedTime}</div>
              </div>
              <div className="flex items-center justify-end space-x-2 text-gray-500">
                <CalendarOutlined className="text-gray-600 tex-lg" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 mt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back, Admin! 👋</h2>
                <p className="text-gray-600">
                  You have <span className="font-semibold text-orange-600">3 pending requests</span> and <span className="font-semibold text-orange-600">5 new team members</span> to review today.
                </p>
              </div>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                <TeamOutlined className="text-orange-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 py-8">
        <ContainerHome />
      </div>
    </div>
  );
};

export default HomePage;