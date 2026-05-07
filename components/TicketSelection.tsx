'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import posthog from "posthog-js";

interface Ticket {
  _id: string;
  tierName: string;
  price: number;
  totalSlots: number;
  slotsRemaining: number;
}

interface TicketSelectionProps {
  eventId: string;
  eventTitle: string;
  tickets: Ticket[];
}

const tierClass: Record<string, string> = {
  "Free": "free",
  "Early Bird": "early-bird",
  "Standard": "standard",
  "VIP": "vip",
};

const TicketSelection = ({ eventId, eventTitle, tickets }: TicketSelectionProps) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setIsOpen(true);
    posthog.capture('ticket_selected', {
      eventId,
      tierName: ticket.tierName,
      price: ticket.price,
    });
  };

  const handleSubmit = async () => {
    if (!selectedTicket) return;

    posthog.capture('booking_initiated', {
      eventId,
      eventTitle,
      tierName: selectedTicket.tierName,
      price: selectedTicket.price,
      quantity,
      total: selectedTicket.price * quantity,
    });

    setSubmitted(true);
    setIsOpen(false);
  };

  if (tickets.length === 0) {
    return (
      <div className="no-tickets">
        <p>Tickets not available yet.</p>
      </div>
    );
  }

  return (
    <div className="ticket-selection">
      <h3>Select Ticket</h3>
      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <button
            key={ticket._id}
            className={`ticket-card ${tierClass[ticket.tierName] || ""}`}
            onClick={() => handleTicketSelect(ticket)}
            disabled={ticket.slotsRemaining === 0}
          >
            <div className={`ticket-tier ${tierClass[ticket.tierName] || ""}`}>{ticket.tierName}</div>
            <div className="ticket-price">
              {ticket.price === 0 ? "Free" : `$${ticket.price}`}
            </div>
            <div className="ticket-slots">
              {ticket.slotsRemaining > 0
                ? `${ticket.slotsRemaining} spots left`
                : "Sold out"}
            </div>
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
            <DialogDescription>
              {eventTitle} - {selectedTicket?.tierName}
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="booking-success">
              <p>Your booking has been submitted!</p>
              <p>Check your email for confirmation.</p>
            </div>
          ) : (
            <>
              <div className="booking-summary">
                <div className="summary-row">
                  <span>Ticket Type:</span>
                  <span>{selectedTicket?.tierName}</span>
                </div>
                <div className="summary-row">
                  <span>Price per ticket:</span>
                  <span>
                    {selectedTicket?.price === 0
                      ? "Free"
                      : `$${selectedTicket?.price}`}
                  </span>
                </div>
                <div className="summary-row">
                  <Label htmlFor="quantity">Quantity:</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={selectedTicket?.slotsRemaining || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>
                    {selectedTicket?.price === 0
                      ? "Free"
                      : `$${(selectedTicket?.price || 0) * quantity}`}
                  </span>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleSubmit} className="w-full">
                  {selectedTicket?.price === 0 ? "Confirm Booking" : "Proceed to Payment"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketSelection;