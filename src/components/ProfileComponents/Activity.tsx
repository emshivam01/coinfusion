import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Activity = () => {
  return (
    <div className="py-1 dark:bg-[#1f2937] p-4 w-full  ">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="text-base font-bold">
            <TableHead className="">Type</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Value</TableHead>
            <TableHead className="text-right ">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Buy</TableCell>
            <TableCell>Bitcoin</TableCell>
            <TableCell>0.5 BTC</TableCell>
            <TableCell>$12,000</TableCell>
            <TableCell>Success</TableCell>
            <TableCell className="text-center">$6,000</TableCell>
            <TableCell className="text-right">27-10-22</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Buy</TableCell>
            <TableCell>Chainlink</TableCell>
            <TableCell>0.5 LINK</TableCell>
            <TableCell>$12</TableCell>
            <TableCell>Success</TableCell>
            <TableCell className="text-center">$6</TableCell>
            <TableCell className="text-right">22-10-22</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Buy</TableCell>
            <TableCell>Solana</TableCell>
            <TableCell>0.5 Sol</TableCell>
            <TableCell>$120</TableCell>
            <TableCell>Success</TableCell>
            <TableCell className="text-center">$60</TableCell>
            <TableCell className="text-right">12-8-22</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Buy</TableCell>
            <TableCell>Doge</TableCell>
            <TableCell>0.5 Doge</TableCell>
            <TableCell>$1</TableCell>
            <TableCell>Success</TableCell>
            <TableCell className="text-center">$0.5</TableCell>
            <TableCell className="text-right">12-8-22</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
