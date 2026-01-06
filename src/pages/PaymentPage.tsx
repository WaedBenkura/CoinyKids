import { PublicLayout } from "@/layouts/PublicLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Coins,  History } from "lucide-react"
import { useParentalApproval } from "@/contexts/ParentalApprovalContext";
import { useDeviceSecurity } from "@/contexts/DeviceSecurityContext";
import { toast } from "sonner";

export default function PaymentPage() {
  const { requestParentalApproval } = useParentalApproval();
  const { checkBehavior } = useDeviceSecurity();
  
  const packages = [
    { coins: 50, price: "$4.99", color: "bg-sky-100 text-sky-600" },
    { coins: 120, price: "$9.99", color: "bg-purple-100 text-purple-600", popular: true },
    { coins: 500, price: "$39.99", color: "bg-yellow-100 text-yellow-600" },
  ]

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-black text-slate-800 text-center mb-10">Coin Bank</h1>

        {/* Buy Coins */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg, i) => (
            <Card key={i} className={`border-none shadow-lg rounded-[2.5rem] overflow-hidden relative ${pkg.popular ? 'ring-4 ring-pink-300 scale-105' : ''}`}>
              {pkg.popular && <div className="absolute top-0 inset-x-0 bg-pink-400 text-white text-center text-xs font-bold py-1">MOST POPULAR</div>}
              <CardContent className="p-8 text-center space-y-6 pt-12">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${pkg.color}`}>
                  <Coins className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-slate-800">{pkg.coins}</h3>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Coins</span>
                </div>
                <Button 
                  onClick={() => {
                    // Check device security before requesting approval
                    const isBehaviorNormal = checkBehavior(`Purchase ${pkg.coins} coins for ${pkg.price}`);
                    if (!isBehaviorNormal) {
                      toast.error("Suspicious activity detected. Action denied.");
                      return;
                    }
                    
                    // Request parental approval for purchasing coins
                    requestParentalApproval(`Purchase ${pkg.coins} coins for ${pkg.price}`, () => {
                      // Callback executed after parental approval
                      alert(`Successfully purchased ${pkg.coins} coins for ${pkg.price}!`);
                    });
                  }}
                  className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold hover:scale-105 transition-transform"
                >
                  Buy for {pkg.price}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* History */}
        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
          <div className="p-6 border-b border-slate-100 flex items-center gap-2">
            <History className="text-slate-400" />
            <h2 className="font-bold text-lg text-slate-700">Transaction History</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50">
                <TableCell className="font-medium">Bought Toy Car</TableCell>
                <TableCell className="text-slate-500">Today</TableCell>
                <TableCell className="text-right text-red-500 font-bold">- 15 🪙</TableCell>
              </TableRow>
              <TableRow className="hover:bg-slate-50">
                <TableCell className="font-medium">Quiz Reward</TableCell>
                <TableCell className="text-slate-500">Yesterday</TableCell>
                <TableCell className="text-right text-green-500 font-bold">+ 10 🪙</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </PublicLayout>
  )
}