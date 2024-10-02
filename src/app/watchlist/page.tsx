import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CoinList = () => {


 


  return (
    <div className=" p-8">
      <Table>
        <TableCaption>Your watchlist.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S. No.</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>1h %</TableHead>
            <TableHead>24h %</TableHead>
            <TableHead>7d %</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Volume(24h)</TableHead>
            <TableHead className="text-right">Cirrculating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1.</TableCell>
            <TableCell>Bitcoin</TableCell>
            <TableCell>$73,000</TableCell>
            <TableCell>0.22%</TableCell>
            <TableCell>2.10%</TableCell>
            <TableCell>10.01%</TableCell>
            <TableCell>$1,257,869,744,952</TableCell>
            <TableCell>$31,783,887,061</TableCell>
            <TableCell className="text-right">19,761,350 BTC</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">1.</TableCell>
            <TableCell>Bitcoin</TableCell>
            <TableCell>$73,000</TableCell>
            <TableCell>0.22%</TableCell>
            <TableCell>2.10%</TableCell>
            <TableCell>10.01%</TableCell>
            <TableCell>$1,257,869,744,952</TableCell>
            <TableCell>$31,783,887,061</TableCell>
            <TableCell className="text-right">19,761,350 BTC</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">1.</TableCell>
            <TableCell>Bitcoin</TableCell>
            <TableCell>$73,000</TableCell>
            <TableCell>0.22%</TableCell>
            <TableCell>2.10%</TableCell>
            <TableCell>10.01%</TableCell>
            <TableCell>$1,257,869,744,952</TableCell>
            <TableCell>$31,783,887,061</TableCell>
            <TableCell className="text-right">19,761,350 BTC</TableCell>
          </TableRow>


          <TableRow>
            <TableCell className="font-medium">1.</TableCell>
            <TableCell>Bitcoin</TableCell>
            <TableCell>$73,000</TableCell>
            <TableCell>0.22%</TableCell>
            <TableCell>2.10%</TableCell>
            <TableCell>10.01%</TableCell>
            <TableCell>$1,257,869,744,952</TableCell>
            <TableCell>$31,783,887,061</TableCell>
            <TableCell className="text-right">19,761,350 BTC</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CoinList;
