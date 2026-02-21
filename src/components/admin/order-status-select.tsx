"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { updateOrderStatus } from "@/src/actions/orders";
import { toast } from "sonner";
import type { OrderStatus } from "@/src/types";

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(newStatus: string) {
    startTransition(async () => {
      try {
        await updateOrderStatus({
          orderId,
          status: newStatus as OrderStatus,
        });
        toast.success("Order status updated");
        router.refresh();
      } catch {
        toast.error("Failed to update order status");
      }
    });
  }

  return (
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-36 h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ORDER_STATUSES.map((status) => (
          <SelectItem key={status} value={status} className="text-xs">
            {STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
