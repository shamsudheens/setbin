"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  TrendingUp, 
  History,
  ArrowRight,
  TrendingDown,
  Activity,
  FileText,
  UserCheck,
  Zap,
  ShieldCheck,
  MousePointer2,
  Package,
  Users,
  Briefcase,
  UserPlus,
  Store,
  PieChart,
  BarChart3,
  Search,
  Plus,
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// --- COMPACT VIEW COMPONENTS ---

const FeatureCard = ({ title, value, detail, colorClass, icon: Icon }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -10 }}
    className="p-4 rounded-[2rem] bg-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-3xl w-56 lg:w-64"
  >
    <div className="flex items-center gap-2 mb-2">
        {Icon && <div className={`p-1.5 rounded-lg bg-white/5 ${colorClass}`}><Icon size={12} /></div>}
        <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{title}</div>
    </div>
    <div className="text-xl lg:text-2xl font-bold text-white mb-0.5">{value}</div>
    <div className={`text-[9px] font-bold flex items-center gap-1.5 ${colorClass}`}>
       {detail}
    </div>
  </motion.div>
);

const RulesListCard = ({ title, items }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="p-5 rounded-[2rem] bg-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-3xl w-60 lg:w-64"
  >
    <div className="text-[9px] font-bold text-[var(--color-glow-cyan)] uppercase tracking-widest mb-3">{title}</div>
    <div className="space-y-2">
       {items.map((item: any, i: number) => (
         <div key={i} className="flex items-center justify-between text-[9px] text-white/50">
           <span className="flex items-center gap-2 truncate pr-2"><div className="w-1 h-1 rounded-full bg-[var(--color-glow-blue)] shrink-0" /> {item.label}</span>
           <span className="font-mono text-[var(--color-glow-cyan)] shrink-0">{item.val}</span>
         </div>
       ))}
    </div>
  </motion.div>
);

// --- DASHBOARD SUB-VIEWS (COMPACT) ---

const OverviewView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-3 gap-4">
       {[
         { l: 'REVENUE', v: '₹4.2M', c: 'text-[var(--color-glow-cyan)]' },
         { l: 'EXPENSES', v: '₹1.8M', c: 'text-red-400' },
         { l: 'PROFIT', v: '₹2.4M', c: 'text-green-400' }
       ].map((it, i) => (
         <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="text-[8px] font-bold text-white/20 uppercase mb-1">{it.l}</div>
            <div className={`text-base font-bold ${it.c}`}>{it.v}</div>
         </div>
       ))}
    </div>
    <div className="space-y-2">
       {[1,2,3].map(i => (
         <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-[var(--color-glow-blue)]"><Activity size={10}/></div>
               <div className="text-[10px] text-white/70">New Job Received: iPhone 14 Pro</div>
            </div>
            <div className="text-[8px] font-mono text-white/20">2m ago</div>
         </div>
       ))}
    </div>
  </div>
);

const DayBookView = () => (
  <div className="space-y-6">
     <div className="flex gap-3">
        <div className="flex-1 p-3 rounded-xl bg-[var(--color-glow-cyan)]/5 border border-[var(--color-glow-cyan)]/10">
           <div className="text-[8px] text-white/30 font-bold uppercase mb-0.5">Cash In</div>
           <div className="text-base font-bold text-[var(--color-glow-cyan)]">+₹12.5K</div>
        </div>
        <div className="flex-1 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
           <div className="text-[8px] text-white/30 font-bold uppercase mb-0.5">Cash Out</div>
           <div className="text-base font-bold text-red-400">-₹4.2K</div>
        </div>
     </div>
     <div className="bg-white/[0.01] rounded-xl border border-white/5">
        {[
          { t: "UPI: Repair #42", v: "+₹1.2K" },
          { t: "CASH: Parts Purchase", v: "-₹0.8K" },
          { t: "UPI: Display Fix", v: "+₹3.5K" }
        ].map((tx, i) => (
          <div key={i} className="px-5 py-3 flex justify-between border-b border-white/5 last:border-0">
             <div className="text-[10px] text-white/60">{tx.t}</div>
             <div className={`text-[10px] font-bold ${tx.v.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{tx.v}</div>
          </div>
        ))}
     </div>
  </div>
);

const JobsView = () => (
  <div className="space-y-6">
     <table className="w-full text-left">
        <thead>
           <tr className="bg-white/[0.03] text-[8px] text-white/30 uppercase font-bold border-b border-white/5">
              <th className="px-5 py-3">ID</th>
              <th className="px-5 py-3">DEVICE</th>
              <th className="px-5 py-3">STATUS</th>
           </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-[10px]">
           {[
             { id: "4281", dev: "iPhone 13", stat: "REPAIRING", col: "text-blue-400" },
             { id: "4282", dev: "MacBook Air", stat: "RECEIVED", col: "text-[var(--color-glow-cyan)]" },
             { id: "4283", dev: "S23 Ultra", stat: "READY", col: "text-green-400" },
             { id: "4284", dev: "MOTO Edge", stat: "WAITING", col: "text-white/40" }
           ].map((j, i) => (
             <tr key={i} className="hover:bg-white/[0.01]">
                <td className="px-5 py-3 font-mono text-white/30">{j.id}</td>
                <td className="px-5 py-3 text-white/80 font-bold">{j.dev}</td>
                <td className={`px-5 py-3 font-bold ${j.col}`}>{j.stat}</td>
             </tr>
           ))}
        </tbody>
     </table>
  </div>
);

const AnalyticsView = () => (
  <div className="space-y-6 h-full flex flex-col">
     <div className="flex-1 min-h-[160px] relative">
        <svg className="w-full h-full" viewBox="0 0 400 150">
           <motion.path 
             d="M0 120 Q50 90 100 100 T200 60 T300 90 T400 30" 
             fill="none" 
             stroke="var(--color-glow-cyan)" 
             strokeWidth="3"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.5 }}
           />
           <motion.path 
             d="M0 120 Q50 90 100 100 T200 60 T300 90 T400 30 V150 H0 Z" 
             fill="url(#grad2)" 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.1 }}
           />
           <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="var(--color-glow-cyan)" />
                 <stop offset="100%" stopColor="transparent" />
              </linearGradient>
           </defs>
        </svg>
     </div>
     <div className="grid grid-cols-4 gap-2">
        {[
          { l: 'USERS', v: '24%' },
          { l: 'SLA', v: '98%' },
          { l: 'GMV', v: '₹4M' },
          { l: 'CHURN', v: '1%' }
        ].map((it, i) => (
           <div key={i} className="text-center p-2 rounded bg-white/[0.01]">
              <div className="text-xs font-bold text-white mb-0.5">{it.v}</div>
              <div className="text-[7px] text-white/30 font-bold uppercase tracking-widest">{it.l}</div>
           </div>
        ))}
     </div>
  </div>
);


const BillingView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-3 gap-4">
       {[
         { l: 'TOTAL BILLED', v: '₹1.2M', c: 'text-[var(--color-glow-cyan)]' },
         { l: 'INVOICES', v: '142', c: 'text-white' },
         { l: 'PENDING', v: '₹45K', c: 'text-orange-400' }
       ].map((it, i) => (
         <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="text-[8px] font-bold text-white/20 uppercase mb-1">{it.l}</div>
            <div className={`text-base font-bold ${it.c}`}>{it.v}</div>
         </div>
       ))}
    </div>
    <div className="bg-white/[0.01] rounded-xl border border-white/5">
        {[
          { id: "INV-2024-001", client: "TechCorp Ltd.", amt: "₹12,400", stat: "PAID", col: "text-green-400" },
          { id: "INV-2024-002", client: "Rahul Sharma", amt: "₹4,500", stat: "PENDING", col: "text-orange-400" },
          { id: "INV-2024-003", client: "Priya Singh", amt: "₹8,900", stat: "PAID", col: "text-green-400" }
        ].map((inv, i) => (
          <div key={i} className="px-5 py-3 flex justify-between border-b border-white/5 last:border-0">
             <div>
               <div className="text-[10px] font-mono text-white/40">{inv.id}</div>
               <div className="text-xs text-white/80 font-bold">{inv.client}</div>
             </div>
             <div className="text-right">
               <div className="text-xs font-bold text-white">{inv.amt}</div>
               <div className={`text-[8px] font-bold ${inv.col}`}>{inv.stat}</div>
             </div>
          </div>
        ))}
    </div>
  </div>
);

const ExpensesView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
       {[
         { l: 'MONTHLY OPEX', v: '₹12.4K', c: 'text-red-400' },
         { l: 'YEAR TO DATE', v: '₹145K', c: 'text-orange-400' }
       ].map((it, i) => (
         <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="text-[8px] font-bold text-white/20 uppercase mb-1">{it.l}</div>
            <div className={`text-base font-bold ${it.c}`}>{it.v}</div>
         </div>
       ))}
    </div>
    <div className="space-y-2">
       {[
         { cat: "Parts Purchase", date: "Today, 10:30 AM", amt: "₹4,200" },
         { cat: "Office Rent", date: "Yesterday", amt: "₹15,000" },
         { cat: "Electricity Bill", date: "Oct 12", amt: "₹3,400" }
       ].map((exp, i) => (
         <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-red-400/10 flex items-center justify-center text-red-400"><TrendingDown size={14}/></div>
               <div>
                 <div className="text-xs text-white/80 font-bold">{exp.cat}</div>
                 <div className="text-[9px] text-white/40">{exp.date}</div>
               </div>
            </div>
            <div className="text-sm font-bold text-red-400">-{exp.amt}</div>
         </div>
       ))}
    </div>
  </div>
);

const DuesView = () => (
  <div className="space-y-6">
    <div className="flex gap-3">
       <div className="flex-1 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
          <div className="text-[8px] text-white/30 font-bold uppercase mb-0.5">Total Receivables</div>
          <div className="text-xl font-bold text-orange-400">₹85.0K</div>
       </div>
    </div>
    <table className="w-full text-left bg-white/[0.01] rounded-xl border border-white/5 overflow-hidden block">
       <thead className="w-full table table-fixed">
          <tr className="text-[8px] text-white/30 uppercase font-bold border-b border-white/5">
             <th className="px-5 py-3">CUSTOMER</th>
             <th className="px-5 py-3">DUE DATE</th>
             <th className="px-5 py-3">AMOUNT</th>
          </tr>
       </thead>
       <tbody className="divide-y divide-white/5 text-[10px] w-full table table-fixed">
          {[
            { name: "Global Traders", date: "Overdue 5 days", amt: "₹24,500", col: "text-red-400" },
            { name: "Anita Desai", date: "Tomorrow", amt: "₹3,200", col: "text-orange-400" },
            { name: "Metro Mobiles", date: "In 3 days", amt: "₹18,000", col: "text-white/60" }
          ].map((d, i) => (
            <tr key={i} className="hover:bg-white/[0.02]">
               <td className="px-5 py-3 text-white/80 font-bold">{d.name}</td>
               <td className={`px-5 py-3 font-mono ${d.col}`}>{d.date}</td>
               <td className="px-5 py-3 font-bold text-white">{d.amt}</td>
            </tr>
          ))}
       </tbody>
    </table>
  </div>
);

const InventoryView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
       {[
         { l: 'TOTAL SKUS', v: '450', c: 'text-blue-400' },
         { l: 'LOW STOCK', v: '12 Items', c: 'text-orange-400' }
       ].map((it, i) => (
         <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="text-[8px] font-bold text-white/20 uppercase mb-1">{it.l}</div>
            <div className={`text-base font-bold ${it.c}`}>{it.v}</div>
         </div>
       ))}
    </div>
    <div className="space-y-2">
       {[
         { item: "iPhone 13 Display OLED", stock: "4 left", status: "LOW", col: "text-orange-400" },
         { item: "Samsung S22 Battery", stock: "24 in stock", status: "OK", col: "text-green-400" },
         { item: "Type-C Charging Port", stock: "0 left", status: "OUT", col: "text-red-400" }
       ].map((inv, i) => (
         <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-lg bg-[var(--color-glow-blue)]/10 flex items-center justify-center text-[var(--color-glow-cyan)]"><Package size={12}/></div>
               <div className="text-xs text-white/80 font-bold">{inv.item}</div>
            </div>
            <div className="text-right">
               <div className="text-xs font-bold text-white">{inv.stock}</div>
               <div className={`text-[8px] font-bold ${inv.col}`}>{inv.status}</div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const StaffView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-3 gap-3">
       {[
         { l: 'TOTAL', v: '12', c: 'text-white' },
         { l: 'ACTIVE', v: '8', c: 'text-green-400' },
         { l: 'ON LEAVE', v: '1', c: 'text-orange-400' }
       ].map((it, i) => (
         <div key={i} className="p-2 rounded-lg bg-white/[0.01] border border-white/5 text-center">
            <div className="text-[8px] font-bold text-white/20 uppercase mb-1">{it.l}</div>
            <div className={`text-lg font-bold ${it.c}`}>{it.v}</div>
         </div>
       ))}
    </div>
    <div className="bg-white/[0.01] rounded-xl border border-white/5">
       {[
         { name: "Arun Kumar", role: "Senior Technician", jobs: "4 assigned", status: "Active", dot: "bg-green-400" },
         { name: "Meera Reddy", role: "Front Desk", jobs: "Shift: Morning", status: "Active", dot: "bg-green-400" },
         { name: "Karthik Nair", role: "Junior Tech", jobs: "0 assigned", status: "On Leave", dot: "bg-orange-400" }
       ].map((staff, i) => (
         <div key={i} className="px-5 py-3 flex items-center justify-between border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40"><Users size={14}/></div>
               <div>
                  <div className="text-xs text-white/90 font-bold">{staff.name}</div>
                  <div className="text-[9px] text-white/40">{staff.role}</div>
               </div>
            </div>
            <div className="text-right flex flex-col items-end">
               <div className="text-[10px] text-white/60 mb-1">{staff.jobs}</div>
               <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${staff.dot}`} />
                  <div className="text-[8px] text-white/30 uppercase">{staff.status}</div>
               </div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const CustomersView = () => (
  <div className="space-y-6">
    <div className="flex gap-3">
       <div className="flex-1 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <div className="text-[8px] text-white/30 font-bold uppercase mb-0.5">Total Customers</div>
          <div className="text-xl font-bold text-blue-400">1,248</div>
       </div>
       <div className="flex-1 p-3 rounded-xl bg-green-500/5 border border-green-500/10">
          <div className="text-[8px] text-white/30 font-bold uppercase mb-0.5">New This Month</div>
          <div className="text-xl font-bold text-green-400">+42</div>
       </div>
    </div>
    <div className="space-y-2">
       {[
         { name: "Vikram Singh", phone: "+91 98765 43210", visits: "4 visits", ltv: "₹18K" },
         { name: "Sarah Thomas", phone: "+91 99887 76655", visits: "1 visit", ltv: "₹3.2K" },
         { name: "Rajesh Gupta", phone: "+91 88776 65544", visits: "12 visits", ltv: "₹45K" }
       ].map((c, i) => (
         <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-[var(--color-glow-cyan)]/10 flex items-center justify-center text-[var(--color-glow-cyan)] font-bold text-xs">{c.name.charAt(0)}</div>
               <div>
                  <div className="text-xs text-white/90 font-bold">{c.name}</div>
                  <div className="text-[9px] font-mono text-white/40">{c.phone}</div>
               </div>
            </div>
            <div className="text-right">
               <div className="text-[10px] text-white/50">{c.visits}</div>
               <div className="text-xs font-bold text-white">{c.ltv}</div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const VendorsView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
       {[
         { l: 'ACTIVE VENDORS', v: '14', c: 'text-[var(--color-glow-cyan)]' },
         { l: 'OPEN POs', v: '3', c: 'text-orange-400' }
       ].map((it, i) => (
         <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/5">
            <div className="text-[8px] font-bold text-white/20 uppercase mb-1">{it.l}</div>
            <div className={`text-base font-bold ${it.c}`}>{it.v}</div>
         </div>
       ))}
    </div>
    <div className="bg-white/[0.01] rounded-xl border border-white/5">
       {[
         { name: "TechParts India", type: "OEM Components", status: "Delivery Today", col: "text-green-400" },
         { name: "Mobile Accessories Co", type: "Cases & Covers", status: "Order Placed", col: "text-blue-400" },
         { name: "City Distributors", type: "Tools & Equip", status: "Pending Payment", col: "text-orange-400" }
       ].map((v, i) => (
         <div key={i} className="px-5 py-3 flex justify-between items-center border-b border-white/5 last:border-0">
            <div className="flex items-center gap-3">
               <div className="p-1.5 rounded bg-white/5"><Store size={14} className="text-white/60"/></div>
               <div>
                 <div className="text-xs text-white/90 font-bold">{v.name}</div>
                 <div className="text-[9px] text-white/40">{v.type}</div>
               </div>
            </div>
            <div className={`text-[8px] font-bold uppercase ${v.col}`}>{v.status}</div>
         </div>
       ))}
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function ServiceProSection() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const cycleTime = 5000;
  const step = 50;

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: LayoutDashboard },
    { id: "daybook", label: "DAYBOOK", icon: BookOpen },
    { id: "jobs", label: "SERVICES", icon: Briefcase },
    { id: "billing", label: "BILLING", icon: CreditCard },
    { id: "expenses", label: "EXPENSES", icon: PieChart },
    { id: "dues", label: "DUES", icon: TrendingDown },
    { id: "inventory", label: "INVENTORY", icon: Package },
    { id: "staff", label: "STAFF", icon: Users },
    { id: "customers", label: "CUSTOMERS", icon: UserPlus },
    { id: "vendors", label: "VENDORS", icon: Store },
    { id: "reports", label: "REPORTS", icon: BarChart3 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
            // Logic handled in separate effect for precision
            return 100;
        }
        return p + (step / (cycleTime)) * 100;
      });
    }, step);
    return () => clearInterval(timer);
  }, []);

  // Precise State Switcher
  useEffect(() => {
      if (progress >= 100) {
          const timer = setTimeout(() => {
              setActiveIdx((prev) => (prev + 1) % tabs.length);
              setProgress(0);
          }, 300); // Small buffer for clean swap
          return () => clearTimeout(timer);
      }
  }, [progress, tabs.length]);

  const handleTabManual = (idx: number) => {
      setActiveIdx(idx);
      setProgress(0);
  };

  // DASHBOARD VIEWS MAP - ENSURE EVERY INDEX HAS UNIQUE VISUAL CUE
  const dashboardViews: any = {
    0: <OverviewView />,
    1: <DayBookView />,
    2: <JobsView />,
    3: <BillingView />,
    4: <ExpensesView />,
    5: <DuesView />,
    6: <InventoryView />,
    7: <StaffView />,
    8: <CustomersView />,
    9: <VendorsView />,
    10: <AnalyticsView />
  };

  const cardsMap: any = {
    0: {
      tl: { title: "DAILY REVENUE", value: "₹24,800", detail: "+15% VS LAST WEEK", icon: TrendingUp, colorClass: "text-green-400" },
      bl: { title: "PENDING JOBS", value: "12", detail: "4 URGENT", icon: Activity, colorClass: "text-[var(--color-glow-cyan)]" },
      mr: { items: [ { label: 'NEW_USERS', val: '8' }, { label: 'SLA_STATUS', val: 'OK' } ], title: 'STAT_NODE_01' }
    },
    1: {
      tl: { title: "CASH FLOW", value: "₹84,200", detail: "LAST SYNC 2S", icon: CreditCard, colorClass: "text-blue-400" },
      bl: { title: "TRANSACTIONS", value: "42", detail: "UPI DOMINANT", icon: Zap, colorClass: "text-[var(--color-glow-cyan)]" },
      mr: { items: [ { label: 'BAL_HAND', val: '₹12K' }, { label: 'UPI_BAL', val: '₹72K' } ], title: 'STAT_NODE_02' }
    },
    2: {
        tl: { title: "AVG REPAIR", value: "45M", detail: "-5M FROM TARGET", icon: Activity, colorClass: "text-[var(--color-glow-cyan)]" },
        bl: { title: "READY JOBS", value: "8", detail: "WAITING DELIVERY", icon: UserCheck, colorClass: "text-green-400" },
        mr: { items: [ { label: 'PARTS_USED', val: '24' }, { label: 'TECH_LD', val: 'LOW' } ], title: 'STAT_NODE_03' }
    },
    3: {
        tl: { title: "OUTSTANDING", value: "₹45.2K", detail: "5 CUSTOMERS", icon: TrendingDown, colorClass: "text-red-400" },
        bl: { title: "INV_MATCH", value: "100%", detail: "GST VERIFIED", icon: ShieldCheck, colorClass: "text-blue-400" },
        mr: { items: [ { label: 'DUE_DAYS', val: '2' }, { label: 'LATE_FEES', val: 'OFF' } ], title: 'STAT_NODE_04' }
    },
    4: {
        tl: { title: "EXP_TOTAL", value: "₹12.4K", detail: "MONTHLY OPEX", icon: PieChart, colorClass: "text-red-400" },
        bl: { title: "RENT_PAID", value: "YES", detail: "DUE IN 28D", icon: Store, colorClass: "text-[var(--color-glow-cyan)]" },
        mr: { items: [ { label: 'TAX_EXP', val: '₹2K' }, { label: 'STAFF_EXP', val: '₹8K' } ], title: 'STAT_NODE_05' }
    },
    5: {
        tl: { title: "RECEIVABLES", value: "₹85.0K", detail: "4 PENDING", icon: TrendingDown, colorClass: "text-red-400" },
        bl: { title: "PAYABLES", value: "₹12.0K", detail: "DUE IN 3D", icon: ExternalLink, colorClass: "text-blue-400" },
        mr: { items: [ { label: 'DEBT_RATIO', val: '0.2' }, { label: 'SPEED', val: 'HIGH' } ], title: 'STAT_NODE_06' }
    },
    6: {
        tl: { title: "STOCK_VAL", value: "₹12.4M", detail: "450 SKUS", icon: Package, colorClass: "text-blue-400" },
        bl: { title: "LOW_STOCK", value: "4", detail: "ALERT_ACTIVE", icon: AlertTriangle, colorClass: "text-orange-400" },
        mr: { items: [ { label: 'TURNOVER', val: '4x' }, { label: 'DEADSTRK', val: '2%' } ], title: 'STAT_NODE_07' }
    },
    7: {
        tl: { title: "EFFICIENCY", value: "94%", detail: "TEAM AVG", icon: Zap, colorClass: "text-[var(--color-glow-cyan)]" },
        bl: { title: "ACTIVE_STAFF", value: "8", detail: "4 ON BENCH", icon: Users, colorClass: "text-blue-400" },
        mr: { items: [ { label: 'OT_HRS', val: '14' }, { label: 'RATING', val: '4.9' } ], title: 'STAT_NODE_08' }
    },
    8: {
        tl: { title: "CUSTOMERS", value: "1.2K", detail: "RECURRING", icon: UserPlus, colorClass: "text-green-400" },
        bl: { title: "AVG_LTV", value: "₹4.5K", detail: "UP 5%", icon: TrendingUp, colorClass: "text-blue-400" },
        mr: { items: [ { label: 'CLV', val: '₹12K' }, { label: 'BRND_SCR', val: '92' } ], title: 'STAT_NODE_09' }
    },
    9: {
        tl: { title: "VENDORS", value: "14", detail: "3 ACTIVE PO", icon: Store, colorClass: "text-blue-400" },
        bl: { title: "LEAD_TIME", value: "24H", detail: "TOP TIER", icon: Activity, colorClass: "text-[var(--color-glow-cyan)]" },
        mr: { items: [ { label: 'PO_VAL', val: '1.2L' }, { label: 'CREDIT', val: '5L' } ], title: 'STAT_NODE_10' }
    },
    10: {
        tl: { title: "ANALYTICS", value: "SYNC", detail: "REAL-TIME", icon: BarChart3, colorClass: "text-[var(--color-glow-cyan)]" },
        bl: { title: "Uptime", value: "99.9%", detail: "GLOBAL_CLUSTER", icon: ShieldCheck, colorClass: "text-green-400" },
        mr: { items: [ { label: 'X_SCALE', val: '4.2x' }, { label: 'SYNC_L', val: '2MS' } ], title: 'STAT_NODE_11' }
    }
  };

  const currentCards = cardsMap[activeIdx] || cardsMap[0];

  return (
    <section id="setbin-repair" className="py-12 md:py-20 bg-transparent relative overflow-hidden scroll-mt-20 px-6">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 -translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* COMPACT HEADER */}
        <div className="text-center w-full max-w-4xl mx-auto mb-16 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase"
           >
             <Briefcase size={14} className="animate-pulse" />
             {t('pro.showcase.subheading')}
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight text-white/90 leading-[1.1]"
           >
             One System for Your <br/> Entire Service Business
           </motion.h2>
        </div>

        {/* CONNECTED STEPPER (COMPACT) */}
        <div className="relative max-w-5xl mx-auto mb-12 px-2 overflow-x-auto no-scrollbar pb-8">
           <div className="absolute top-[1.25rem] left-8 right-8 h-[1px] bg-white/5 hidden md:block" />
           <div className="relative flex justify-between items-center min-w-[900px] lg:min-w-0 px-4">
             {tabs.map((tab, idx) => {
               const Icon = tab.icon;
               const isActive = activeIdx === idx;
               const isPassed = idx < activeIdx;

               return (
                 <div key={tab.id} className="relative z-10 flex flex-col items-center flex-1">
                    <button 
                      onClick={() => handleTabManual(idx)}
                      className={`
                        w-10 h-10 rounded-[1rem] flex items-center justify-center transition-all duration-500 border
                        ${isActive 
                           ? "bg-[var(--color-glow-blue)] text-white border-[var(--color-glow-cyan)] shadow-[0_0_20px_rgba(47,128,237,0.4)]" 
                           : isPassed 
                             ? "bg-[#030816] text-[var(--color-glow-cyan)] border-[var(--color-glow-blue)]/50" 
                             : "bg-[#030816] text-white/20 border-white/5"
                        }
                      `}
                    >
                      <Icon size={16} />
                    </button>
                    <span className={`mt-3 text-[7px] font-bold tracking-[0.1em] uppercase transition-colors leading-tight ${isActive ? "text-white" : "text-white/20"}`}>
                       {(tab.label)}
                    </span>

                    {/* Progress Segment */}
                    {idx < tabs.length - 1 && (
                      <div className="absolute left-[50%] top-[1.25rem] h-[1px] bg-white/5 w-full hidden md:block z-[-1]">
                         {isActive && (
                           <motion.div 
                             className="h-full bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                             initial={{ width: "0%" }}
                             animate={{ width: `${progress}%` }}
                           />
                         )}
                         {isPassed && <div className="h-full w-full bg-[var(--color-glow-blue)]/30" />}
                      </div>
                    )}
                 </div>
               );
             })}
           </div>
        </div>

        {/* COMPACT SHOWCASE HUB */}
        <div className="relative max-w-4xl mx-auto min-h-[450px]">
           {/* FLOATING CARDS (SMALLER/REPOSITIONED) */}
           <div className="absolute -left-16 lg:-left-32 top-10 z-30 hidden lg:block scale-90">
              <AnimatePresence mode="wait">
                 <FeatureCard key={activeIdx} {...currentCards.tl} />
              </AnimatePresence>
           </div>
           <div className="absolute -left-16 lg:-left-24 bottom-10 z-30 hidden lg:block scale-90">
              <AnimatePresence mode="wait">
                 <FeatureCard key={activeIdx} {...currentCards.bl} />
              </AnimatePresence>
           </div>
           <div className="absolute -right-16 lg:-right-32 top-1/2 -translate-y-1/2 z-30 hidden lg:block scale-90">
              <AnimatePresence mode="wait">
                 <RulesListCard key={activeIdx} {...currentCards.mr} />
              </AnimatePresence>
           </div>

           {/* MAIN DASHBOARD (FIXED COMPACT HEIGHT) */}
           <motion.div className="relative rounded-[2.5rem] border border-white/10 bg-[#030816]/95 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden h-[420px] lg:h-[480px] flex flex-col">
              {/* Window Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                 <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-glow-cyan)]/20" />
                 </div>
                 <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-cyan)] animate-pulse shadow-[0_0_8px_var(--color-glow-cyan)]" />
                    <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase">SETBIN REPAIR // {tabs[activeIdx].id}</span>
                 </div>
              </div>

              <div className="flex-1 p-8 lg:p-12 overflow-hidden relative">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeIdx}
                     initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                     animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                     exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                     className="h-full"
                   >
                     {dashboardViews[activeIdx]}
                   </motion.div>
                 </AnimatePresence>
              </div>

              {/* Status Bar */}
              <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className="flex gap-1">
                       {tabs.map((_, i) => (
                         <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${i === activeIdx ? 'w-6 bg-[var(--color-glow-cyan)]' : 'w-1.5 bg-white/5'}`} />
                       ))}
                    </div>
                 </div>
                 <div className="text-[8px] font-mono text-white/10 flex items-center gap-4">
                    <History size={10} /> <span>AUTO_NAV_ACTIVE</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded">MOD_0{activeIdx+1}</span>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* COMPACT CTA */}
        <div className="mt-16 text-center">
            <button className="px-12 py-5 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] text-white rounded-[1.5rem] font-bold shadow-[0_20px_50px_rgba(47,128,237,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto group text-sm">
               Start Your Automation
               <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
            </button>
        </div>
      </div>
    </section>
  );
}
