"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
// Removed PublicLayout import as requested
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Coins, Package, Baby, Wallet, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Added navigate to go back

interface AdminUser {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'boy' | 'girl';
  coins: number;
  purchasedProducts: any[];
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from localStorage
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    try {
      const usersData = JSON.parse(localStorage.getItem('coinykids_users') || '{}');
      const userList: AdminUser[] = Object.values(usersData);
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user permanently?")) return;

    try {
      const usersData = JSON.parse(localStorage.getItem('coinykids_users') || '{}');
      
      // Find the email (key) for this user ID to delete from object
      const userEmail = Object.keys(usersData).find(key => usersData[key].id === userId);
      
      if (userEmail) {
          const userToDelete = usersData[userEmail];
          const newUsersData = { ...usersData };
          delete newUsersData[userEmail];
          
          // Update localStorage
          localStorage.setItem('coinykids_users', JSON.stringify(newUsersData));
          
          // Update state to remove the user from UI immediately
          setUsers(prev => prev.filter(user => user.id !== userId));
          
          // Show success toast
          toast.success(`User ${userToDelete.name} has been deleted successfully!`, {
            style: {
              background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              color: 'white',
              border: 'none',
            },
            icon: '🗑️'
          });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  return (
    // Independent Layout (No Header/Footer)
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30 font-sans">
        
        {/* --- Background --- */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[300px] w-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 pt-16 pb-20">
          
          {/* Header */}
          <div className="mb-12 flex flex-col items-center text-center relative">
            <Button 
                variant="outline" 
                className="absolute left-0 top-0 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 hidden md:flex"
                onClick={() => navigate('/')}
            >
                ← Back to Home
            </Button>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 mb-4"
            >
              Admin Dashboard
            </motion.h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              View and manage all registered users in the CoinyKids platform
            </p>
          </div>

          {/* Stats Cards with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
                { title: "Total Users", value: users.length, icon: User, color: "text-purple-400", from: "from-purple-500", to: "to-cyan-500", border: "border-purple-500/30" },
                { title: "Total Coins", value: users.reduce((sum, user) => sum + user.coins, 0), icon: Coins, color: "text-yellow-400", from: "from-yellow-400", to: "to-orange-500", border: "border-yellow-500/30" },
                { title: "Avg. Age", value: users.length > 0 ? (users.reduce((sum, user) => sum + user.age, 0) / users.length).toFixed(1) : 0, icon: Baby, color: "text-pink-400", from: "from-pink-500", to: "to-rose-500", border: "border-pink-500/30" },
                { title: "Total Items", value: users.reduce((sum, user) => sum + (user.purchasedProducts?.length || 0), 0), icon: Package, color: "text-emerald-400", from: "from-emerald-500", to: "to-green-500", border: "border-emerald-500/30" }
            ].map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className={`bg-slate-900/40 backdrop-blur-xl border ${stat.border} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${stat.from} ${stat.to} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.title}</p>
                                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
          </div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800 overflow-hidden shadow-2xl">
              <CardHeader className="border-b border-slate-800 bg-slate-900/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    Registered Users
                  </CardTitle>
                  <Button onClick={loadUsers} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    Refresh Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
                    <p className="text-slate-400">Loading users...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="p-12 text-center">
                    <User className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">No users found yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-slate-900/80">
                        <TableRow className="border-slate-800 hover:bg-transparent">
                          <TableHead className="text-slate-400 font-bold uppercase tracking-wider">Name</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-wider">Age</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-wider">Gender</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-wider">Email</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-wider">Coins</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-wider">Items</TableHead>
                          <TableHead className="text-right text-slate-400 font-bold uppercase tracking-wider pr-6">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {users.map((user) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 100, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                              transition={{ duration: 0.3 }}
                              className="border-slate-800 hover:bg-slate-800/50 transition-colors group"
                            >
                              <TableCell className="font-bold text-white py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-white/10 ${user.gender === 'boy' ? 'bg-blue-600' : 'bg-pink-600'}`}>
                                    <span className="text-sm font-bold text-white">
                                      {user.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  {user.name}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-slate-300 font-medium">{user.age} Years</span>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="secondary" 
                                  className={
                                    user.gender === 'boy' 
                                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20' 
                                      : 'bg-pink-500/10 text-pink-400 border-pink-500/20 hover:bg-pink-500/20'
                                  }
                                >
                                  {user.gender === 'boy' ? '👦 Boy' : '👧 Girl'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-slate-400 font-mono text-xs">
                                {user.email}
                              </TableCell>
                              <TableCell className="font-black text-yellow-400">
                                <div className="flex items-center gap-1.5 bg-yellow-500/5 px-2 py-1 rounded-md w-fit border border-yellow-500/10">
                                  <Coins className="w-4 h-4 fill-yellow-400" /> {user.coins}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1.5 text-slate-300">
                                  <Package className="w-4 h-4 text-slate-500" />
                                  <span className="font-bold">{user.purchasedProducts?.length || 0}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-70 group-hover:opacity-100"
                                  onClick={() => deleteUser(user.id)}
                                  title="Delete User"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </div>
  );
}