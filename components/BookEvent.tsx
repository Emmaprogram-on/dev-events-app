'use client';
import { createBooking } from "@/lib/action/booking.action";
import posthog from "posthog-js";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const BookEvent = ({eventId, slug, title}: {eventId: string, slug: string, title: string}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault();
        
        const { success } = await createBooking({ eventId, slug, email});

        if(success) {
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, slug, email})
        } else {
            console.error('Booking creation failed')
            posthog.captureException('Booking creation failed')
        }
    }
  return (
      <div id="book-event">
          
          <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="button-submit" >Get Tickets</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="enter your name" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" placeholder="enter your username" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose> */}
            <Button type="submit">Checkout</Button>
          </DialogFooter>
        </DialogContent>
      </form>
          </Dialog>
     </div>
  )
}

export default BookEvent