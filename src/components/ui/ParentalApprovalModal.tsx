import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock } from "lucide-react";

interface ParentalApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: string;
  onApprove: (pin?: string) => void;
  onCancel: () => void;
}

export function ParentalApprovalModal({ 
  open, 
  onOpenChange, 
  action, 
  onApprove, 
  onCancel 
}: ParentalApprovalModalProps) {
  const [pin, setPin] = useState("");

  const handleApprove = () => {
    onApprove(pin);
    setPin("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-sm rounded-2xl">
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <motion.div 
            className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </motion.div>
          <DialogHeader className="text-center space-y-1">
            <DialogTitle className="text-xl font-bold">Parent Permission Required</DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              Action: {action}
            </DialogDescription>
          </DialogHeader>
          
          <div className="w-full max-w-[200px] py-4">
            <Label className="sr-only">Parent PIN</Label>
            <div className="relative">
              <Input 
                type="password" 
                placeholder="• • • •" 
                className="bg-slate-950 border-slate-600 text-center text-2xl tracking-[0.5em] h-14 rounded-xl focus-visible:ring-blue-500 font-mono"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex gap-3 w-full pt-2">
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1 border-slate-700 hover:bg-slate-800 text-slate-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApprove} 
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}