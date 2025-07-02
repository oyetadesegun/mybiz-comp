import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

export default function Pagination({data}: {data}){ //TODO: help with the type
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);

    return       <div className="flex items-center justify-between p-4">
  <div className="flex items-center gap-2">
    <span>Rows per page:</span>
    <Select value={String(itemsPerPage)} onValueChange={(value) => {
      setItemsPerPage(Number(value));
      setCurrentPage(1); // reset to first page on size change
    }}>
      <SelectTrigger className="w-[80px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="40">40</SelectItem>
        <SelectItem value="50">50</SelectItem>
        
      </SelectContent>
    </Select>
  </div>

  <div className="flex items-center gap-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Prev
    </Button>
    <span>
      Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
    </span>
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        setCurrentPage((prev) =>
          prev < Math.ceil(data.length / itemsPerPage)
            ? prev + 1
            : prev
        )
      }
      disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
    >
      Next
    </Button>
  </div>
</div>
}