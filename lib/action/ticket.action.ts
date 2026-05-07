'use server';

import { Ticket } from "@/database/ticket.model";
import { connectToDatabase } from "../mongodb";

export const getTicketsByEventId = async (eventId: string) => {
  try {
    await connectToDatabase();
    const tickets = await Ticket.find({ eventId }).sort({ price: 1 }).lean();
    return tickets.map((ticket) => ({
      _id: ticket._id.toString(),
      eventId: ticket.eventId.toString(),
      tierName: ticket.tierName,
      price: ticket.price,
      totalSlots: ticket.totalSlots,
      slotsRemaining: ticket.slotsRemaining,
    }));
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

export const getTicketTiers = async () => {
  return [
    { name: 'Free', price: 0, totalSlots: 100 },
    { name: 'Early Bird', price: 25, totalSlots: 50 },
    { name: 'Standard', price: 50, totalSlots: 100 },
    { name: 'VIP', price: 100, totalSlots: 25 },
  ];
};

export const createTicketsForEvent = async (eventId: string) => {
  try {
    await connectToDatabase();
    const tiers = await getTicketTiers();
    
    const tickets = await Promise.all(
      tiers.map(async (tier) => {
        return await Ticket.create({
          eventId,
          tierName: tier.name,
          price: tier.price,
          totalSlots: tier.totalSlots,
          slotsRemaining: tier.totalSlots,
        });
      })
    );

    return { success: true, tickets };
  } catch (error) {
    console.error('Error creating tickets:', error);
    return { success: false, error: 'Failed to create tickets' };
  }
};

export const updateTicketSlots = async (ticketId: string, quantity: number) => {
  try {
    await connectToDatabase();
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      return { success: false, error: 'Ticket not found' };
    }

    if (ticket.slotsRemaining < quantity) {
      return { success: false, error: 'Not enough slots available' };
    }

    ticket.slotsRemaining -= quantity;
    await ticket.save();

    return { success: true };
  } catch (error) {
    console.error('Error updating ticket slots:', error);
    return { success: false, error: 'Failed to update ticket slots' };
  }
};