import { 
  Users, 
  Hotel, 
  CalendarDays, 
  TrendingUp, 
  DollarSign, 
  Star 
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  description: string;
  change: string;
  isPositive: boolean;
}

export default function AdminDashboard() {
  return (
    <div className="p-6 mt-15 space-y-8 bg-slate-50/50 dark:bg-neutral-900/10 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Admin Control Center
        </h1>
        <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
          Here is a quick overview of StayNest live operations and performance.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Earnings"
          value="$24,560"
          icon={DollarSign}
          description="Compared to last month"
          change="+12.5%"
          isPositive={true}
        />
        <StatCard
          title="Active Bookings"
          value="142"
          icon={CalendarDays}
          description="Live checked-in stays"
          change="+8.2%"
          isPositive={true}
        />
        <StatCard
          title="Total Registered Users"
          value="1,248"
          icon={Users}
          description="New users this week"
          change="+4.3%"
          isPositive={true}
        />
        <StatCard
          title="Active Stays / Hotels"
          value="45"
          icon={Hotel}
          description="Properties listed"
          change="-1.2%"
          isPositive={false}
        />
      </div>


      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Bookings Panel */}
        <div className="rounded-2xl border border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Bookings</h2>
            <span className="text-xs font-semibold text-green-700 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-md">Live Update</span>
          </div>
          <div className="space-y-3">
            {[
              { id: "#1024", user: "Rahman Khan", stay: "Grand Luxury Suite", status: "Paid", amount: "$320" },
              { id: "#1023", user: "Sadia Islam", stay: "Ocean View Studio", status: "Pending", amount: "$150" },
              { id: "#1022", user: "Tanvir Ahmed", stay: "Cozy Mountain Cabin", status: "Paid", amount: "$450" },
            ].map((booking, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50 text-sm">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-neutral-200">{booking.user}</p>
                  <p className="text-xs text-slate-400 dark:text-neutral-500">{booking.stay}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 dark:text-white">{booking.amount}</p>
                  <span className={`text-[10px] font-extrabold uppercase ${booking.status === 'Paid' ? 'text-green-600' : 'text-amber-500'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Overview Panel */}
        <div className="rounded-2xl border border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Platform Health & Reviews</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 dark:border-neutral-900 pb-3">
              <span className="text-sm text-slate-500 dark:text-neutral-400">Average Rating</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star size={16} fill="currentColor" /> 4.8 / 5.0
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 dark:border-neutral-900 pb-3">
              <span className="text-sm text-slate-500 dark:text-neutral-400">Server Status</span>
              <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-neutral-400">API Latency</span>
              <span className="text-xs font-mono text-slate-600 dark:text-neutral-400">124ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, description, change, isPositive }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
          {title}
        </span>
        <div className="rounded-xl bg-slate-50 dark:bg-neutral-900 p-2.5 text-slate-600 dark:text-neutral-400">
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <span className={`font-bold ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {change}
          </span>
          <span className="text-slate-400 dark:text-neutral-500">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}