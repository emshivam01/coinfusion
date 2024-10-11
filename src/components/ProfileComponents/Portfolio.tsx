import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Portfolio = () => {
  return (
    <div className="py-1 dark:bg-[#1f2937] p-4 w-full h-[300px] ">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="text-base font-bold">
            <TableHead className="">Coin</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Value</TableHead>
            <TableHead className="text-right">Allocation</TableHead>
            <TableHead className="text-right">24h Chnage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Bitcoin</TableCell>
            <TableCell>0.5 BTC</TableCell>
            <TableCell>$12,000</TableCell>
            <TableCell className="text-center">$6,000</TableCell>
            <TableCell className="text-right">34.5%</TableCell>
            <TableCell className="text-right">2.3%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Solana</TableCell>
            <TableCell>0.5 BTC</TableCell>
            <TableCell>$12,000</TableCell>
            <TableCell className="text-center">$6,000</TableCell>
            <TableCell className="text-right">34.5%</TableCell>
            <TableCell className="text-right">2.3%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Chainlink</TableCell>
            <TableCell>0.5 BTC</TableCell>
            <TableCell>$12,000</TableCell>
            <TableCell className="text-center">$6,000</TableCell>
            <TableCell className="text-right">34.5%</TableCell>
            <TableCell className="text-right">2.3%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cardano</TableCell>
            <TableCell>0.5 BTC</TableCell>
            <TableCell>$12,000</TableCell>
            <TableCell className="text-center">$6,000</TableCell>
            <TableCell className="text-right">34.5%</TableCell>
            <TableCell className="text-right">2.3%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
